// admin.js - AutoGenuine Administrator Dashboard & Control Center Engine

let currentAdminTab = "overview";

document.addEventListener("DOMContentLoaded", function () {
    // 1. Check Admin Authentication
    checkAdminSecurity();

    // 2. Setup Navigation Listeners
    setupSidebarNav();

    // 3. Live Clock & Mobile Toggle
    startLiveClock();
    setupMobileSidebar();

    // 4. Initialize Theme Toggle
    initAdminTheme();

    // 5. Listen for Live MySQL Database sync events
    window.addEventListener('autogenuine:dbsynced', function() {
        if (isAdminAuthenticated()) {
            initDashboardData();
        }
    });
});

// ==========================================
// 1. ADMIN AUTHENTICATION & LOCKSCREEN
// ==========================================
function checkAdminSecurity() {
    const isAuth = isAdminAuthenticated();
    const lockscreen = document.getElementById("adminLockscreen");
    const adminApp = document.getElementById("adminApp");

    if (isAuth) {
        if (lockscreen) lockscreen.classList.remove("active");
        if (adminApp) adminApp.style.display = "flex";
        initDashboardData();
    } else {
        if (adminApp) adminApp.style.display = "none";
        if (lockscreen) lockscreen.classList.add("active");

        const user = getCurrentUser();
        const loginStep = document.getElementById("lockscreenLoginForm");
        const pinStep = document.getElementById("lockscreenPinForm");

        if (user && user.role === "admin") {
            if (loginStep) loginStep.style.display = "none";
            if (pinStep) pinStep.style.display = "block";
            const nameEl = document.getElementById("lockAdminName");
            const emailEl = document.getElementById("lockAdminEmail");
            if (nameEl) nameEl.textContent = user.name;
            if (emailEl) emailEl.textContent = user.email;
            setTimeout(() => document.getElementById("lockPinInput")?.focus(), 200);
        } else {
            if (loginStep) loginStep.style.display = "block";
            if (pinStep) pinStep.style.display = "none";
        }
    }
}

async function handleLockscreenLogin(e) {
    e.preventDefault();
    const email = document.getElementById("lockEmail").value.trim();
    const pass = document.getElementById("lockPassword").value.trim();

    const submitBtn = e.target.querySelector("button[type='submit']");
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Verifying Credentials...";
    }

    try {
        const res = await loginUser(email, pass);
        if (res.success) {
            if (res.user.role === "admin") {
                document.getElementById("lockscreenLoginForm").style.display = "none";
                document.getElementById("lockscreenPinForm").style.display = "block";
                document.getElementById("lockAdminName").textContent = res.user.name;
                document.getElementById("lockAdminEmail").textContent = res.user.email;
                setTimeout(() => document.getElementById("lockPinInput")?.focus(), 200);
            } else {
                alert("⚠️ Access Denied: This account does not have Administrator privileges.");
            }
        } else {
            alert(res.message);
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Verify Administrator Access →";
        }
    }
}
window.handleLockscreenLogin = handleLockscreenLogin;

async function handleLockscreenPin(e) {
    e.preventDefault();
    const pin = document.getElementById("lockPinInput").value.trim();
    const res = await verifyAdminPin(pin);

    if (res.success) {
        showAdminToast("Access Granted 🛡️", res.message);
        checkAdminSecurity();
    } else {
        alert(res.message);
        const pinInput = document.getElementById("lockPinInput");
        if (pinInput) {
            pinInput.value = "";
            pinInput.focus();
        }
    }
}
window.handleLockscreenPin = handleLockscreenPin;

async function quickFillAdminCredentials() {
    const loginStep = document.getElementById("lockscreenLoginForm");
    const pinStep = document.getElementById("lockscreenPinForm");

    if (loginStep && loginStep.style.display !== "none") {
        document.getElementById("lockEmail").value = "admin@autogenuine.lk";
        document.getElementById("lockPassword").value = "admin123";
        // Auto authenticate step 1
        const res = await loginUser("admin@autogenuine.lk", "admin123");
        if (res.success) {
            loginStep.style.display = "none";
            pinStep.style.display = "block";
            document.getElementById("lockPinInput").value = "8899";
            setTimeout(() => document.getElementById("lockPinInput")?.focus(), 150);
        }
    } else {
        document.getElementById("lockPinInput").value = "8899";
        // Auto submit PIN
        const res = await verifyAdminPin("8899");
        if (res.success) {
            showAdminToast("Demo Admin Unlocked 🛡️", "Signed in as Administrator with PIN 8899");
            checkAdminSecurity();
        }
    }
}
window.quickFillAdminCredentials = quickFillAdminCredentials;

function handleAdminLogout() {
    if (confirm("Are you sure you want to sign out of the Administrator session?")) {
        logoutUser();
        window.location.reload();
    }
}
window.handleAdminLogout = handleAdminLogout;

// ==========================================
// 2. DASHBOARD INITIALIZATION & NAVIGATION
// ==========================================
function initDashboardData() {
    renderOverview();
    renderProductsTable();
    renderOrdersTable();
    renderQuotesTable();
    renderCustomersTable();
    renderCouponsTable();
    updateSidebarBadges();
}

function setupSidebarNav() {
    const navButtons = document.querySelectorAll(".sidebar-nav .nav-item");
    navButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const tab = this.getAttribute("data-tab");
            if (tab) switchAdminTab(tab);
        });
    });
}

function switchAdminTab(tabName) {
    currentAdminTab = tabName;

    // Update Nav Buttons
    document.querySelectorAll(".sidebar-nav .nav-item").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    // Update Views
    document.querySelectorAll(".admin-tab-view").forEach(view => {
        view.classList.remove("active");
    });
    const targetView = document.getElementById(`tab-${tabName}`);
    if (targetView) targetView.classList.add("active");

    // Update Titles
    const titles = {
        "overview": { title: "Dashboard Overview", sub: "Real-time store metrics, inventory alerts, and order dispatch management" },
        "products": { title: "Spare Parts Inventory", sub: "Add, modify, track stock, and manage genuine parts catalog" },
        "orders": { title: "Customer Orders & Dispatch", sub: "Track live customer orders, update delivery status, and view invoices" },
        "quotations": { title: "Part Quotation Requests", sub: "Review customer VIN/Chassis part inquiries and quote prices" },
        "customers": { title: "Registered Customer Accounts", sub: "Directory of registered drivers, vehicles, and order history" },
        "coupons": { title: "Promo Coupons & Discounts", sub: "Create seasonal discount codes and manage coupon activations" },
        "system": { title: "System & Demo Configuration", sub: "Reset catalog to defaults and inspect relational database schema" }
    };

    const current = titles[tabName] || titles["overview"];
    document.getElementById("pageTitle").textContent = current.title;
    document.getElementById("pageSubtitle").textContent = current.sub;

    // Refresh view specific data
    if (tabName === "overview") renderOverview();
    if (tabName === "products") renderProductsTable();
    if (tabName === "orders") renderOrdersTable();
    if (tabName === "quotations") renderQuotesTable();
    if (tabName === "customers") renderCustomersTable();
    if (tabName === "coupons") renderCouponsTable();
    updateSidebarBadges();

    // Close mobile sidebar if open
    document.querySelector(".admin-sidebar")?.classList.remove("mobile-open");
}
window.switchAdminTab = switchAdminTab;

function updateSidebarBadges() {
    const products = getAllProducts();
    const orders = getOrdersHistory();
    const quotes = getQuotationsList();

    const pBadge = document.getElementById("sidebarProductCount");
    const oBadge = document.getElementById("sidebarOrderCount");
    const qBadge = document.getElementById("sidebarQuoteCount");

    if (pBadge) pBadge.textContent = products.length;
    if (oBadge) oBadge.textContent = orders.length;
    if (qBadge) qBadge.textContent = quotes.length;
}

// ==========================================
// 3. OVERVIEW & METRICS RENDERER
// ==========================================
function renderOverview() {
    const products = getAllProducts();
    const orders = getOrdersHistory();
    const quotes = getQuotationsList();

    // Calculate Total Revenue from all orders
    const totalRev = orders.reduce((sum, o) => sum + (parseFloat(o.total) || 0), 0);
    const pendingOrdersCount = orders.filter(o => o.status === "Processing Dispatch" || !o.status).length;
    const pendingQuotesCount = quotes.filter(q => q.status === "Pending Review" || !q.status).length;

    document.getElementById("kpiTotalRevenue").textContent = `Rs. ${formatPrice(totalRev)}`;
    document.getElementById("kpiTotalProducts").textContent = products.length;
    document.getElementById("kpiTotalOrders").textContent = orders.length;
    document.getElementById("kpiPendingOrders").textContent = `${pendingOrdersCount} Processing`;
    document.getElementById("kpiTotalQuotes").textContent = quotes.length;
    document.getElementById("kpiPendingQuotes").textContent = `${pendingQuotesCount} Pending`;

    // Render Recent Orders List
    const recentOrdersContainer = document.getElementById("dashboardRecentOrders");
    if (recentOrdersContainer) {
        if (orders.length === 0) {
            recentOrdersContainer.innerHTML = `<p class="text-muted" style="padding:15px; color:var(--text-muted);">No orders placed yet.</p>`;
        } else {
            recentOrdersContainer.innerHTML = orders.slice(0, 4).map(o => `
                <div class="recent-order-item">
                    <div class="recent-order-info">
                        <strong>${o.orderId} • ${o.customerName || 'Customer'}</strong>
                        <small>${o.date} • ${o.itemCount || 1} items (${o.paymentMethod || 'COD'})</small>
                    </div>
                    <div class="recent-order-meta">
                        <span class="order-price">Rs. ${formatPrice(o.total)}</span>
                        <span class="stock-pill ${getStatusPillClass(o.status)}">${o.status || 'Processing'}</span>
                    </div>
                </div>
            `).join("");
        }
    }

    // Render Stock Alerts List
    const stockAlertsContainer = document.getElementById("dashboardStockAlerts");
    if (stockAlertsContainer) {
        const lowStock = products.filter(p => p.stockCount <= 10 || !p.inStock);
        if (lowStock.length === 0) {
            stockAlertsContainer.innerHTML = `<p class="text-muted" style="padding:15px; color:var(--accent);">✓ All inventory items are well-stocked.</p>`;
        } else {
            stockAlertsContainer.innerHTML = lowStock.map(p => `
                <div class="stock-alert-item">
                    <img src="${p.mainImage}" alt="${p.name}" class="stock-alert-img" onerror="this.src='images/engine.jpg'">
                    <div class="stock-alert-info">
                        <strong>${p.name}</strong>
                        <small>SKU: ${p.sku} • OEM: ${p.oemNumber}</small>
                    </div>
                    <span class="stock-pill ${p.stockCount <= 0 ? 'out' : 'low'}">
                        ${p.stockCount <= 0 ? 'Out of Stock' : `${p.stockCount} left`}
                    </span>
                </div>
            `).join("");
        }
    }
}

function getStatusPillClass(status) {
    if (!status) return "low";
    const s = status.toLowerCase();
    if (s.includes("delivered") || s.includes("completed")) return "good";
    if (s.includes("shipped") || s.includes("quoted")) return "low";
    if (s.includes("cancel") || s.includes("declined")) return "out";
    return "low";
}

// ==========================================
// 4. PRODUCTS INVENTORY CRUD OPERATIONS
// ==========================================
function renderProductsTable() {
    const tableBody = document.getElementById("adminProductsTableBody");
    if (!tableBody) return;

    const query = (document.getElementById("productSearchInput")?.value || "").toLowerCase().trim();
    const category = document.getElementById("productCategoryFilter")?.value || "all";

    let products = getAllProducts();

    if (category !== "all") {
        products = products.filter(p => 
            p.categorySlug?.toLowerCase() === category.toLowerCase() || 
            p.category?.toLowerCase().includes(category.toLowerCase())
        );
    }

    if (query) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.oemNumber?.toLowerCase().includes(query) ||
            p.sku?.toLowerCase().includes(query) ||
            p.brand?.toLowerCase().includes(query)
        );
    }

    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No products matching your search query.</td></tr>`;
        return;
    }

    tableBody.innerHTML = products.map(p => `
        <tr>
            <td>
                <img src="${p.mainImage}" alt="${p.name}" class="table-product-thumb" onerror="this.src='images/engine.jpg'">
            </td>
            <td class="part-title-cell">
                <strong>${p.name}</strong>
                <small>SKU: ${p.sku} | Brand: ${p.brand}</small>
            </td>
            <td>
                <span class="category-tag">${p.category}</span>
            </td>
            <td>
                <code style="font-size:0.82rem; color:var(--accent-orange);">${p.oemNumber}</code>
            </td>
            <td>
                <strong>Rs. ${formatPrice(p.price)}</strong>
                ${p.originalPrice > p.price ? `<br><small style="text-decoration:line-through; color:var(--text-dim);">Rs. ${formatPrice(p.originalPrice)}</small>` : ''}
            </td>
            <td>
                <span class="stock-pill ${p.stockCount <= 0 ? 'out' : p.stockCount <= 5 ? 'low' : 'good'}">
                    ${p.stockCount <= 0 ? 'Out of Stock' : `${p.stockCount} Units`}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-tbl-edit" onclick="openEditProductModal('${p.id}')">✏️ Edit</button>
                    <button class="btn-tbl-delete" onclick="handleDeleteProduct('${p.id}', '${escapeQuotes(p.name)}')">🗑️ Delete</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function filterAdminProducts() {
    renderProductsTable();
}
window.filterAdminProducts = filterAdminProducts;

function openAddProductModal() {
    document.getElementById("productModalTitle").textContent = "Add New Spare Part";
    document.getElementById("editProductId").value = "";
    document.getElementById("adminProductForm").reset();
    document.getElementById("prodPresetImageSelect").value = "";
    document.getElementById("productSaveBtn").textContent = "Save Spare Part ➔";
    openModal("adminProductModal");
}
window.openAddProductModal = openAddProductModal;

function openEditProductModal(productId) {
    const product = getProductById(productId);
    if (!product) {
        alert("Product not found!");
        return;
    }

    document.getElementById("productModalTitle").textContent = `Edit Part: ${product.name}`;
    document.getElementById("editProductId").value = product.id;
    document.getElementById("prodName").value = product.name;
    document.getElementById("prodCategory").value = product.category || "Engine Parts";
    document.getElementById("prodOem").value = product.oemNumber || "";
    document.getElementById("prodSku").value = product.sku || "";
    document.getElementById("prodBrand").value = product.brand || "";
    document.getElementById("prodPrice").value = product.price;
    document.getElementById("prodOriginalPrice").value = product.originalPrice || "";
    document.getElementById("prodStock").value = product.stockCount || 0;
    document.getElementById("prodOrigin").value = product.origin || "Japan";
    document.getElementById("prodWarranty").value = product.warranty || "1 Year";
    document.getElementById("prodImage").value = product.mainImage;
    document.getElementById("prodShortDesc").value = product.shortDescription;
    
    // Format compatibility
    const compatStr = Array.isArray(product.compatibility) 
        ? product.compatibility.map(c => `${c.make} ${c.model} (${c.years})`).join("; ")
        : "All compatible models";
    document.getElementById("prodCompatibility").value = compatStr;

    document.getElementById("productSaveBtn").textContent = "Update Spare Part ➔";
    openModal("adminProductModal");
}
window.openEditProductModal = openEditProductModal;

function selectPresetImage(path) {
    if (path) {
        document.getElementById("prodImage").value = path;
    }
}
window.selectPresetImage = selectPresetImage;

function handleProductFormSubmit(e) {
    e.preventDefault();
    const editId = document.getElementById("editProductId").value;
    const name = document.getElementById("prodName").value.trim();
    const category = document.getElementById("prodCategory").value;
    const oemNumber = document.getElementById("prodOem").value.trim();
    const sku = document.getElementById("prodSku").value.trim();
    const brand = document.getElementById("prodBrand").value.trim();
    const price = parseFloat(document.getElementById("prodPrice").value) || 0;
    const originalPrice = parseFloat(document.getElementById("prodOriginalPrice").value) || Math.round(price * 1.2);
    const stockCount = parseInt(document.getElementById("prodStock").value) || 0;
    const origin = document.getElementById("prodOrigin").value.trim() || "Japan";
    const warranty = document.getElementById("prodWarranty").value.trim() || "1 Year";
    const mainImage = document.getElementById("prodImage").value.trim() || "images/engine.jpg";
    const shortDescription = document.getElementById("prodShortDesc").value.trim();
    const compatRaw = document.getElementById("prodCompatibility").value.trim();

    const compatibility = [
        { make: brand || "OEM", model: compatRaw, years: "Applicable Models", engine: "Standard" }
    ];

    const productPayload = {
        name,
        category,
        categorySlug: category.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        oemNumber,
        sku,
        brand,
        price,
        originalPrice,
        stockCount,
        origin,
        warranty,
        mainImage,
        gallery: [mainImage],
        shortDescription,
        compatibility
    };

    if (editId) {
        const res = updateProduct(editId, productPayload);
        if (res.success) {
            showAdminToast("Product Updated", res.message);
            closeModal("adminProductModal");
            renderProductsTable();
            renderOverview();
            updateSidebarBadges();
        } else {
            alert(res.message);
        }
    } else {
        const res = addNewProduct(productPayload);
        if (res.success) {
            showAdminToast("Product Added", res.message);
            closeModal("adminProductModal");
            renderProductsTable();
            renderOverview();
            updateSidebarBadges();
        } else {
            alert(res.message);
        }
    }
}
window.handleProductFormSubmit = handleProductFormSubmit;

function handleDeleteProduct(productId, productName) {
    if (confirm(`Are you sure you want to delete "${productName}" from the spare parts catalog? This action cannot be undone.`)) {
        const res = deleteProduct(productId);
        if (res.success) {
            showAdminToast("Product Removed", `"${productName}" was removed from the store catalog.`);
            renderProductsTable();
            renderOverview();
            updateSidebarBadges();
        } else {
            alert(res.message);
        }
    }
}
window.handleDeleteProduct = handleDeleteProduct;

// ==========================================
// 5. CUSTOMER ORDERS MANAGEMENT
// ==========================================
function renderOrdersTable() {
    const tableBody = document.getElementById("adminOrdersTableBody");
    if (!tableBody) return;

    const query = (document.getElementById("orderSearchInput")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("orderStatusFilter")?.value || "all";

    let orders = getOrdersHistory();

    if (statusFilter !== "all") {
        orders = orders.filter(o => o.status === statusFilter);
    }

    if (query) {
        orders = orders.filter(o => 
            o.orderId.toLowerCase().includes(query) ||
            (o.customerName && o.customerName.toLowerCase().includes(query)) ||
            (o.customerPhone && o.customerPhone.includes(query))
        );
    }

    const countIndicator = document.getElementById("orderCountIndicator");
    if (countIndicator) countIndicator.textContent = `Total Orders: ${orders.length}`;

    if (orders.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">No customer orders found.</td></tr>`;
        return;
    }

    tableBody.innerHTML = orders.map(o => {
        const status = o.status || "Processing Dispatch";
        const statusClass = status === "Shipped" ? "shipped" : status === "Delivered" ? "delivered" : status === "Cancelled" ? "cancelled" : "processing";
        const itemsSummary = o.items ? o.items.map(i => `${i.quantity}x ${i.name}`).join(", ") : `${o.itemCount || 1} Part(s)`;

        return `
            <tr>
                <td><strong>${o.orderId}</strong></td>
                <td><small>${o.date}</small></td>
                <td>
                    <strong>${o.customerName || 'Customer'}</strong><br>
                    <small style="color:var(--text-muted);">${o.customerPhone || '077 123 4567'}</small>
                </td>
                <td style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${itemsSummary}">
                    <small>${itemsSummary}</small>
                </td>
                <td><strong>Rs. ${formatPrice(o.total)}</strong></td>
                <td><small>${o.paymentMethod || 'COD'}</small></td>
                <td>
                    <select class="status-selector ${statusClass}" onchange="handleOrderStatusChange('${o.orderId}', this.value)">
                        <option value="Processing Dispatch" ${status === "Processing Dispatch" ? "selected" : ""}>⏳ Processing Dispatch</option>
                        <option value="Shipped" ${status === "Shipped" ? "selected" : ""}>🚚 Shipped</option>
                        <option value="Delivered" ${status === "Delivered" ? "selected" : ""}>✓ Delivered</option>
                        <option value="Cancelled" ${status === "Cancelled" ? "selected" : ""}>✕ Cancelled</option>
                    </select>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-tbl-view" onclick="openOrderReceipt('${o.orderId}')" title="View Full Itemized Receipt">📄 Invoice</button>
                        <button class="btn-tbl-delete" onclick="handleDeleteOrder('${o.orderId}')" title="Remove Order">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function filterAdminOrders() {
    renderOrdersTable();
}
window.filterAdminOrders = filterAdminOrders;

function handleOrderStatusChange(orderId, newStatus) {
    const res = updateOrderStatus(orderId, newStatus);
    if (res.success) {
        showAdminToast("Order Status Updated", res.message);
        renderOrdersTable();
        renderOverview();
    } else {
        alert(res.message);
    }
}
window.handleOrderStatusChange = handleOrderStatusChange;

function handleDeleteOrder(orderId) {
    if (confirm(`Are you sure you want to delete order ${orderId}?`)) {
        const res = deleteOrder(orderId);
        if (res.success) {
            showAdminToast("Order Removed", res.message);
            renderOrdersTable();
            renderOverview();
            updateSidebarBadges();
        }
    }
}
window.handleDeleteOrder = handleDeleteOrder;

function openOrderReceipt(orderId) {
    const orders = getOrdersHistory();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        alert("Order details not found.");
        return;
    }

    const modalBody = document.getElementById("receiptModalBody");
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="receipt-box">
            <div class="receipt-header-row">
                <div>
                    <h2 style="font-size:1.3rem; color:var(--primary);">AutoGenuine Sri Lanka</h2>
                    <small>Official Order Receipt / Commercial Invoice</small>
                </div>
                <div style="text-align:right;">
                    <strong style="font-size:1.1rem; color:var(--text-main);">${order.orderId}</strong>
                    <p style="font-size:0.8rem; color:var(--text-muted);">${order.date}</p>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px; font-size:0.88rem;">
                <div>
                    <strong>Customer Details:</strong>
                    <p>${order.customerName || 'N/A'}</p>
                    <p>${order.customerEmail || ''}</p>
                    <p>Phone: ${order.customerPhone || 'N/A'}</p>
                </div>
                <div>
                    <strong>Delivery Destination:</strong>
                    <p>${order.address || 'Sri Lanka'}</p>
                    <p>City: ${order.city || 'Colombo'}</p>
                    <p>Payment: <strong>${order.paymentMethod || 'COD'}</strong></p>
                </div>
            </div>

            <div class="receipt-items-list">
                <strong style="font-size:0.9rem; display:block; margin-bottom:8px;">Purchased Spare Parts:</strong>
                ${order.items && order.items.length > 0 
                    ? order.items.map(item => `
                        <div class="receipt-item-line">
                            <span>${item.quantity} × ${item.name}</span>
                            <strong>Rs. ${formatPrice(item.price * item.quantity)}</strong>
                        </div>
                    `).join("")
                    : `<p style="color:var(--text-muted);">Standard Spare Parts Order Package</p>`
                }
            </div>

            <div class="receipt-totals">
                <div class="receipt-total-row">
                    <span>Subtotal:</span>
                    <span>Rs. ${formatPrice(order.subtotal || order.total)}</span>
                </div>
                ${order.discount ? `
                    <div class="receipt-total-row" style="color:var(--accent);">
                        <span>Coupon Discount:</span>
                        <span>- Rs. ${formatPrice(order.discount)}</span>
                    </div>
                ` : ''}
                <div class="receipt-total-row">
                    <span>Shipping Fee:</span>
                    <span>${order.shipping === 0 ? 'FREE' : `Rs. ${formatPrice(order.shipping || 0)}`}</span>
                </div>
                <div class="receipt-total-row grand">
                    <span>Grand Total:</span>
                    <span>Rs. ${formatPrice(order.total)}</span>
                </div>
            </div>

            <div style="margin-top:15px; font-size:0.8rem; color:var(--text-muted); border-top:1px dashed var(--border-accent); padding-top:10px;">
                <p>Status: <strong>${order.status || 'Processing Dispatch'}</strong> | Official Warranty hologram enclosed with parcel.</p>
            </div>
        </div>
    `;

    openModal("adminOrderReceiptModal");
}
window.openOrderReceipt = openOrderReceipt;

// ==========================================
// 6. QUOTATION INQUIRIES MANAGEMENT
// ==========================================
function renderQuotesTable() {
    const tableBody = document.getElementById("adminQuotesTableBody");
    if (!tableBody) return;

    const query = (document.getElementById("quoteSearchInput")?.value || "").toLowerCase().trim();
    const statusFilter = document.getElementById("quoteStatusFilter")?.value || "all";

    let quotes = getQuotationsList();

    if (statusFilter !== "all") {
        quotes = quotes.filter(q => q.status === statusFilter);
    }

    if (query) {
        quotes = quotes.filter(q => 
            q.quoteId.toLowerCase().includes(query) ||
            (q.name && q.name.toLowerCase().includes(query)) ||
            (q.vin && q.vin.toLowerCase().includes(query)) ||
            (q.vehicle && q.vehicle.toLowerCase().includes(query))
        );
    }

    const countIndicator = document.getElementById("quoteCountIndicator");
    if (countIndicator) countIndicator.textContent = `Total Requests: ${quotes.length}`;

    if (quotes.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">No quotation inquiries found.</td></tr>`;
        return;
    }

    tableBody.innerHTML = quotes.map(q => {
        const status = q.status || "Pending Review";
        const statusClass = status === "Completed" ? "delivered" : status === "Quoted" ? "shipped" : status === "Declined" ? "cancelled" : "processing";

        return `
            <tr>
                <td><strong>${q.quoteId}</strong></td>
                <td><small>${q.date || 'Recent'}</small></td>
                <td>
                    <strong>${q.name}</strong><br>
                    <small><a href="tel:${q.phone}" style="color:var(--accent-blue); text-decoration:none;">📞 ${q.phone}</a></small>
                </td>
                <td>
                    <strong>${q.vehicle}</strong><br>
                    <small>Year: ${q.year || 'N/A'}</small>
                </td>
                <td>
                    <code style="font-size:0.8rem; color:var(--accent-orange);">${q.vin || 'Not Provided'}</code>
                </td>
                <td style="max-width:240px; font-size:0.82rem;">
                    ${q.details}
                </td>
                <td>
                    <select class="status-selector ${statusClass}" onchange="handleQuotationStatusChange('${q.quoteId}', this.value)">
                        <option value="Pending Review" ${status === "Pending Review" ? "selected" : ""}>⏳ Pending Review</option>
                        <option value="Quoted" ${status === "Quoted" ? "selected" : ""}>💬 Quoted / Sent</option>
                        <option value="Completed" ${status === "Completed" ? "selected" : ""}>✓ Completed</option>
                        <option value="Declined" ${status === "Declined" ? "selected" : ""}>✕ Declined</option>
                    </select>
                </td>
                <td>
                    <div class="table-actions">
                        <a class="btn-tbl-view" href="https://wa.me/94${q.phone.replace(/^0/, '')}?text=Hello%20${encodeURIComponent(q.name)},%20regarding%20your%20AutoGenuine%20part%20quotation%20request%20${q.quoteId}..." target="_blank" title="WhatsApp Customer">💬 Chat</a>
                        <button class="btn-tbl-delete" onclick="handleDeleteQuote('${q.quoteId}')" title="Delete Quote">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function filterAdminQuotes() {
    renderQuotesTable();
}
window.filterAdminQuotes = filterAdminQuotes;

function handleQuotationStatusChange(quoteId, newStatus) {
    const res = updateQuotationStatus(quoteId, newStatus);
    if (res.success) {
        showAdminToast("Quotation Status Updated", res.message);
        renderQuotesTable();
        renderOverview();
    } else {
        alert(res.message);
    }
}
window.handleQuotationStatusChange = handleQuotationStatusChange;

function handleDeleteQuote(quoteId) {
    if (confirm(`Delete quotation inquiry ${quoteId}?`)) {
        const res = deleteQuotation(quoteId);
        if (res.success) {
            showAdminToast("Quotation Removed", res.message);
            renderQuotesTable();
            renderOverview();
            updateSidebarBadges();
        }
    }
}
window.handleDeleteQuote = handleDeleteQuote;

// ==========================================
// 7. REGISTERED CUSTOMERS DIRECTORY
// ==========================================
function renderCustomersTable() {
    const tableBody = document.getElementById("adminCustomersTableBody");
    if (!tableBody) return;

    const query = (document.getElementById("customerSearchInput")?.value || "").toLowerCase().trim();
    let users = getRegisteredUsers();
    const orders = getOrdersHistory();

    if (query) {
        users = users.filter(u => 
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query) ||
            (u.phone && u.phone.includes(query))
        );
    }

    const countIndicator = document.getElementById("customerCountIndicator");
    if (countIndicator) countIndicator.textContent = `Total Registered: ${users.length}`;

    tableBody.innerHTML = users.map(u => {
        const userOrdersCount = orders.filter(o => o.customerEmail?.toLowerCase() === u.email.toLowerCase()).length;
        const isAdmin = u.role === "admin";

        return `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="width:32px; height:32px; background:${isAdmin ? 'var(--primary)' : 'var(--bg-input)'}; color:${isAdmin ? '#fff' : 'var(--text-main)'}; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.8rem;">
                            ${u.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2)}
                        </span>
                        <strong>${u.name}</strong>
                    </div>
                </td>
                <td><code>${u.email}</code></td>
                <td>${u.phone || '077 123 4567'}</td>
                <td>🚗 ${u.vehicle || 'Standard Vehicle'}</td>
                <td>
                    <span class="stock-pill ${isAdmin ? 'low' : 'good'}">
                        ${isAdmin ? '🛡️ Administrator' : 'Customer'}
                    </span>
                </td>
                <td><small>${u.registeredAt || 'Active'}</small></td>
                <td><strong>${userOrdersCount} Order(s)</strong></td>
            </tr>
        `;
    }).join("");
}

function filterAdminCustomers() {
    renderCustomersTable();
}
window.filterAdminCustomers = filterAdminCustomers;

// ==========================================
// 8. PROMO COUPONS MANAGEMENT
// ==========================================
function renderCouponsTable() {
    const tableBody = document.getElementById("adminCouponsTableBody");
    if (!tableBody) return;

    const coupons = getAvailableCoupons();

    if (coupons.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-muted);">No coupons created yet.</td></tr>`;
        return;
    }

    tableBody.innerHTML = coupons.map(c => `
        <tr>
            <td><strong style="color:var(--primary); letter-spacing:1px; font-size:0.95rem;">${c.code}</strong></td>
            <td><strong>${c.discountPercent}% OFF</strong></td>
            <td>Rs. ${formatPrice(c.minOrder || 0)}</td>
            <td>${c.description || 'Special Discount'}</td>
            <td><small>${c.expiryDate || 'No Expiry'}</small></td>
            <td>
                <span class="stock-pill ${c.active !== false ? 'good' : 'out'}">
                    ${c.active !== false ? '✓ Active' : 'Disabled'}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <button class="btn-tbl-edit" onclick="handleToggleCoupon('${c.code}')">
                        ${c.active !== false ? 'Disable' : 'Enable'}
                    </button>
                    <button class="btn-tbl-delete" onclick="handleDeleteCoupon('${c.code}')">🗑️</button>
                </div>
            </td>
        </tr>
    `).join("");
}

function openAddCouponModal() {
    document.getElementById("adminCouponForm").reset();
    openModal("adminCouponModal");
}
window.openAddCouponModal = openAddCouponModal;

function handleCouponFormSubmit(e) {
    e.preventDefault();
    const code = document.getElementById("couponCodeInput").value.trim();
    const discountPercent = parseInt(document.getElementById("couponDiscountInput").value) || 10;
    const minOrder = parseFloat(document.getElementById("couponMinOrderInput").value) || 0;
    const expiryDate = document.getElementById("couponExpiryInput").value;
    const description = document.getElementById("couponDescInput").value.trim();

    const res = addNewCoupon({ code, discountPercent, minOrder, expiryDate, description, active: true });
    if (res.success) {
        showAdminToast("Coupon Created", res.message);
        closeModal("adminCouponModal");
        renderCouponsTable();
    } else {
        alert(res.message);
    }
}
window.handleCouponFormSubmit = handleCouponFormSubmit;

function handleToggleCoupon(code) {
    const res = toggleCouponStatus(code);
    if (res.success) {
        showAdminToast("Coupon Updated", res.message);
        renderCouponsTable();
    }
}
window.handleToggleCoupon = handleToggleCoupon;

function handleDeleteCoupon(code) {
    if (confirm(`Are you sure you want to delete coupon "${code}"?`)) {
        const res = deleteCoupon(code);
        if (res.success) {
            showAdminToast("Coupon Deleted", res.message);
            renderCouponsTable();
        }
    }
}
window.handleDeleteCoupon = handleDeleteCoupon;

// ==========================================
// 9. SYSTEM RESET CATALOG
// ==========================================
function confirmResetCatalog() {
    if (confirm("Reset catalog to the default 9 genuine spare parts? Any added custom test parts will be removed and initial catalogue restored.")) {
        const res = resetCatalogToDefault();
        showAdminToast("Catalog Reset", res.message);
        renderProductsTable();
        renderOverview();
        updateSidebarBadges();
    }
}
window.confirmResetCatalog = confirmResetCatalog;

// ==========================================
// 10. UTILITIES, CLOCK, THEME & TOAST
// ==========================================
function startLiveClock() {
    const clockEl = document.getElementById("liveClockDisplay");
    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString();
    }
    updateClock();
    setInterval(updateClock, 1000);
}

function setupMobileSidebar() {
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.querySelector(".admin-sidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });
    }
}

function initAdminTheme() {
    const themeBtn = document.getElementById("adminThemeToggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const next = toggleTheme();
            themeBtn.innerHTML = next === "light" 
                ? `<span class="theme-icon">☀️</span> <span class="theme-text">Light</span>` 
                : `<span class="theme-icon">🌙</span> <span class="theme-text">Dark</span>`;
        });
        
        // Initial button label
        const currentTheme = getSavedTheme();
        themeBtn.innerHTML = currentTheme === "light"
            ? `<span class="theme-icon">☀️</span> <span class="theme-text">Light</span>`
            : `<span class="theme-icon">🌙</span> <span class="theme-text">Dark</span>`;
    }
}

function showAdminToast(title, message) {
    const toast = document.getElementById("adminToast");
    const titleEl = document.getElementById("adminToastTitle");
    const msgEl = document.getElementById("adminToastMsg");

    if (!toast || !titleEl || !msgEl) return;

    titleEl.textContent = title;
    msgEl.textContent = message;

    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}
window.showAdminToast = showAdminToast;

function escapeQuotes(str) {
    if (!str) return "";
    return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
