// ==========================================================================
// KNOT BERRY CROCHET - APP ENGINE & INTERACTION LOGIC (RUPEES ₹ & ADMIN)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --- App State ---
  let cart = JSON.parse(localStorage.getItem('knotberry_cart')) || [];
  let wishlist = JSON.parse(localStorage.getItem('knotberry_wishlist')) || [];
  let orders = JSON.parse(localStorage.getItem('knotberry_orders')) || INITIAL_KNOT_BERRY_ORDERS;
  let reviews = JSON.parse(localStorage.getItem('knotberry_reviews')) || INITIAL_KNOT_BERRY_REVIEWS;

  let activeCategory = 'all';
  let searchQuery = '';
  let sortOption = 'featured';
  let isAdminLoggedIn = false;
  let currentAdminPassword = localStorage.getItem('knotberry_admin_password') || 'knotberry123';
  let registeredAdminEmail = localStorage.getItem('knotberry_admin_email') || 'knotberry.studios@gmail.com';
  let activeResetOtp = null;
  let activeTargetEmail = '';

  // --- DOM Elements ---
  const productsGrid = document.getElementById('products-grid');
  const reviewsGrid = document.getElementById('reviews-grid');
  const filterPillsContainer = document.getElementById('filter-pills-container');
  const searchInput = document.getElementById('catalog-search');
  const sortSelect = document.getElementById('catalog-sort');

  // Badges & Counters
  const cartCountEl = document.getElementById('cart-count');
  const wishlistCountEl = document.getElementById('wishlist-count');
  const navCartTotalEl = document.getElementById('nav-cart-total');

  // Drawers
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');
  const wishlistDrawer = document.getElementById('wishlist-drawer');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const openWishlistBtn = document.getElementById('open-wishlist-btn');
  const closeWishlistBtn = document.getElementById('close-wishlist-btn');

  // Cart elements
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartTotalPriceEl = document.getElementById('cart-total-price');
  const shippingProgressText = document.getElementById('shipping-progress-text');
  const shippingBarFill = document.getElementById('shipping-bar-fill');
  const cartWhatsappBtn = document.getElementById('cart-whatsapp-btn');
  const cartExpressCheckoutBtn = document.getElementById('cart-express-checkout-btn');

  // Wishlist elements
  const wishlistItemsContainer = document.getElementById('wishlist-items-container');

  // Modals
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewBody = document.getElementById('quick-view-body');
  const closeQuickViewBtn = document.getElementById('close-quick-view-btn');

  const customOrderModal = document.getElementById('custom-order-modal');
  const closeCustomModalBtn = document.getElementById('close-custom-modal-btn');
  const customOrderForm = document.getElementById('custom-order-form');
  const heroCustomBtn = document.getElementById('hero-custom-btn');
  const bannerCustomBtn = document.getElementById('banner-custom-btn');
  const footerCustomLink = document.getElementById('footer-custom-link');

  const checkoutModal = document.getElementById('checkout-modal');
  const closeCheckoutBtn = document.getElementById('close-checkout-btn');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutTotalDisplay = document.getElementById('checkout-total-display');
  const checkoutModalBody = document.getElementById('checkout-modal-body');

  // Customer Feedback / Reviews Modal
  const openFeedbackBtn = document.getElementById('open-feedback-btn');
  const feedbackModal = document.getElementById('feedback-modal');
  const closeFeedbackBtn = document.getElementById('close-feedback-btn');
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackStarPicker = document.getElementById('feedback-star-picker');
  const feedbackRatingVal = document.getElementById('feedback-rating-val');

  // Admin Portal Modals
  const openAdminBtn = document.getElementById('open-admin-btn');
  const adminLoginModal = document.getElementById('admin-login-modal');
  const closeAdminLoginBtn = document.getElementById('close-admin-login-btn');
  const adminLoginForm = document.getElementById('admin-login-form');
  const adminUsernameInput = document.getElementById('admin-username');
  const adminPasswordInput = document.getElementById('admin-password');

  // Admin Forgot Password Elements
  const adminLoginView = document.getElementById('admin-login-view');
  const adminForgotStep1View = document.getElementById('admin-forgot-step1-view');
  const adminForgotStep2View = document.getElementById('admin-forgot-step2-view');
  const adminForgotPasswordLink = document.getElementById('admin-forgot-password-link');
  const adminForgotStep1Form = document.getElementById('admin-forgot-step1-form');
  const adminResetIdentifier = document.getElementById('admin-reset-identifier');
  const backToLoginBtn1 = document.getElementById('back-to-login-btn-1');
  const adminForgotStep2Form = document.getElementById('admin-forgot-step2-form');
  const otpSentInfo = document.getElementById('otp-sent-info');
  const simulatedOtpCode = document.getElementById('simulated-otp-code');
  const adminEnteredOtp = document.getElementById('admin-entered-otp');
  const adminNewPassword = document.getElementById('admin-new-password');
  const adminConfirmPassword = document.getElementById('admin-confirm-password');
  const resendOtpBtn = document.getElementById('resend-otp-btn');
  const backToLoginBtn2 = document.getElementById('back-to-login-btn-2');

  const adminDashboardModal = document.getElementById('admin-dashboard-modal');
  const closeAdminDashboardBtn = document.getElementById('close-admin-dashboard-btn');
  const adminLogoutBtn = document.getElementById('admin-logout-btn');
  const adminOrdersTbody = document.getElementById('admin-orders-tbody');
  const adminReviewsTbody = document.getElementById('admin-reviews-tbody');
  const adminTotalOrdersEl = document.getElementById('admin-total-orders');
  const adminTotalRevenueEl = document.getElementById('admin-total-revenue');
  const adminTotalReviewsEl = document.getElementById('admin-total-reviews');

  // Toast Container
  const toastContainer = document.getElementById('toast-container');

  // --- Initial Render ---
  updateCategoryCounts();
  renderProducts();
  renderReviews();
  renderCart();
  renderWishlist();

  // ==========================================================================
  // PRODUCT CATALOG RENDERING & FILTERING
  // ==========================================================================

  function updateCategoryCounts() {
    const allCount = KNOT_BERRY_PRODUCTS.length;
    const clipsCount = KNOT_BERRY_PRODUCTS.filter(p => p.category === 'hair-clips').length;
    const keychainsCount = KNOT_BERRY_PRODUCTS.filter(p => p.category === 'keychains').length;
    const tiesCount = KNOT_BERRY_PRODUCTS.filter(p => p.category === 'hair-ties').length;

    const countAllEl = document.getElementById('count-all');
    const countClipsEl = document.getElementById('count-hair-clips');
    const countKeychainsEl = document.getElementById('count-keychains');
    const countTiesEl = document.getElementById('count-hair-ties');

    if (countAllEl) countAllEl.textContent = allCount;
    if (countClipsEl) countClipsEl.textContent = clipsCount;
    if (countKeychainsEl) countKeychainsEl.textContent = keychainsCount;
    if (countTiesEl) countTiesEl.textContent = tiesCount;
  }

  function getFilteredProducts() {
    return KNOT_BERRY_PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch = !query || 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.tag.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return (b.tag === 'Bestseller' ? 1 : 0) - (a.tag === 'Bestseller' ? 1 : 0);
    });
  }

  function renderProducts() {
    const products = getFilteredProducts();

    if (products.length === 0) {
      productsGrid.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">🧶🔍</div>
          <h3>No Sweet Goodies Found</h3>
          <p style="color: var(--text-muted); margin-top: 6px;">
            We couldn't find any crochet items matching "<strong>${escapeHtml(searchQuery)}</strong>".
          </p>
          <button class="btn btn-secondary" id="reset-filter-btn" style="margin-top: 18px;">
            Reset Filters 🌸
          </button>
        </div>
      `;

      const resetBtn = document.getElementById('reset-filter-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          setActiveFilterPill('all');
          renderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = products.map(product => {
      const isFavorited = wishlist.includes(product.id);
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            <span class="product-badge badge-${product.badgeColor}">${product.tag}</span>
            <button class="wishlist-heart-btn ${isFavorited ? 'favorited' : ''}" 
                    data-id="${product.id}" 
                    title="${isFavorited ? 'Remove from favorites' : 'Save to favorites'}">
              ${isFavorited ? '💖' : '🤍'}
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            <button class="quick-view-overlay-btn" data-id="${product.id}">
              <span>👁️ Quick View</span>
            </button>
          </div>

          <div class="product-body">
            <span class="product-cat-tag">${product.categoryLabel}</span>
            <h3 class="product-name" data-id="${product.id}" style="cursor: pointer;">
              ${product.name}
            </h3>

            <div class="product-rating">
              <span>★ ${product.rating.toFixed(1)}</span>
              <span class="product-reviews-count">(${product.reviewsCount} reviews)</span>
            </div>

            <div class="product-footer">
              <div class="price-wrap">
                <span class="current-price">₹${product.price}</span>
                ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : ''}
              </div>

              <button class="add-to-bag-btn" data-id="${product.id}">
                <span>+ Add</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachProductCardListeners();
  }

  function attachProductCardListeners() {
    document.querySelectorAll('.quick-view-overlay-btn, .product-name').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        openQuickView(id);
      });
    });

    document.querySelectorAll('.add-to-bag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        addToCart(id);
      });
    });

    document.querySelectorAll('.wishlist-heart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(e.currentTarget.dataset.id);
        toggleWishlist(id);
      });
    });
  }

  if (filterPillsContainer) {
    filterPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;

      const category = pill.dataset.filter;
      activeCategory = category;
      setActiveFilterPill(category);
      renderProducts();
    });
  }

  function setActiveFilterPill(category) {
    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.filter === category);
    });

    document.querySelectorAll('.nav-links .nav-link').forEach(link => {
      if (link.dataset.category) {
        link.classList.toggle('active', link.dataset.category === category);
      }
    });
  }

  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      activeCategory = category;
      setActiveFilterPill(category);
      renderProducts();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });

  document.querySelectorAll('.nav-links .nav-link[data-category]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.category;
      activeCategory = category;
      setActiveFilterPill(category);
      renderProducts();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortOption = e.target.value;
      renderProducts();
    });
  }

  // ==========================================================================
  // SHOPPING CART MANAGEMENT (RUPEES ₹)
  // ==========================================================================

  function saveCart() {
    localStorage.setItem('knotberry_cart', JSON.stringify(cart));
    renderCart();
  }

  function addToCart(productId, selectedColor = null, quantity = 1) {
    const product = KNOT_BERRY_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const chosenColor = selectedColor || (product.colors && product.colors[0]) || 'Standard';

    const existingIndex = cart.findIndex(item => item.id === productId && item.color === chosenColor);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: productId,
        color: chosenColor,
        quantity: quantity
      });
    }

    saveCart();
    showToast(`🍓 Added "${product.name}" to your bag!`);
    openCartDrawer();
  }

  function updateCartQuantity(productId, color, delta) {
    const itemIndex = cart.findIndex(item => item.id === productId && item.color === color);
    if (itemIndex === -1) return;

    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
      showToast('Item removed from bag');
    }

    saveCart();
  }

  function removeFromCart(productId, color) {
    cart = cart.filter(item => !(item.id === productId && item.color === color));
    saveCart();
    showToast('Item removed from bag');
  }

  function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;

    let subtotal = 0;
    cart.forEach(item => {
      const product = KNOT_BERRY_PRODUCTS.find(p => p.id === item.id);
      if (product) {
        subtotal += product.price * item.quantity;
      }
    });

    if (navCartTotalEl) {
      navCartTotalEl.textContent = `₹${subtotal}`;
    }

    // Free Shipping Threshold: ₹499
    const FREE_SHIPPING_GOAL = 499;
    const shippingCost = subtotal >= FREE_SHIPPING_GOAL || subtotal === 0 ? 0 : 49;
    const grandTotal = subtotal + shippingCost;

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
    if (cartShippingEl) {
      cartShippingEl.textContent = subtotal >= FREE_SHIPPING_GOAL ? 'FREE' : `₹${shippingCost}`;
      cartShippingEl.style.color = subtotal >= FREE_SHIPPING_GOAL ? 'var(--color-berry)' : 'var(--text-dark)';
    }
    if (cartTotalPriceEl) cartTotalPriceEl.textContent = `₹${grandTotal}`;
    if (checkoutTotalDisplay) checkoutTotalDisplay.textContent = `₹${grandTotal}`;

    // Progress bar update
    if (shippingProgressText && shippingBarFill) {
      if (subtotal >= FREE_SHIPPING_GOAL) {
        shippingProgressText.innerHTML = `<span>🎉</span> Yay! You unlocked <strong>FREE Shipping & Stickers!</strong>`;
        shippingBarFill.style.width = '100%';
      } else {
        const remaining = (FREE_SHIPPING_GOAL - subtotal);
        const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_GOAL) * 100));
        shippingProgressText.innerHTML = `<span>🍓</span> Add <strong>₹${remaining}</strong> more for FREE Shipping!`;
        shippingBarFill.style.width = `${percentage}%`;
      }
    }

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="drawer-empty">
          <div class="drawer-empty-icon">🛍️🌸</div>
          <h4 style="color: var(--text-dark); margin-bottom: 6px;">Your Bag is Empty</h4>
          <p style="font-size: 0.88rem;">Treat yourself to some sweet handmade crochet goodies!</p>
          <a href="#catalog" class="btn btn-primary" id="empty-cart-shop-btn" style="margin-top: 18px; font-size: 0.88rem;">
            Explore Shop 🍓
          </a>
        </div>
      `;

      const emptyShopBtn = document.getElementById('empty-cart-shop-btn');
      if (emptyShopBtn) {
        emptyShopBtn.addEventListener('click', closeAllDrawers);
      }
      return;
    }

    cartItemsContainer.innerHTML = cart.map(item => {
      const product = KNOT_BERRY_PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';

      const lineTotal = product.price * item.quantity;

      return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img">
          
          <div class="cart-item-info">
            <h4 class="cart-item-title">${product.name}</h4>
            <div class="cart-item-color">Color: <strong>${item.color}</strong></div>
            <div class="cart-item-price">₹${lineTotal} <span style="font-size: 0.78rem; color: var(--text-muted);">(₹${product.price} ea)</span></div>
          </div>

          <div class="cart-quantity-controls">
            <button class="qty-btn cart-qty-minus" data-id="${item.id}" data-color="${item.color}">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn cart-qty-plus" data-id="${item.id}" data-color="${item.color}">+</button>
          </div>

          <button class="cart-remove-btn" data-id="${item.id}" data-color="${item.color}" title="Remove item">
            &times;
          </button>
        </div>
      `;
    }).join('');

    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCartQuantity(parseInt(btn.dataset.id), btn.dataset.color, -1);
      });
    });

    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        updateCartQuantity(parseInt(btn.dataset.id), btn.dataset.color, 1);
      });
    });

    document.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        removeFromCart(parseInt(btn.dataset.id), btn.dataset.color);
      });
    });
  }

  // ==========================================================================
  // WISHLIST MANAGEMENT
  // ==========================================================================

  function saveWishlist() {
    localStorage.setItem('knotberry_wishlist', JSON.stringify(wishlist));
    renderWishlist();
    renderProducts();
  }

  function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    const product = KNOT_BERRY_PRODUCTS.find(p => p.id === productId);

    if (index > -1) {
      wishlist.splice(index, 1);
      showToast(`Removed from favorites 🤍`);
    } else {
      wishlist.push(productId);
      showToast(`💖 Saved "${product ? product.name : 'Item'}" to favorites!`);
    }

    saveWishlist();
  }

  function renderWishlist() {
    wishlistCountEl.textContent = wishlist.length;

    if (wishlist.length === 0) {
      wishlistItemsContainer.innerHTML = `
        <div class="drawer-empty">
          <div class="drawer-empty-icon">💖✨</div>
          <h4 style="color: var(--text-dark); margin-bottom: 6px;">No Favorites Saved Yet</h4>
          <p style="font-size: 0.88rem;">Tap the heart on any product to save it for later!</p>
        </div>
      `;
      return;
    }

    const favoritedProducts = KNOT_BERRY_PRODUCTS.filter(p => wishlist.includes(p.id));

    wishlistItemsContainer.innerHTML = favoritedProducts.map(product => `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${product.name}</h4>
          <div class="cart-item-price">₹${product.price}</div>
        </div>
        <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.8rem;" data-wishlist-add="${product.id}">
          + Bag
        </button>
        <button class="cart-remove-btn" data-wishlist-remove="${product.id}" title="Remove">
          &times;
        </button>
      </div>
    `).join('');

    document.querySelectorAll('[data-wishlist-add]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.wishlistAdd);
        addToCart(id);
      });
    });

    document.querySelectorAll('[data-wishlist-remove]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.wishlistRemove);
        toggleWishlist(id);
      });
    });
  }

  // ==========================================================================
  // QUICK VIEW MODAL
  // ==========================================================================

  function openQuickView(productId) {
    const product = KNOT_BERRY_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    let selectedColor = product.colors ? product.colors[0] : '';
    let selectedQuantity = 1;

    quickViewBody.innerHTML = `
      <div class="qv-image-side">
        <div class="qv-image-container" id="qv-img-zoom-box">
          <img src="${product.image}" alt="${product.name}" class="qv-main-img" id="qv-main-display">
          <span class="qv-zoom-badge"><span>🔍</span> Hover to magnify</span>
        </div>
      </div>

      <div class="qv-details-side">
        <span class="product-cat-tag">${product.categoryLabel}</span>
        <h3>${product.name}</h3>

        <div class="product-rating" style="margin-bottom: 12px;">
          <span>★ ${product.rating.toFixed(1)}</span>
          <span class="product-reviews-count">(${product.reviewsCount} customer reviews)</span>
          <span style="margin-left: 8px; font-size: 0.8rem; color: #2E7D32; font-weight: 700;">● In Stock (${product.stockLeft} available)</span>
        </div>

        <div class="price-wrap" style="margin-bottom: 16px;">
          <span class="current-price" style="font-size: 1.6rem;">₹${product.price}</span>
          ${product.originalPrice ? `<span class="original-price" style="font-size: 1.1rem;">₹${product.originalPrice}</span>` : ''}
        </div>

        <p class="qv-desc">${product.description}</p>

        <ul class="qv-specs-list">
          ${product.features.map(f => `<li><span>🌸</span> ${f}</li>`).join('')}
          <li><span>📏</span> <strong>Size:</strong> ${product.dimensions}</li>
          <li><span>🧼</span> <strong>Care:</strong> ${product.care}</li>
        </ul>

        ${product.colors ? `
          <div class="color-picker-wrap">
            <label style="font-size: 0.88rem; font-weight: 700;">Select Shade:</label>
            <div class="color-options" id="qv-color-options">
              ${product.colors.map((c, i) => `
                <button type="button" class="color-pill ${i === 0 ? 'active' : ''}" data-color="${c}">
                  ${c}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div style="display: flex; align-items: center; gap: 14px; margin-top: 20px;">
          <div class="cart-quantity-controls" style="padding: 6px 14px;">
            <button class="qty-btn" id="qv-qty-minus">−</button>
            <span class="qty-value" id="qv-qty-val" style="font-size: 1rem;">1</span>
            <button class="qty-btn" id="qv-qty-plus">+</button>
          </div>

          <button class="btn btn-primary" id="qv-add-btn" style="flex-grow: 1;">
            Add to Bag 🛍️
          </button>
        </div>
      </div>
    `;

    const colorPills = document.querySelectorAll('#qv-color-options .color-pill');
    colorPills.forEach(pill => {
      pill.addEventListener('click', () => {
        colorPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedColor = pill.dataset.color;
      });
    });

    const qtyMinus = document.getElementById('qv-qty-minus');
    const qtyPlus = document.getElementById('qv-qty-plus');
    const qtyVal = document.getElementById('qv-qty-val');

    if (qtyMinus && qtyPlus && qtyVal) {
      qtyMinus.addEventListener('click', () => {
        if (selectedQuantity > 1) {
          selectedQuantity--;
          qtyVal.textContent = selectedQuantity;
        }
      });
      qtyPlus.addEventListener('click', () => {
        if (selectedQuantity < product.stockLeft) {
          selectedQuantity++;
          qtyVal.textContent = selectedQuantity;
        }
      });
    }

    const qvAddBtn = document.getElementById('qv-add-btn');
    if (qvAddBtn) {
      qvAddBtn.addEventListener('click', () => {
        addToCart(product.id, selectedColor, selectedQuantity);
        closeQuickViewModal();
      });
    }

    // Magnifier / Zoom interaction
    const zoomBox = document.getElementById('qv-img-zoom-box');
    const zoomImg = document.getElementById('qv-main-display');

    if (zoomBox && zoomImg) {
      zoomBox.addEventListener('mousemove', (e) => {
        const rect = zoomBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

        zoomImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        zoomImg.style.transform = 'scale(2.2)';
      });

      zoomBox.addEventListener('mouseleave', () => {
        zoomImg.style.transformOrigin = 'center center';
        zoomImg.style.transform = 'scale(1)';
      });

      // Click / tap to toggle zoom
      zoomBox.addEventListener('click', () => {
        if (zoomImg.style.transform && zoomImg.style.transform.includes('scale(2.2)')) {
          zoomImg.style.transform = 'scale(1)';
          zoomImg.style.transformOrigin = 'center center';
        } else {
          zoomImg.style.transform = 'scale(2.2)';
        }
      });
    }

    quickViewModal.classList.add('active');
  }

  function closeQuickViewModal() {
    quickViewModal.classList.remove('active');
  }

  // ==========================================================================
  // WHATSAPP ORDER GENERATOR (RUPEES ₹)
  // ==========================================================================

  function handleWhatsAppOrder() {
    if (cart.length === 0) {
      showToast('Please add items to your bag first! 🍓');
      return;
    }

    let message = `🍓 *KNOTBERRY.STUDIOS - NEW ORDER* 🍓\n\n`;
    message += `Hello knotberry.studios! I would love to place an order for the following handmade crochet goodies:\n\n`;

    let subtotal = 0;
    cart.forEach((item, index) => {
      const product = KNOT_BERRY_PRODUCTS.find(p => p.id === item.id);
      if (product) {
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        message += `${index + 1}. *${product.name}*\n`;
        message += `   • Shade: ${item.color}\n`;
        message += `   • Quantity: ${item.quantity}\n`;
        message += `   • Price: ₹${itemTotal}\n\n`;
      }
    });

    const shipping = subtotal >= 499 ? 0 : 49;
    const grandTotal = subtotal + shipping;

    message += `-------------------------\n`;
    message += `Subtotal: ₹${subtotal}\n`;
    message += `Shipping: ${shipping === 0 ? 'FREE' : '₹' + shipping}\n`;
    message += `*Total Order Value: ₹${grandTotal}*\n\n`;
    message += `Please confirm product availability and payment details. Thank you! 💖`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=917758014770&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  }

  if (cartWhatsappBtn) {
    cartWhatsappBtn.addEventListener('click', handleWhatsAppOrder);
  }

  // ==========================================================================
  // CHECKOUT MODAL & ORDER RECORD GENERATION
  // ==========================================================================

  function openCheckoutModal() {
    if (cart.length === 0) {
      showToast('Your bag is empty! Add items first 🍓');
      return;
    }
    closeAllDrawers();
    checkoutModal.classList.add('active');
  }

  if (cartExpressCheckoutBtn) {
    cartExpressCheckoutBtn.addEventListener('click', openCheckoutModal);
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const orderNumber = 'KB-' + Math.floor(100000 + Math.random() * 900000);
      const totalAmount = cartTotalPriceEl.textContent;

      const customerFname = document.getElementById('checkout-fname').value.trim();
      const customerLname = document.getElementById('checkout-lname').value.trim();
      const customerFullName = `${customerFname} ${customerLname}`;
      const customerPhone = document.getElementById('checkout-phone').value.trim();
      const customerEmail = document.getElementById('checkout-email').value.trim();
      const customerAddress = document.getElementById('checkout-address').value.trim();
      const customerCity = document.getElementById('checkout-city').value.trim();
      const paymentMethod = document.getElementById('checkout-payment-method').value;

      // Calculate items and save to orders list
      let subtotal = 0;
      const orderedItems = cart.map(item => {
        const prod = KNOT_BERRY_PRODUCTS.find(p => p.id === item.id);
        const itemPrice = prod ? prod.price : 0;
        subtotal += itemPrice * item.quantity;
        return {
          name: prod ? prod.name : 'Crochet Item',
          color: item.color,
          quantity: item.quantity,
          price: itemPrice
        };
      });

      const shipping = subtotal >= 499 ? 0 : 49;
      const totalNum = subtotal + shipping;

      const newOrder = {
        id: orderNumber,
        customerName: customerFullName,
        phone: customerPhone,
        email: customerEmail,
        address: `${customerAddress}, ${customerCity}`,
        items: orderedItems,
        subtotal: subtotal,
        shipping: shipping,
        total: totalNum,
        status: "Making with Love",
        date: "Today (" + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ")",
        paymentMethod: paymentMethod
      };

      orders.unshift(newOrder);
      localStorage.setItem('knotberry_orders', JSON.stringify(orders));

      // Trigger celebration
      triggerConfetti();

      // Show receipt
      checkoutModalBody.innerHTML = `
        <div class="order-success-box">
          <div class="success-icon">🍓🎉✨</div>
          <h3 style="color: var(--color-berry); font-size: 1.8rem; margin-bottom: 8px;">Order Confirmed!</h3>
          <p style="color: var(--text-muted); margin-bottom: 20px;">
            Thank you for supporting handmade craft! knotberry.studios is preparing your order with delicate care.
          </p>
          
          <div style="background: var(--bg-soft-pink); border-radius: var(--radius-md); padding: 18px; text-align: left; margin-bottom: 20px; border: 1px dashed var(--border-pink);">
            <div style="margin-bottom: 8px;">
              <strong>Your Unique Order ID:</strong> 
              <span style="font-family: monospace; font-size: 1.15rem; color: var(--color-primary-dark); font-weight: 700;">${orderNumber}</span>
            </div>
            <div style="margin-bottom: 8px;"><strong>Customer:</strong> ${escapeHtml(customerFullName)}</div>
            <div style="margin-bottom: 8px;"><strong>Total Paid:</strong> ${totalAmount} (${paymentMethod})</div>
            <div style="margin-bottom: 8px;"><strong>Status:</strong> <span class="status-pill status-crafting">Making with Love</span></div>
            <div><strong>Complimentary:</strong> Free Strawberry Sticker Pack & Pink Ribbon 🎀</div>
          </div>

          <div style="background: #FFF8E7; border-radius: var(--radius-md); padding: 12px 16px; font-size: 0.84rem; color: #78350F; margin-bottom: 20px; border: 1px solid #E5A93C;">
            💡 <em>Please save your <strong>Order ID (${orderNumber})</strong>! You will need it to leave verified customer feedback.</em>
          </div>

          <button class="btn btn-primary" id="success-continue-btn" style="width: 100%;">
            Continue Shopping 🌸
          </button>
        </div>
      `;

      // Clear cart
      cart = [];
      saveCart();

      const continueBtn = document.getElementById('success-continue-btn');
      if (continueBtn) {
        continueBtn.addEventListener('click', () => {
          checkoutModal.classList.remove('active');
          location.reload();
        });
      }
    });
  }

  // ==========================================================================
  // CUSTOMER REVIEWS & VERIFIED FEEDBACK SYSTEM
  // ==========================================================================

  function renderReviews() {
    if (!reviewsGrid) return;

    reviewsGrid.innerHTML = reviews.map(r => `
      <div class="review-card" data-review-id="${r.id}">
        <div class="review-top">
          <div class="reviewer-avatar">${r.avatar || '🌸'}</div>
          <div class="reviewer-info">
            <h5>
              ${escapeHtml(r.name)}
              ${r.verified ? `<span class="verified-badge">✓ Verified Buyer 🍓</span>` : ''}
            </h5>
            <span>${escapeHtml(r.location)} • ${escapeHtml(r.date)}</span>
            ${r.orderId ? `<span class="review-order-tag">Order #${escapeHtml(r.orderId)}</span>` : ''}
          </div>
        </div>
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <p class="review-text">"${escapeHtml(r.comment)}"</p>
        <div class="review-product-tag">Purchased: ${escapeHtml(r.product)}</div>
      </div>
    `).join('');
  }

  // Star Rating Interaction in Feedback Form
  if (feedbackStarPicker) {
    const stars = feedbackStarPicker.querySelectorAll('.star-btn');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = parseInt(star.dataset.rating);
        if (feedbackRatingVal) feedbackRatingVal.value = rating;

        stars.forEach(s => {
          const r = parseInt(s.dataset.rating);
          s.classList.toggle('active', r <= rating);
        });
      });
    });
  }

  // Open & Close Feedback Modal
  if (openFeedbackBtn) {
    openFeedbackBtn.addEventListener('click', () => {
      closeAllDrawers();
      if (feedbackModal) feedbackModal.classList.add('active');
    });
  }

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', closeAllDrawers);
  }

  // Submit Feedback with STRICT ORDER ID VERIFICATION
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const enteredOrderId = document.getElementById('feedback-order-id').value.trim().toUpperCase();
      const customerName = document.getElementById('feedback-customer-name').value.trim();
      const location = document.getElementById('feedback-location').value.trim();
      const product = document.getElementById('feedback-product').value;
      const comment = document.getElementById('feedback-comment').value.trim();
      const rating = parseInt(feedbackRatingVal.value) || 5;

      // Verification check:
      // Must match an order in `orders` OR start with 'KB-' and have at least 5 alphanumeric characters
      const matchedOrder = orders.find(o => o.id.toUpperCase() === enteredOrderId);
      const isValidFormat = /^KB-[A-Z0-9]{4,10}$/i.test(enteredOrderId);

      if (!matchedOrder && !isValidFormat) {
        showToast('⚠️ Verification Failed: Please enter a valid Order ID (e.g. KB-781924) from your order receipt.');
        alert('⚠️ Verified Customer Notice:\n\nWe could not verify the Order ID "' + enteredOrderId + '".\n\nPlease enter the authentic Order ID issued to you upon placing an order with Knot Berry (e.g., KB-781924).');
        return;
      }

      const newReview = {
        id: Date.now(),
        name: customerName,
        avatar: "🍓",
        location: location,
        orderId: enteredOrderId,
        rating: rating,
        date: "Just now",
        product: product,
        comment: comment,
        verified: true
      };

      reviews.unshift(newReview);
      localStorage.setItem('knotberry_reviews', JSON.stringify(reviews));

      renderReviews();
      closeAllDrawers();
      feedbackForm.reset();

      showToast('💖 Thank you! Your verified review has been published!');
      triggerConfetti();

      // Scroll to reviews section
      document.getElementById('reviews').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // ADMIN PORTAL & DASHBOARD MANAGEMENT
  // ==========================================================================

  function openAdminPortal() {
    closeAllDrawers();
    showAdminView('login');
    if (isAdminLoggedIn) {
      openAdminDashboard();
    } else {
      adminLoginModal.classList.add('active');
    }
  }

  function showAdminView(viewName) {
    if (adminLoginView) adminLoginView.style.display = viewName === 'login' ? 'block' : 'none';
    if (adminForgotStep1View) adminForgotStep1View.style.display = viewName === 'step1' ? 'block' : 'none';
    if (adminForgotStep2View) adminForgotStep2View.style.display = viewName === 'step2' ? 'block' : 'none';
  }

  function maskEmail(email) {
    if (!email || !email.includes('@')) return email;
    const [user, domain] = email.split('@');
    if (user.length <= 2) return `${user}***@${domain}`;
    return `${user.substring(0, 2)}***${user.slice(-1)}@${domain}`;
  }

  if (openAdminBtn) openAdminBtn.addEventListener('click', openAdminPortal);
  if (closeAdminLoginBtn) closeAdminLoginBtn.addEventListener('click', closeAllDrawers);

  if (adminForgotPasswordLink) {
    adminForgotPasswordLink.addEventListener('click', () => {
      showAdminView('step1');
      if (adminResetIdentifier) adminResetIdentifier.focus();
    });
  }

  if (backToLoginBtn1) {
    backToLoginBtn1.addEventListener('click', () => {
      showAdminView('login');
    });
  }

  if (backToLoginBtn2) {
    backToLoginBtn2.addEventListener('click', () => {
      showAdminView('login');
    });
  }

  // Step 1: Send OTP to registered Gmail
  if (adminForgotStep1Form) {
    adminForgotStep1Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = adminResetIdentifier.value.trim();
      if (!inputVal) return;

      activeTargetEmail = inputVal.includes('@') ? inputVal : registeredAdminEmail;
      activeResetOtp = Math.floor(100000 + Math.random() * 900000).toString();

      const masked = maskEmail(activeTargetEmail);
      if (otpSentInfo) {
        otpSentInfo.textContent = `We sent a 6-digit security code to your registered Gmail (${masked}).`;
      }
      if (simulatedOtpCode) {
        simulatedOtpCode.textContent = activeResetOtp;
      }

      showToast(`📧 Verification OTP sent to ${masked}!`);
      showAdminView('step2');
      if (adminEnteredOtp) adminEnteredOtp.focus();
    });
  }

  // Resend OTP
  if (resendOtpBtn) {
    resendOtpBtn.addEventListener('click', () => {
      activeResetOtp = Math.floor(100000 + Math.random() * 900000).toString();
      if (simulatedOtpCode) simulatedOtpCode.textContent = activeResetOtp;
      showToast(`🔄 New verification code sent to ${maskEmail(activeTargetEmail)}!`);
    });
  }

  // Step 2: Verify OTP and Reset Password
  if (adminForgotStep2Form) {
    adminForgotStep2Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const enteredOtp = adminEnteredOtp.value.trim();
      const newPass = adminNewPassword.value;
      const confirmPass = adminConfirmPassword.value;

      if (enteredOtp !== activeResetOtp) {
        showToast('❌ Invalid OTP! Please check the code sent to your Gmail.');
        alert('Invalid OTP code. Please enter the 6-digit code shown in the Gmail notification alert.');
        return;
      }

      if (newPass.length < 4) {
        showToast('⚠️ Password must be at least 4 characters long.');
        return;
      }

      if (newPass !== confirmPass) {
        showToast('⚠️ Passwords do not match! Please re-type.');
        return;
      }

      currentAdminPassword = newPass;
      localStorage.setItem('knotberry_admin_password', newPass);

      showToast('🎉 Password reset successfully! Please sign in with your new password.');
      triggerConfetti();

      adminForgotStep1Form.reset();
      adminForgotStep2Form.reset();
      if (adminPasswordInput) adminPasswordInput.value = newPass;
      showAdminView('login');
    });
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAdminLogin();
    });
  }

  function handleAdminLogin() {
    const user = adminUsernameInput.value.trim();
    const pass = adminPasswordInput.value.trim();

    if (user === 'admin' && pass === currentAdminPassword) {
      isAdminLoggedIn = true;
      adminLoginModal.classList.remove('active');
      openAdminDashboard();
      showToast('👑 Welcome Admin! knotberry.studios control active.');
    } else {
      alert('Invalid admin username or password. Click "Forgot Password?" if you need to reset it.');
    }
  }

  function openAdminDashboard() {
    renderAdminDashboard();
    adminDashboardModal.classList.add('active');
  }

  if (closeAdminDashboardBtn) closeAdminDashboardBtn.addEventListener('click', closeAllDrawers);

  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', () => {
      isAdminLoggedIn = false;
      closeAllDrawers();
      showToast('Logged out of Admin Portal 🔒');
    });
  }

  // Admin Tab Switcher
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.dataset.adminTab;
      const ordersContent = document.getElementById('admin-tab-orders-content');
      const reviewsContent = document.getElementById('admin-tab-reviews-content');

      if (targetTab === 'orders') {
        ordersContent.style.display = 'block';
        reviewsContent.style.display = 'none';
      } else {
        ordersContent.style.display = 'none';
        reviewsContent.style.display = 'block';
      }
    });
  });

  function renderAdminDashboard() {
    // 1. Stats
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalReviews = reviews.length;

    if (adminTotalOrdersEl) adminTotalOrdersEl.textContent = totalOrders;
    if (adminTotalRevenueEl) adminTotalRevenueEl.textContent = `₹${totalRevenue}`;
    if (adminTotalReviewsEl) adminTotalReviewsEl.textContent = totalReviews;

    // 2. Render Orders Table
    if (adminOrdersTbody) {
      if (orders.length === 0) {
        adminOrdersTbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No orders recorded yet.</td></tr>`;
      } else {
        adminOrdersTbody.innerHTML = orders.map((order, idx) => {
          let statusClass = 'status-pending';
          if (order.status === 'Making with Love') statusClass = 'status-crafting';
          if (order.status === 'Dispatched') statusClass = 'status-dispatched';
          if (order.status === 'Delivered') statusClass = 'status-delivered';

          const itemsSummary = (order.items || []).map(i => `${i.quantity}x ${i.name} (${i.color || 'Std'})`).join('<br>');

          return `
            <tr>
              <td><strong style="font-family: monospace; color: var(--color-primary-dark);">${order.id}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${order.date || ''}</span></td>
              <td><strong>${escapeHtml(order.customerName)}</strong><br><span style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(order.address || '')}</span></td>
              <td>${escapeHtml(order.phone || '')}<br><span style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(order.email || '')}</span></td>
              <td style="font-size: 0.82rem;">${itemsSummary || 'N/A'}</td>
              <td><strong style="color: var(--color-berry);">₹${order.total}</strong></td>
              <td><span class="status-pill ${statusClass}">${order.status}</span></td>
              <td>
                <button class="btn-admin-action btn-admin-status" data-order-idx="${idx}" title="Change status">
                  Update Status 🔄
                </button>
              </td>
            </tr>
          `;
        }).join('');

        // Attach status update listeners
        adminOrdersTbody.querySelectorAll('.btn-admin-status').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.orderIdx);
            cycleOrderStatus(idx);
          });
        });
      }
    }

    // 3. Render Reviews Table
    if (adminReviewsTbody) {
      if (reviews.length === 0) {
        adminReviewsTbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No customer reviews available.</td></tr>`;
      } else {
        adminReviewsTbody.innerHTML = reviews.map((r, idx) => `
          <tr>
            <td><strong>${escapeHtml(r.name)}</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">${escapeHtml(r.location)}</span></td>
            <td><code style="color: var(--color-primary-dark); font-weight: 700;">${escapeHtml(r.orderId || 'N/A')}</code></td>
            <td><span style="color: var(--accent-gold);">${'★'.repeat(r.rating)}</span></td>
            <td style="font-size: 0.82rem;">${escapeHtml(r.product)}</td>
            <td style="max-width: 260px; font-size: 0.85rem; font-style: italic;">"${escapeHtml(r.comment)}"</td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn-admin-action btn-admin-edit" data-review-idx="${idx}">Edit ✏️</button>
                <button class="btn-admin-action btn-admin-delete" data-review-idx="${idx}">Delete 🗑️</button>
              </div>
            </td>
          </tr>
        `).join('');

        // Attach edit / delete listeners
        adminReviewsTbody.querySelectorAll('.btn-admin-edit').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.reviewIdx);
            editReviewPrompt(idx);
          });
        });

        adminReviewsTbody.querySelectorAll('.btn-admin-delete').forEach(btn => {
          btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.reviewIdx);
            deleteReview(idx);
          });
        });
      }
    }
  }

  function cycleOrderStatus(orderIndex) {
    if (!orders[orderIndex]) return;

    const statuses = ['Pending', 'Making with Love', 'Dispatched', 'Delivered'];
    const current = orders[orderIndex].status || 'Pending';
    const nextIndex = (statuses.indexOf(current) + 1) % statuses.length;
    orders[orderIndex].status = statuses[nextIndex];

    localStorage.setItem('knotberry_orders', JSON.stringify(orders));
    renderAdminDashboard();
    showToast(`Order ${orders[orderIndex].id} status updated to: ${orders[orderIndex].status}`);
  }

  function editReviewPrompt(reviewIndex) {
    const review = reviews[reviewIndex];
    if (!review) return;

    const newComment = prompt(`Edit Review from ${review.name}:`, review.comment);
    if (newComment !== null && newComment.trim() !== '') {
      reviews[reviewIndex].comment = newComment.trim();
      localStorage.setItem('knotberry_reviews', JSON.stringify(reviews));
      renderAdminDashboard();
      renderReviews();
      showToast('Review updated successfully 🍓');
    }
  }

  function deleteReview(reviewIndex) {
    const review = reviews[reviewIndex];
    if (!review) return;

    if (confirm(`Are you sure you want to delete the review by "${review.name}"?`)) {
      reviews.splice(reviewIndex, 1);
      localStorage.setItem('knotberry_reviews', JSON.stringify(reviews));
      renderAdminDashboard();
      renderReviews();
      showToast('Review deleted from store');
    }
  }

  // ==========================================================================
  // CUSTOM ORDER & OTHER UTILITIES
  // ==========================================================================

  function openCustomOrderModal() {
    customOrderModal.classList.add('active');
  }

  if (heroCustomBtn) heroCustomBtn.addEventListener('click', openCustomOrderModal);
  if (bannerCustomBtn) bannerCustomBtn.addEventListener('click', openCustomOrderModal);
  if (footerCustomLink) footerCustomLink.addEventListener('click', openCustomOrderModal);

  if (customOrderForm) {
    customOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      customOrderModal.classList.remove('active');
      showToast('💌 Custom request received! Knot Berry will message you shortly.');
      triggerConfetti();
    });
  }

  function openCartDrawer() {
    closeAllDrawers();
    drawerBackdrop.classList.add('active');
    cartDrawer.classList.add('active');
  }

  function openWishlistDrawer() {
    closeAllDrawers();
    drawerBackdrop.classList.add('active');
    wishlistDrawer.classList.add('active');
  }

  function closeAllDrawers() {
    drawerBackdrop.classList.remove('active');
    if (cartDrawer) cartDrawer.classList.remove('active');
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (quickViewModal) quickViewModal.classList.remove('active');
    if (customOrderModal) customOrderModal.classList.remove('active');
    if (checkoutModal) checkoutModal.classList.remove('active');
    if (feedbackModal) feedbackModal.classList.remove('active');
    if (adminLoginModal) adminLoginModal.classList.remove('active');
    if (adminDashboardModal) adminDashboardModal.classList.remove('active');
    showAdminView('login');
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeAllDrawers);
  if (openWishlistBtn) openWishlistBtn.addEventListener('click', openWishlistDrawer);
  if (closeWishlistBtn) closeWishlistBtn.addEventListener('click', closeAllDrawers);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeAllDrawers);
  if (closeQuickViewBtn) closeQuickViewBtn.addEventListener('click', closeQuickViewModal);
  if (closeCustomModalBtn) closeCustomModalBtn.addEventListener('click', closeAllDrawers);
  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', closeAllDrawers);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDrawers();
  });

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🎀 Welcome to Berry Club! Use code BERRY10 for 10% off!');
      newsletterForm.reset();
    });
  }

  const footerTrackLink = document.getElementById('footer-track-link');
  if (footerTrackLink) {
    footerTrackLink.addEventListener('click', () => {
      showToast('📦 Tracking details are sent via SMS/WhatsApp upon dispatch!');
    });
  }

  const footerContactLink = document.getElementById('footer-contact-link');
  if (footerContactLink) {
    footerContactLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://api.whatsapp.com/send?phone=917758014770&text=Hi%20Knot%20Berry!%20🍓', '_blank');
    });
  }

  // Footer UPI ID Copy Handler
  const btnCopyUpi = document.getElementById('btn-copy-upi');
  if (btnCopyUpi) {
    btnCopyUpi.addEventListener('click', () => {
      const upiId = 'bhumiawale08@okaxis';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(upiId).then(() => {
          onUpiCopied();
        }).catch(() => fallbackCopy(upiId));
      } else {
        fallbackCopy(upiId);
      }
    });
  }

  function onUpiCopied() {
    const btn = document.getElementById('btn-copy-upi');
    if (btn) {
      btn.innerHTML = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = '<span class="copy-icon">📋</span> <span class="copy-label">Copy</span>';
        btn.classList.remove('copied');
      }, 2500);
    }
    showToast('UPI ID copied: bhumiawale08@okaxis 📱✨');
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    onUpiCopied();
  }

  // Toast Notification Utility
  function showToast(message) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span> <span>${escapeHtml(message)}</span>`;

    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3400);
  }

  // Confetti Engine
  function triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#FF5C8A', '#FF3366', '#FFB6CE', '#FFE5EC', '#FFD166', '#80ED99', '#C77DFF'];
    const particles = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 9 + 5,
        h: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.8) * 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1
      });
    }

    let animationId;
    function renderConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.009;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        animationId = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationId);
      }
    }

    renderConfetti();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
});
