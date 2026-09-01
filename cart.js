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
    const chatBox = document.getElementById("chatBox");
    const chatToggle = document.getElementById("chatToggle");
    const chatClose = document.getElementById("chatClose");
    const chatSendBtn = document.getElementById("chatSendBtn");

    if (chatToggle && chatBox && chatClose) {
        chatToggle.addEventListener("click", function () {
            const isOpen = chatBox.classList.toggle("open");
            chatBox.setAttribute("aria-hidden", String(!isOpen));
        });

        chatClose.addEventListener("click", function () {
            chatBox.classList.remove("open");
            chatBox.setAttribute("aria-hidden", "true");
        });
    }

    if (chatSendBtn) {
        chatSendBtn.addEventListener("click", function () {
            const input = chatBox.querySelector("input");
            if (input && input.value.trim()) {
                alert(`Thank you for your message: "${input.value}"\nOur technical support specialist will reply shortly.`);
                input.value = "";
            }
        });
    }
}

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
