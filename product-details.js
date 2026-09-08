// product-details.js - AutoGenuine Product Details Page Controller

document.addEventListener("DOMContentLoaded", function () {
    // 1. Get Product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    let productId = urlParams.get("id");
    
    // Default to first product if missing or invalid
    let product = getProductById(productId);
    if (!product) {
        product = PRODUCTS[0];
        productId = product.id;
    }

    // 2. Render Product Details
    renderProductPage(product);

    // 3. Initialize Interactive Components
    initGallery(product);
    initQuantityControls(product);
    initPurchaseButtons(product);
    initWishlistButton(product);
    initFitmentChecker(product);
    initTabs();
    initReviewForm(product);
    initRelatedProducts(product);
    initLiveChat();
    initHeaderCart();
});

// Render all product data to DOM
function renderProductPage(product) {
    // Title & Meta
    document.title = `${product.name} | AutoGenuine Spare Parts`;
    document.getElementById("crumbCategory").textContent = product.category;
    document.getElementById("crumbCategory").href = `home.html#shop`;
    document.getElementById("crumbProductTitle").textContent = product.name;

    // Header Meta
    document.getElementById("productCategoryTag").textContent = product.category;
    document.getElementById("productSku").textContent = product.sku;
    document.getElementById("productOem").textContent = product.oemNumber;
    document.getElementById("productTitle").textContent = product.name;

    // Rating & Brand
    document.getElementById("productStars").textContent = getStarRatingString(product.rating);
    document.getElementById("productRatingVal").textContent = product.rating.toFixed(1);
    document.getElementById("productReviewCountLink").textContent = `(${product.reviewsCount} customer reviews)`;
    document.getElementById("productBrand").textContent = product.brand;

    // Price
    document.getElementById("productPrice").textContent = formatPrice(product.price);
    if (product.originalPrice && product.originalPrice > product.price) {
        document.getElementById("productOriginalPrice").textContent = `Rs. ${formatPrice(product.originalPrice)}`;
        const saveAmt = product.originalPrice - product.price;
        document.getElementById("productSaveTag").textContent = `You Save Rs. ${formatPrice(saveAmt)} (${product.discountPercent}%)`;
        document.getElementById("discountBadge").textContent = `SAVE ${product.discountPercent}%`;
        document.getElementById("discountBadge").style.display = "block";
    } else {
        document.getElementById("originalPriceWrap").style.display = "none";
        document.getElementById("discountBadge").style.display = "none";
    }

    // Stock status
    const stockBadge = document.getElementById("stockBadge");
    const stockStatusNote = document.getElementById("stockStatusNote");
    if (product.inStock) {
        stockBadge.textContent = "✓ IN STOCK";
        stockBadge.className = "badge-stock in-stock";
        stockStatusNote.textContent = `${product.stockCount} units in stock ready to dispatch`;
    } else {
        stockBadge.textContent = "OUT OF STOCK";
        stockBadge.className = "badge-stock";
        stockStatusNote.textContent = "Currently backordered (Ships in 5-7 days)";
    }

    // Short Description & Highlights
    document.getElementById("productShortDesc").textContent = product.shortDescription;
    document.getElementById("productWarranty").textContent = product.warranty;

    // Tab 1: Full Description & Features
    const descContainer = document.getElementById("fullDescriptionText");
    descContainer.innerHTML = product.fullDescription.split("\n\n").map(p => `<p>${p.trim()}</p>`).join("");

    const featuresList = document.getElementById("featuresList");
    featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join("");

    // Tab 2: Specifications Table
    const specsTableBody = document.querySelector("#specsTable tbody");
    specsTableBody.innerHTML = Object.entries(product.specs).map(([key, val]) => `
        <tr>
            <td>${key}</td>
            <td><strong>${val}</strong></td>
        </tr>
    `).join("");

    // Tab 3: Compatibility Table
    document.getElementById("tabFitmentCount").textContent = product.compatibility.length;
    const compatTableBody = document.getElementById("compatibilityTableBody");
    compatTableBody.innerHTML = product.compatibility.map(item => `
        <tr>
            <td><strong>${item.make}</strong></td>
            <td>${item.model}</td>
            <td>${item.years}</td>
            <td><code>${item.engine}</code></td>
            <td><span class="fit-badge">✓ Guaranteed Fit</span></td>
        </tr>
    `).join("");

    // Tab 4: Reviews
    renderReviewsTab(product);
}

// Gallery & Thumbnail switcher
function initGallery(product) {
    const mainImg = document.getElementById("mainProductImg");
    const strip = document.getElementById("thumbnailStrip");

    mainImg.src = product.mainImage;
    mainImg.alt = product.name;

    const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.mainImage];

    if (galleryImages.length <= 1) {
        strip.style.display = "none";
    } else {
        strip.style.display = "flex";
        strip.innerHTML = galleryImages.map((imgSrc, idx) => `
            <div class="thumbnail-item ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}">
                <img src="${imgSrc}" alt="${product.name} view ${idx + 1}">
            </div>
        `).join("");

        strip.querySelectorAll(".thumbnail-item").forEach(item => {
            item.addEventListener("click", function () {
                strip.querySelectorAll(".thumbnail-item").forEach(i => i.classList.remove("active"));
                this.classList.add("active");
                mainImg.src = this.getAttribute("data-src");
            });
        });
    }
}

// Quantity Stepper Controls
function initQuantityControls(product) {
    const qtyInput = document.getElementById("qtyInput");
    const minusBtn = document.getElementById("qtyMinusBtn");
    const plusBtn = document.getElementById("qtyPlusBtn");

    minusBtn.addEventListener("click", () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) {
            qtyInput.value = val - 1;
        }
    });

    plusBtn.addEventListener("click", () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        const max = product.stockCount || 99;
        if (val < max) {
            qtyInput.value = val + 1;
        } else {
            showToast("Maximum Stock Reached", `Only ${max} units available in stock.`, "info");
        }
    });
}

// Add to Cart & Buy Now
function initPurchaseButtons(product) {
    const addToCartBtn = document.getElementById("addToCartBtn");
    const buyNowBtn = document.getElementById("buyNowBtn");
    const qtyInput = document.getElementById("qtyInput");

    addToCartBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        const result = addToCart(product.id, qty);
        if (result.success) {
            showToast("Added to Cart!", `${qty} × ${product.name} added. (Cart total: ${result.count} items)`);
        }
    });

    buyNowBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value, 10) || 1;
        addToCart(product.id, qty);
        showToast("Proceeding to Cart", `Added to cart. Redirecting to checkout...`);
        setTimeout(() => {
            window.location.href = "cart.html";
        }, 500);
    });
}

// Wishlist toggle
function initWishlistButton(product) {
    const btn = document.getElementById("wishlistFloatBtn");
    if (isProductInWishlist(product.id)) {
        btn.classList.add("active");
        btn.textContent = "♥";
    }

    btn.addEventListener("click", () => {
        const isAdded = toggleWishlist(product.id);
        if (isAdded) {
            btn.classList.add("active");
            btn.textContent = "♥";
            showToast("Added to Wishlist", `${product.name} saved to your wishlist.`);
        } else {
            btn.classList.remove("active");
            btn.textContent = "♡";
            showToast("Removed from Wishlist", `${product.name} removed from wishlist.`, "info");
        }
    });
}

// Fitment Checker Tool
function initFitmentChecker(product) {
    const makeSelect = document.getElementById("fitmentMakeSelect");
    const modelSelect = document.getElementById("fitmentModelSelect");
    const checkBtn = document.getElementById("checkFitmentBtn");
    const resultBox = document.getElementById("fitmentResult");

    const carData = {
        "Toyota": ["Corolla", "Axio", "Premio", "Allion", "Yaris", "Vitz", "Aqua", "Prius", "C-HR", "Passo"],
        "Nissan": ["Tiida", "Latio", "Sunny", "Sylphy", "X-Trail", "March"],
        "Honda": ["Fit", "Grace", "Vezel", "Civic", "CR-V", "Insight"],
        "Mitsubishi": ["Lancer", "Outlander", "ASX", "Montero"],
        "Suzuki": ["Grand Vitara", "SX4", "Ciaz", "Wagon R", "Swift"]
    };

    makeSelect.addEventListener("change", function () {
        const selectedMake = this.value;
        modelSelect.innerHTML = '<option value="">Select Model</option>';

        if (selectedMake && carData[selectedMake]) {
            modelSelect.disabled = false;
            carData[selectedMake].forEach(mod => {
                const opt = document.createElement("option");
                opt.value = mod;
                opt.textContent = mod;
                modelSelect.appendChild(opt);
            });
        } else {
            modelSelect.disabled = true;
        }
        resultBox.style.display = "none";
    });

    checkBtn.addEventListener("click", () => {
        const make = makeSelect.value;
        const model = modelSelect.value;

        if (!make || !model) {
            resultBox.className = "fitment-result warning";
            resultBox.innerHTML = "⚠️ Please select both a vehicle Make and Model first.";
            resultBox.style.display = "block";
            return;
        }

        // Check compatibility list
        const match = product.compatibility.find(c => 
            c.make.toLowerCase() === make.toLowerCase() && 
            c.model.toLowerCase().includes(model.toLowerCase())
        );

        if (match) {
            resultBox.className = "fitment-result success";
            resultBox.innerHTML = `✓ <strong>100% Guaranteed Fit:</strong> This ${product.name} is a direct OEM replacement for <strong>${match.make} ${match.model} (${match.years})</strong> [${match.engine}].`;
        } else {
            resultBox.className = "fitment-result warning";
            resultBox.innerHTML = `⚠️ <strong>Fitment Verification Required:</strong> ${make} ${model} was not found in the standard direct-fit listing. Please check OEM Part Number: <code>${product.oemNumber}</code> or contact our support team.`;
        }
        resultBox.style.display = "block";
    });
}

// Tab Switcher
function initTabs() {
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));

            btn.classList.add("active");
            const targetId = btn.getAttribute("data-tab");
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add("active");
            }
        });
    });

    // Handle review count click jump to reviews tab
    const reviewLink = document.getElementById("productReviewCountLink");
    if (reviewLink) {
        reviewLink.addEventListener("click", (e) => {
            e.preventDefault();
            const reviewTabBtn = document.querySelector(".tab-btn[data-tab='tab-reviews']");
            if (reviewTabBtn) {
                reviewTabBtn.click();
                document.getElementById("moreDetails").scrollIntoView({ behavior: "smooth" });
            }
        });
    }
}

// Reviews Tab Renderer
function renderReviewsTab(product) {
    document.getElementById("tabReviewCount").textContent = product.reviews.length;
    document.getElementById("reviewTotalCount").textContent = product.reviews.length;
    document.getElementById("reviewOverallScore").textContent = product.rating.toFixed(1);
    document.getElementById("reviewOverallStars").textContent = getStarRatingString(product.rating);

    const reviewsContainer = document.getElementById("customerReviewsList");
    reviewsContainer.innerHTML = product.reviews.map(rev => `
        <article class="single-review-card">
            <div class="single-review-header">
                <div class="review-avatar-badge">${rev.avatar || rev.author.substring(0, 2).toUpperCase()}</div>
                <div class="review-user-info">
                    <strong>${rev.author}</strong>
                    <small>Verified Buyer • ${rev.location || "Sri Lanka"}</small>
                </div>
                <div class="review-date-badge">${rev.date}</div>
            </div>
            <div class="stars">${getStarRatingString(rev.rating)}</div>
            <h4 class="review-item-title">${rev.title}</h4>
            <p class="review-item-comment">“${rev.comment}”</p>
        </article>
    `).join("");
}

// Review Submission Form
function initReviewForm(product) {
    const form = document.getElementById("addReviewForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const author = document.getElementById("reviewAuthor").value.trim();
        const location = document.getElementById("reviewLocation").value.trim() || "Sri Lanka";
        const rating = parseFloat(document.getElementById("reviewRating").value) || 5;
        const title = document.getElementById("reviewTitle").value.trim();
        const comment = document.getElementById("reviewComment").value.trim();

        const newReview = {
            author: author,
            avatar: author.substring(0, 2).toUpperCase(),
            location: location,
            rating: rating,
            date: "Just now",
            title: title,
            comment: comment
        };

        product.reviews.unshift(newReview);
        product.reviewsCount = product.reviews.length;

        // Recalculate average rating
        const sum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
        product.rating = +(sum / product.reviews.length).toFixed(1);

        renderReviewsTab(product);
        document.getElementById("productStars").textContent = getStarRatingString(product.rating);
        document.getElementById("productRatingVal").textContent = product.rating.toFixed(1);
        document.getElementById("productReviewCountLink").textContent = `(${product.reviewsCount} customer reviews)`;

        form.reset();
        showToast("Review Submitted!", "Thank you for reviewing this product. Your feedback is now live.");
    });
}

// Related Products Grid
function initRelatedProducts(product) {
    const related = getRelatedProducts(product.id, 3);
    const container = document.getElementById("relatedProductGrid");
    if (!container) return;

    container.innerHTML = related.map(item => `
        <article class="product-card">
            <button class="wishlist-btn" onclick="handleCardWishlist(event, '${item.id}')" aria-label="Add to wishlist">
                ${isProductInWishlist(item.id) ? '♥' : '♡'}
            </button>
            <div class="product-image" onclick="window.location.href='product-details.html?id=${item.id}'">
                <img src="${item.mainImage}" alt="${item.name}">
                <div class="quick-view-overlay">
                    <span class="quick-view-btn-pill">View Details →</span>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${item.category}</p>
                <h3 onclick="window.location.href='product-details.html?id=${item.id}'" style="cursor:pointer;">${item.name}</h3>
                <div class="rating">${getStarRatingString(item.rating)} <span>(${item.reviewsCount})</span></div>
                <p class="price">Rs. ${formatPrice(item.price)}</p>
                <button class="cart-button" onclick="handleCardAddToCart(event, '${item.id}')">ADD TO CART</button>
            </div>
        </article>
    `).join("");
}

// Global Card Actions
window.handleCardAddToCart = function (event, productId) {
    event.stopPropagation();
    const result = addToCart(productId, 1);
    if (result.success) {
        showToast("Added to Cart!", `1 × ${result.product.name} added to cart.`);
    }
};

window.handleCardWishlist = function (event, productId) {
    event.stopPropagation();
    const isAdded = toggleWishlist(productId);
    const btn = event.currentTarget;
    btn.textContent = isAdded ? '♥' : '♡';
    showToast(isAdded ? "Added to Wishlist" : "Removed from Wishlist", `Wishlist updated.`);
};

// Header Cart button click
function initHeaderCart() {
    const cartBtn = document.getElementById("cartHeaderBtn");
    if (cartBtn) {
        cartBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "cart.html";
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

// Star Rating String Helper
function getStarRatingString(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return "★".repeat(fullStars) + (halfStar ? "★" : "") + "☆".repeat(emptyStars);
}

