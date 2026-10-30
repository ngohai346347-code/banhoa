/**
 * SHOP HOA NGUYỄN MIỀN - JAVASCRIPT APPLICATION CORE
 * Chức năng: Quản lý danh mục hoa, bộ lọc 5 trục, giỏ hàng, đặt lịch giao hoa,
 * viết thiệp lời chúc, thanh toán VietQR động & duyệt ảnh hoa thực tế trước khi giao.
 */

// 1. DỮ LIỆU SẢN PHẨM HOA TƯƠI MẪU CHUẨN (CÓ MÀU SẮC & ẢNH GÓC THỨ 2)
const FLOWER_PRODUCTS = [
  {
    id: 1,
    sku: "NM-SN01",
    name: "Hồng Ohara Đỏ & Baby Trắng 'Tình Nồng Cháy'",
    price: 680000,
    originalPrice: 790000,
    rating: 5.0,
    reviewsCount: 42,
    badge: "Bán chạy nhất",
    badgeType: "hot",
    color: "do",
    occasion: ["sinh-nhat", "tinh-yeu", "20-10"],
    style: "bo-hoa",
    flowerType: "hoa-hong",
    recipient: ["nu", "doi-tac"],
    priceRange: "500-1000",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "18 cành hồng Ohara đỏ nhung nhập khẩu, hoa baby trắng Hà Lan, lá bạc dollar cao cấp, giấy gói xi măng phong cách Hàn Quốc kèm nơ lụa satin.",
    dimensions: "Cao 55cm x Rộng 40cm",
    description: "Tone đỏ quyến rũ nồng nàn đại diện cho tình yêu sâu sắc và sự trân trọng tuyệt đối. Thích hợp tặng sinh nhật người yêu, vợ hoặc người phụ nữ đặc biệt."
  },
  {
    id: 2,
    sku: "NM-KT02",
    name: "Kệ Hoa Khai Trương 2 Tầng 'Đại Phát Vinh Hoa'",
    price: 1850000,
    originalPrice: 2200000,
    rating: 4.9,
    reviewsCount: 38,
    badge: "Khai trương VIP",
    badgeType: "luxury",
    color: "vang",
    occasion: ["khai-truong", "chuc-mung"],
    style: "ke-hoa",
    flowerType: "huong-duong",
    recipient: ["doi-tac", "nam"],
    priceRange: "1000-2000",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "Hoa hướng dương đại đóa Đà Lạt, hoa hồng vàng ánh kim, thiên điểu kiêu hãnh, lan mokara vàng rực, lá cau cảnh, kệ sắt mỹ thuật sơn tĩnh điện cao cấp.",
    dimensions: "Cao 175cm x Rộng 85cm",
    description: "Kệ hoa khai trương 2 tầng mang sắc vàng may mắn, rực rỡ, biểu tượng cho lời chúc kinh doanh thịnh vượng, tài lộc dồi dào và khởi đầu hanh thông."
  },
  {
    id: 3,
    sku: "NM-HD03",
    name: "Chậu Lan Hồ Điệp Hoàng Gia 5 Cành 'Kim Cát'",
    price: 1450000,
    originalPrice: 1650000,
    rating: 5.0,
    reviewsCount: 29,
    badge: "Hoa tươi lâu",
    badgeType: "trending",
    color: "trang",
    occasion: ["chuc-mung", "khai-truong", "sinh-nhat"],
    style: "binh-hoa",
    flowerType: "lan-ho-diep",
    recipient: ["doi-tac", "nam", "nu"],
    priceRange: "1000-2000",
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "5 cành lan hồ điệp trắng họng vàng tuyển chọn loại A, chậu gốm sứ Bát Tràng tráng men cao cấp, rêu xanh nhập khẩu và phụ kiện decor sang trọng.",
    dimensions: "Cao 80cm x Rộng 50cm (Độ bền 4-6 tuần)",
    description: "Lan hồ điệp quý phái, thanh khiết, thời gian tươi kéo dài hơn 1 tháng. Món quà đẳng cấp dành tặng sếp, tân gia nhà mới hoặc đối tác quan trọng."
  },
  {
    id: 4,
    sku: "NM-GH04",
    name: "Giỏ Hoa Pastel 'Nắng Sớm Ban Mai' Tặng Mẹ",
    price: 520000,
    originalPrice: 620000,
    rating: 4.8,
    reviewsCount: 51,
    badge: "Freeship",
    badgeType: "freeship",
    color: "hong",
    occasion: ["sinh-nhat", "chuc-mung", "20-10"],
    style: "gio-hoa",
    flowerType: "hoa-hong",
    recipient: ["nu"],
    priceRange: "500-1000",
    image: "https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "Hồng kem dâu Đà Lạt, cẩm tú cầu hồng baby, hoa cát tường nhật bản, cúc tana trắng, giỏ mây tre đan tự nhiên phong cách Vintage.",
    dimensions: "Cao 45cm x Rộng 38cm",
    description: "Tone màu pastel dịu ngọt, thanh nhã như tình yêu thương bao la của mẹ. Thích hợp tặng mẹ, cô giáo hoặc những người phụ nữ yêu nét đẹp mộc mạc."
  },
  {
    id: 5,
    sku: "NM-TY05",
    name: "Hộp Hoa Trái Tim 'Chỉ Riêng Mình Em' Lãng Mạn",
    price: 950000,
    originalPrice: 1100000,
    rating: 4.9,
    reviewsCount: 67,
    badge: "Bán chạy 20/10",
    badgeType: "hot",
    color: "do",
    occasion: ["tinh-yeu", "sinh-nhat", "20-10"],
    style: "lang-hop",
    flowerType: "hoa-hong",
    recipient: ["nu"],
    priceRange: "500-1000",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "33 đóa hồng đỏ Ecuador tuyển chọn xếp hình trái tim hoàn mỹ, điểm xuyết hoa baby trắng sấy khô, hộp cứng cao cấp in nơ ép kim vàng.",
    dimensions: "Đường kính 35cm x Cao 18cm",
    description: "33 đóa hồng tượng trưng cho lời hẹn ước 'Yêu em sâu đậm cả ba đời ba kiếp'. Thiết kế hộp trái tim sang trọng giúp bạn ghi trọn điểm tuyệt đối."
  },
  {
    id: 6,
    sku: "NM-CB06",
    name: "Vòng Hoa Tang Lễ 'An Lạc Cõi Phật' Thành Kính",
    price: 850000,
    originalPrice: 950000,
    rating: 5.0,
    reviewsCount: 22,
    badge: "Giao gấp 60p",
    badgeType: "express",
    color: "trang",
    occasion: ["chia-buon"],
    style: "ke-hoa",
    flowerType: "lan-ho-diep",
    recipient: ["doi-tac", "nam", "nu"],
    priceRange: "500-1000",
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "Hoa cúc đại đóa trắng thanh khiết, hoa lan mokara trắng, hoa ly trắng thơm ngát, lá cau cảnh, kệ đứng gỗ bọc vải đen trang trọng.",
    dimensions: "Cao 170cm x Rộng 80cm",
    description: "Kệ hoa chia buồn tone trắng trang nghiêm, gửi gắm lời nguyện cầu cho hương linh người đã khuất được an nghỉ nơi cõi vĩnh hằng và chia sẻ nỗi đau cùng gia quyến."
  },
  {
    id: 7,
    sku: "NM-TL07",
    name: "Bó Hoa Tulip Hà Lan 'Thuần Khiết Tình Khôi'",
    price: 1200000,
    originalPrice: 1400000,
    rating: 4.9,
    reviewsCount: 31,
    badge: "Hoa ngoại nhập",
    badgeType: "luxury",
    color: "trang",
    occasion: ["sinh-nhat", "tinh-yeu", "chuc-mung"],
    style: "bo-hoa",
    flowerType: "hoa-tulip",
    recipient: ["nu"],
    priceRange: "1000-2000",
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "15 cành hoa Tulip trắng tuyết nhập khẩu nguyên búp từ Hà Lan, giấy gói kraft phong cách tối giản Bắc Âu, thắt nơ nhung đen thanh lịch.",
    dimensions: "Cao 45cm x Rộng 30cm",
    description: "Hoa Tulip mang nét đẹp hiện đại, thanh tao và kiêu sa. Lựa chọn tinh tế nhất cho các bạn gái yêu phong cách sống tối giản và nghệ thuật thẩm mỹ."
  },
  {
    id: 8,
    sku: "NM-BB08",
    name: "Bó Hoa Baby Trắng 'Giấc Mơ Tuyết Trắng' Khổng Lồ",
    price: 490000,
    originalPrice: 580000,
    rating: 4.7,
    reviewsCount: 84,
    badge: "Giá tốt",
    badgeType: "sale",
    color: "trang",
    occasion: ["sinh-nhat", "tinh-yeu", "20-10"],
    style: "bo-hoa",
    flowerType: "hoa-baby",
    recipient: ["nu"],
    priceRange: "duoi-500",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "Hoa baby trắng cao cấp sấy khô nhẹ giữ dáng tròn bồng bềnh như mây, giấy gói đen mờ cá tính làm nổi bật sắc trắng tinh khôi.",
    dimensions: "Cao 50cm x Rộng 45cm (Độ bền khô trên 1 năm)",
    description: "Bó hoa baby bồng bềnh như đám mây trắng, tươi lâu và có thể để khô tự nhiên trang trí góc làm việc, phòng ngủ suốt cả năm trời."
  },
  {
    id: 9,
    sku: "NM-TC09",
    name: "Giỏ Hoa Cẩm Tú Cầu Xanh 'Hòa Bình & Tri Kỷ'",
    price: 780000,
    originalPrice: 890000,
    rating: 4.8,
    reviewsCount: 26,
    badge: "Thanh nhã",
    badgeType: "trending",
    color: "xanh",
    occasion: ["chuc-mung", "sinh-nhat"],
    style: "gio-hoa",
    flowerType: "cam-tu-cau",
    recipient: ["nam", "doi-tac"],
    priceRange: "500-1000",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "3 đóa Cẩm Tú Cầu xanh ngọc biển Đà Lạt, hoa hồng trắng cồ, hoa phi yến tím, lá khuynh diệp, giỏ đan tay thủ công tinh xảo.",
    dimensions: "Cao 50cm x Rộng 40cm",
    description: "Tone màu xanh mát mắt mang cảm giác an yên, hòa ái. Mẫu hoa rất được các sếp nam, đối tác và đồng nghiệp ưa chuộng."
  },
  {
    id: 10,
    sku: "NM-VIP10",
    name: "Bình Hoa Pha Lê 'Phú Quý Viên Mãn' Đại Sảnh",
    price: 2600000,
    originalPrice: 3100000,
    rating: 5.0,
    reviewsCount: 14,
    badge: "Cao cấp VIP",
    badgeType: "luxury",
    color: "tim",
    occasion: ["khai-truong", "chuc-mung"],
    style: "binh-hoa",
    flowerType: "lan-ho-diep",
    recipient: ["doi-tac", "nam"],
    priceRange: "tren-2000",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "9 cành Lan Hồ Điệp tím hoàng gia, hoa hồng Ecuador cam ánh lửa, bình pha lê Tiệp Khắc mạ viền vàng 24k cao cấp.",
    dimensions: "Cao 95cm x Rộng 65cm",
    description: "Tác phẩm cắm hoa nghệ thuật đỉnh cao dành cho sảnh đón tiếp công ty, phòng khách biệt thự hoặc quà biếu tặng các vị lãnh đạo cấp cao."
  },
  {
    id: 11,
    sku: "NM-HD11",
    name: "Bó Hoa Hướng Dương 'Khát Vọng Bay Xa' Tốt Nghiệp",
    price: 450000,
    originalPrice: 520000,
    rating: 4.8,
    reviewsCount: 93,
    badge: "Tốt nghiệp Hot",
    badgeType: "sale",
    color: "vang",
    occasion: ["chuc-mung", "sinh-nhat"],
    style: "bo-hoa",
    flowerType: "huong-duong",
    recipient: ["nam", "nu"],
    priceRange: "duoi-500",
    image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "5 bông hướng dương to khỏe rực rỡ, lá bạc, cúc thạch thảo tím, giấy xi măng bo nơ vàng đồng rực rỡ.",
    dimensions: "Cao 55cm x Rộng 35cm",
    description: "Sắc vàng hướng dương như ánh mặt trời rạng rỡ, cổ vũ tinh thần nỗ lực vươn lên. Món quà số 1 cho các bạn trẻ trong lễ tốt nghiệp và thăng tiến sự nghiệp."
  },
  {
    id: 12,
    sku: "NM-TN12",
    name: "Lẵng Hoa Gỗ 'Dịu Dàng Sắc Xuân' Để Bàn",
    price: 880000,
    originalPrice: 990000,
    rating: 4.9,
    reviewsCount: 35,
    badge: "Mới lên kệ",
    badgeType: "trending",
    color: "hong",
    occasion: ["sinh-nhat", "chuc-mung", "20-10"],
    style: "lang-hop",
    flowerType: "hoa-hong",
    recipient: ["nu", "doi-tac"],
    priceRange: "500-1000",
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=800&q=80"
    ],
    composition: "Hồng đào phớt Đà Lạt, cúc mẫu đơn hồng, hoa sao tím, lá cẩm thạch trong hộp gỗ thông tự nhiên khắc laser thương hiệu.",
    dimensions: "Cao 40cm x Rộng 45cm",
    description: "Thiết kế lẵng gỗ thông mộc mạc, tiện lợi để bàn làm việc hoặc bàn trà tiếp khách. Tỏa hương thơm tự nhiên nhẹ nhàng, thư thái cả ngày dài."
  }
];

// 2. DỮ LIỆU ĐƠN HÀNG MẪU ĐỂ TEST MODULE DUYỆT ẢNH HOA THẬT
const SAMPLE_ORDER_PROOF = {
  orderId: "NM-8869",
  customerName: "Anh Trần Quốc Huy",
  phone: "0912****88",
  recipientName: "Chị Mai Phương Thảo",
  recipientAddress: "Toà nhà Bitexco, Q.1, TP.HCM",
  productName: "Bó Hoa Hồng Ohara Đỏ 'Tình Nồng Cháy' (NM-SN01)",
  status: "Đã cắm xong - Chờ khách duyệt ảnh",
  statusStep: 3, // 1: Tiếp nhận, 2: Đang cắm, 3: Đã cắm & Chờ duyệt, 4: Đang giao, 5: Đã giao
  deliveryTimeSlot: "14:30 - 15:30 (Hôm nay)",
  floristName: "Florist Nguyễn Miền & Cẩm Tú",
  originalCatalogPhoto: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
  // Ảnh hoa thật thợ vừa cắm xong tại shop
  actualPhotoBeforeDelivery: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
  greetingCardContent: "Chúc mừng sinh nhật em yêu! Cảm ơn em vì đã luôn là ánh nắng dịu dàng nhất trong cuộc đời anh. Yêu em thật nhiều! - Từ Huy",
  ribbonType: "Thiệp ép kim hoa văn cao cấp",
  addOns: ["Bánh kem mini socola Pháp", "Gấu bông Teddy 35cm"],
  isApproved: false
};

// 3. STATE ỨNG DỤNG
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

// 4. TIỆN ÍCH ĐỊNH DẠNG TIỀN TỆ & THỜI GIAN
function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function getTodayISODate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// 5. HIỂN THỊ DANH SÁCH HOA TRÊN GIAO DIỆN
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

// 6. XỬ LÝ QUICK FINDER TRÊN HERO BANNER
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

// 7. MODAL CHI TIẾT SẢN PHẨM & TÙY CHỌN NGÀY GIỜ + THIỆP CHÚC MỪNG
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

// 8. GIỎ HÀNG (CART DRAWER)
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

function removeCartItem(cartItemId) {
  appState.cart = appState.cart.filter(i => i.cartItemId !== cartItemId);
  updateCartUI();
  showToast("Đã xóa hoa khỏi giỏ", "info");
}

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

// 9. QUY TRÌNH THANH TOÁN 5 BƯỚC (5-STEP CHECKOUT)
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

// 10. TÍNH NĂNG ĐẶC THÙ: DUYỆT ẢNH HOA THỰC TẾ TRƯỚC KHI GIAO (PHOTO PROOF)
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

// 11. HỆ THỐNG TOAST THÔNG BÁO NHẸ NHÀNG
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

// 12. CHAT SIMULATION VỚI SHOP HOA NGUYỄN MIỀN (ZALO CHAT WIDGET)
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

// 12.5 TÍNH NĂNG MỞ RỘNG THEO ĐẶC TẢ FLOWER CORNER
// A. Lọc theo màu sắc chủ đạo
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

// B. Render Khối Sự Kiện Trọng Điểm Mùa Vụ (20/10)
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

// C. Render Khối Sản Phẩm Bán Chạy Nhất (Best Sellers)
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

// D. Hero Banner Slider Controller
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

// E. Đếm ngược chiến dịch 20/10
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

// 13. KHỞI CHẠY ỨNG DỤNG KHI DOM READY
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
