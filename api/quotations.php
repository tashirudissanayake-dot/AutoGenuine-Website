<?php
// api/quotations.php - Part Quotation Inquiries API (MySQL)
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? ($_POST['action'] ?? 'list');
$input = getJsonInput();

$db = getDB();
if (!$db) {
    sendJsonResponse(false, [], 'Database connection not available', 500);
}

switch ($action) {
    case 'list':
    case 'get':
        handleGetQuotations($db);
        break;

    case 'create':
    case 'save':
        handleCreateQuotation($db, $input);
        break;

    case 'update_status':
        handleUpdateQuoteStatus($db, $input);
        break;

    case 'delete':
        handleDeleteQuote($db, $input);
        break;

    default:
        sendJsonResponse(false, [], 'Invalid quotation action', 400);
        break;
}

function handleGetQuotations($db) {
    $stmt = $db->query("
        SELECT quotation_id, quotation_reference as quoteId, customer_name as name, phone, 
               vehicle_make_model as vehicle, manufacturing_year as year, chassis_vin as vin, 
               parts_details as details, status, created_at as date
        FROM part_quotations 
        ORDER BY quotation_id DESC
    ");
    $quotes = $stmt->fetchAll();

    foreach ($quotes as &$q) {
        $q['date'] = date('d/m/Y', strtotime($q['date']));
    }

    sendJsonResponse(true, $quotes, 'Quotations retrieved successfully');
}

function handleCreateQuotation($db, $input) {
    $ref = trim($input['quoteId'] ?? '') ?: '#QUOT-' . rand(1000, 9999);
    $name = trim($input['name'] ?? 'Customer');
    $phone = trim($input['phone'] ?? '');
    $vehicle = trim($input['vehicle'] ?? '');
    $year = trim($input['year'] ?? date('Y'));
    $vin = trim($input['vin'] ?? 'Not provided');
    $details = trim($input['details'] ?? '');
    $status = trim($input['status'] ?? 'Pending Review');

    if (empty($name) || empty($phone) || empty($details)) {
        sendJsonResponse(false, [], 'Name, phone number, and parts details are required.');
    }

    $stmt = $db->prepare("
        INSERT INTO part_quotations 
        (quotation_reference, customer_name, phone, vehicle_make_model, manufacturing_year, chassis_vin, parts_details, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$ref, $name, $phone, $vehicle, $year, $vin, $details, $status]);

    sendJsonResponse(true, [
        'quoteId' => $ref
    ], "Quotation request {$ref} saved to MySQL database successfully! Our team will contact you.");
}

function handleUpdateQuoteStatus($db, $input) {
    $quoteId = trim($input['quoteId'] ?? $input['quotation_reference'] ?? '');
    $newStatus = trim($input['status'] ?? '');

    if (empty($quoteId) || empty($newStatus)) {
        sendJsonResponse(false, [], 'Quote ID and status are required.');
    }

    $stmt = $db->prepare("UPDATE part_quotations SET status = ? WHERE quotation_reference = ? OR quotation_id = ?");
    $stmt->execute([$newStatus, $quoteId, $quoteId]);

    sendJsonResponse(true, [], "Quotation {$quoteId} updated to '{$newStatus}' in MySQL database.");
}

function handleDeleteQuote($db, $input) {
    $quoteId = trim($input['quoteId'] ?? $input['quotation_reference'] ?? $_GET['id'] ?? '');
    if (empty($quoteId)) {
        sendJsonResponse(false, [], 'Quote ID is required.');
    }

    $stmt = $db->prepare("DELETE FROM part_quotations WHERE quotation_reference = ? OR quotation_id = ?");
    $stmt->execute([$quoteId, $quoteId]);

    sendJsonResponse(true, [], "Quotation {$quoteId} deleted from MySQL database.");
}
