/**
 * SHOP HOA NGUYỄN MIỀN - DUYỆT ẢNH HOA THỰC TẾ
 * Module: proof.js
 * Chức năng: Duyệt ảnh hoa thật trước khi giao (Photo Proof),
 * yêu cầu chỉnh sửa, xác nhận giao hàng.
 */

function openOrderProofModal(orderCode = null) {
  const modal = document.getElementById('order-proof-modal');
  if (!modal) return;

  const data = appState.orderProof;
  document.getElementById('proof-order-id').textContent = data.orderId;
  document.getElementById('proof-status-text').textContent = data.status;
  document.getElementById('proof-customer-name').textContent = data.customerName;
  document.getElementById('proof-recipient-name').textContent = data.isAnonymous ? "Ẩn danh (Giao bất ngờ)" : data.recipientName;
  document.getElementById('proof-address').textContent = data.recipientAddress;
  document.getElementById('proof-delivery-time').textContent = data.deliveryTimeSlot;
  document.getElementById('proof-card-msg').textContent = `"${data.greetingCardContent}"`;

  // Photos
  document.getElementById('proof-catalog-img').src = data.originalCatalogPhoto;
  document.getElementById('proof-actual-img').src = data.actualPhotoBeforeDelivery;

  // Timeline
  document.querySelectorAll('.timeline-step').forEach((st, idx) => {
    const stepNum = idx + 1;
    if (stepNum <= data.statusStep) {
      st.classList.add('done');
    } else {
      st.classList.remove('done');
    }
  });

  const approvalStatusBadge = document.getElementById('proof-approval-badge');
  const actionButtons = document.getElementById('proof-actions-wrap');

  if (data.isApproved) {
    if (approvalStatusBadge) {
      approvalStatusBadge.innerHTML = `<span class="badge-approved">✓ Đã duyệt ảnh - Shipper đang trên đường giao hoa</span>`;
    }
    if (actionButtons) actionButtons.style.display = 'none';
  } else {
    if (approvalStatusBadge) {
      approvalStatusBadge.innerHTML = `<span class="badge-waiting">⏳ Đang chờ quý khách duyệt ảnh hoa thật</span>`;
    }
    if (actionButtons) actionButtons.style.display = 'flex';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOrderProofModal() {
  const modal = document.getElementById('order-proof-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function approveOrderProof() {
  appState.orderProof.isApproved = true;
  appState.orderProof.status = "Khách đã duyệt ảnh - Shipper đang giao hoa";
  appState.orderProof.statusStep = 4;

  showToast("Cảm ơn bạn! Hoa đã được bàn giao cho Shipper và đang trên đường tới người nhận.", "success");
  openOrderProofModal(); // reload trạng thái
}

function requestProofAdjustment() {
  const reason = prompt("Vui lòng cho Shop biết bạn muốn thợ chỉnh sửa điểm nào? (Ví dụ: Đổi nơ đỏ thành nơ kem, cắm thêm hoa baby, chỉnh lại chữ trên thiệp...):");
  if (reason && reason.trim() !== "") {
    showToast(`Đã gửi yêu cầu chỉnh sửa: "${reason}". Thợ hoa sẽ chỉnh và chụp lại gửi bạn sau 10 phút!`, "info");
    document.getElementById('proof-status-text').textContent = "Thợ đang chỉnh sửa lại theo yêu cầu của bạn";
  }
}
