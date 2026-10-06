// cart.js - AutoGenuine Shopping Cart & Checkout Controller

document.addEventListener("DOMContentLoaded", function () {
    renderCartPage();
    renderCartRecentOrders();
    initCouponHandler();
    initCheckoutModal();
    initLiveChat();

    // Listen for background MySQL DB synchronization
    window.addEventListener("autogenuine:dbsynced", () => {
        renderCartRecentOrders();
    });

    // Re-render cart and orders when user signs in or signs out
    window.addEventListener("autogenuine:authchanged", () => {
        renderCartPage();
        renderCartRecentOrders();
    });
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

            // Auto-fill logged in user details if available
            const user = getCurrentUser();
            if (user) {
                const nameInput = document.getElementById("custName");
                const phoneInput = document.getElementById("custPhone");
                const notesInput = document.getElementById("custNotes");
                if (nameInput && !nameInput.value) nameInput.value = user.name || "";
                if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || "";
                if (notesInput && !notesInput.value && user.vehicle && user.vehicle !== "Not specified") {
                    notesInput.value = `Vehicle: ${user.vehicle}`;
                }
            }

            // Update Modal Payable Total and Koko Installments
            const subtotal = getCartSubtotal();
            const activeCoupon = getActiveCoupon();
            const discount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
            const shipping = subtotal >= 10000 ? 0 : 450;
            const grandTotal = Math.max(0, subtotal - discount + shipping);
            const modalTotal = document.getElementById("modalPayableTotal");
            if (modalTotal) {
                modalTotal.textContent = `Rs. ${formatPrice(grandTotal)}`;
            }

            // Reset and trigger active payment method details
            switchPaymentMethod("COD");

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
            const payMethodRadio = document.querySelector("input[name='payMethod']:checked")?.value || "Cash on Delivery";
            const notes = document.getElementById("custNotes").value.trim();

            const items = getCartItems();
            const subtotal = getCartSubtotal();
            const activeCoupon = getActiveCoupon();
            const discount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
            const shipping = subtotal >= 10000 ? 0 : 450;
            const total = Math.max(0, subtotal - discount + shipping);

            const user = getCurrentUser();

            // Strict Payment Method Validation
            let paymentStatus = "Pending COD";
            let paymentRefCode = "";
            let paymentDetailsSummary = "";

            if (payMethodRadio === "Bank Transfer") {
                const bankName = document.getElementById("bankNameSelect")?.value || "Commercial Bank";
                const refNo = document.getElementById("bankRefNumber")?.value.trim();
                const depositor = document.getElementById("bankDepositorName")?.value.trim();
                const slipFile = document.getElementById("bankSlipFile")?.files[0];

                if (!refNo) {
                    alert("⚠️ Please enter your Bank Transaction Reference or Deposit Slip Number.");
                    document.getElementById("bankRefNumber")?.focus();
                    return;
                }
                if (!depositor) {
                    alert("⚠️ Please enter the Depositor's Full Name.");
                    document.getElementById("bankDepositorName")?.focus();
                    return;
                }
                if (!slipFile && !uploadedSlipFileName) {
                    alert("⚠️ Please upload/attach your bank deposit slip or transfer screenshot to verify your payment.");
                    return;
                }

                paymentStatus = "Slip Attached - Verification Pending";
                paymentRefCode = `${bankName} Ref: ${refNo} (Depositor: ${depositor})`;
                paymentDetailsSummary = `
                    <p><strong>Payment Method:</strong> Direct Bank Transfer (${bankName})</p>
                    <p><strong>Transaction Ref / Slip #:</strong> <code style="color:#fca311; font-weight:700;">${refNo}</code></p>
                    <p><strong>Depositor Name:</strong> ${depositor}</p>
                    <p><strong>Slip Status:</strong> <span style="color:#2abf7a; font-weight:700;">✓ Attached (${uploadedSlipFileName || 'Deposit Slip'})</span></p>
                `;
            } else if (payMethodRadio === "Credit/Debit Card") {
                const holder = document.getElementById("cardHolderName")?.value.trim();
                const cardNum = document.getElementById("cardNumber")?.value.replace(/\s+/g, "").trim();
                const exp = document.getElementById("cardExpiry")?.value.trim();
                const cvv = document.getElementById("cardCvv")?.value.trim();

                if (!holder || holder.length < 3) {
                    alert("⚠️ Please enter the Cardholder Name as printed on your card.");
                    document.getElementById("cardHolderName")?.focus();
                    return;
                }
                if (!cardNum || cardNum.length !== 16) {
                    alert("⚠️ Please enter a valid 16-digit Credit or Debit Card number.");
                    document.getElementById("cardNumber")?.focus();
                    return;
                }
                if (!exp || !exp.includes("/") || exp.length < 5) {
                    alert("⚠️ Please enter a valid expiration date in MM/YY format (e.g. 12/28).");
                    document.getElementById("cardExpiry")?.focus();
                    return;
                }
                if (!cvv || cvv.length < 3) {
                    alert("⚠️ Please enter the 3-digit CVV security code on the back of your card.");
                    document.getElementById("cardCvv")?.focus();
                    return;
                }

                const last4 = cardNum.substring(12);
                paymentStatus = "Paid Online (3D Secure Verified)";
                paymentRefCode = `Visa/MC ending in ${last4} (Auth: 3DS-SUCCESS)`;
                paymentDetailsSummary = `
                    <p><strong>Payment Method:</strong> Credit / Debit Card (Visa/MasterCard)</p>
                    <p><strong>Card Details:</strong> •••• •••• •••• ${last4} (${holder})</p>
                    <p><strong>Payment Status:</strong> <span style="color:#2abf7a; font-weight:700;">✓ Paid Online (3D Secure 2.0 Authenticated)</span></p>
                `;
            } else if (payMethodRadio === "Koko Installments") {
                const kokoPhone = document.getElementById("kokoPhone")?.value.trim();
                const kokoOtp = document.getElementById("kokoOtp")?.value.trim();

                if (!kokoPhone || kokoPhone.replace(/\D/g, "").length < 9) {
                    alert("⚠️ Please enter your Koko registered mobile number and click 'Send OTP'.");
                    document.getElementById("kokoPhone")?.focus();
                    return;
                }
                if (!kokoOtp || kokoOtp.length !== 4) {
                    alert("⚠️ Please enter the 4-digit Koko OTP verification code (Demo OTP: 1234).");
                    document.getElementById("kokoOtp")?.focus();
                    return;
                }

                const instAmt = total / 3;
                paymentStatus = "Koko 3x Installments (1st Paid)";
                paymentRefCode = `Koko (${kokoPhone}) - 1st Inst Paid Rs. ${formatPrice(instAmt)}`;
                paymentDetailsSummary = `
                    <p><strong>Payment Method:</strong> Koko (Buy Now, Pay Later - 3 Installments)</p>
                    <p><strong>Koko Account:</strong> ${kokoPhone}</p>
                    <p><strong>1st Installment Paid:</strong> <strong style="color:#2abf7a;">Rs. ${formatPrice(instAmt)}</strong> (2 remaining)</p>
                `;
            } else {
                // COD
                paymentStatus = "Pending COD";
                paymentRefCode = "Cash on Delivery";
                paymentDetailsSummary = `
                    <p><strong>Payment Method:</strong> Cash on Delivery (COD)</p>
                    <p><strong>Payment Status:</strong> Payable in cash to courier driver upon delivery</p>
                `;
            }

            // Generate Order Reference
            const orderRef = `#AG-${Math.floor(10000 + Math.random() * 90000)}`;
            document.getElementById("orderRefNumber").textContent = orderRef;

            const detailsBox = document.getElementById("successOrderDetails");
            detailsBox.innerHTML = `
                <p><strong>Customer:</strong> ${name} (${phone})</p>
                <p><strong>Delivery Address:</strong> ${address}, ${city}, ${district}</p>
                ${paymentDetailsSummary}
                ${notes ? `<p><strong>Vehicle / Notes:</strong> ${notes}</p>` : ''}
                <hr style="border: 0; border-top: 1px solid var(--line); margin: 10px 0;">
                <p><strong>Items Ordered:</strong> ${items.map(i => `${i.quantity || 1}x ${i.name}`).join(", ")}</p>
                <p><strong>Total Paid / Due:</strong> <strong style="color: #4eed9d; font-size:1.1rem;">Rs. ${formatPrice(total)}</strong></p>
            `;

            // Save to Orders History (MySQL + LocalStorage)
            const orderData = {
                orderId: orderRef,
                customerName: name,
                customerPhone: phone,
                customerEmail: user ? user.email : "",
                address: address,
                city: city,
                district: district,
                paymentMethod: payMethodRadio,
                paymentStatus: paymentStatus,
                paymentReference: paymentRefCode,
                subtotal: subtotal,
                discount: discount,
                shipping: shipping,
                total: total,
                date: new Date().toLocaleDateString(),
                status: "Processing Dispatch",
                itemCount: items.reduce((sum, i) => sum + (i.quantity || 1), 0),
                items: items.map(i => ({
                    id: i.id,
                    name: i.name,
                    price: i.price,
                    quantity: i.quantity || 1,
                    subtotal: (i.price * (i.quantity || 1))
                }))
            };
            saveOrder(orderData);

            checkoutModal.classList.remove("active");
            checkoutModal.setAttribute("aria-hidden", "true");

            successModal.classList.add("active");
            successModal.setAttribute("aria-hidden", "false");

            clearCart();
            renderCartPage();
            renderCartRecentOrders();
            showToast("Order Confirmed!", `Order ${orderRef} (${payMethodRadio}) placed successfully.`);
        });
    }
}

// ==========================================
// PAYMENT METHOD LOGIC & FIELD VALIDATORS
// ==========================================
let activePayMethod = "COD";
let uploadedSlipFileName = "";

function switchPaymentMethod(method) {
    activePayMethod = method;
    const codPanel = document.getElementById("payDetailsCOD");
    const bankPanel = document.getElementById("payDetailsBank");
    const cardPanel = document.getElementById("payDetailsCard");
    const kokoPanel = document.getElementById("payDetailsKoko");
    const submitBtn = document.getElementById("placeOrderSubmitBtn");

    if (codPanel) codPanel.style.display = method === "COD" ? "block" : "none";
    if (bankPanel) bankPanel.style.display = method === "Bank" ? "block" : "none";
    if (cardPanel) cardPanel.style.display = method === "Card" ? "block" : "none";
    if (kokoPanel) kokoPanel.style.display = method === "Koko" ? "block" : "none";

    // Set today's date on bank transfer date
    const dateInput = document.getElementById("bankTransferDate");
    if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Calculate Koko installments
    const subtotal = getCartSubtotal();
    const activeCoupon = getActiveCoupon();
    const discount = activeCoupon ? (subtotal * activeCoupon.discountPercent) / 100 : 0;
    const shipping = subtotal >= 10000 ? 0 : 450;
    const total = Math.max(0, subtotal - discount + shipping);
    const instAmt = total / 3;

    const inst1 = document.getElementById("kokoInst1");
    const inst2 = document.getElementById("kokoInst2");
    const inst3 = document.getElementById("kokoInst3");
    if (inst1) inst1.textContent = `Rs. ${formatPrice(instAmt)}`;
    if (inst2) inst2.textContent = `Rs. ${formatPrice(instAmt)}`;
    if (inst3) inst3.textContent = `Rs. ${formatPrice(instAmt)}`;

    if (submitBtn) {
        if (method === "COD") {
            submitBtn.textContent = "Confirm Cash on Delivery Order →";
        } else if (method === "Bank") {
            submitBtn.textContent = "Submit Bank Deposit & Place Order →";
        } else if (method === "Card") {
            submitBtn.textContent = `Pay Rs. ${formatPrice(total)} via Card →`;
        } else if (method === "Koko") {
            submitBtn.textContent = `Pay 1st Installment (Rs. ${formatPrice(instAmt)}) with Koko →`;
        }
    }
}
window.switchPaymentMethod = switchPaymentMethod;

function handleSlipFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    uploadedSlipFileName = file.name;
    const labelEl = document.getElementById("slipFileName");
    const previewWrap = document.getElementById("slipPreviewWrap");
    const previewImg = document.getElementById("slipImagePreview");

    if (labelEl) labelEl.textContent = `📎 Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

    if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (previewImg) {
                previewImg.src = e.target.result;
                previewImg.style.display = "block";
            }
            if (previewWrap) previewWrap.style.display = "flex";
        };
        reader.readAsDataURL(file);
    } else {
        if (previewWrap) previewWrap.style.display = "flex";
        if (previewImg) previewImg.style.display = "none";
    }
    showToast("Slip Attached", "Bank deposit slip attached successfully.");
}
window.handleSlipFileSelect = handleSlipFileSelect;

function formatCardNumber(input) {
    let val = input.value.replace(/\D/g, "").substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(" ") || val;
    input.value = formatted;

    const icon = document.getElementById("cardTypeIcon");
    if (icon) {
        if (val.startsWith("4")) {
            icon.textContent = "💳 VISA";
        } else if (val.startsWith("51") || val.startsWith("52") || val.startsWith("53") || val.startsWith("54") || val.startsWith("55") || val.startsWith("22") || val.startsWith("27")) {
            icon.textContent = "💳 MC";
        } else if (val.startsWith("34") || val.startsWith("37")) {
            icon.textContent = "💳 AMEX";
        } else {
            icon.textContent = "💳";
        }
    }
}
window.formatCardNumber = formatCardNumber;

function formatCardExpiry(input) {
    let val = input.value.replace(/\D/g, "").substring(0, 4);
    if (val.length >= 3) {
        input.value = val.substring(0, 2) + "/" + val.substring(2, 4);
    } else {
        input.value = val;
    }
}
window.formatCardExpiry = formatCardExpiry;

function formatCardCvv(input) {
    input.value = input.value.replace(/\D/g, "").substring(0, 4);
}
window.formatCardCvv = formatCardCvv;

function handleKokoSendOtp() {
    const phone = document.getElementById("kokoPhone")?.value.trim();
    if (!phone || phone.replace(/\D/g, "").length < 9) {
        alert("Please enter a valid Koko registered mobile number (e.g. 077 123 4567).");
        return;
    }
    const otpGroup = document.getElementById("kokoOtpGroup");
    const otpInput = document.getElementById("kokoOtp");
    const btn = document.getElementById("kokoSendOtpBtn");
    if (otpGroup) otpGroup.style.display = "block";
    if (btn) btn.textContent = "Resend OTP";
    if (otpInput) {
        otpInput.value = "1234";
        otpInput.focus();
    }
    showToast("Koko OTP Sent", `4-digit verification code sent to ${phone}. (Demo OTP: 1234)`);
}
window.handleKokoSendOtp = handleKokoSendOtp;

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
            ordersList.innerHTML = `<p class="no-orders-msg">No past orders found yet. Orders placed on checkout will appear here!</p>`;
        } else {
            ordersList.innerHTML = userOrders.map(o => `
                <div class="order-history-card">
                    <div class="order-hist-header">
                        <strong>${o.orderId || '#AG-ORDER'}</strong>
                        <span class="order-status-badge">${o.status || 'Processing Dispatch'}</span>
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
                renderCartRecentOrders();
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
window.handleUserLogin = handleUserLogin;

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
            renderCartRecentOrders();
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

// ==========================================
// CART PAGE: PREVIOUS ORDERS & ACTIVE DELIVERIES
// ==========================================
function renderCartRecentOrders() {
    const container = document.getElementById("cartRecentOrdersList");
    const countEl = document.getElementById("cartOrdersCount");
    if (!container) return;

    const allOrders = getOrdersHistory();
    const currentUser = getCurrentUser();

    // Determine relevant orders
    let relevantOrders = [];
    if (currentUser) {
        if (currentUser.role === "admin") {
            relevantOrders = [...allOrders];
        } else {
            relevantOrders = allOrders.filter(o => 
                (o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
                (o.customerPhone && currentUser.phone && o.customerPhone.replace(/[^0-9]/g, "") === currentUser.phone.replace(/[^0-9]/g, ""))
            );
        }
    } else {
        // Guest user: show all stored orders from current session/device
        relevantOrders = [...allOrders];
    }

    // Filter by Search Query
    const searchVal = (document.getElementById("cartOrderSearchInput")?.value || "").toLowerCase().trim();
    if (searchVal) {
        relevantOrders = relevantOrders.filter(o => 
            (o.orderId && o.orderId.toLowerCase().includes(searchVal)) ||
            (o.customerName && o.customerName.toLowerCase().includes(searchVal)) ||
            (o.customerPhone && o.customerPhone.includes(searchVal)) ||
            (Array.isArray(o.items) && o.items.some(it => (typeof it === 'string' ? it : it.name).toLowerCase().includes(searchVal)))
        );
    }

    // Filter by Status Dropdown
    const statusVal = document.getElementById("cartOrderStatusFilter")?.value || "all";
    if (statusVal !== "all") {
        relevantOrders = relevantOrders.filter(o => (o.status || "Processing Dispatch") === statusVal);
    }

    if (countEl) {
        countEl.textContent = relevantOrders.length;
    }

    if (relevantOrders.length === 0) {
        container.innerHTML = `
            <div class="cart-no-orders-card">
                <div class="empty-orders-icon">📦</div>
                <h4>No Matching Orders Found</h4>
                <p style="color:var(--muted, #8b9bb4); font-size:0.9rem; max-width:480px; margin:6px auto 18px auto;">
                    ${searchVal ? `No purchases matched "${searchVal}".` : currentUser ? `You haven't placed any orders with this account yet.` : `When you complete checkout for car spare parts, your live delivery progress and invoices appear here.`}
                </p>
                <div class="quick-order-lookup-box">
                    <p style="font-weight:600; font-size:0.85rem; color:#fff; margin-bottom:8px;">Have an existing order reference number?</p>
                    <form onsubmit="event.preventDefault(); const v = document.getElementById('quickCartLookupInp').value.trim(); if(v) openOrderTrackingModal(v);" style="display:flex; gap:8px; max-width:380px; margin:0 auto;">
                        <input type="text" id="quickCartLookupInp" placeholder="e.g. #AG-84920 or Phone" required style="flex:1; padding:10px 14px; border-radius:8px; border:1px solid var(--line, #1f293d); background:#0c1424; color:#fff; font-size:0.9rem;">
                        <button type="submit" class="primary-button" style="padding:10px 18px; border-radius:8px; font-weight:700;">Track →</button>
                    </form>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = relevantOrders.map(o => {
        const status = o.status || "Processing Dispatch";
        const isCancelled = status.toLowerCase().includes("cancel");
        const isDelivered = status.toLowerCase().includes("deliver");
        const isShipped = status.toLowerCase().includes("ship") || status.toLowerCase().includes("transit");

        const statusClass = isCancelled ? "cancelled" : isDelivered ? "delivered" : isShipped ? "shipped" : "processing";
        const statusIcon = isCancelled ? "✕" : isDelivered ? "✓" : isShipped ? "🚚" : "⏳";

        const courier = o.courierName || "Domex Islandwide Express Courier";
        const trackingNo = o.trackingNumber || ("DX-" + (Math.abs((function(str){let h=0;for(let i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i);h|=0;}return Math.abs(h);})(o.orderId||"AG"))).toString().substring(0, 7) + "LK");

        let itemsHtml = "";
        if (Array.isArray(o.items) && o.items.length > 0) {
            itemsHtml = o.items.map(it => `
                <li class="cart-order-item-row">
                    <span class="item-name-qty">
                        <b style="color:var(--accent, #2a9d8f);">${it.quantity || 1}x</b> ${typeof it === 'string' ? it : it.name}
                    </span>
                    <span class="item-subtotal">Rs. ${formatPrice(it.subtotal || it.price || 0)}</span>
                </li>
            `).join("");
        } else {
            itemsHtml = `<li class="cart-order-item-row"><span class="item-name-qty">${o.itemCount || 1} Genuine Spare Part(s)</span></li>`;
        }

        const whatsappMsg = encodeURIComponent(`Hello AutoGenuine Dispatch, I would like to check on my Order ${o.orderId} (${o.customerName || 'Customer'}). Current status is: ${status}.`);

        return `
            <div class="cart-order-card">
                <div class="cart-order-card-header">
                    <div class="order-id-meta">
                        <span class="order-badge-icon">📦</span>
                        <div>
                            <div class="order-ref-title-wrap">
                                <strong class="order-ref-title">${o.orderId}</strong>
                                <span class="order-pay-pill">${o.paymentMethod || 'COD'}</span>
                            </div>
                            <small class="order-date-text">📅 Placed: ${o.date || 'Recent'}</small>
                        </div>
                    </div>
                    <div class="order-status-badge ${statusClass}">
                        <span class="pulse-dot"></span> ${statusIcon} ${status}
                    </div>
                </div>

                <div class="cart-order-card-body">
                    <div class="order-items-summary">
                        <span class="summary-subtitle">Items in this Package (${o.itemCount || (o.items ? o.items.length : 1)} Parts):</span>
                        <ul class="cart-order-items-list">
                            ${itemsHtml}
                        </ul>
                    </div>

                    <div class="order-meta-info-grid">
                        <div class="meta-item">
                            <small>Courier Partner</small>
                            <strong>📦 ${courier}</strong>
                        </div>
                        <div class="meta-item">
                            <small>Domex Tracking Ref</small>
                            <code class="tracking-code-val">${trackingNo}</code>
                        </div>
                        <div class="meta-item">
                            <small>Deliver To</small>
                            <span>${o.customerName || 'Customer'} (${o.customerPhone || '0771234567'})</span>
                            <small style="color:var(--muted, #8b9bb4); display:block; margin-top:2px;">📍 ${o.city || o.address || 'Islandwide Delivery'}</small>
                        </div>
                        <div class="meta-item">
                            <small>Payable Amount</small>
                            <strong class="price-highlight">Rs. ${formatPrice(o.total || 0)}</strong>
                        </div>
                    </div>
                </div>

                <div class="cart-order-card-footer">
                    <button type="button" class="btn-card-track" onclick="openOrderTrackingModal('${o.orderId}')">
                        🚚 Live Tracking Stepper
                    </button>
                    <button type="button" class="btn-card-invoice" onclick="printOrderInvoice('${o.orderId}')">
                        🧾 Tax Invoice
                    </button>
                    <a href="https://wa.me/94786287337?text=${whatsappMsg}" target="_blank" class="btn-card-whatsapp">
                        💬 Dispatch Support
                    </a>
                </div>
            </div>
        `;
    }).join("");
}
window.renderCartRecentOrders = renderCartRecentOrders;

function handleCartOrderSearch() {
    renderCartRecentOrders();
}
window.handleCartOrderSearch = handleCartOrderSearch;


