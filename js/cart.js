/**
 * SHOP HOA NGUYỄN MIỀN - GIỎ HÀNG (CART)
 * Module: cart.js
 * Chức năng: Quản lý giỏ hàng, thêm/xóa/sửa số lượng,
 * mã giảm giá, Cart Drawer.
 */

// THÊM NHANH VÀO GIỎ
function quickAddToCart(productId) {
  const product = FLOWER_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cartItem = {
    cartItemId: Date.now() + Math.random(),
    product: product,
    quantity: 1,
    deliveryDate: getTodayISODate(),
    deliveryTime: "Giao gấp 90 phút",
    cardType: "Thiệp chúc mừng trang nhã",
    greetingMessage: "",
    selectedAddons: [],
    addonsExtraPrice: 0,
    unitTotal: product.price
  };

  appState.cart.push(cartItem);
  updateCartUI();
  showToast(`Đã thêm "${product.name}" vào giỏ!`, "success");
  openCartDrawer();
}

// CẬP NHẬT GIAO DIỆN GIỎ HÀNG
function updateCartUI() {
  const badge = document.getElementById('cart-count-badge');
  const floatBadge = document.getElementById('float-cart-badge');
  const totalCount = appState.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) badge.textContent = totalCount;
  if (floatBadge) floatBadge.textContent = totalCount;

  const container = document.getElementById('cart-items-container');
  if (!container) return;

  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Giỏ hàng của bạn đang trống</p>
        <button class="btn btn-outline" onclick="closeCartDrawer()">Tiếp tục chọn hoa</button>
      </div>
    `;
    updateCartTotals();
    return;
  }

  container.innerHTML = appState.cart.map(item => `
    <div class="cart-item">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.product.name}</h4>
        <div class="cart-item-meta">
          <span>📅 ${item.deliveryDate} (${item.deliveryTime})</span>
          ${item.selectedAddons.length > 0 ? `<div class="cart-addons-tag">+ Kèm: ${item.selectedAddons.map(a => a.name).join(', ')}</div>` : ''}
          ${item.greetingMessage ? `<div class="cart-msg-tag">💌 "${item.greetingMessage.substring(0, 30)}..."</div>` : ''}
        </div>
        <div class="cart-item-price-row">
          <span class="cart-price">${formatVND(item.unitTotal)}</span>
          <div class="cart-qty-ctrl">
            <button onclick="changeCartQty(${item.cartItemId}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeCartQty(${item.cartItemId}, 1)">+</button>
          </div>
          <button class="cart-remove-btn" onclick="removeCartItem(${item.cartItemId})" title="Xóa">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  updateCartTotals();
}

// THAY ĐỔI SỐ LƯỢNG
function changeCartQty(cartItemId, delta) {
  const item = appState.cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeCartItem(cartItemId);
  } else {
    updateCartUI();
  }
}

// XÓA SẢN PHẨM KHỎI GIỎ
function removeCartItem(cartItemId) {
  appState.cart = appState.cart.filter(i => i.cartItemId !== cartItemId);
  updateCartUI();
  showToast("Đã xóa hoa khỏi giỏ", "info");
}

// CẬP NHẬT TỔNG TIỀN
function updateCartTotals() {
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.unitTotal * item.quantity), 0);
  const discount = appState.discountValue;
  const finalTotal = Math.max(0, subtotal - discount);

  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount-val');
  const finalEl = document.getElementById('cart-final-total');

  if (subtotalEl) subtotalEl.textContent = formatVND(subtotal);
  if (discountEl) discountEl.textContent = `-${formatVND(discount)}`;
  if (finalEl) finalEl.textContent = formatVND(finalTotal);
}

// ÁP DỤNG MÃ GIẢM GIÁ
function applyCouponCode() {
  const input = document.getElementById('cart-coupon-input');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'FLOWER30') {
    appState.discountCode = 'FLOWER30';
    appState.discountValue = 30000;
    updateCartTotals();
    showToast("Áp dụng mã FLOWER30 thành công: Giảm 30.000đ!", "success");
  } else if (code === 'VIPMIEN') {
    const subtotal = appState.cart.reduce((sum, item) => sum + (item.unitTotal * item.quantity), 0);
    appState.discountCode = 'VIPMIEN';
    appState.discountValue = Math.round(subtotal * 0.1); // 10%
    updateCartTotals();
    showToast(`Áp dụng mã VIPMIEN thành công: Giảm 10% (${formatVND(appState.discountValue)})!`, "success");
  } else {
    showToast("Mã giảm giá không hợp lệ hoặc đã hết hạn!", "error");
  }
}

// MỞ/ĐÓNG GIỎ HÀNG DRAWER
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('active');
  document.body.style.overflow = '';
}
