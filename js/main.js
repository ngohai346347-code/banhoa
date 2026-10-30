/**
 * SHOP HOA NGUYỄN MIỀN - KHỞI CHẠY ỨNG DỤNG
 * Module: main.js
 * Chức năng: Khởi tạo toàn bộ ứng dụng khi DOM sẵn sàng,
 * đăng ký sự kiện lọc, tìm kiếm, back-to-top.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Render danh mục hoa ban đầu & các khối giao diện chuẩn đặc tả
  renderProductList();
  renderSeasonalCampaign();
  renderBestSellers();
  initHeroSlider();
  startCountdownTimer();
  setupQuickFinder();
  updateCartUI();

  // Xử lý Tab lọc Dịp
  document.querySelectorAll('.tab-filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const occ = btn.getAttribute('data-occasion');
      appState.activeFilters.occasion = occ;
      syncFilterControls();
      renderProductList();
    });
  });

  // Xử lý bộ lọc Sidebar
  document.getElementById('filter-occasion')?.addEventListener('change', (e) => {
    appState.activeFilters.occasion = e.target.value;
    syncFilterControls();
    renderProductList();
  });

  document.getElementById('filter-style')?.addEventListener('change', (e) => {
    appState.activeFilters.style = e.target.value;
    renderProductList();
  });

  document.getElementById('filter-price')?.addEventListener('change', (e) => {
    appState.activeFilters.priceRange = e.target.value;
    renderProductList();
  });

  document.getElementById('filter-flower-type')?.addEventListener('change', (e) => {
    appState.activeFilters.flowerType = e.target.value;
    renderProductList();
  });

  document.getElementById('filter-sort')?.addEventListener('change', (e) => {
    appState.activeFilters.sort = e.target.value;
    renderProductList();
  });

  // Tìm kiếm thanh header
  const searchInput = document.getElementById('main-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.activeFilters.keyword = e.target.value;
      renderProductList();
    });
  }

  // Back to top button
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btt.classList.add('visible');
      } else {
        btt.classList.remove('visible');
      }
    });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Add-on checkboxes recalculation listener
  document.querySelectorAll('.addon-checkbox').forEach(cb => {
    cb.addEventListener('change', updateModalTotalWithAddons);
  });
});
