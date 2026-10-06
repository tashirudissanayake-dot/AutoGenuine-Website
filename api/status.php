<?php
// api/status.php - Live MySQL Database Status & Health Check
require_once __DIR__ . '/db.php';

$connected = isDBConnected();

if (!$connected) {
    sendJsonResponse(false, [
        'connected' => false,
        'driver'    => 'localStorage (fallback)',
        'error'     => 'MySQL connection failed. Ensure MySQL service is running in XAMPP.',
        'host'      => DB_HOST . ':' . DB_PORT,
        'database'  => DB_NAME
    ], 'MySQL Database is Offline. Running on local cache mode.');
}

try {
    $db = getDB();
    $tablesStmt = $db->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

    $counts = [];
    if (in_array('users', $tables)) {
        $counts['users'] = (int)$db->query("SELECT COUNT(*) FROM users")->fetchColumn();
    }
    if (in_array('products', $tables)) {
        $counts['products'] = (int)$db->query("SELECT COUNT(*) FROM products")->fetchColumn();
    }
    if (in_array('orders', $tables)) {
        $counts['orders'] = (int)$db->query("SELECT COUNT(*) FROM orders")->fetchColumn();
    }
    if (in_array('part_quotations', $tables)) {
        $counts['quotations'] = (int)$db->query("SELECT COUNT(*) FROM part_quotations")->fetchColumn();
    }
    if (in_array('coupons', $tables)) {
        $counts['coupons'] = (int)$db->query("SELECT COUNT(*) FROM coupons")->fetchColumn();
    }

    sendJsonResponse(true, [
        'connected'    => true,
        'driver'       => 'MySQL (PDO)',
        'host'         => DB_HOST . ':' . DB_PORT,
        'database'     => DB_NAME,
        'tables_count' => count($tables),
        'counts'       => $counts
    ], 'MySQL Database is Connected & Live');
} catch (Exception $e) {
    sendJsonResponse(false, [
        'connected' => false,
        'error'     => $e->getMessage()
    ], 'Database Error: ' . $e->getMessage(), 500);
}
