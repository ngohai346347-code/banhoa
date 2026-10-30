/**
 * SHOP HOA NGUYỄN MIỀN - MODAL CHI TIẾT SẢN PHẨM
 * Module: modal.js
 * Chức năng: Popup xem chi tiết sản phẩm, gallery, add-ons, lời chúc,
 * chọn ngày giờ giao hoa.
 */

let currentModalProduct = null;

function openProductDetailModal(productId) {
  const product = FLOWER_PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  currentModalProduct = product;

  const modal = document.getElementById('product-detail-modal');
  if (!modal) return;

  // Populate data
  document.getElementById('modal-product-title').textContent = product.name;
  document.getElementById('modal-product-sku').textContent = product.sku;
  document.getElementById('modal-product-rating').textContent = product.rating;
  document.getElementById('modal-product-reviews').textContent = `(${product.reviewsCount} đánh giá thật)`;
  document.getElementById('modal-product-price').textContent = formatVND(product.price);
  document.getElementById('modal-product-old-price').textContent = formatVND(product.originalPrice);
  document.getElementById('modal-product-composition').textContent = product.composition;
  document.getElementById('modal-product-dimensions').textContent = product.dimensions;
  document.getElementById('modal-product-desc').textContent = product.description;

  // Gallery
  const mainImg = document.getElementById('modal-main-img');
  mainImg.src = product.image;
  const thumbsContainer = document.getElementById('modal-thumbs-container');
  thumbsContainer.innerHTML = product.gallery.map((imgUrl, idx) => `
    <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchModalGalleryImage('${imgUrl}', this)">
      <img src="${imgUrl}" alt="Ảnh ${idx + 1}">
    </div>
  `).join('');

  // Set default delivery date: Today
  const dateInput = document.getElementById('modal-delivery-date');
  if (dateInput) {
    const today = getTodayISODate();
    dateInput.min = today;
    dateInput.value = today;
  }

  // Reset add-ons checkboxes
  document.querySelectorAll('.addon-checkbox').forEach(cb => cb.checked = false);
  updateModalTotalWithAddons();

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function switchModalGalleryImage(url, thumbEl) {
  const mainImg = document.getElementById('modal-main-img');
  if (mainImg) mainImg.src = url;
  document.querySelectorAll('#modal-thumbs-container .thumb-item').forEach(el => el.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

function closeProductDetailModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Cập nhật giá khi chọn add-on
function updateModalTotalWithAddons() {
  if (!currentModalProduct) return;
  let total = currentModalProduct.price;

  const addons = [];
  document.querySelectorAll('.addon-checkbox:checked').forEach(cb => {
    const price = parseInt(cb.getAttribute('data-price') || '0', 10);
    total += price;
    addons.push(cb.getAttribute('data-name'));
  });

  const totalEl = document.getElementById('modal-calculated-total');
  if (totalEl) {
    totalEl.textContent = formatVND(total);
  }
}

// Gợi ý lời chúc nhanh
function insertGreetingTemplate(templateText) {
  const textarea = document.getElementById('modal-greeting-message');
  if (textarea) {
    textarea.value = templateText;
    textarea.focus();
    showToast("Đã chèn mẫu lời chúc ý nghĩa!", "success");
  }
}

// Thêm vào giỏ từ modal chi tiết
function addModalProductToCart(goToCheckoutNow = false) {
  if (!currentModalProduct) return;

  const deliveryDate = document.getElementById('modal-delivery-date')?.value || getTodayISODate();
  const deliveryTime = document.getElementById('modal-delivery-time')?.value || "Giao gấp 90 phút";
  const cardType = document.getElementById('modal-card-type')?.value || "Thiệp chúc mừng trang nhã";
  const greetingMessage = document.getElementById('modal-greeting-message')?.value || "";

  const selectedAddons = [];
  let addonsExtraPrice = 0;
  document.querySelectorAll('.addon-checkbox:checked').forEach(cb => {
    const price = parseInt(cb.getAttribute('data-price') || '0', 10);
    addonsExtraPrice += price;
    selectedAddons.push({
      name: cb.getAttribute('data-name'),
      price: price
    });
  });

  const cartItem = {
    cartItemId: Date.now() + Math.random(),
    product: currentModalProduct,
    quantity: 1,
    deliveryDate,
    deliveryTime,
    cardType,
    greetingMessage,
    selectedAddons,
    addonsExtraPrice,
    unitTotal: currentModalProduct.price + addonsExtraPrice
  };

  appState.cart.push(cartItem);
  updateCartUI();
  closeProductDetailModal();

  if (goToCheckoutNow) {
    openCheckoutModal();
  } else {
    showToast(`Đã thêm "${currentModalProduct.name}" vào giỏ hàng!`, "success");
    openCartDrawer();
  }
}
