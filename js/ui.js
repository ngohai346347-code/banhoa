/**
 * SHOP HOA NGUYỄN MIỀN - THÀNH PHẦN GIAO DIỆN
 * Module: ui.js
 * Chức năng: Toast thông báo, Zalo Chat Widget, Hero Slider,
 * Countdown Timer.
 */

// =============================================
// HỆ THỐNG TOAST THÔNG BÁO
// =============================================
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">
      ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
    </span>
    <span class="toast-msg">${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =============================================
// ZALO CHAT WIDGET
// =============================================
function openZaloChatWidget() {
  const chatModal = document.getElementById('zalo-chat-modal');
  if (chatModal) {
    chatModal.classList.add('active');
  }
}

function closeZaloChatWidget() {
  const chatModal = document.getElementById('zalo-chat-modal');
  if (chatModal) {
    chatModal.classList.remove('active');
  }
}

function sendZaloChatMessage() {
  const input = document.getElementById('zalo-chat-input');
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  const msgList = document.getElementById('zalo-messages-list');
  // Tin nhắn của khách
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-bubble user-bubble';
  userMsg.innerHTML = `<p>${text}</p><span class="chat-time">Vừa xong</span>`;
  msgList.appendChild(userMsg);
  input.value = '';

  // Cuộn xuống
  msgList.scrollTop = msgList.scrollHeight;

  // Bot trả lời tự động của Shop
  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'chat-bubble shop-bubble';
    botMsg.innerHTML = `
      <p>Dạ Shop Hoa Nguyễn Miền xin chào quý khách! Thợ hoa bên em đã nhận được tin nhắn và đang chuẩn bị mẫu để gửi ảnh thật cho mình qua Zalo <strong>0393.945.347</strong>. Quý khách vui lòng để lại số điện thoại hoặc kết bạn Zalo trực tiếp để nhận tư vấn nhanh nhất trong 1 phút nhé ạ! 🌸</p>
      <span class="chat-time">Vừa xong</span>
    `;
    msgList.appendChild(botMsg);
    msgList.scrollTop = msgList.scrollHeight;
  }, 1200);
}

// =============================================
// HERO BANNER SLIDER
// =============================================
function initHeroSlider() {
  const container = document.getElementById('hero-slides-container');
  const dotsContainer = document.getElementById('hero-slider-dots');
  if (!container) return;

  const slides = container.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from(slides).map((_, idx) => `
      <div class="hero-dot ${idx === 0 ? 'active' : ''}" onclick="goToHeroSlide(${idx})"></div>
    `).join('');
  }

  // Auto slide every 5 seconds
  if (appState.heroSlideInterval) clearInterval(appState.heroSlideInterval);
  appState.heroSlideInterval = setInterval(() => {
    nextHeroSlide();
  }, 5000);
}

function goToHeroSlide(index) {
  const container = document.getElementById('hero-slides-container');
  if (!container) return;
  const slides = container.querySelectorAll('.hero-slide');
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  appState.heroCurrentSlide = index;
  container.style.transform = `translateX(-${index * 100}%)`;

  document.querySelectorAll('#hero-slider-dots .hero-dot').forEach((dot, idx) => {
    if (idx === index) dot.classList.add('active');
    else dot.classList.remove('active');
  });
}

function nextHeroSlide() {
  goToHeroSlide(appState.heroCurrentSlide + 1);
}

function prevHeroSlide() {
  goToHeroSlide(appState.heroCurrentSlide - 1);
}

// =============================================
// ĐẾM NGƯỢC CHIẾN DỊCH 20/10
// =============================================
function startCountdownTimer() {
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');
  if (!hoursEl) return;

  let totalSeconds = 14 * 3600 + 45 * 60 + 30; // 14 giờ 45 phút 30 giây

  setInterval(() => {
    totalSeconds--;
    if (totalSeconds < 0) totalSeconds = 24 * 3600;

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hoursEl.textContent = String(h).padStart(2, '0');
    minsEl.textContent = String(m).padStart(2, '0');
    secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}
