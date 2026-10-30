/**
 * SHOP HOA NGUYỄN MIỀN - TRẠNG THÁI ỨNG DỤNG & TIỆN ÍCH
 * Module: state.js
 * Quản lý state toàn cục và các hàm tiện ích dùng chung.
 */

// STATE ỨNG DỤNG
const appState = {
  cart: [],
  activeFilters: {
    occasion: "all",
    style: "all",
    flowerType: "all",
    recipient: "all",
    priceRange: "all",
    color: "all",
    keyword: "",
    sort: "best-seller"
  },
  discountCode: "",
  discountValue: 0,
  orderProof: { ...SAMPLE_ORDER_PROOF },
  heroCurrentSlide: 0,
  heroSlideInterval: null
};

// TIỆN ÍCH ĐỊNH DẠNG TIỀN TỆ & THỜI GIAN
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getTodayISODate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
