// wishlist.js - AutoGenuine Wishlist Controller

document.addEventListener("DOMContentLoaded", function () {
    renderWishlist();
    initAccountModalLogic();
    initLiveChatWidget();

    // Re-render wishlist when user signs in or signs out
    window.addEventListener("autogenuine:authchanged", () => {
        renderWishlist();
    });
});

function renderWishlist() {
    const grid = document.getElementById("wishlistGrid");
    const emptyCard = document.getElementById("emptyWishlistCard");
    const actionBtns = document.getElementById("wishlistActionBtns");
    const countTitle = document.getElementById("wishlistCountTitle");

    const items = getWishlistProducts();
    const count = items.length;

    if (countTitle) countTitle.textContent = count;

    if (!grid) return;

    if (count === 0) {
        grid.innerHTML = "";
        if (emptyCard) emptyCard.style.display = "block";
        if (actionBtns) actionBtns.style.display = "none";
        return;
    }

    if (emptyCard) emptyCard.style.display = "none";
    if (actionBtns) actionBtns.style.display = "flex";

    grid.innerHTML = items.map(item => `
        <article class="wishlist-card" data-id="${item.id}">
            <button class="btn-remove-wishlist" onclick="handleRemoveWishlistItem('${item.id}')" title="Remove from wishlist" aria-label="Remove">✕</button>
            <div class="wishlist-img-box" onclick="window.location.href='product-details.html?id=${item.id}'">
                <img src="${item.mainImage}" alt="${item.name}" onerror="this.onerror=null; this.src='images/brake-pad.jpg';">
            </div>
            <div class="wishlist-info">
                <span class="wishlist-cat">${item.category}</span>
                <h3 class="wishlist-name" onclick="window.location.href='product-details.html?id=${item.id}'">${item.name}</h3>
                <p class="wishlist-sku">OEM: <strong>${item.oemNumber}</strong></p>
                <div class="wishlist-stock">● In Stock (${item.stockCount} available)</div>
                <div class="wishlist-price-row">
                    <span class="wishlist-price">Rs. ${formatPrice(item.price)}</span>
                </div>
                <button class="btn-move-cart" onclick="handleMoveToCart('${item.id}')">🛒 MOVE TO CART</button>
            </div>
        </article>
    `).join("");
}

function handleRemoveWishlistItem(productId) {
    toggleWishlist(productId);
    renderWishlist();
    showToast("Removed from Wishlist", "Item was removed from your wishlist.");
}

function handleMoveToCart(productId) {
    moveWishlistToCart(productId);
    renderWishlist();
    showToast("Moved to Cart!", "1 item was added to your shopping cart and removed from wishlist.");
}

function handleMoveAllToCart() {
    const items = getWishlistProducts();
    if (items.length === 0) return;
    items.forEach(p => {
        addToCart(p.id, 1);
    });
    clearWishlist();
    renderWishlist();
    showToast("All Moved to Cart!", `${items.length} items were transferred to your shopping cart.`);
}

function handleClearWishlist() {
    if (confirm("Are you sure you want to clear all items from your wishlist?")) {
        clearWishlist();
        renderWishlist();
        showToast("Wishlist Cleared", "All items have been removed from your wishlist.");
    }
}

// ==========================================
// ACCOUNT MODAL & AUTHENTICATION LOGIC
// ==========================================
function openAccountModal() {
    const user = getCurrentUser();
    if (user) {
        switchAccountTab('profile');
    } else {
        switchAccountTab('login');
    }
    openModal('accountModal');
}

function switchAccountTab(tabName) {
    const user = getCurrentUser();
    const profileBtn = document.getElementById("profileTabBtn");
    
    if (profileBtn) {
        profileBtn.style.display = user ? "inline-block" : "none";
    }

    document.querySelectorAll(".account-tab-btn").forEach(btn => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    document.querySelectorAll(".account-tab-content").forEach(c => {
        c.classList.remove("active");
    });

    const target = document.getElementById(
        tabName === "login" ? "accountLoginTab" :
        tabName === "register" ? "accountRegisterTab" :
        tabName === "reset" ? "accountResetTab" : "accountProfileTab"
    );
    if (target) target.classList.add("active");

    const modalTitle = document.getElementById("accountModalTitle");
    if (modalTitle) {
        modalTitle.textContent = tabName === "login" ? "Sign In to Account" :
                                 tabName === "register" ? "Create Free Account" :
                                 tabName === "reset" ? "Reset Account Password" : "My Profile & Orders";
    }

    if (tabName === "profile" && user) {
        populateUserProfile(user);
    }
}

function populateUserProfile(user) {
    const nameEl = document.getElementById("profileName");
    const emailEl = document.getElementById("profileEmail");
    const avatarEl = document.getElementById("profileAvatar");
    const vehicleEl = document.getElementById("profileVehicle");
    const addressEl = document.getElementById("profileAddress");
    const ordersList = document.getElementById("ordersListContainer");

    if (nameEl) nameEl.textContent = user.name || user.full_name || "Customer";
    if (emailEl) emailEl.innerHTML = `${user.email} • <span>${user.phone || ''}</span>`;
    if (avatarEl) {
        const initials = (user.name || "U").split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
        avatarEl.textContent = initials || "U";
    }
    if (vehicleEl) vehicleEl.textContent = `🚗 ${user.vehicle || user.registered_vehicle || 'Standard Vehicle'}`;
    if (addressEl) addressEl.textContent = user.address ? `📍 ${user.address}` : "";

    // Admin Shortcut Box
    const adminBox = document.getElementById("profileAdminBox");
    if (adminBox) {
        const isAdmin = user.role === "admin";
        adminBox.style.display = isAdmin ? "flex" : "none";
    }

    if (ordersList) {
        const allOrders = getOrdersHistory();
        const userOrders = (user.role === "admin")
            ? allOrders
            : allOrders.filter(o => {
                const matchEmail = o.customerEmail && o.customerEmail.toLowerCase() === user.email.toLowerCase();
                const matchPhone = o.customerPhone && user.phone && o.customerPhone === user.phone;
                const matchName = o.customerName && user.name && o.customerName.toLowerCase() === user.name.toLowerCase();
                return matchEmail || matchPhone || matchName;
            });

        if (userOrders.length === 0) {
            ordersList.innerHTML = `<p class="no-orders-msg">No past orders found yet. Orders placed on cart checkout will appear here!</p>`;
        } else {
            ordersList.innerHTML = userOrders.map(o => `
                <div class="order-history-card">
                    <div class="order-hist-header">
                        <strong>${o.orderId || '#AG-ORDER'}</strong>
                        <span class="order-status-badge ${o.statusClass || 'processing'}">${o.status || 'Processing Dispatch'}</span>
                    </div>
                    <div class="order-hist-details">
                        <p>Date: ${o.date || 'Recent'}</p>
                        <p>Total: <strong>Rs. ${formatPrice(o.total || 0)}</strong> (${o.itemCount || 1} items)</p>
                        <p class="order-dest">Delivery: ${o.address || 'Sri Lanka'}</p>
                    </div>
                </div>
            `).join("");
        }
    }
}

async function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    const submitBtn = e.target.querySelector("button[type='submit']");
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Signing in...";
    }

    try {
        const res = await loginUser(email, pass);
        if (res.success) {
            if (res.requiresAdminPin) {
                closeModal('accountModal');
                openAdminPinModal();
            } else {
                showToast("Signed In", res.message);
                switchAccountTab('profile');
            }
        } else {
            alert(res.message);
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Sign In to My Account →";
        }
    }
}

function openAdminPinModal() {
    const input = document.getElementById("adminSecurityPinInput");
    if (input) input.value = "";
    openModal('adminPinModal');
    setTimeout(() => {
        if (input) input.focus();
    }, 150);
}
window.openAdminPinModal = openAdminPinModal;

async function handleAdminPinSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("adminSecurityPinInput");
    const pin = input ? input.value.trim() : "";
    const res = await verifyAdminPin(pin);

    if (res.success) {
        closeModal('adminPinModal');
        showToast("Admin Authenticated 🛡️", res.message);
        setTimeout(() => {
            if (confirm("2-Step Verification Successful! Access the Admin Dashboard now?")) {
                window.location.href = "admin.html";
            } else {
                openAccountModal();
            }
        }, 300);
    } else {
        alert(res.message);
        if (input) {
            input.value = "";
            input.focus();
        }
    }
}
window.handleAdminPinSubmit = handleAdminPinSubmit;

async function handleUserRegister(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const vehicle = document.getElementById("regVehicle").value.trim();
    const pass = document.getElementById("regPassword").value.trim();

    const submitBtn = e.target.querySelector("button[type='submit']");
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Creating Account...";
    }

    try {
        const res = await registerUser(name, email, phone, pass, vehicle);
        if (res.success) {
            showToast("Account Created", res.message);
            switchAccountTab('profile');
        } else {
            alert(res.message);
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Complete Registration →";
        }
    }
}

function handleUserLogout() {
    logoutUser();
    showToast("Signed Out", "You have been logged out successfully.");
    switchAccountTab('login');
}

function initAccountModalLogic() {
    // expose global helper
    window.openAccountModal = openAccountModal;
    window.switchAccountTab = switchAccountTab;
    window.handleUserLogin = handleUserLogin;
    window.handleUserRegister = handleUserRegister;
    window.handleUserLogout = handleUserLogout;
}

// ==========================================
// PART QUOTATION INQUIRY FORM
// ==========================================
function handleQuotationSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("quotName").value.trim();
    const phone = document.getElementById("quotPhone").value.trim();
    const vehicle = document.getElementById("quotVehicle").value.trim();
    const year = document.getElementById("quotYear").value.trim();
    const vin = document.getElementById("quotVIN").value.trim();
    const details = document.getElementById("quotDetails").value.trim();

    const quoteId = `#QUOT-${Math.floor(1000 + Math.random() * 9000)}`;
    const quoteData = { quoteId, name, phone, vehicle, year, vin, details, date: new Date().toLocaleDateString() };

    saveQuotation(quoteData);
    closeModal('contactQuotationModal');
    e.target.reset();

    showToast("Quotation Submitted!", `Request ${quoteId} received! Our mechanics will WhatsApp/call you within 15 minutes.`);
}
window.handleQuotationSubmit = handleQuotationSubmit;

// ==========================================
// LIVE CHATBOT CONTROLLER
// ==========================================
function initLiveChatWidget() {
    const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");
    const chatClose = document.getElementById("chatClose");

    if (chatToggle && chatBox && chatClose) {
        chatToggle.addEventListener("click", () => {
            const isOpen = chatBox.classList.toggle("open");
            chatBox.setAttribute("aria-hidden", String(!isOpen));
        });
        chatClose.addEventListener("click", () => {
            chatBox.classList.remove("open");
            chatBox.setAttribute("aria-hidden", "true");
        });
    }
}

function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("chatInput");
    const msg = input.value.trim();
    if (!msg) return;

    appendChatMessage(msg, "user");
    input.value = "";

    // Show simulated typing & reply
    setTimeout(() => {
        const reply = getBotResponse(msg);
        appendChatMessage(reply, "bot");
    }, 600);
}
window.handleChatSubmit = handleChatSubmit;

function sendQuickPrompt(promptText) {
    appendChatMessage(promptText, "user");
    setTimeout(() => {
        const reply = getBotResponse(promptText);
        appendChatMessage(reply, "bot");
    }, 500);
}
window.sendQuickPrompt = sendQuickPrompt;

function appendChatMessage(htmlText, sender = "user") {
    const list = document.getElementById("chatMessageList");
    if (!list) return;

    const div = document.createElement("div");
    div.className = `chat-bubble ${sender === 'user' ? 'user-msg' : 'bot-msg'}`;
    const safeContent = sender === 'user' ? (window.escapeHtml ? window.escapeHtml(htmlText) : htmlText) : htmlText;
    div.innerHTML = `
        <p>${safeContent}</p>
        <span class="chat-time">Just now</span>
    `;
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
}

// Helpers
let toastTimer;
function showToast(title, message) {
    const toast = document.getElementById("toastNotification");
    const titleEl = document.getElementById("toastTitle");
    const msgEl = document.getElementById("toastMessage");
    if (!toast) return;

    titleEl.textContent = title;
    msgEl.textContent = message;

    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

function formatPrice(num) {
    return Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
