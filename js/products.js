/**
 * SHOP HOA NGUYỄN MIỀN - HIỂN THỊ DANH MỤC SẢN PHẨM
 * Module: products.js
 * Chức năng: Render sản phẩm, bộ lọc 5 trục, Quick Finder,
 * Seasonal Campaign, Best Sellers, Color Swatch.
 */

// HIỂN THỊ DANH SÁCH HOA TRÊN GIAO DIỆN
function renderProductList() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  // Lọc sản phẩm theo state
  let filtered = FLOWER_PRODUCTS.filter(product => {
    // Lọc theo Dịp
    if (appState.activeFilters.occasion !== 'all') {
      if (!product.occasion.includes(appState.activeFilters.occasion)) return false;
    }
    // Lọc theo Kiểu dáng
    if (appState.activeFilters.style !== 'all') {
      if (product.style !== appState.activeFilters.style) return false;
    }
    // Lọc theo Loài hoa
    if (appState.activeFilters.flowerType !== 'all') {
      if (product.flowerType !== appState.activeFilters.flowerType) return false;
    }
    // Lọc theo Đối tượng
    if (appState.activeFilters.recipient !== 'all') {
      if (!product.recipient.includes(appState.activeFilters.recipient)) return false;
    }
    // Lọc theo Mức giá
    if (appState.activeFilters.priceRange !== 'all') {
      if (product.priceRange !== appState.activeFilters.priceRange) return false;
    }
    // Lọc theo Màu sắc chủ đạo (Chuẩn đặc tả 3.3)
    if (appState.activeFilters.color !== 'all') {
      if (product.color !== appState.activeFilters.color) return false;
    }
    // Lọc theo từ khóa tìm kiếm
    if (appState.activeFilters.keyword.trim() !== '') {
      const q = appState.activeFilters.keyword.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchComp = product.composition.toLowerCase().includes(q);
      const matchSku = product.sku.toLowerCase().includes(q);
      if (!matchName && !matchComp && !matchSku) return false;
    }
    return true;
  });

  // Sắp xếp
  if (appState.activeFilters.sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (appState.activeFilters.sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (appState.activeFilters.sort === 'reviews') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else {
    // Mặc định: bán chạy / rating
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Cập nhật số lượng tìm thấy
  const countBadge = document.getElementById('filter-results-count');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} mẫu hoa tươi`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🌸</div>
        <h3>Không tìm thấy mẫu hoa phù hợp</h3>
        <p>Rất tiếc bộ lọc hiện tại chưa có sản phẩm tương ứng. Bạn hãy thử chọn lại màu sắc hoặc mức giá khác nhé!</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Xóa tất cả bộ lọc</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => {
    const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    const secondaryImg = (p.gallery && p.gallery[1]) ? p.gallery[1] : p.image;
    return `
      <div class="flower-card" data-id="${p.id}">
        <div class="flower-img-wrap" onclick="openProductDetailModal(${p.id})">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="flower-img">
          <img src="${secondaryImg}" alt="${p.name} góc thứ 2" loading="lazy" class="flower-img-secondary">
          ${p.badge ? `<span class="flower-badge badge-${p.badgeType}">${p.badge}</span>` : ''}
          <span class="discount-tag">-${discountPercent}%</span>
          <button class="quick-look-btn" onclick="event.stopPropagation(); openProductDetailModal(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Xem Nhanh
          </button>
        </div>
        <div class="flower-info">
          <div class="flower-meta">
            <span class="flower-sku">${p.sku}</span>
            <div class="flower-rating">
              <span class="star">★</span> ${p.rating} <span class="review-count">(${p.reviewsCount})</span>
            </div>
          </div>
          <h3 class="flower-title" onclick="openProductDetailModal(${p.id})">${p.name}</h3>
          <div class="flower-pricing">
            <span class="price-current">${formatVND(p.price)}</span>
            <span class="price-old">${formatVND(p.originalPrice)}</span>
          </div>
          <div class="card-features">
            <span class="feat-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Ảnh thật trước giao</span>
            <span class="feat-item"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Tặng thiệp & banner</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline-cart" onclick="quickAddToCart(${p.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Thêm giỏ
            </button>
            <button class="btn btn-primary-buy" onclick="openProductDetailModal(${p.id})">
              Tùy chỉnh &amp; Mua
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// XỬ LÝ QUICK FINDER TRÊN HERO BANNER
function setupQuickFinder() {
  const btn = document.getElementById('hero-finder-submit');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const occasionVal = document.getElementById('finder-occasion')?.value || 'all';
    const priceVal = document.getElementById('finder-price')?.value || 'all';
    const styleVal = document.getElementById('finder-style')?.value || 'all';

    appState.activeFilters.occasion = occasionVal;
    appState.activeFilters.priceRange = priceVal;
    appState.activeFilters.style = styleVal;

    // Đồng bộ các select ở catalog
    syncFilterControls();
    renderProductList();

    // Cuộn mượt xuống catalog
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    showToast(`Đã lọc hoa theo lựa chọn của bạn!`, 'info');
  });
}

function syncFilterControls() {
  const occSelect = document.getElementById('filter-occasion');
  if (occSelect) occSelect.value = appState.activeFilters.occasion;

  const styleSelect = document.getElementById('filter-style');
  if (styleSelect) styleSelect.value = appState.activeFilters.style;

  const priceSelect = document.getElementById('filter-price');
  if (priceSelect) priceSelect.value = appState.activeFilters.priceRange;

  const flowerSelect = document.getElementById('filter-flower-type');
  if (flowerSelect) flowerSelect.value = appState.activeFilters.flowerType;

  // Cập nhật các Tab Dịp phía trên
  document.querySelectorAll('.tab-filter-btn').forEach(btn => {
    const occ = btn.getAttribute('data-occasion');
    if (occ === appState.activeFilters.occasion) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function resetAllFilters() {
  appState.activeFilters = {
    occasion: "all",
    style: "all",
    flowerType: "all",
    recipient: "all",
    priceRange: "all",
    keyword: "",
    sort: "best-seller"
  };
  const searchInput = document.getElementById('main-search-input');
  if (searchInput) searchInput.value = '';
  syncFilterControls();
  renderProductList();
  showToast("Đã khôi phục toàn bộ danh mục hoa!", "info");
}

// LỌC THEO MÀU SẮC CHỦ ĐẠO
function filterByColor(colorCode) {
  appState.activeFilters.color = colorCode;
  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    if (btn.getAttribute('data-color') === colorCode) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  renderProductList();
  showToast(`Đã lọc các mẫu hoa tone màu: ${colorCode.toUpperCase()}`, 'info');
}

// RENDER KHỐI SỰ KIỆN TRỌNG ĐIỂM MÙA VỤ (20/10)
function renderSeasonalCampaign() {
  const container = document.getElementById('seasonal-campaign-grid');
  if (!container) return;

  const seasonalItems = FLOWER_PRODUCTS.filter(p => p.occasion.includes('20-10')).slice(0, 4);
  container.innerHTML = seasonalItems.map(p => {
    const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    const secondaryImg = (p.gallery && p.gallery[1]) ? p.gallery[1] : p.image;
    return `
      <div class="flower-card" data-id="${p.id}">
        <div class="flower-img-wrap" onclick="openProductDetailModal(${p.id})">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="flower-img">
          <img src="${secondaryImg}" alt="${p.name} góc 2" loading="lazy" class="flower-img-secondary">
          <span class="flower-badge badge-hot">Ưu đãi 20/10</span>
          <span class="discount-tag">-${discountPercent}%</span>
          <button class="quick-look-btn" onclick="event.stopPropagation(); openProductDetailModal(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Xem Nhanh
          </button>
        </div>
        <div class="flower-info">
          <div class="flower-meta">
            <span class="flower-sku">${p.sku}</span>
            <div class="flower-rating"><span class="star">★</span> ${p.rating}</div>
          </div>
          <h3 class="flower-title" onclick="openProductDetailModal(${p.id})">${p.name}</h3>
          <div class="flower-pricing">
            <span class="price-current">${formatVND(p.price)}</span>
            <span class="price-old">${formatVND(p.originalPrice)}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline-cart" onclick="quickAddToCart(${p.id})">Thêm giỏ</button>
            <button class="btn btn-primary-buy" onclick="openProductDetailModal(${p.id})">Tùy chỉnh &amp; Mua</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// RENDER KHỐI SẢN PHẨM BÁN CHẠY NHẤT (BEST SELLERS)
function renderBestSellers() {
  const container = document.getElementById('bestsellers-grid');
  if (!container) return;

  const topItems = [...FLOWER_PRODUCTS].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 4);
  container.innerHTML = topItems.map((p, idx) => {
    const discountPercent = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
    const secondaryImg = (p.gallery && p.gallery[1]) ? p.gallery[1] : p.image;
    return `
      <div class="flower-card" data-id="${p.id}">
        <div class="flower-img-wrap" onclick="openProductDetailModal(${p.id})">
          <img src="${p.image}" alt="${p.name}" loading="lazy" class="flower-img">
          <img src="${secondaryImg}" alt="${p.name} góc 2" loading="lazy" class="flower-img-secondary">
          <span class="flower-badge badge-luxury">Top ${idx + 1} Bán Chạy</span>
          <span class="discount-tag">-${discountPercent}%</span>
          <button class="quick-look-btn" onclick="event.stopPropagation(); openProductDetailModal(${p.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Xem Nhanh
          </button>
        </div>
        <div class="flower-info">
          <div class="flower-meta">
            <span class="flower-sku">${p.sku}</span>
            <div class="flower-rating"><span class="star">★</span> ${p.rating} (${p.reviewsCount})</div>
          </div>
          <h3 class="flower-title" onclick="openProductDetailModal(${p.id})">${p.name}</h3>
          <div class="flower-pricing">
            <span class="price-current">${formatVND(p.price)}</span>
            <span class="price-old">${formatVND(p.originalPrice)}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-outline-cart" onclick="quickAddToCart(${p.id})">Thêm giỏ</button>
            <button class="btn btn-primary-buy" onclick="openProductDetailModal(${p.id})">Tùy chỉnh &amp; Mua</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// QUICK NAVIGATION FILTER HELPERS
function filterByNavOccasion(occ) {
  appState.activeFilters.occasion = occ;
  syncFilterControls();
  renderProductList();
  document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
}

function filterByNavStyle(st) {
  appState.activeFilters.style = st;
  syncFilterControls();
  renderProductList();
  document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
}

function filterByNavFlowerType(ft) {
  appState.activeFilters.flowerType = ft;
  syncFilterControls();
  renderProductList();
  document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
}

function quickTagSearch(tag) {
  const input = document.getElementById('main-search-input');
  if (input) {
    input.value = tag;
    appState.activeFilters.keyword = tag;
    renderProductList();
    document.getElementById('catalog-section').scrollIntoView({ behavior: 'smooth' });
  }
}
