<?php
// api/orders.php - Customer Orders Management API (MySQL)
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
        handleGetOrders($db);
        break;

    case 'create':
    case 'save':
        handleCreateOrder($db, $input);
        break;

    case 'update_status':
        handleUpdateOrderStatus($db, $input);
        break;

    case 'track':
        handleTrackOrder($db, $input);
        break;

    case 'delete':
        handleDeleteOrder($db, $input);
        break;

    default:
        sendJsonResponse(false, [], 'Invalid order action', 400);
        break;
}

function handleGetOrders($db) {
    $stmt = $db->query("
        SELECT o.*, u.email as user_email, u.phone as user_phone, c.code as coupon_code
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.user_id
        LEFT JOIN coupons c ON o.coupon_id = c.coupon_id
        ORDER BY o.order_id DESC
    ");
    $rawOrders = $stmt->fetchAll();

    $orders = [];
    foreach ($rawOrders as $o) {
        $oId = $o['order_id'];

        // Fetch Order Items
        $iStmt = $db->prepare("SELECT product_id, product_name as name, unit_price as price, quantity, subtotal FROM order_items WHERE order_id = ?");
        $iStmt->execute([$oId]);
        $items = $iStmt->fetchAll();

        $itemCount = 0;
        foreach ($items as &$it) {
            $it['price'] = (float)$it['price'];
            $it['quantity'] = (int)$it['quantity'];
            $it['subtotal'] = (float)$it['subtotal'];
            $itemCount += $it['quantity'];
        }

        $orderObj = [
            'orderId'        => $o['order_reference'],
            'order_id'       => (int)$o['order_id'],
            'date'           => date('d/m/Y', strtotime($o['order_date'])),
            'customerName'   => $o['customer_name'],
            'customerEmail'  => $o['user_email'] ?? '',
            'customerPhone'  => $o['customer_phone'],
            'address'        => $o['delivery_address'],
            'city'           => $o['city'],
            'district'       => $o['district'],
            'paymentMethod'  => $o['payment_method'],
            'paymentStatus'  => $o['payment_status'],
            'subtotal'       => (float)$o['subtotal'],
            'discount'       => (float)$o['discount_amount'],
            'shipping'       => (float)$o['shipping_fee'],
            'total'          => (float)$o['total_amount'],
            'status'         => $o['order_status'],
            'itemCount'      => $itemCount,
            'items'          => $items
        ];

        // Parse bank slip metadata if available in vehicle_notes
        if (!empty($o['vehicle_notes'])) {
            $notesData = json_decode($o['vehicle_notes'], true);
            if (is_array($notesData) && isset($notesData['bankSlip'])) {
                $b = $notesData['bankSlip'];
                $orderObj['bankSlipUrl'] = $b['bankSlipUrl'] ?? '';
                $orderObj['bankSlipFileName'] = $b['bankSlipFileName'] ?? '';
                $orderObj['bankName'] = $b['bankName'] ?? '';
                $orderObj['bankRefNumber'] = $b['bankRefNumber'] ?? '';
                $orderObj['depositorName'] = $b['depositorName'] ?? '';
                $orderObj['depositDate'] = $b['depositDate'] ?? '';
            }
        }

        $orders[] = $orderObj;
    }

    sendJsonResponse(true, $orders, 'Orders retrieved successfully');
}

function handleCreateOrder($db, $input) {
    $orderRef = trim($input['orderId'] ?? '') ?: '#AG-' . rand(10000, 99999);
    $customerName = trim($input['customerName'] ?? $input['name'] ?? 'Customer');
    $customerPhone = trim($input['customerPhone'] ?? $input['phone'] ?? '');
    $customerEmail = trim($input['customerEmail'] ?? $input['email'] ?? '');
    $address = trim($input['address'] ?? 'Sri Lanka');
    $city = trim($input['city'] ?? 'Colombo');
    $district = trim($input['district'] ?? 'Western Province');
    $paymentMethod = trim($input['paymentMethod'] ?? 'Cash on Delivery');
    // Normalise payment method to match DB ENUM values
    $payMethodMap = [
        'COD'                    => 'Cash on Delivery',
        'Cash on Delivery'       => 'Cash on Delivery',
        'Bank Transfer'          => 'Direct Bank Transfer',
        'Bank'                   => 'Direct Bank Transfer',
        'Direct Bank Transfer'   => 'Direct Bank Transfer',
        'Credit/Debit Card'      => 'Credit / Debit Card',
        'Card'                   => 'Credit / Debit Card',
        'Credit / Debit Card'    => 'Credit / Debit Card',
        'Koko Installments'      => 'Koko Installments',
        'Koko'                   => 'Koko Installments',
    ];
    $paymentMethod = $payMethodMap[$paymentMethod] ?? 'Cash on Delivery';
    $subtotal = (float)($input['subtotal'] ?? 0);
    $discount = (float)($input['discount'] ?? 0);
    $shipping = (float)($input['shipping'] ?? 0);
    $total = (float)($input['total'] ?? ($subtotal - $discount + $shipping));
    $status = trim($input['status'] ?? 'Processing Dispatch');

    // Find user_id if email provided
    $userId = null;
    if (!empty($customerEmail)) {
        $uStmt = $db->prepare("SELECT user_id FROM users WHERE email = ? LIMIT 1");
        $uStmt->execute([$customerEmail]);
        $u = $uStmt->fetch();
        if ($u) $userId = $u['user_id'];
    }

    $paymentStatus = trim($input['paymentStatus'] ?? 'Pending');

    // Build vehicle notes with any bank slip metadata
    $vehicleNotes = trim($input['vehicleNotes'] ?? $input['vehicle_notes'] ?? '');
    if (!empty($input['bankSlipUrl']) || !empty($input['bankRefNumber'])) {
        $meta = [
            'vehicleNotes'     => $vehicleNotes,
            'bankSlip'         => [
                'bankName'         => $input['bankName'] ?? '',
                'bankRefNumber'    => $input['bankRefNumber'] ?? '',
                'depositorName'    => $input['depositorName'] ?? '',
                'depositDate'      => $input['depositDate'] ?? '',
                'bankSlipUrl'      => $input['bankSlipUrl'] ?? '',
                'bankSlipFileName' => $input['bankSlipFileName'] ?? ''
            ]
        ];
        $vehicleNotes = json_encode($meta, JSON_UNESCAPED_SLASHES);
    }

    $insertOrder = $db->prepare("
        INSERT INTO orders 
        (order_reference, user_id, customer_name, customer_phone, delivery_address, city, district, payment_method, payment_status, subtotal, discount_amount, shipping_fee, total_amount, vehicle_notes, order_status, order_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    $insertOrder->execute([
        $orderRef, $userId, $customerName, $customerPhone, $address, $city, $district, $paymentMethod, $paymentStatus, $subtotal, $discount, $shipping, $total, $vehicleNotes, $status
    ]);
    $newOrderId = $db->lastInsertId();

    // Insert Order Items
    $items = $input['items'] ?? [];
    if (is_array($items)) {
        $itemStmt = $db->prepare("
            INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, subtotal)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        foreach ($items as $item) {
            $pName = $item['name'] ?? 'Spare Part';
            $pPrice = (float)($item['price'] ?? 0);
            $pQty = (int)($item['quantity'] ?? 1);
            $pSubtotal = $pPrice * $pQty;

            // Find product_id
            $pId = 1;
            if (!empty($item['id'])) {
                $pLookup = $db->prepare("SELECT product_id FROM products WHERE slug_id = ? OR product_id = ? LIMIT 1");
                $pLookup->execute([$item['id'], $item['id']]);
                $pFound = $pLookup->fetch();
                if ($pFound) $pId = $pFound['product_id'];
            }

            $itemStmt->execute([$newOrderId, $pId, $pName, $pPrice, $pQty, $pSubtotal]);

            // Deduct stock
            $stockUpdate = $db->prepare("UPDATE products SET stock_quantity = GREATEST(0, stock_quantity - ?), in_stock = CASE WHEN stock_quantity - ? > 0 THEN 1 ELSE 0 END WHERE product_id = ?");
            $stockUpdate->execute([$pQty, $pQty, $pId]);
        }
    }

    sendJsonResponse(true, [
        'order_id'        => $newOrderId,
        'order_reference' => $orderRef
    ], "Order {$orderRef} placed and recorded in MySQL database successfully!");
}

function handleUpdateOrderStatus($db, $input) {
    $orderRef = trim($input['orderId'] ?? $input['order_reference'] ?? '');
    $newStatus = trim($input['status'] ?? $input['order_status'] ?? '');
    $paymentStatus = trim($input['paymentStatus'] ?? '');

    if (empty($orderRef)) {
        sendJsonResponse(false, [], 'Order Reference is required.');
    }

    if (!empty($paymentStatus) && !empty($newStatus)) {
        $dbPayStatus = (stripos($paymentStatus, 'Paid') !== false || stripos($paymentStatus, 'Verified') !== false) ? 'Paid' : 'Pending';
        $stmt = $db->prepare("UPDATE orders SET order_status = ?, payment_status = ? WHERE order_reference = ? OR order_id = ?");
        $stmt->execute([$newStatus, $dbPayStatus, $orderRef, $orderRef]);
    } else if (!empty($newStatus)) {
        $stmt = $db->prepare("UPDATE orders SET order_status = ? WHERE order_reference = ? OR order_id = ?");
        $stmt->execute([$newStatus, $orderRef, $orderRef]);
    }

    sendJsonResponse(true, [], "Order {$orderRef} status updated in MySQL database.");
}

function handleTrackOrder($db, $input) {
    $ref = trim($input['orderId'] ?? $input['order_reference'] ?? $_GET['ref'] ?? $_GET['orderId'] ?? $_GET['phone'] ?? '');
    if (empty($ref)) {
        sendJsonResponse(false, [], 'Please enter an Order Reference ID (e.g. #AG-90412) or Phone Number.');
    }

    $refClean = ltrim($ref, '#');
    $stmt = $db->prepare("
        SELECT o.*, u.email as user_email, u.phone as user_phone
        FROM orders o
        LEFT JOIN users u ON o.user_id = u.user_id
        WHERE o.order_reference = ? OR o.order_reference = ? OR o.customer_phone = ? OR o.order_id = ?
        ORDER BY o.order_id DESC
        LIMIT 1
    ");
    $stmt->execute([$ref, '#' . $refClean, $ref, $ref]);
    $o = $stmt->fetch();

    if (!$o) {
        sendJsonResponse(false, [], "No order found matching '{$ref}'. Please check the order number and try again.");
    }

    $oId = $o['order_id'];
    $iStmt = $db->prepare("SELECT product_id, product_name as name, unit_price as price, quantity, subtotal FROM order_items WHERE order_id = ?");
    $iStmt->execute([$oId]);
    $items = $iStmt->fetchAll();

    $itemCount = 0;
    foreach ($items as &$it) {
        $it['price'] = (float)$it['price'];
        $it['quantity'] = (int)$it['quantity'];
        $it['subtotal'] = (float)$it['subtotal'];
        $itemCount += $it['quantity'];
    }

    // Determine tracking progress step
    $status = $o['order_status'] ?? 'Processing Dispatch';
    $step = 1;
    $statusMsg = "Your order has been received and is being prepared for dispatch.";
    $courier = "Domex Islandwide Express Courier";
    $trackingNo = "DX-" . strtoupper(substr(md5($o['order_reference']), 0, 8)) . "LK";
    $estDelivery = date('d M Y', strtotime($o['order_date'] . ' + 2 days'));

    $s = strtolower($status);
    if (strpos($s, 'deliver') !== false || strpos($s, 'complete') !== false) {
        $step = 4;
        $statusMsg = "Package successfully delivered to customer destination.";
    } elseif (strpos($s, 'out for delivery') !== false) {
        $step = 3.5;
        $statusMsg = "Courier delivery rider is out for delivery to your address today.";
    } elseif (strpos($s, 'ship') !== false || strpos($s, 'transit') !== false || (strpos($s, 'dispatch') !== false && strpos($s, 'processing') === false)) {
        $step = 3;
        $statusMsg = "Dispatched via islandwide express courier! Handed over to Domex central sorting hub.";
    } elseif (strpos($s, 'inspect') !== false || strpos($s, 'quality') !== false) {
        $step = 2;
        $statusMsg = "Genuine OEM fitment and quality inspection passed. Ready for dispatch.";
    } elseif (strpos($s, 'cancel') !== false) {
        $step = 0;
        $statusMsg = "This order was cancelled.";
    }

    $orderData = [
        'orderId'           => $o['order_reference'],
        'order_id'          => (int)$o['order_id'],
        'date'              => date('d/m/Y', strtotime($o['order_date'])),
        'customerName'      => $o['customer_name'],
        'customerEmail'     => $o['user_email'] ?? '',
        'customerPhone'     => $o['customer_phone'],
        'address'           => $o['delivery_address'] . ', ' . $o['city'],
        'city'              => $o['city'],
        'district'          => $o['district'],
        'paymentMethod'     => $o['payment_method'],
        'paymentStatus'     => $o['payment_status'],
        'subtotal'          => (float)$o['subtotal'],
        'discount'          => (float)$o['discount_amount'],
        'shipping'          => (float)$o['shipping_fee'],
        'total'             => (float)$o['total_amount'],
        'status'            => $status,
        'trackingStep'      => $step,
        'statusMessage'     => $statusMsg,
        'courierName'       => $courier,
        'trackingNumber'    => $trackingNo,
        'estimatedDelivery' => $estDelivery,
        'itemCount'         => $itemCount,
        'items'             => $items
    ];

    sendJsonResponse(true, $orderData, "Tracking details for order {$o['order_reference']} retrieved.");
}

function handleDeleteOrder($db, $input) {
    $orderRef = trim($input['orderId'] ?? $input['order_reference'] ?? $_GET['id'] ?? '');
    if (empty($orderRef)) {
        sendJsonResponse(false, [], 'Order reference is required.');
    }

    $stmt = $db->prepare("DELETE FROM orders WHERE order_reference = ? OR order_id = ?");
    $stmt->execute([$orderRef, $orderRef]);

    sendJsonResponse(true, [], "Order {$orderRef} deleted from MySQL database.");
}
