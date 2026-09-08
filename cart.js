// cart.js - AutoGenuine Shopping Cart & Checkout Controller

document.addEventListener("DOMContentLoaded", function () {
    renderCartPage();
    initCouponHandler();
    initCheckoutModal();
    initLiveChat();
});

function renderCartPage() {
    const items = getCartItems();
    const itemsContainer = document.getElementById("cartItemsList");
    const emptyState = document.getElementById("emptyCartState");
    const cartActionsRow = document.getElementById("cartActionsRow");
    const cartSummaryColumn = document.getElementById("cartSummaryColumn");
    const totalCountEl = document.getElementById("cartTotalItemsCount");

    const totalCount = getCartCount();
    totalCountEl.textContent = totalCount;

    if (items.length === 0) {
        itemsContainer.innerHTML = "";
        emptyState.style.display = "block";
        cartActionsRow.style.display = "none";
        updateSummary(0);
        return;
    }

    emptyState.style.display = "none";
    cartActionsRow.style.display = "flex";

    itemsContainer.innerHTML = items.map(item => `
        <article class="cart-item-card" data-id="${item.id}">
            <div class="cart-item-img" onclick="window.location.href='product-details.html?id=${item.id}'">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="cart-item-info">
                <span class="cart-item-cat">${item.category || "Genuine Part"}</span>
                <h4 onclick="window.location.href='product-details.html?id=${item.id}'">${item.name}</h4>
                <p class="cart-item-unit-price">Unit Price: Rs. ${formatPrice(item.price)}</p>
            </div>

            <div class="cart-qty-stepper">
                <button type="button" onclick="handleQtyChange('${item.id}', ${(item.quantity || 1) - 1})" aria-label="Decrease quantity">−</button>
                <span>${item.quantity || 1}</span>
                <button type="button" onclick="handleQtyChange('${item.id}', ${(item.quantity || 1) + 1})" aria-label="Increase quantity">+</button>
            </div>

            <div class="cart-item-total">
                <span class="total-label">Subtotal</span>
                <span class="total-val">Rs. ${formatPrice(item.price * (item.quantity || 1))}</span>
            </div>

            <button type="button" class="cart-item-delete-btn" onclick="handleItemDelete('${item.id}')" title="Remove part from cart" aria-label="Remove part">
                ✕
            </button>
        </article>
    `).join("");

    updateSummary(getCartSubtotal());

    // Clear cart listener
    const clearBtn = document.getElementById("clearCartBtn");
    if (clearBtn) {
        clearBtn.onclick = function () {
            if (confirm("Are you sure you want to clear your entire shopping cart?")) {
                clearCart();
                renderCartPage();
                showToast("Cart Cleared", "All items have been removed from your shopping cart.", "info");
            }
        };
    }
}

function updateSummary(subtotal) {
    const subtotalEl = document.getElementById("summarySubtotal");
    const discountLine = document.getElementById("discountLine");
    const discountEl = document.getElementById("summaryDiscount");
    const shippingEl = document.getElementById("summaryShipping");
    const totalEl = document.getElementById("summaryTotal");
    const checkoutBtn = document.getElementById("proceedCheckoutBtn");

    subtotalEl.textContent = `Rs. ${formatPrice(subtotal)}`;

    if (subtotal === 0) {
        discountLine.style.display = "none";
        shippingEl.textContent = "Rs. 0.00";
        totalEl.textContent = "Rs. 0.00";
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;

    // Shipping: Free on orders > Rs. 10,000, else Rs. 450
    const shippingFee = subtotal >= 10000 ? 0 : 450;
    shippingEl.textContent = shippingFee === 0 ? "FREE (Orders over Rs. 10,000)" : `Rs. ${formatPrice(shippingFee)}`;

    // Check active coupon
    const activeCoupon = getActiveCoupon();
    let discountAmount = 0;

    if (activeCoupon && activeCoupon.discountPercent) {
        discountAmount = (subtotal * activeCoupon.discountPercent) / 100;
        discountLine.style.display = "flex";
        document.getElementById("discountTagCode").textContent = `${activeCoupon.code} (-${activeCoupon.discountPercent}%)`;
        discountEl.textContent = `- Rs. ${formatPrice(discountAmount)}`;
    } else {
        discountLine.style.display = "none";
    }

    const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
    totalEl.textContent = `Rs. ${formatPrice(grandTotal)}`;
    
    const modalTotal = document.getElementById("modalPayableTotal");
    if (modalTotal) {
        modalTotal.textContent = `Rs. ${formatPrice(grandTotal)}`;
    }
}

// Global Quantity and Delete Callbacks
window.handleQtyChange = function (productId, newQty) {
    if (newQty <= 0) {
        if (confirm("Remove this spare part from your cart?")) {
            removeCartItem(productId);
            renderCartPage();
            showToast("Item Removed", "Part was removed from your cart.", "info");
        }
    } else {
        updateCartItemQuantity(productId, newQty);
        renderCartPage();
    }
};

window.handleItemDelete = function (productId) {
    removeCartItem(productId);
    renderCartPage();
    showToast("Item Removed", "Part removed from shopping cart.", "info");
};

// Promo Coupon Handler
function initCouponHandler() {
    const applyBtn = document.getElementById("applyCouponBtn");
    const input = document.getElementById("couponInput");
    const feedback = document.getElementById("couponMsg");

    // Populate existing coupon if any
    const existing = getActiveCoupon();
    if (existing && existing.code) {
        input.value = existing.code;
        feedback.className = "coupon-feedback success";
        feedback.textContent = `✓ Active: 10% Discount Applied (${existing.code})`;
        feedback.style.display = "block";
    }

    applyBtn.addEventListener("click", () => {
        const code = input.value.trim();
        if (!code) {
            feedback.className = "coupon-feedback error";
            feedback.textContent = "Please enter a valid coupon code (e.g. WELCOME10)";
            feedback.style.display = "block";
            return;
        }

        const result = applyCouponCode(code);
        if (result.success) {
            feedback.className = "coupon-feedback success";
            feedback.textContent = `✓ ${result.message}`;
            feedback.style.display = "block";
            updateSummary(getCartSubtotal());
            showToast("Coupon Applied!", `10% discount applied to your order.`);
        } else {
            feedback.className = "coupon-feedback error";
            feedback.textContent = `✗ ${result.message}`;
            feedback.style.display = "block";
        }
    });
}

// Checkout Modal & Order Placement
function initCheckoutModal() {
    const checkoutBtn = document.getElementById("proceedCheckoutBtn");
    const checkoutModal = document.getElementById("checkoutModal");
    const closeModalBtn = document.getElementById("closeCheckoutModalBtn");
    const checkoutForm = document.getElementById("checkoutForm");
    const successModal = document.getElementById("orderSuccessModal");

    if (checkoutBtn && checkoutModal) {
        checkoutBtn.addEventListener("click", () => {
            if (getCartItems().length === 0) {
                alert("Your cart is empty. Please add items before checking out.");
                return;
            }
            checkoutModal.classList.add("active");
            checkoutModal.setAttribute("aria-hidden", "false");
        });
    }

    if (closeModalBtn && checkoutModal) {
        closeModalBtn.addEventListener("click", () => {
            checkoutModal.classList.remove("active");
            checkoutModal.setAttribute("aria-hidden", "true");
        });
    }

    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("custName").value.trim();
            const phone = document.getElementById("custPhone").value.trim();
            const address = document.getElementById("custAddress").value.trim();
            const city = document.getElementById("custCity").value.trim();
            const district = document.getElementById("custDistrict").value;
            const payMethod = document.querySelector("input[name='payMethod']:checked")?.value || "Cash on Delivery";
            const notes = document.getElementById("custNotes").value.trim();

            const items = getCartItems();
            const subtotal = getCartSubtotal();
            const activeCoupon = getActiveCoupon();
            const discount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
            const shipping = subtotal >= 10000 ? 0 : 450;
            const total = subtotal - discount + shipping;

            // Generate Order Reference
            const orderRef = `#AG-${Math.floor(10000 + Math.random() * 90000)}`;
            document.getElementById("orderRefNumber").textContent = orderRef;

            const detailsBox = document.getElementById("successOrderDetails");
            detailsBox.innerHTML = `
                <p><strong>Customer:</strong> ${name} (${phone})</p>
                <p><strong>Delivery Address:</strong> ${address}, ${city}, ${district}</p>
                <p><strong>Payment Method:</strong> ${payMethod}</p>
                ${notes ? `<p><strong>Vehicle / Notes:</strong> ${notes}</p>` : ''}
                <hr style="border: 0; border-top: 1px solid var(--line); margin: 10px 0;">
                <p><strong>Items Ordered:</strong> ${items.map(i => `${i.quantity}x ${i.name}`).join(", ")}</p>
                <p><strong>Total Paid / Due:</strong> <strong style="color: #4eed9d;">Rs. ${formatPrice(total)}</strong></p>
            `;

            // Save to Orders History
            const orderData = {
                orderId: orderRef,
                customerName: name,
                phone: phone,
                address: `${address}, ${city}, ${district}`,
                payMethod: payMethod,
                items: items.map(i => `${i.quantity}x ${i.name}`).join(", "),
                itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
                total: total,
                date: new Date().toLocaleDateString(),
                status: "Processing Dispatch"
            };
            saveOrder(orderData);

            checkoutModal.classList.remove("active");
            checkoutModal.setAttribute("aria-hidden", "true");

            successModal.classList.add("active");
            successModal.setAttribute("aria-hidden", "false");

            clearCart();
            renderCartPage();
            showToast("Order Confirmed!", `Order ${orderRef} placed successfully.`);
        });
    }
}

// Live Chat Widget Controller
function initLiveChat() {
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
    div.innerHTML = `
        <p>${htmlText}</p>
        <span class="chat-time">Just now</span>
    `;
    list.appendChild(div);
    list.scrollTop = list.scrollHeight;
}

// Account Auth Handlers
function openAccountModal() {
    const user = getCurrentUser();
    if (user) {
        switchAccountTab('profile');
    } else {
        switchAccountTab('login');
    }
    openModal('accountModal');
}
window.openAccountModal = openAccountModal;

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
        tabName === "register" ? "accountRegisterTab" : "accountProfileTab"
    );
    if (target) target.classList.add("active");

    if (tabName === "profile" && user) {
        populateUserProfile(user);
    }
}
window.switchAccountTab = switchAccountTab;

function populateUserProfile(user) {
    const nameEl = document.getElementById("profileName");
    const emailEl = document.getElementById("profileEmail");
    const avatarEl = document.getElementById("profileAvatar");
    const vehicleEl = document.getElementById("profileVehicle");
    const ordersList = document.getElementById("ordersListContainer");

    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.innerHTML = `${user.email} • <span>${user.phone || ''}</span>`;
    if (avatarEl) {
        const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
        avatarEl.textContent = initials || "U";
    }
    if (vehicleEl) vehicleEl.textContent = `🚗 ${user.vehicle || 'Standard Vehicle'}`;

    if (ordersList) {
        const orders = getOrdersHistory();
        if (orders.length === 0) {
            ordersList.innerHTML = `<p class="no-orders-msg">No past orders found yet. Orders placed on cart checkout will appear here!</p>`;
        } else {
            ordersList.innerHTML = orders.map(o => `
                <div class="order-history-card">
                    <div class="order-hist-header">
                        <strong>${o.orderId || '#AG-ORDER'}</strong>
                        <span class="order-status-badge">Processing Dispatch</span>
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

function handleUserLogin(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPassword").value.trim();

    const res = loginUser(email, pass);
    if (res.success) {
        showToast("Signed In", res.message);
        switchAccountTab('profile');
    } else {
        alert(res.message);
    }
}
window.handleUserLogin = handleUserLogin;

function handleUserRegister(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const phone = document.getElementById("regPhone").value.trim();
    const vehicle = document.getElementById("regVehicle").value.trim();
    const pass = document.getElementById("regPassword").value.trim();

    const res = registerUser(name, email, phone, pass, vehicle);
    if (res.success) {
        showToast("Account Created", res.message);
        switchAccountTab('profile');
    } else {
        alert(res.message);
    }
}
window.handleUserRegister = handleUserRegister;

function handleUserLogout() {
    logoutUser();
    showToast("Signed Out", "You have been logged out successfully.");
    switchAccountTab('login');
}
window.handleUserLogout = handleUserLogout;

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

    showToast("Quotation Submitted!", `Request ${quoteId} received! Our mechanics will contact you within 15 minutes.`);
}
window.handleQuotationSubmit = handleQuotationSubmit;

// Toast Notification Helper
let toastTimeout;
function showToast(title, message, type = "success") {
    const toast = document.getElementById("toastNotification");
    const titleEl = document.getElementById("toastTitle");
    const msgEl = document.getElementById("toastMessage");

    if (!toast) return;

    titleEl.textContent = title;
    msgEl.textContent = message;

    toast.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);
}

// Format Price helper
function formatPrice(num) {
    return Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

