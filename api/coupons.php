<?php
// api/coupons.php - Promo Coupons API (MySQL)
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
        handleGetCoupons($db);
        break;

    case 'add':
    case 'create':
        handleAddCoupon($db, $input);
        break;

    case 'toggle':
        handleToggleCoupon($db, $input);
        break;

    case 'delete':
        handleDeleteCoupon($db, $input);
        break;

    default:
        sendJsonResponse(false, [], 'Invalid coupon action', 400);
        break;
}

function handleGetCoupons($db) {
    $stmt = $db->query("
        SELECT coupon_id, code, discount_percent as discountPercent, min_order_amount as minOrder, 
               valid_to as expiryDate, is_active as active, created_at as createdAt
        FROM coupons 
        ORDER BY coupon_id DESC
    ");
    $coupons = $stmt->fetchAll();

    foreach ($coupons as &$c) {
        $c['discountPercent'] = (int)$c['discountPercent'];
        $c['minOrder'] = (float)$c['minOrder'];
        $c['active'] = (bool)$c['active'];
        $c['description'] = "{$c['discountPercent']}% Promo Discount";
    }

    sendJsonResponse(true, $coupons, 'Coupons retrieved successfully');
}

function handleAddCoupon($db, $input) {
    $code = strtoupper(trim($input['code'] ?? ''));
    $discount = (int)($input['discountPercent'] ?? 10);
    $minOrder = (float)($input['minOrder'] ?? 0);
    $expiry = trim($input['expiryDate'] ?? '') ?: date('Y-12-31');

    if (empty($code)) {
        sendJsonResponse(false, [], 'Coupon code is required.');
    }

    // Check duplicate
    $check = $db->prepare("SELECT coupon_id FROM coupons WHERE code = ? LIMIT 1");
    $check->execute([$code]);
    if ($check->fetch()) {
        sendJsonResponse(false, [], "Coupon '{$code}' already exists!");
    }

    $stmt = $db->prepare("
        INSERT INTO coupons (code, discount_percent, min_order_amount, valid_from, valid_to, is_active, created_at)
        VALUES (?, ?, ?, CURDATE(), ?, 1, NOW())
    ");
    $stmt->execute([$code, $discount, $minOrder, $expiry]);

    sendJsonResponse(true, [
        'code'            => $code,
        'discountPercent' => $discount,
        'minOrder'        => $minOrder,
        'expiryDate'      => $expiry,
        'active'          => true
    ], "Coupon '{$code}' created in MySQL database successfully!");
}

function handleToggleCoupon($db, $input) {
    $code = strtoupper(trim($input['code'] ?? ''));
    if (empty($code)) {
        sendJsonResponse(false, [], 'Coupon code is required.');
    }

    $stmt = $db->prepare("UPDATE coupons SET is_active = NOT is_active WHERE code = ?");
    $stmt->execute([$code]);

    sendJsonResponse(true, [], "Coupon '{$code}' status toggled in MySQL database.");
}

function handleDeleteCoupon($db, $input) {
    $code = strtoupper(trim($input['code'] ?? $_GET['code'] ?? ''));
    if (empty($code)) {
        sendJsonResponse(false, [], 'Coupon code is required.');
    }

    $stmt = $db->prepare("DELETE FROM coupons WHERE code = ?");
    $stmt->execute([$code]);

    sendJsonResponse(true, [], "Coupon '{$code}' deleted from MySQL database.");
}
