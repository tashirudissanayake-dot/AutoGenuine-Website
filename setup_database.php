<?php
// setup_database.php - One-Click Database & Tables Installer for AutoGenuine (XAMPP / MySQL)

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/db.php';

$message = "";
$status = "info";
$tablesCount = 0;
$recordsCount = 0;

if (isset($_POST['install_db']) || isset($_GET['auto'])) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";charset=utf8mb4";
        $pdo = new PDO($dsn, DB_USER, DB_PASS, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // 1. Create Database
        $pdo->exec("CREATE DATABASE IF NOT EXISTS " . DB_NAME . " CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE " . DB_NAME);

        // 2. Read and Execute database.sql
        $sqlFile = __DIR__ . '/database.sql';
        if (!file_exists($sqlFile)) {
            throw new Exception("SQL Schema file database.sql not found at " . $sqlFile);
        }

        $sqlContent = file_get_contents($sqlFile);
        
        // Execute the entire SQL script
        $pdo->exec($sqlContent);

        // 3. Verify Tables Created
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $tablesCount = count($tables);

        // Verify Products & Users count
        $stmtP = $pdo->query("SELECT COUNT(*) FROM products");
        $productsCount = $stmtP->fetchColumn();

        $stmtU = $pdo->query("SELECT COUNT(*) FROM users");
        $usersCount = $stmtU->fetchColumn();

        $status = "success";
        $message = "Database 'autogenuine_db' installed successfully! Created $tablesCount tables, seeded $productsCount genuine parts, and created $usersCount default user accounts (including Admin Supervisor).";
    } catch (Exception $e) {
        $status = "danger";
        $message = "Installation Failed: " . $e->getMessage() . "<br><small>Make sure MySQL service is started in XAMPP Control Panel!</small>";
    }
} else {
    // Check if database already exists
    if (isDBConnected()) {
        try {
            $db = getDB();
            $stmt = $db->query("SHOW TABLES");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            $tablesCount = count($tables);
            if ($tablesCount > 0) {
                $status = "success";
                $message = "Database 'autogenuine_db' is already connected and active with $tablesCount tables.";
            }
        } catch (Exception $e) {
            $status = "warning";
            $message = "Database connection check: " . $e->getMessage();
        }
    } else {
        $status = "warning";
        $message = "Database 'autogenuine_db' is not installed yet or MySQL is not running. Click the button below to install automatically.";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoGenuine Database Setup & Installer</title>
    <style>
        body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            background: #0b0d13;
            color: #f0f4fc;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .card {
            background: #121622;
            border: 1px solid #242c42;
            border-radius: 16px;
            max-width: 650px;
            width: 100%;
            padding: 35px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
            text-align: center;
        }
        .logo-icon {
            font-size: 3rem;
            margin-bottom: 10px;
            display: inline-block;
        }
        h1 {
            font-size: 1.6rem;
            color: #f0f4fc;
            margin-bottom: 8px;
        }
        h1 span {
            color: #e63946;
        }
        p {
            color: #8e9bb0;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 25px;
        }
        .alert {
            padding: 16px 20px;
            border-radius: 10px;
            font-size: 0.9rem;
            margin-bottom: 25px;
            text-align: left;
            line-height: 1.5;
        }
        .alert-success {
            background: rgba(78, 237, 157, 0.12);
            border: 1px solid #4eed9d;
            color: #4eed9d;
        }
        .alert-warning {
            background: rgba(252, 163, 17, 0.12);
            border: 1px solid #fca311;
            color: #fca311;
        }
        .alert-danger {
            background: rgba(230, 57, 70, 0.12);
            border: 1px solid #e63946;
            color: #e63946;
        }
        .btn-install {
            background: #e63946;
            color: #fff;
            border: none;
            padding: 14px 28px;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(230, 57, 70, 0.4);
            transition: all 0.2s;
            width: 100%;
        }
        .btn-install:hover {
            background: #f04856;
            transform: translateY(-2px);
        }
        .btn-secondary {
            display: inline-block;
            background: #1a2030;
            color: #f0f4fc;
            border: 1px solid #242c42;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none;
            margin-top: 15px;
            transition: all 0.2s;
        }
        .btn-secondary:hover {
            background: #242c42;
        }
        .quick-links {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-top: 25px;
            border-top: 1px solid #242c42;
            padding-top: 20px;
        }
        .meta-list {
            text-align: left;
            background: #1a2030;
            border: 1px solid #242c42;
            border-radius: 8px;
            padding: 15px 20px;
            margin-bottom: 25px;
            font-size: 0.85rem;
        }
        .meta-list li {
            margin-bottom: 6px;
            color: #8e9bb0;
        }
        .meta-list li strong {
            color: #f0f4fc;
        }
    </style>
</head>
<body>

    <div class="card">
        <span class="logo-icon">🗄️</span>
        <h1>Auto<span>Genuine</span> Database Installer</h1>
        <p>One-Click MySQL Database & Tables Setup for XAMPP / WAMP / phpMyAdmin</p>

        <div class="alert alert-<?php echo $status; ?>">
            <?php echo $message; ?>
        </div>

        <div class="meta-list">
            <li><strong>Host:</strong> <?php echo DB_HOST . ':' . DB_PORT; ?></li>
            <li><strong>Database Name:</strong> <?php echo DB_NAME; ?></li>
            <li><strong>Database User:</strong> <?php echo DB_USER; ?></li>
            <li><strong>Tables Included:</strong> 17 Normalized Tables (3NF Schema)</li>
            <li><strong>Initial Data:</strong> 24 Genuine Spare Parts, Demo Admin & Customer, 3 Promo Coupons, Orders & Quotations</li>
        </div>

        <form method="POST">
            <button type="submit" name="install_db" class="btn-install">
                ⚡ Install / Reset Database & Tables in MySQL (1-Click)
            </button>
        </form>

        <div class="quick-links">
            <a href="home.html" class="btn-secondary">🌐 Go to Storefront</a>
            <a href="admin.html" class="btn-secondary">🛡️ Go to Admin Dashboard</a>
            <a href="http://localhost/phpmyadmin/index.php?route=/database/structure&db=autogenuine_db" target="_blank" class="btn-secondary">📊 Open in phpMyAdmin</a>
        </div>
    </div>

</body>
</html>
