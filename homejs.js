// homejs.js - AutoGenuine Homepage Controller

let currentCategory = "all";
let isExpanded = false;
let currentSearchQuery = "";
let currentSort = "featured";
const INITIAL_LIMIT = 4;

document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Catalog Render
    renderCatalog();
    initAccountModalLogic();
    initLiveChatWidget();

    // 2. Setup Category Cards in Shop Section
    const categoryCards = document.querySelectorAll(".category-card");
    categoryCards.forEach(card => {
        card.addEventListener("click", function (e) {
            e.preventDefault();
            const cat = this.getAttribute("data-category");
            if (cat) {
                filterCatalogByCategory(cat);
            }
        });
    });

    // 3. View All Link in Heading
    const viewAllLink = document.getElementById("viewAllHeaderLink");
    if (viewAllLink) {
        viewAllLink.addEventListener("click", function (e) {
            e.preventDefault();
            resetCatalogFilter();
        });
    }

    // 4. Hero Search Bar Listeners
    const searchBtn = document.getElementById("heroSearchBtn");
    const searchInput = document.getElementById("heroSearchInput");
    const searchCat = document.getElementById("heroSearchCategory");

    if (searchBtn) {
        searchBtn.addEventListener("click", function (e) {
            e.preventDefault();
            executeHeroSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                executeHeroSearch();
            }
        });
    }

    if (searchCat) {
        searchCat.addEventListener("change", function () {
            const cat = this.value;
            filterCatalogByCategory(cat);
        });
    }

    // 5. Flash Sale countdown
    let saleEnd = Date.now() + ((12 * 60 * 60) + (35 * 60) + 48) * 1000;
    function updateCountdown() {
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!hoursEl || !minutesEl || !secondsEl) return;

        let remaining = Math.max(0, saleEnd - Date.now());
        let totalSeconds = Math.floor(remaining / 1000);

        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");

        if (remaining <= 0) {
            saleEnd = Date.now() + 24 * 60 * 60 * 1000;
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Master Catalog Rendering Function with Category + Search + Sort
function renderCatalog() {
    const grid = document.getElementById("mainProductGrid");
    const seeMoreBtn = document.getElementById("seeMoreBtn");
    const seeMoreContainer = document.getElementById("seeMoreContainer");
    const statusBar = document.getElementById("searchStatusBar");
    const statusText = document.getElementById("searchStatusText");

    if (!grid) return;

    let allProducts = getAllProducts();
    let filtered = [...allProducts];

    // Filter by Category
    if (currentCategory && currentCategory !== "all") {
        filtered = filtered.filter(p => 
            p.categorySlug.toLowerCase() === currentCategory.toLowerCase() ||
            p.category.toLowerCase().includes(currentCategory.toLowerCase())
        );
    }

    // Filter by Search Query
    if (currentSearchQuery) {
        const q = currentSearchQuery.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.oemNumber.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.compatibility.some(c => c.model.toLowerCase().includes(q) || c.make.toLowerCase().includes(q))
        );
    }

    // Apply Sorting
    if (currentSort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating-high") {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "name-az") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    const totalMatching = filtered.length;

    // Update Status Bar
    if (currentCategory !== "all" || currentSearchQuery || currentSort !== "featured") {
        statusBar.style.display = "flex";
        let label = [];
        if (currentCategory !== "all") {
            const catName = getCategoryDisplayName(currentCategory);
            label.push(`Category: <strong>${catName}</strong>`);
        }
        if (currentSearchQuery) {
            label.push(`Keyword: <strong>"${currentSearchQuery}"</strong>`);
        }
        if (currentSort !== "featured") {
            const sortLabel = document.getElementById("catalogSortSelect")?.selectedOptions[0]?.text || currentSort;
            label.push(`Sorted by: <strong>${sortLabel}</strong>`);
        }
        statusText.innerHTML = `Showing results for ${label.join(" • ")} (${totalMatching} ${totalMatching === 1 ? 'part' : 'parts'} found)`;
    } else {
        statusBar.style.display = "none";
    }

    // Determine slice to display
    let displayed = filtered;
    if (!isExpanded && currentCategory === "all" && !currentSearchQuery && currentSort === "featured") {
        displayed = filtered.slice(0, INITIAL_LIMIT);
    }

    // Handle Empty Search Results
    if (displayed.length === 0) {
        grid.innerHTML = `
            <div class="no-results-card">
                <h3>🔍 No matching spare parts found</h3>
                <p>We couldn't find any genuine parts matching your search criteria. Try a different search term, category, or request a custom quotation.</p>
                <div style="display:flex;gap:10px;justify-content:center;margin-top:14px;">
                    <button class="primary-button" onclick="resetCatalogFilter()">View All Genuine Parts →</button>
                    <button class="btn-clear-wishlist" onclick="openModal('contactQuotationModal')">Request Custom Quotation</button>
                </div>
            </div>
        `;
        if (seeMoreContainer) seeMoreContainer.style.display = "none";
        return;
    }

    // Render Product Cards
    grid.innerHTML = displayed.map(item => `
        <article class="product-card" data-id="${item.id}">
            <button class="wishlist-btn ${isProductInWishlist(item.id) ? 'active' : ''}" 
                    onclick="handleCardWishlist(event, '${item.id}')" 
                    aria-label="Add to wishlist">
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
                <h3 onclick="window.location.href='product-details.html?id=${item.id}'">${item.name}</h3>
                <div class="rating">${getStarRatingString(item.rating)} <span>(${item.reviewsCount})</span></div>
                <p class="price">Rs. ${formatPrice(item.price)}</p>
                <button class="cart-button" onclick="handleCardAddToCart(event, '${item.id}')">ADD TO CART</button>
            </div>
        </article>
    `).join("");

    // See More Button State
    if (seeMoreContainer && seeMoreBtn) {
        if (currentCategory !== "all" || currentSearchQuery || currentSort !== "featured" || allProducts.length <= INITIAL_LIMIT) {
            seeMoreContainer.style.display = "none";
        } else {
            seeMoreContainer.style.display = "flex";
            if (isExpanded) {
                seeMoreBtn.textContent = `Show Less ↑ (${allProducts.length} Parts Shown)`;
            } else {
                seeMoreBtn.textContent = `See More Spare Parts (${allProducts.length}) ↓`;
            }
        }
    }
}

// Global Sort Handler
window.handleSortChange = function(sortVal) {
    currentSort = sortVal;
    isExpanded = true;
    renderCatalog();
};

// Global Toggle for See More Button
window.toggleSeeMoreCatalog = function () {
    isExpanded = !isExpanded;
    renderCatalog();
    if (!isExpanded) {
        document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
    }
};

// Global Category Filter
window.filterCatalogByCategory = function (categorySlug) {
    currentCategory = categorySlug || "all";
    currentSearchQuery = "";
    isExpanded = true;

    const filterPills = document.querySelectorAll("#categoryFilterPills .filter-pill");
    filterPills.forEach(pill => {
        if (pill.getAttribute("data-category") === currentCategory) {
            pill.classList.add("active");
        } else {
            pill.classList.remove("active");
        }
    });

    const searchCat = document.getElementById("heroSearchCategory");
    if (searchCat) searchCat.value = currentCategory;
    const searchInput = document.getElementById("heroSearchInput");
    if (searchInput) searchInput.value = "";

    renderCatalog();
    document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
};

// Global Reset Filter
window.resetCatalogFilter = function () {
    currentCategory = "all";
    currentSearchQuery = "";
    currentSort = "featured";
    isExpanded = true;

    const filterPills = document.querySelectorAll("#categoryFilterPills .filter-pill");
    filterPills.forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-category") === "all");
    });

    const sortSelect = document.getElementById("catalogSortSelect");
    if (sortSelect) sortSelect.value = "featured";
    const searchCat = document.getElementById("heroSearchCategory");
    if (searchCat) searchCat.value = "all";
    const searchInput = document.getElementById("heroSearchInput");
    if (searchInput) searchInput.value = "";

    renderCatalog();
    document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
};

// Execute Search from Hero Search Box
function executeHeroSearch() {
    const searchInput = document.getElementById("heroSearchInput");
    const searchCat = document.getElementById("heroSearchCategory");

    const query = searchInput ? searchInput.value.trim() : "";
    const cat = searchCat ? searchCat.value : "all";

    currentCategory = cat;
    currentSearchQuery = query;
    isExpanded = true;

    const filterPills = document.querySelectorAll("#categoryFilterPills .filter-pill");
    filterPills.forEach(pill => {
        if (pill.getAttribute("data-category") === currentCategory) {
            pill.classList.add("active");
        } else {
            pill.classList.remove("active");
        }
    });

    renderCatalog();
    document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
}

// Category Display Name Helper
function getCategoryDisplayName(slug) {
    const map = {
        "engine-parts": "Engine Parts",
        "brake-parts": "Brake Parts",
        "filters": "Filters",
        "batteries": "Batteries",
        "lights": "Lights & Electrical",
        "all": "All Genuine Parts"
    };
    return map[slug] || slug;
}

// Global Card Add to Cart Action
window.handleCardAddToCart = function (event, productId) {
    event.stopPropagation();
    const result = addToCart(productId, 1);
    if (result.success) {
        showToast("Added to Cart!", `1 × ${result.product.name} added. (Cart: ${result.count} items)`);
    }
};

// Global Card Wishlist Action
window.handleCardWishlist = function (event, productId) {
    event.stopPropagation();
    const isAdded = toggleWishlist(productId);
    const btn = event.currentTarget;
    btn.textContent = isAdded ? '♥' : '♡';
    if (isAdded) {
        btn.classList.add("active");
    } else {
        btn.classList.remove("active");
    }
    showToast(isAdded ? "Added to Wishlist" : "Removed from Wishlist", isAdded ? `Saved to your wishlist.` : `Removed from wishlist.`);
};

// ==========================================
// BLOG ARTICLE MODAL READER
// ==========================================
function openBlogArticleModal(blogId) {
    const article = getBlogArticleById(blogId);
    if (!article) return;

    document.getElementById("blogModalCategory").textContent = article.category;
    document.getElementById("blogModalTitle").textContent = article.title;
    document.getElementById("blogModalAuthor").textContent = article.author;
    document.getElementById("blogModalDate").textContent = article.date;
    document.getElementById("blogModalReadTime").textContent = article.readTime;
    document.getElementById("blogModalImg").src = article.image;
    document.getElementById("blogModalContent").innerHTML = article.content;

    const relatedBtn = document.getElementById("blogShopPartBtn");
    if (relatedBtn && article.relatedProductId) {
        relatedBtn.href = `product-details.html?id=${article.relatedProductId}`;
    }

    openModal('blogArticleModal');
}
window.openBlogArticleModal = openBlogArticleModal;

// ==========================================
// ACCOUNT MODAL & AUTH LOGIC
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
            ordersList.innerHTML = `<p class="no-orders-msg">No past orders found yet. Orders placed on cart checkout will appear here!</p>`;
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

function initAccountModalLogic() {
    // Already exposed on window
}

// ==========================================
// PART QUOTATION INQUIRY
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

    showToast("Quotation Submitted!", `Request ${quoteId} received! Our mechanics will contact you within 15 minutes.`);
}
window.handleQuotationSubmit = handleQuotationSubmit;

// ==========================================
// LIVE CHATBOT WIDGET
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

// Helpers
let toastTimeout;
function showToast(title, message) {
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

function formatPrice(num) {
    return Number(num).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getStarRatingString(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return "★".repeat(fullStars) + (halfStar ? "★" : "") + "☆".repeat(emptyStars);
}