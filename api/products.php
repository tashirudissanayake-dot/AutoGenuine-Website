<?php
// api/products.php - Products Catalog & CRUD API
require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? ($_POST['action'] ?? 'get');
$input = getJsonInput();

$db = getDB();
if (!$db) {
    sendJsonResponse(false, [], 'Database connection not available', 500);
}

switch ($action) {
    case 'get':
    case 'list':
        handleGetProducts($db);
        break;

    case 'get_one':
        $id = $_GET['id'] ?? ($input['id'] ?? '');
        handleGetSingleProduct($db, $id);
        break;

    case 'add':
        handleAddProduct($db, $input);
        break;

    case 'update':
        handleUpdateProduct($db, $input);
        break;

    case 'delete':
        handleDeleteProduct($db, $input);
        break;

    case 'reset':
        handleResetProducts($db);
        break;

    default:
        sendJsonResponse(false, [], 'Invalid product action', 400);
        break;
}

function handleGetProducts($db) {
    $stmt = $db->query("
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.category_id
        ORDER BY p.product_id ASC
    ");
    $rawProducts = $stmt->fetchAll();

    $products = [];
    foreach ($rawProducts as $p) {
        $pId = $p['product_id'];

        // Fetch Features
        $fStmt = $db->prepare("SELECT feature_text FROM product_features WHERE product_id = ? ORDER BY display_order ASC");
        $fStmt->execute([$pId]);
        $features = $fStmt->fetchAll(PDO::FETCH_COLUMN);

        // Fetch Specs
        $sStmt = $db->prepare("SELECT spec_name, spec_value FROM product_specifications WHERE product_id = ?");
        $sStmt->execute([$pId]);
        $specsArray = $sStmt->fetchAll();
        $specs = [];
        foreach ($specsArray as $s) {
            $specs[$s['spec_name']] = $s['spec_value'];
        }

        // Fetch Compatibility
        $cStmt = $db->prepare("SELECT make, model, years_compatible as years, engine_code as engine FROM vehicle_compatibility WHERE product_id = ?");
        $cStmt->execute([$pId]);
        $compatibility = $cStmt->fetchAll();

        // Fetch Gallery
        $gStmt = $db->prepare("SELECT image_url FROM product_gallery WHERE product_id = ? ORDER BY display_order ASC");
        $gStmt->execute([$pId]);
        $gallery = $gStmt->fetchAll(PDO::FETCH_COLUMN);
        if (empty($gallery)) {
            $gallery = [$p['main_image']];
        }

        // Fetch Reviews
        $rStmt = $db->prepare("SELECT author_name as author, avatar_initials as avatar, location, rating, title, comment, created_at as date FROM product_reviews WHERE product_id = ?");
        $rStmt->execute([$pId]);
        $reviews = $rStmt->fetchAll();
        foreach ($reviews as &$r) {
            $r['rating'] = (int)$r['rating'];
            $r['date'] = date('d/m/Y', strtotime($r['date']));
        }

        $products[] = [
            'id'               => $p['slug_id'],
            'product_id'       => (int)$p['product_id'],
            'name'             => $p['name'],
            'category'         => $p['category_name'] ?? 'Engine Parts',
            'categorySlug'     => $p['category_slug'] ?? 'engine-parts',
            'price'            => (float)$p['price'],
            'originalPrice'    => (float)($p['original_price'] ?? $p['price']),
            'discountPercent'  => (int)$p['discount_percent'],
            'rating'           => (float)$p['rating'],
            'reviewsCount'     => (int)$p['reviews_count'],
            'inStock'          => (bool)$p['in_stock'],
            'stockCount'       => (int)$p['stock_quantity'],
            'sku'              => $p['sku'],
            'oemNumber'        => $p['oem_number'],
            'brand'            => $p['brand'],
            'warranty'         => $p['warranty'],
            'origin'           => $p['origin'],
            'mainImage'        => $p['main_image'],
            'gallery'          => $gallery,
            'shortDescription' => $p['short_description'],
            'fullDescription'  => $p['full_description'],
            'features'         => $features,
            'specs'            => $specs,
            'compatibility'    => $compatibility,
            'reviews'          => $reviews
        ];
    }

    sendJsonResponse(true, $products, 'Products retrieved successfully');
}

function handleGetSingleProduct($db, $id) {
    if (empty($id)) {
        sendJsonResponse(false, [], 'Product ID is required.');
    }
    // Fetch and return formatted single product
    $stmt = $db->prepare("SELECT * FROM products WHERE slug_id = ? OR product_id = ? LIMIT 1");
    $stmt->execute([$id, $id]);
    $p = $stmt->fetch();
    if (!$p) {
        sendJsonResponse(false, [], 'Product not found.');
    }
    sendJsonResponse(true, $p, 'Product found');
}

function handleAddProduct($db, $input) {
    $name = trim($input['name'] ?? '');
    if (empty($name)) {
        sendJsonResponse(false, [], 'Product name is required.');
    }

    $slug = trim($input['id'] ?? '') ?: strtolower(preg_replace('/[^a-z0-9]+/i', '-', $name)) . '-' . rand(100, 999);
    $categoryName = trim($input['category'] ?? 'Engine Parts');
    $sku = trim($input['sku'] ?? '') ?: 'AG-PRT-' . rand(1000, 9999);
    $oem = trim($input['oemNumber'] ?? '') ?: 'OEM-GENUINE';
    $brand = trim($input['brand'] ?? 'AutoGenuine Certified');
    $price = (float)($input['price'] ?? 0);
    $originalPrice = (float)($input['originalPrice'] ?? ($price * 1.2));
    $discount = $originalPrice > $price ? round((($originalPrice - $price) / $originalPrice) * 100) : 0;
    $stock = (int)($input['stockCount'] ?? 15);
    $origin = trim($input['origin'] ?? 'Japan OEM');
    $warranty = trim($input['warranty'] ?? '1 Year Manufacturer Warranty');
    $image = trim($input['mainImage'] ?? 'images/engine.jpg');
    $shortDesc = trim($input['shortDescription'] ?? 'Genuine certified automotive spare part.');
    $fullDesc = trim($input['fullDescription'] ?? 'Engineered to strict OEM quality specifications. Provides seamless fitment and prolonged service longevity.');

    // Find or create Category
    $catStmt = $db->prepare("SELECT category_id FROM categories WHERE name LIKE ? OR slug LIKE ? LIMIT 1");
    $catSlug = strtolower(preg_replace('/[^a-z0-9]+/i', '-', $categoryName));
    $catStmt->execute(["%$categoryName%", "%$catSlug%"]);
    $cat = $catStmt->fetch();
    $catId = $cat ? $cat['category_id'] : 1;

    // Insert Product
    $insertP = $db->prepare("
        INSERT INTO products 
        (slug_id, sku, oem_number, name, category_id, brand, origin, price, original_price, discount_percent, rating, reviews_count, stock_quantity, in_stock, main_image, short_description, full_description, warranty, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 5.0, 1, ?, ?, ?, ?, ?, ?, NOW())
    ");
    $insertP->execute([
        $slug, $sku, $oem, $name, $catId, $brand, $origin, $price, $originalPrice, $discount, $stock, ($stock > 0 ? 1 : 0), $image, $shortDesc, $fullDesc, $warranty
    ]);
    $newPId = $db->lastInsertId();

    // Insert Features
    $features = $input['features'] ?? ["100% Genuine Certified Component", "Direct OEM bolt-on fitment", "Factory tested for high performance"];
    if (is_array($features)) {
        $fInsert = $db->prepare("INSERT INTO product_features (product_id, feature_text, display_order) VALUES (?, ?, ?)");
        $order = 1;
        foreach ($features as $f) {
            $fInsert->execute([$newPId, $f, $order++]);
        }
    }

    // Insert Compatibility
    $compat = $input['compatibility'] ?? [];
    if (is_array($compat) && !empty($compat)) {
        $cInsert = $db->prepare("INSERT INTO vehicle_compatibility (product_id, make, model, years_compatible, engine_code) VALUES (?, ?, ?, ?, ?)");
        foreach ($compat as $c) {
            $cInsert->execute([
                $newPId,
                $c['make'] ?? 'Universal',
                $c['model'] ?? 'Standard Fitment',
                $c['years'] ?? '2010 - 2026',
                $c['engine'] ?? 'Standard'
            ]);
        }
    }

    sendJsonResponse(true, ['product_id' => $newPId, 'slug_id' => $slug], "Product '{$name}' added to MySQL database successfully!");
}

function handleUpdateProduct($db, $input) {
    $id = trim($input['id'] ?? $input['product_id'] ?? '');
    if (empty($id)) {
        sendJsonResponse(false, [], 'Product ID is required.');
    }

    // Locate product
    $stmt = $db->prepare("SELECT product_id FROM products WHERE slug_id = ? OR product_id = ? LIMIT 1");
    $stmt->execute([$id, $id]);
    $p = $stmt->fetch();
    if (!$p) {
        sendJsonResponse(false, [], 'Product not found in database.');
    }
    $pId = $p['product_id'];

    $price = isset($input['price']) ? (float)$input['price'] : null;
    $stock = isset($input['stockCount']) ? (int)$input['stockCount'] : null;
    $name = trim($input['name'] ?? '');
    $oem = trim($input['oemNumber'] ?? '');
    $sku = trim($input['sku'] ?? '');
    $brand = trim($input['brand'] ?? '');
    $image = trim($input['mainImage'] ?? '');
    $shortDesc = trim($input['shortDescription'] ?? '');

    $updateStmt = $db->prepare("
        UPDATE products SET
            name = COALESCE(NULLIF(?, ''), name),
            oem_number = COALESCE(NULLIF(?, ''), oem_number),
            sku = COALESCE(NULLIF(?, ''), sku),
            brand = COALESCE(NULLIF(?, ''), brand),
            price = COALESCE(?, price),
            stock_quantity = COALESCE(?, stock_quantity),
            in_stock = CASE WHEN COALESCE(?, stock_quantity) > 0 THEN 1 ELSE 0 END,
            main_image = COALESCE(NULLIF(?, ''), main_image),
            short_description = COALESCE(NULLIF(?, ''), short_description)
        WHERE product_id = ?
    ");
    $updateStmt->execute([
        $name, $oem, $sku, $brand, $price, $stock, $stock, $image, $shortDesc, $pId
    ]);

    sendJsonResponse(true, ['product_id' => $pId], 'Product updated successfully in MySQL database.');
}

function handleDeleteProduct($db, $input) {
    $id = trim($input['id'] ?? $input['product_id'] ?? $_GET['id'] ?? '');
    if (empty($id)) {
        sendJsonResponse(false, [], 'Product ID is required.');
    }

    $stmt = $db->prepare("DELETE FROM products WHERE slug_id = ? OR product_id = ?");
    $stmt->execute([$id, $id]);

    sendJsonResponse(true, [], 'Product removed from MySQL database successfully.');
}

function handleResetProducts($db) {
    // Re-run database.sql or reset products table
    $sqlFile = dirname(__DIR__) . '/database.sql';
    if (file_exists($sqlFile)) {
        $sql = file_get_contents($sqlFile);
        $db->exec($sql);
        sendJsonResponse(true, [], 'Catalog successfully reset to default 9 items in MySQL database.');
    } else {
        sendJsonResponse(false, [], 'database.sql not found.');
    }
}
