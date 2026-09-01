// homejs.js - AutoGenuine Homepage Controller

let currentCategory = "all";
let isExpanded = false;
let currentSearchQuery = "";
const INITIAL_LIMIT = 4;

document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Product Catalog Render
    renderCatalog();

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

    // 6. Live Chat
    const chatBox = document.getElementById("chatBox");
    const chatToggle = document.getElementById("chatToggle");
    const chatClose = document.getElementById("chatClose");

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
});

// Master Catalog Rendering Function
function renderCatalog() {
    const grid = document.getElementById("mainProductGrid");
    const seeMoreBtn = document.getElementById("seeMoreBtn");
    const seeMoreContainer = document.getElementById("seeMoreContainer");
    const statusBar = document.getElementById("searchStatusBar");
    const statusText = document.getElementById("searchStatusText");

    if (!grid) return;

    // Get products based on active category
    let allProducts = getAllProducts();
    let filtered = allProducts;

    // Filter by Category
    if (currentCategory && currentCategory !== "all") {
        filtered = filtered.filter(p => 
            p.categorySlug.toLowerCase() === currentCategory.toLowerCase() ||
            p.category.toLowerCase().includes(currentCategory.toLowerCase())
        );
    }

    // Filter by Search Query (if any)
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

    const totalMatching = filtered.length;

    // Update Status Bar
    if (currentCategory !== "all" || currentSearchQuery) {
        statusBar.style.display = "flex";
        let label = [];
        if (currentCategory !== "all") {
            const catName = getCategoryDisplayName(currentCategory);
            label.push(`Category: <strong>${catName}</strong>`);
        }
        if (currentSearchQuery) {
            label.push(`Keyword: <strong>"${currentSearchQuery}"</strong>`);
        }
        statusText.innerHTML = `Showing results for ${label.join(" & ")} (${totalMatching} ${totalMatching === 1 ? 'part' : 'parts'} found)`;
    } else {
        statusBar.style.display = "none";
    }

    // Determine slice to display
    let displayed = filtered;
    if (!isExpanded && currentCategory === "all" && !currentSearchQuery) {
        displayed = filtered.slice(0, INITIAL_LIMIT);
    }

    // Handle Empty Search Results
    if (displayed.length === 0) {
        grid.innerHTML = `
            <div class="no-results-card">
                <h3>🔍 No matching spare parts found</h3>
                <p>We couldn't find any genuine parts matching your search criteria. Try a different search term or category.</p>
                <button class="primary-button" onclick="resetCatalogFilter()">View All Genuine Parts →</button>
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
        if (currentCategory !== "all" || currentSearchQuery || allProducts.length <= INITIAL_LIMIT) {
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

    // Update Pills Active Class
    const filterPills = document.querySelectorAll("#categoryFilterPills .filter-pill");
    filterPills.forEach(pill => {
        if (pill.getAttribute("data-category") === currentCategory) {
            pill.classList.add("active");
        } else {
            pill.classList.remove("active");
        }
    });

    // Update Hero Select if exists
    const searchCat = document.getElementById("heroSearchCategory");
    if (searchCat) {
        searchCat.value = currentCategory;
    }
    const searchInput = document.getElementById("heroSearchInput");
    if (searchInput) {
        searchInput.value = "";
    }

    renderCatalog();
    document.getElementById("productsSection")?.scrollIntoView({ behavior: "smooth" });
};

// Global Reset Filter
window.resetCatalogFilter = function () {
    currentCategory = "all";
    currentSearchQuery = "";
    isExpanded = true;

    const filterPills = document.querySelectorAll("#categoryFilterPills .filter-pill");
    filterPills.forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-category") === "all");
    });

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

    // Update Filter Pills
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

// Toast notification helper
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