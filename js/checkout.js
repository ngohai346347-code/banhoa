/**
 * SHOP HOA NGUYỄN MIỀN - QUY TRÌNH THANH TOÁN
 * Module: checkout.js
 * Chức năng: Quy trình thanh toán 5 bước, VietQR động,
 * hoàn tất đơn hàng.
 */

let currentCheckoutStep = 1;

function openCheckoutModal() {
  if (appState.cart.length === 0) {
    showToast("Giỏ hàng của bạn đang trống! Vui lòng chọn hoa trước.", "warning");
    return;
  }
  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  currentCheckoutStep = 1;
  showCheckoutStep(1);

  // Sync tổng tiền vào checkout
  const subtotal = appState.cart.reduce((sum, item) => sum + (item.unitTotal * item.quantity), 0);
  const finalTotal = Math.max(0, subtotal - appState.discountValue);
  document.getElementById('checkout-order-total').textContent = formatVND(finalTotal);

  // Tự sinh mã đơn mới
  const orderCode = "NM-" + Math.floor(1000 + Math.random() * 9000);
  document.getElementById('checkout-code-display').textContent = orderCode;
  document.getElementById('checkout-qr-content').textContent = `Thanh toán đơn ${orderCode}`;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function showCheckoutStep(stepNumber) {
  currentCheckoutStep = stepNumber;
  document.querySelectorAll('.checkout-step-panel').forEach(panel => {
    panel.classList.remove('active');
  });
  const currentPanel = document.getElementById(`checkout-step-${stepNumber}`);
  if (currentPanel) currentPanel.classList.add('active');

  // Cập nhật breadcrumb indicators
  document.querySelectorAll('.step-indicator-item').forEach((item, idx) => {
    const stepIdx = idx + 1;
    if (stepIdx < stepNumber) {
      item.className = 'step-indicator-item completed';
    } else if (stepIdx === stepNumber) {
      item.className = 'step-indicator-item active';
    } else {
      item.className = 'step-indicator-item';
    }
  });
}

function validateAndNextStep(fromStep) {
  if (fromStep === 1) {
    const name = document.getElementById('buyer-name')?.value.trim();
    const phone = document.getElementById('buyer-phone')?.value.trim();
    if (!name || !phone) {
      showToast("Vui lòng nhập Họ tên và Số điện thoại người đặt!", "warning");
      return;
    }
    // Nếu người đặt cũng là người nhận
    const isSelf = document.getElementById('buyer-is-recipient')?.checked;
    if (isSelf) {
      document.getElementById('recipient-name').value = name;
      document.getElementById('recipient-phone').value = phone;
    }
    showCheckoutStep(2);
  } else if (fromStep === 2) {
    const recName = document.getElementById('recipient-name')?.value.trim();
    const recPhone = document.getElementById('recipient-phone')?.value.trim();
    const recAddress = document.getElementById('recipient-address')?.value.trim();
    if (!recName || !recPhone || !recAddress) {
      showToast("Vui lòng điền đủ Họ tên, SĐT và Địa chỉ người nhận!", "warning");
      return;
    }
    showCheckoutStep(3);
  } else if (fromStep === 3) {
    // Thời gian & thiệp
    showCheckoutStep(4);
  }
}

function handlePaymentMethodChange(method) {
  const qrBox = document.getElementById('vietqr-box');
  if (method === 'vietqr') {
    if (qrBox) qrBox.style.display = 'block';
  } else {
    if (qrBox) qrBox.style.display = 'none';
  }
}

function completeCheckout() {
  const orderCode = document.getElementById('checkout-code-display')?.textContent || "NM-8869";
  const buyerName = document.getElementById('buyer-name')?.value || "Khách Hàng";
  const recipientName = document.getElementById('recipient-name')?.value || "Người Nhận";
  const recipientAddr = document.getElementById('recipient-address')?.value || "Địa chỉ giao";
  const isAnonymous = document.getElementById('recipient-is-secret')?.checked || false;

  // Cập nhật dữ liệu vào hệ thống duyệt ảnh mẫu
  appState.orderProof = {
    orderId: orderCode,
    customerName: buyerName,
    phone: document.getElementById('buyer-phone')?.value || "0393945347",
    recipientName: recipientName,
    recipientAddress: recipientAddr,
    isAnonymous: isAnonymous,
    productName: appState.cart[0]?.product?.name || "Bó hoa nghệ thuật Nguyễn Miền",
    status: "Đã tiếp nhận - Thợ đang cắm hoa tươi",
    statusStep: 2,
    deliveryTimeSlot: document.getElementById('checkout-time-slot')?.value || "Giao gấp 90 phút",
    floristName: "Florist Nguyễn Miền",
    originalCatalogPhoto: appState.cart[0]?.product?.image || SAMPLE_ORDER_PROOF.originalCatalogPhoto,
    actualPhotoBeforeDelivery: SAMPLE_ORDER_PROOF.actualPhotoBeforeDelivery,
    greetingCardContent: document.getElementById('checkout-greeting-msg')?.value || "Chúc mừng ngày đặc biệt!",
    ribbonType: "Thiệp ép kim hoa sen Nguyễn Miền",
    addOns: appState.cart[0]?.selectedAddons?.map(a => a.name) || [],
    isApproved: false
  };

  // Làm rỗng giỏ sau khi đặt
  appState.cart = [];
  updateCartUI();

  // Chuyển sang bước 5 thành công
  showCheckoutStep(5);
  showToast(`Đặt hoa thành công! Mã đơn của bạn là: ${orderCode}`, "success");
}
