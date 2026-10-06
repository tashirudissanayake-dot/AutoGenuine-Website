-- =============================================================================
-- AUTOGENUINE E-COMMERCE DATABASE SCHEMA (MySQL / MariaDB Compatible)
-- Project: AutoGenuine - Genuine Car Spare Parts Online Store
-- University Web Engineering / Database Management Project
-- Author: AutoGenuine Development Team
-- Created: September 2026
-- Version: 2.0 (Normalized to 3NF)
-- =============================================================================

DROP DATABASE IF EXISTS autogenuine_db;
CREATE DATABASE autogenuine_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE autogenuine_db;

-- Set SQL Modes & Timezone
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

-- =============================================================================
-- 1. CATEGORIES TABLE
-- =============================================================================
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================================================
-- 2. PRODUCTS (SPARE PARTS) TABLE
-- =============================================================================
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    slug_id VARCHAR(100) NOT NULL UNIQUE,
    sku VARCHAR(50) NOT NULL UNIQUE,
    oem_number VARCHAR(100) NOT NULL,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    brand VARCHAR(100) NOT NULL,
    origin VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2) DEFAULT NULL,
    discount_percent INT DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    stock_quantity INT DEFAULT 10,
    in_stock BOOLEAN DEFAULT TRUE,
    main_image VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    warranty VARCHAR(150) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE RESTRICT,
    INDEX idx_product_category (category_id),
    INDEX idx_product_brand (brand),
    INDEX idx_product_sku (sku),
    INDEX idx_product_oem (oem_number),
    INDEX idx_product_price (price)
) ENGINE=InnoDB;

-- =============================================================================
-- 3. PRODUCT FEATURES TABLE
-- =============================================================================
CREATE TABLE product_features (
    feature_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    feature_text VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_feature_product (product_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 4. PRODUCT SPECIFICATIONS TABLE (Technical Specs Key-Value)
-- =============================================================================
CREATE TABLE product_specifications (
    spec_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    spec_name VARCHAR(100) NOT NULL,
    spec_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_spec_product (product_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 5. VEHICLE COMPATIBILITY TABLE (Fitment Checker Engine)
-- =============================================================================
CREATE TABLE vehicle_compatibility (
    compatibility_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    make VARCHAR(100) NOT NULL,
    model VARCHAR(150) NOT NULL,
    years_compatible VARCHAR(50) NOT NULL,
    engine_code VARCHAR(150) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_compat_product (product_id),
    INDEX idx_compat_make (make),
    INDEX idx_compat_model (model)
) ENGINE=InnoDB;

-- =============================================================================
-- 6. PRODUCT GALLERY IMAGES TABLE
-- =============================================================================
CREATE TABLE product_gallery (
    gallery_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    INDEX idx_gallery_product (product_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 7. USERS TABLE (Customers & Admins)
-- =============================================================================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(30) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registered_vehicle VARCHAR(150) DEFAULT NULL,
    role ENUM('customer', 'admin', 'mechanic') DEFAULT 'customer',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL DEFAULT NULL,
    INDEX idx_user_email (email)
) ENGINE=InnoDB;

-- =============================================================================
-- 8. USER ADDRESSES TABLE
-- =============================================================================
CREATE TABLE user_addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    address_line VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) DEFAULT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_address_user (user_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 9. COUPONS TABLE (Discount Promos)
-- =============================================================================
CREATE TABLE coupons (
    coupon_id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_percent INT NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
    min_order_amount DECIMAL(10, 2) DEFAULT 0.00,
    valid_from DATE NOT NULL,
    valid_to DATE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    usage_limit INT DEFAULT 1000,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =============================================================================
-- 10. ORDERS TABLE
-- =============================================================================
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_reference VARCHAR(50) NOT NULL UNIQUE,
    user_id INT DEFAULT NULL,
    customer_name VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    delivery_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    payment_method ENUM('Cash on Delivery', 'Direct Bank Transfer', 'Credit / Debit Card') NOT NULL DEFAULT 'Cash on Delivery',
    payment_status ENUM('Pending', 'Paid', 'Failed') DEFAULT 'Pending',
    subtotal DECIMAL(10, 2) NOT NULL,
    coupon_id INT DEFAULT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    vehicle_notes TEXT DEFAULT NULL,
    order_status ENUM('Processing Dispatch', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Processing Dispatch',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id) ON DELETE SET NULL,
    INDEX idx_order_ref (order_reference),
    INDEX idx_order_user (user_id),
    INDEX idx_order_status (order_status)
) ENGINE=InnoDB;

-- =============================================================================
-- 11. ORDER ITEMS TABLE (Line Items)
-- =============================================================================
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
    INDEX idx_item_order (order_id),
    INDEX idx_item_product (product_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 12. SHOPPING CART ITEMS TABLE
-- =============================================================================
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_cart (user_id, product_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 13. WISHLIST ITEMS TABLE
-- =============================================================================
CREATE TABLE wishlist_items (
    wishlist_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_product_wishlist (user_id, product_id)
) ENGINE=InnoDB;

-- =============================================================================
-- 14. PRODUCT REVIEWS TABLE
-- =============================================================================
CREATE TABLE product_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT DEFAULT NULL,
    author_name VARCHAR(150) NOT NULL,
    avatar_initials VARCHAR(10) NOT NULL DEFAULT 'U',
    location VARCHAR(100) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    is_verified_purchase BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_review_product (product_id),
    INDEX idx_review_rating (rating)
) ENGINE=InnoDB;

-- =============================================================================
-- 15. PART QUOTATIONS & INQUIRIES TABLE
-- =============================================================================
CREATE TABLE part_quotations (
    quotation_id INT AUTO_INCREMENT PRIMARY KEY,
    quotation_reference VARCHAR(50) NOT NULL UNIQUE,
    user_id INT DEFAULT NULL,
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    vehicle_make_model VARCHAR(150) NOT NULL,
    manufacturing_year VARCHAR(10) NOT NULL,
    chassis_vin VARCHAR(100) DEFAULT NULL,
    parts_details TEXT NOT NULL,
    status ENUM('Pending Review', 'Quoted', 'Sourced', 'Closed') DEFAULT 'Pending Review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_quote_ref (quotation_reference)
) ENGINE=InnoDB;

-- =============================================================================
-- 16. BLOG ARTICLES TABLE
-- =============================================================================
CREATE TABLE blog_articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(150) NOT NULL,
    read_time VARCHAR(50) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content_html MEDIUMTEXT NOT NULL,
    related_product_id INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (related_product_id) REFERENCES products(product_id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- =============================================================================
-- 17. LIVE CHATBOT MESSAGES LOG TABLE
-- =============================================================================
CREATE TABLE live_chat_messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    user_id INT DEFAULT NULL,
    sender_type ENUM('user', 'bot', 'agent') NOT NULL,
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_chat_session (session_id)
) ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS = 1;


-- =============================================================================
-- SEED DATA INSERTION (Populating the exact catalog from the website)
-- =============================================================================

-- 1. Insert Categories
INSERT INTO categories (category_id, name, slug, description, image_url) VALUES
(1, 'Engine Parts', 'engine-parts', 'Complete engine overhaul timing belt kits, water pumps, valves and gaskets.', 'images/engine.jpg'),
(2, 'Brake Parts', 'brake-parts', 'High-performance ceramic brake pads, ventilated disc rotors, and caliper accessories.', 'images/brake.jpg'),
(3, 'Filters', 'filters', 'OEM engine oil filters, high-flow air filters, and activated carbon cabin filters.', 'images/filter.jpg'),
(4, 'Batteries', 'batteries', 'Heavy-duty maintenance-free automotive batteries with up to 36 months warranty.', 'images/battery.jpg'),
(5, 'Lights & Electrical', 'lights', 'Super-white high-power LED headlight conversion kits and electrical units.', 'images/lights.jpg');

-- 2. Insert Products (All 9 genuine spare parts)
INSERT INTO products (
    product_id, slug_id, sku, oem_number, name, category_id, brand, origin,
    price, original_price, discount_percent, rating, reviews_count, stock_quantity,
    in_stock, main_image, short_description, full_description, warranty
) VALUES
(
    1, 'brake-pad-set', 'AG-BRK-4091', '04465-02220 / 04465-YZZE1',
    'Front Ceramic Brake Pad Set', 2, 'Advics / Brembo Genuine', 'Japan',
    4500.00, 5800.00, 22, 4.9, 12, 18, TRUE, 'images/brake-pad.jpg',
    'High-performance ceramic front brake pad set offering exceptional stopping power, whisper-quiet braking, and ultra-low brake dust buildup.',
    'The AutoGenuine Front Ceramic Brake Pad Set is engineered to exceed OEM standards. Designed with high-density ceramic friction formulation, these pads provide reliable braking response across diverse temperatures while reducing rotor wear.',
    '2 Years / 40,000 km Warranty'
),
(
    2, 'toyota-oil-filter', 'AG-FLT-1022', '90915-YZZE1 / 90915-10003',
    'Toyota Genuine Engine Oil Filter', 3, 'Toyota OEM Japan', 'Japan',
    1250.00, 1600.00, 22, 5.0, 18, 45, TRUE, 'images/oil-filter.jpg',
    'Authentic factory OEM engine oil filter designed to trap microscopic contaminants, maintain optimal oil pressure, and ensure maximum engine lifespan.',
    'Keep your Toyota engine running at peak efficiency with this Genuine Toyota Oil Filter. Featuring precision micro-pore filtration and a silicone anti-drainback valve.',
    '1 Year / 10,000 km Service Warranty'
),
(
    3, 'premium-air-filter', 'AG-FLT-2084', '17801-21050 / 17801-0M020',
    'High-Flow Engine Air Filter', 3, 'Denso OEM Japan', 'Japan',
    2150.00, 2750.00, 22, 4.8, 9, 24, TRUE, 'images/air-filter.jpg',
    'Multi-layer synthetic air filter providing up to 99% dust filtration efficiency, improved airflow for responsive acceleration and enhanced fuel economy.',
    'Protect your vehicle engine intake from abrasive sand, dust, and pollen with the Denso OEM High-Flow Engine Air Filter.',
    '1 Year / 20,000 km Warranty'
),
(
    4, 'car-battery', 'AG-BAT-6012', 'DIN60 / 55D23L / MF60',
    'Exide Matrix Car Battery 60Ah', 4, 'Exide Industries', 'India / Sri Lanka',
    32500.00, 36000.00, 10, 4.9, 15, 8, TRUE, 'images/car-battery.jpg',
    'Maintenance-free heavy-duty 60Ah sealed automotive battery with advanced silver-calcium alloy plates and exceptional cranking power in tropical conditions.',
    'The Exide Matrix 60Ah battery is engineered specifically for harsh tropical climates and daily start-stop driving.',
    '30 Months Replacement Warranty'
),
(
    5, 'disc-brake-rotors', 'AG-BRK-8033', '43512-12710 / 43512-02250',
    'Ventilated Front Disc Brake Rotors Pair', 2, 'Brembo / Dixcel Genuine', 'Italy / Japan',
    14800.00, 18500.00, 20, 5.0, 8, 10, TRUE, 'images/brake.jpg',
    'Precision-balanced pair of ventilated front disc brake rotors with anti-rust coating, designed for maximum thermal dissipation and warp-resistant braking.',
    'Restore factory stopping precision with Brembo Ventilated Front Brake Rotors. Cast with high-carbon gray iron for superior heat dissipation.',
    '2 Years / 50,000 km Warranty'
),
(
    6, 'cabin-air-filter', 'AG-FLT-3091', '87139-30040 / 87139-0K010',
    'Activated Carbon Cabin AC Filter', 3, 'Denso OEM / Bosch', 'Japan / Germany',
    1850.00, 2400.00, 23, 4.8, 11, 30, TRUE, 'images/filter.jpg',
    'Multi-layer activated charcoal cabin AC filter that purifies vehicle interior air by trapping PM2.5 dust, diesel soot, pollen, and eliminating AC odors.',
    'Breathe clean and fresh air inside your car cabin with this Activated Carbon Cabin AC Filter.',
    '1 Year / 15,000 km Warranty'
),
(
    7, 'amaron-battery', 'AG-BAT-7088', '80D26L / 85D26L / PRO-70',
    'Amaron Pro Heavy Duty 70Ah Battery', 4, 'Amaron Genuine (Johnson Controls)', 'India / USA',
    36800.00, 41500.00, 11, 5.0, 16, 6, TRUE, 'images/battery.jpg',
    'Zero-maintenance 70Ah heavy-duty automotive battery engineered with patented Silven-X alloy grids for ultra-long lifespan in commercial vehicles & SUVs.',
    'Built for extreme endurance, the Amaron Pro 70Ah delivers class-leading Cold Cranking Amps (580 CCA).',
    '36 Months Replacement Warranty'
),
(
    8, 'timing-belt-kit', 'AG-ENG-5021', '13568-19106 / 16100-19235',
    'Engine Timing Belt & Water Pump Complete Kit', 1, 'Gates / Aisin Japan Genuine', 'Japan / USA',
    24500.00, 29800.00, 18, 4.9, 14, 9, TRUE, 'images/engine.jpg',
    'Complete OEM engine overhaul timing kit including high-strength aramid timing belt, tensioner pulley, idler bearings, and heavy-duty water pump with gasket.',
    'Ensure total engine reliability and avoid valve-to-piston collision with the AutoGenuine Complete Timing Belt & Water Pump Overhaul Kit.',
    '2 Years / 100,000 km Warranty'
),
(
    9, 'led-headlights', 'AG-LGT-9014', 'H4 / H11 / HB3 LED 6500K',
    'Super White High-Power LED Headlight Kit', 5, 'Philips / Osram Genuine', 'Germany / Japan',
    8900.00, 11500.00, 23, 4.9, 21, 15, TRUE, 'images/lights.jpg',
    'High-lumen 6500K crystal white LED headlight conversion kit featuring aviation aluminum heatsinks and active turbo cooling fans for superior night visibility.',
    'Upgrade nighttime road safety with the Super White High-Power LED Headlight Conversion Kit producing 12,000 Lumens per pair.',
    '18 Months Replacement Warranty'
);

-- 3. Insert Product Features
INSERT INTO product_features (product_id, feature_text, display_order) VALUES
(1, 'Premium low-dust ceramic friction formulation', 1),
(1, 'Pre-fitted multi-layer anti-squeal shims', 2),
(1, 'Chamfered & slotted for enhanced thermal dissipation', 3),
(1, '100% Asbestos-free environmentally safe materials', 4),
(1, 'Includes acoustic wear sensor clips and brake grease', 5),

(2, 'Multi-fiber high-efficiency micro filtration media', 1),
(2, 'Durable silicone anti-drainback valve maintains oil pressure', 2),
(2, 'Pre-lubricated high-temperature synthetic O-ring seal', 3),
(2, 'Heavy-gauge steel canister resists pressure spikes', 4),

(3, 'Pleated synthetic micro-fiber filtration captures 99% of dust', 1),
(3, 'Optimal airflow geometry enhances horsepower and throttle response', 2),
(3, 'Polyurethane flexible sealing gasket prevents unfiltered air leaks', 3),
(3, 'Extended 20,000 km replacement service life', 4),

(4, 'Patented Silver-Alloy matrix technology for extended battery life', 1),
(4, 'Magic Eye built-in state-of-charge indicator', 2),
(4, 'Factory charged and factory sealed zero maintenance', 3),
(4, 'High cold cranking power (520 CCA) for instant morning start', 4),

(5, 'Double disc-ground friction surface for instant pad bedding', 1),
(5, 'Directional internal curved vanes maximize heat cooling', 2),
(5, 'Anti-corrosion Geomet zinc coating prevents edge rust', 3),
(5, 'Strict dynamically balanced to eliminate high-speed vibration', 4),

(6, 'Triple-action filtration: Dust + Pollen + Odor absorption', 1),
(6, 'High-grade coconut shell activated charcoal layer', 2),
(6, 'Electrostatically charged micro-fibers trap PM2.5 pollutants', 3),
(6, 'Protects AC evaporator from mold and bacterial buildup', 4),

(7, 'Patented Silven-X alloy grids minimize internal corrosion', 1),
(7, 'High cranking power (580 CCA) for high-displacement diesel engines', 2),
(7, 'BIC vents for superior safety and reduced acid spewing', 3),
(7, '36 Months comprehensive nationwide warranty card included', 4),

(8, 'High-grade HNBR rubber timing belt with aramid tensile cords', 1),
(8, 'Japanese NTN / NSK hydraulic tensioner and idler bearings', 2),
(8, 'Aisin OEM aluminum die-cast water pump with pre-fitted gasket', 3),
(8, 'Front crankshaft and camshaft viton oil seals included', 4),
(8, 'Rated for 100,000 km guaranteed service interval', 5),

(9, '12,000 Lumens ultra-bright 6500K pure white light beam', 1),
(9, '1:1 Halogen filament focal point for sharp cut-off without blinding', 2),
(9, '12,000 RPM high-speed silent dual-ball bearing turbo fan', 3),
(9, 'IP68 waterproof and dustproof sealed aluminum aviation casing', 4);

-- 4. Insert Technical Specifications
INSERT INTO product_specifications (product_id, spec_name, spec_value) VALUES
(1, 'Part Position', 'Front Axle (Left & Right Pair)'),
(1, 'Material', 'Premium Ceramic Composite'),
(1, 'Thickness', '17.5 mm'),
(1, 'Width', '131.5 mm'),
(1, 'Height', '57.2 mm'),
(1, 'Wear Indicator', 'Acoustic Wear Warning Sensor'),

(2, 'Filter Type', 'Spin-on Full-Flow Engine Oil Filter'),
(2, 'Thread Size', '3/4"-16 UNF'),
(2, 'Outer Diameter', '65 mm'),
(2, 'Height', '75 mm'),
(2, 'Filtration Rating', '10 Microns Nominal'),
(2, 'By-Pass Valve', 'Integrated 1.0 Bar Relief Valve'),

(3, 'Filter Media', 'Multi-layer Non-woven Synthetic Fiber'),
(3, 'Length', '241 mm'),
(3, 'Width', '176 mm'),
(3, 'Height', '53 mm'),
(3, 'Frame Material', 'Molded Polyurethane Elastomer'),

(4, 'Battery Capacity', '60 Ah (Ampere-hours)'),
(4, 'Voltage', '12 Volts'),
(4, 'Cold Cranking Amps (CCA)', '520 A @ -18°C'),
(4, 'Dimensions (L x W x H)', '232 mm x 173 mm x 225 mm'),
(4, 'Terminal Type', 'Standard JIS Top Post (Left Polarity)'),

(5, 'Rotor Type', 'Ventilated Front Disc Rotor Pair'),
(5, 'Outer Diameter', '275 mm'),
(5, 'Nominal Thickness', '22.0 mm (Min Wear Limit: 19.0 mm)'),
(5, 'Bolt Hole Count', '5 Holes (PCD 100 mm / 114.3 mm)'),
(5, 'Centering Diameter', '55.0 mm'),

(6, 'Filter Type', 'Activated Carbon AC Cabin Filter'),
(6, 'Length', '215 mm'),
(6, 'Width', '194 mm'),
(6, 'Height', '29 mm'),
(6, 'Particulate Removal', 'PM2.5 (99.2% Efficiency)'),

(7, 'Battery Capacity', '70 Ah (Ampere-hours)'),
(7, 'Voltage', '12 Volts'),
(7, 'Cold Cranking Amps (CCA)', '580 A @ -18°C'),
(7, 'Dimensions (L x W x H)', '260 mm x 173 mm x 225 mm'),
(7, 'Weight', '17.9 kg'),

(8, 'Kit Components', 'Timing Belt + Tensioner Pulley + Idler + Water Pump + Seals'),
(8, 'Belt Tooth Count', '163 Teeth'),
(8, 'Belt Width', '27 mm'),
(8, 'Material', 'HNBR (Hydrogenated Nitrile) + Aramid Tensile Cords'),
(8, 'Service Interval', 'Replace every 100,000 km'),

(9, 'Luminous Flux', '12,000 Lumens per Pair (6,000 LM/bulb)'),
(9, 'Color Temperature', '6500K Crystal Diamond White'),
(9, 'Power Wattage', '55W per bulb (110W per kit)'),
(9, 'Operating Voltage', 'DC 9V - 32V (Fits 12V and 24V Vehicles)'),
(9, 'Operating Life', '> 50,000 Hours');

-- 5. Insert Vehicle Compatibility Records (Fitment Engine)
INSERT INTO vehicle_compatibility (product_id, make, model, years_compatible, engine_code) VALUES
(1, 'Toyota', 'Corolla (Axio / Fielder / Altis)', '2007 - 2021', '1.5L / 1.8L (1NZ-FE, 2ZR-FE)'),
(1, 'Toyota', 'Premio / Allion (NZT260, ZRT260)', '2007 - 2020', '1.5L / 1.8L (1NZ-FE, 2ZR-FAE)'),
(1, 'Toyota', 'Yaris / Vitz (KSP130, NSP130)', '2011 - 2020', '1.0L / 1.3L (1KR-FE, 1NR-FE)'),
(1, 'Honda', 'Vezel / Fit / Grace', '2014 - 2021', '1.5L i-VTEC / Hybrid (LEB, L15B)'),

(2, 'Toyota', 'Premio / Allion (NZT260, ZRT260)', '2001 - 2021', '1.5L / 1.8L / 2.0L Petrol'),
(2, 'Toyota', 'Corolla Axio / Fielder (NZE141, NZE161)', '2006 - 2022', '1.5L (1NZ-FE, 1NZ-FXE Hybrid)'),
(2, 'Toyota', 'Vitz / Yaris / Aqua (NHP10, KSP130)', '2005 - 2022', '1.0L / 1.3L / 1.5L Hybrid'),
(2, 'Toyota', 'RAV4 / Camry / Harrier 2.0L', '2006 - 2020', '2.0L (3ZR-FAE)'),

(3, 'Toyota', 'Corolla Axio / Fielder (NZE141, NZE144)', '2006 - 2012', '1.5L (1NZ-FE)'),
(3, 'Toyota', 'Premio / Allion (NZT260, ZRT260)', '2007 - 2016', '1.5L / 1.8L (1NZ-FE, 2ZR-FE)'),
(3, 'Toyota', 'Vitz / Belta / Ractis (NCP91, NCP100)', '2005 - 2013', '1.3L / 1.5L (2SZ-FE, 1NZ-FE)'),

(4, 'Toyota', 'Premio / Allion / Axio / Fielder', '2007 - 2021', '1.5L / 1.8L Petrol'),
(4, 'Honda', 'Civic / Accord / Vezel Petrol', '2006 - 2021', '1.5L / 1.8L / 2.0L i-VTEC'),
(4, 'Nissan', 'X-Trail / Tiida / Sylphy / Teana', '2008 - 2021', '1.5L / 2.0L Petrol'),
(4, 'Mazda', 'Mazda 3 / Mazda 6 / CX-5', '2012 - 2021', '2.0L SkyActiv-G'),

(5, 'Toyota', 'Premio / Allion (NZT260, ZRT260)', '2007 - 2020', '1.5L / 1.8L (NZT260 / ZRT260)'),
(5, 'Toyota', 'Corolla Axio / Fielder (NZE141, NZE161)', '2006 - 2021', '1.5L (1NZ-FE / 1NZ-FXE)'),
(5, 'Toyota', 'Prius 3rd Gen (ZVW30)', '2009 - 2015', '1.8L Hybrid (2ZR-FXE)'),

(6, 'Toyota', 'Premio / Allion (NZT260, ZRT260, ZRT261)', '2007 - 2021', 'All Engines'),
(6, 'Toyota', 'Corolla Axio / Fielder / Altis (E140, E160)', '2006 - 2022', 'All Engines'),
(6, 'Toyota', 'Land Cruiser Prado / Hilux / Fortuner', '2009 - 2022', '2.7L / 2.8L / 3.0L / 4.0L'),
(6, 'Lexus', 'RX350 / RX450h / CT200h / IS250', '2009 - 2021', 'All Hybrid & Petrol'),

(7, 'Toyota', 'Hilux / Prado / Fortuner / Land Cruiser / HiAce', '2005 - 2023', '2.4L / 2.7L / 2.8L / 3.0L D-4D'),
(7, 'Mitsubishi', 'Montero / Pajero Sport / L200 Triton', '2006 - 2022', '2.5L / 3.2L DI-D & 3.0L V6'),
(7, 'Nissan', 'Navara / Patrol / X-Trail Diesel', '2007 - 2021', '2.0L / 2.5L dCi'),

(8, 'Toyota', 'Prado 120 / 150 / Hilux / HiAce (1KD, 2KD)', '2002 - 2021', '2.5L / 3.0L D-4D Turbo Diesel'),
(8, 'Toyota', 'Land Cruiser 100 / 200 (1HD-FTE, 1HZ)', '1998 - 2018', '4.2L Turbo Diesel'),
(8, 'Mitsubishi', 'Pajero / L200 (4D56, 4M41)', '2000 - 2018', '2.5L / 3.2L Diesel'),

(9, 'Toyota', 'HiAce / Hilux / Axio / Premio / Vitz (H4/H11)', '2000 - 2022', 'Halogen Headlight Housing'),
(9, 'Honda', 'Fit / Grace / Vezel / Civic (H4/H11)', '2005 - 2021', 'All Halogen Variants'),
(9, 'Nissan', 'X-Trail / Tiida / Caravan / Navara (H4/H11)', '2002 - 2021', 'All Halogen Variants'),
(9, 'Suzuki', 'Swift / Alto / WagonR / Every (H4)', '2008 - 2022', 'Standard H4 Bulb Socket');

-- 6. Insert Product Gallery Images
INSERT INTO product_gallery (product_id, image_url, display_order) VALUES
(1, 'images/brake-pad.jpg', 1),
(2, 'images/oil-filter.jpg', 1),
(3, 'images/air-filter.jpg', 1),
(4, 'images/car-battery.jpg', 1),
(5, 'images/brake.jpg', 1),
(6, 'images/filter.jpg', 1),
(7, 'images/battery.jpg', 1),
(8, 'images/engine.jpg', 1),
(9, 'images/lights.jpg', 1);

-- 7. Insert Demo Users (Passwords: Kasun: '123', Dilshan: '123', Admin: 'admin123')
INSERT INTO users (user_id, full_name, email, phone, password_hash, registered_vehicle, role) VALUES
(1, 'Kasun Dharmasena', 'kasun@gmail.com', '0771234567', '$2y$10$wcV7GJBDw9Y2uzYoBHRAqum58qjH9mO15p9Y1fG7k1Vq1hK3W3g3C', 'Toyota Premio NZT260 (2016)', 'customer'),
(2, 'Dilshan Fernando', 'dilshan@gmail.com', '0719876543', '$2y$10$wcV7GJBDw9Y2uzYoBHRAqum58qjH9mO15p9Y1fG7k1Vq1hK3W3g3C', 'Honda Vezel RU1 (2017)', 'customer'),
(3, 'Admin Specialist', 'admin@autogenuine.lk', '0112345678', '$2y$10$Zm8moeSw4p9Ff3iCHq1kBuN345kZ788dJ413X6r7wG6t5Q8Y8u0lC', 'Showroom Fleet', 'admin');

-- 8. Insert User Addresses
INSERT INTO user_addresses (user_id, address_line, city, district, postal_code, is_default) VALUES
(1, 'No 45, Temple Road, Nawala', 'Rajagiriya', 'Colombo', '10107', TRUE),
(2, 'No 12/A, Beach Road', 'Negombo', 'Gampaha', '11500', TRUE);

-- 9. Insert Promo Coupons
INSERT INTO coupons (coupon_id, code, discount_percent, min_order_amount, valid_from, valid_to, is_active) VALUES
(1, 'WELCOME10', 10, 0.00, '2026-01-01', '2027-12-31', TRUE),
(2, 'FLASH15', 15, 5000.00, '2026-06-01', '2026-12-31', TRUE);

-- 10. Insert Sample Orders
INSERT INTO orders (
    order_id, order_reference, user_id, customer_name, customer_phone,
    delivery_address, city, district, payment_method, payment_status,
    subtotal, coupon_id, discount_amount, shipping_fee, total_amount,
    vehicle_notes, order_status, order_date
) VALUES
(
    1, '#AG-84920', 1, 'Kasun Dharmasena', '0771234567',
    'No 45, Temple Road, Nawala', 'Rajagiriya', 'Colombo',
    'Cash on Delivery', 'Pending',
    5750.00, 1, 575.00, 0.00, 5175.00,
    'Toyota Premio NZT260 (2016) 1.5L', 'Processing Dispatch', '2026-09-07 14:30:00'
);

-- 11. Insert Sample Order Line Items
INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity, subtotal) VALUES
(1, 1, 'Front Ceramic Brake Pad Set', 4500.00, 1, 4500.00),
(1, 2, 'Toyota Genuine Engine Oil Filter', 1250.00, 1, 1250.00);

-- 12. Insert Product Customer Reviews
INSERT INTO product_reviews (product_id, user_id, author_name, avatar_initials, location, rating, title, comment, is_verified_purchase) VALUES
(1, 1, 'Kasun Dharmasena', 'KD', 'Colombo', 5, 'Superb braking power & no noise!', 'I installed these on my Premio NZT260 last week. The braking feel is smooth and progressive with absolutely no squeaking or wheel dust. OEM fit was 100% exact.', TRUE),
(1, NULL, 'Nuwan Pradeep', 'NP', 'Kandy', 5, 'Original Brembo Quality', 'Shipped in 24 hours to Kandy. The box was sealed with genuine hologram. Noticeable improvement over worn factory pads.', TRUE),
(2, 2, 'Dilshan Fernando', 'DF', 'Negombo', 5, 'Authentic Toyota Filter', 'Genuine Japanese filter. Checked the relief valve and micro-pores. Keeps my 1NZ-FE engine oil crystal clean.', TRUE),
(4, NULL, 'Sanjeewa Kumara', 'SK', 'Kurunegala', 5, 'Instant start on my Hilux', 'Amaron battery arrived fully charged with a 3-year stamped warranty card. Excellent service.', TRUE);

-- 13. Insert Part Quotation Inquiries
INSERT INTO part_quotations (quotation_reference, user_id, customer_name, phone, vehicle_make_model, manufacturing_year, chassis_vin, parts_details, status) VALUES
('#QUOT-7391', 1, 'Kasun Dharmasena', '0771234567', 'Toyota Premio NZT260', '2016', 'NZT260-0048192', 'Need front shock absorber pair (KYB Excel-G) and lower suspension ball joints.', 'Pending Review'),
('#QUOT-8412', 2, 'Dilshan Fernando', '0719876543', 'Honda Vezel RU1', '2017', 'RU1-1029384', 'Require dual-clutch transmission fluid (DW-1) and OEM cabin air filter.', 'Quoted');

-- 14. Insert Blog Articles
INSERT INTO blog_articles (
    article_id, title, category, author, read_time, image_url, excerpt, content_html, related_product_id
) VALUES
(
    1, 'How to Choose the Right Brake Parts', 'Maintenance', 'Eng. Samantha Silva (Automotive Specialist)', '4 min read',
    'images/brake.jpg',
    'Simple tips for selecting suitable brake pads and disc rotors for your vehicle to guarantee stopping power and passenger safety.',
    '<p>Brakes are arguably the most critical safety system on any vehicle. When driving under tropical weather conditions and heavy traffic in Sri Lanka, having optimal stopping performance is non-negotiable.</p><h4>1. Ceramic vs. Semi-Metallic Brake Pads</h4><p>Ceramic pads eliminate black brake dust, reduce rotor wear, and provide progressive stopping power.</p>',
    1
),
(
    2, 'Why Genuine Parts Matter For Engine Longevity', 'Tips & Guide', 'Ruwan Wickramasinghe (Senior Mechanical Tech)', '5 min read',
    'images/engine.jpg',
    'Learn why counterfeit parts compromise engine reliability, fuel efficiency, and void your warranty protection.',
    '<p>Counterfeit automotive parts pose catastrophic risks. Substandard rubber in timing belts can snap prematurely, causing pistons to collide with valves resulting in engine overhaul costs exceeding Rs. 250,000.</p>',
    8
),
(
    3, 'When Should You Replace Your Vehicle Filters?', 'Service Guide', 'Kasun Jayasundara (Fleet Maintenance Lead)', '3 min read',
    'images/filter.jpg',
    'A practical guide to engine oil, air intake, and cabin AC filter replacement intervals under dusty road conditions.',
    '<p>Filters are the lungs and kidneys of your vehicle. Neglecting filter replacements causes increased fuel consumption, sluggish acceleration, and foul cabin AC odors.</p>',
    2
);

-- =============================================================================
-- END OF DATABASE SCRIPT
-- =============================================================================
