var siteRoot = (function () { var p = window.location.pathname; return p.indexOf('/pages/') !== -1 ? '' : 'pages/'; })();
var products = [
  { id: 1, name: 'خلاط ماء ذهبي', category: 'خلاطات', price: 299, oldPrice: 399, image: 'fa-tint', badge: 'sale', desc: 'خلاط ماء ذهبي فاخر مقاوم للصدأ بتصميم عصري' },
  { id: 2, name: 'مغسلة رخام فاخرة', category: 'مغاسل', price: 899, oldPrice: null, image: 'fa-bath', badge: null, desc: 'مغسلة رخام طبيعي بتصميم راقي للمجالس والحمامات' },
  { id: 3, name: 'مرحاض معلق', category: 'مراحيض', price: 1299, oldPrice: 1599, image: 'fa-toilet', badge: 'sale', desc: 'مرحاض معلق سيراميك إيطالي مع نظام شفف قوي' },
  { id: 4, name: 'حوض استحمام جاكوزي', category: 'أحواض', price: 4500, oldPrice: null, image: 'fa-bath', badge: 'new', desc: 'حوض جاكوزي مع مساج مائي و إضاءة LED مدمجة' },
  { id: 5, name: 'خلاط مطبخ متحرك', category: 'خلاطات', price: 449, oldPrice: 549, image: 'fa-tint', badge: 'sale', desc: 'خلاط مطبخ برأس متحرك وخرطوم سحب' },
  { id: 6, name: 'دش سقفي فاخر', category: 'دش', price: 699, oldPrice: null, image: 'fa-shower', badge: 'new', desc: 'دش سقفي كروم مطفي مع إضاءة مطرية' },
  { id: 7, name: 'فلاتر مياه منزلي', category: 'فلاتر', price: 349, oldPrice: null, image: 'fa-filter', badge: null, desc: 'فلتر مياه 5 مراحل مع شمعات عالية الجودة' },
  { id: 8, name: 'سخان مياه كهربائي', category: 'سخانات', price: 799, oldPrice: 999, image: 'fa-fire', badge: 'sale', desc: 'سخان مياه 80 لتر مع ترموستات رقمي' },
];

function getProductHTML(product) {
  var badgeHTML = '';
  if (product.badge === 'sale') {
    badgeHTML = '<span class="product-badge sale"><i class="fas fa-tag"></i> خصم</span>';
  } else if (product.badge === 'new') {
    badgeHTML = '<span class="product-badge new"><i class="fas fa-star"></i> جديد</span>';
  }
  var oldPriceHTML = '';
  if (product.oldPrice) {
    oldPriceHTML = '<span class="price-old">' + product.oldPrice + ' ر.س</span>';
  }
  return '' +
    '<div class="product-card">' +
      '<div class="product-image">' +
        badgeHTML +
        '<i class="fas ' + product.image + '"></i>' +
      '</div>' +
      '<div class="product-info">' +
        '<div class="product-category">' + product.category + '</div>' +
        '<h3>' + product.name + '</h3>' +
        '<p class="product-desc">' + product.desc + '</p>' +
        '<div class="product-price">' +
          '<span class="price-current">' + product.price + ' ر.س</span>' +
          oldPriceHTML +
        '</div>' +
        '<div class="product-actions">' +
          '<button class="btn-card btn-card-primary add-to-cart" data-id="' + product.id + '"><i class="fas fa-shopping-cart"></i> أضف للسلة</button>' +
          '<a href="' + siteRoot + 'product.html?id=' + product.id + '" class="btn-card view-product"><i class="fas fa-eye"></i></a>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function renderFeaturedProducts() {
  var container = document.getElementById('featuredProducts');
  if (!container) return;
  var html = '';
  var featured = products.slice(0, 4);
  featured.forEach(function (p) {
    html += getProductHTML(p);
  });
  container.innerHTML = html;
}

function renderAllProducts(productsToRender) {
  var container = document.getElementById('allProducts');
  if (!container) return;
  var html = '';
  (productsToRender || products).forEach(function (p) {
    html += getProductHTML(p);
  });
  container.innerHTML = html;
}

function handleAddToCart() {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.add-to-cart');
    if (!btn) return;
    var id = btn.getAttribute('data-id');
    showToast('تمت إضافة المنتج إلى سلة التسوق بنجاح ✅');
  });
}

function showToast(message) {
  var existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();
  var toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(135deg, #1a8bb8, #28c4ff)',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: '16px',
    fontFamily: "'Cairo', sans-serif",
    fontWeight: '600',
    fontSize: '0.95rem',
    zIndex: '10000',
    boxShadow: '0 10px 40px rgba(40,196,255,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    opacity: '0',
    transition: 'all 0.4s ease',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(function () {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(function () {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(function () { toast.remove(); }, 400);
  }, 3000);
}

function handleMenuToggle() {
  var toggle = document.getElementById('menuToggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    document.querySelector('.main-nav').classList.toggle('open');
  });
}

function handleHeaderScroll() {
  var header = document.querySelector('.main-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function handleSearchAndFilter() {
  var searchInput = document.getElementById('searchInput');
  var filterSelect = document.getElementById('filterSelect');
  if (!searchInput && !filterSelect) return;

  function filterProducts() {
    var searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    var category = filterSelect ? filterSelect.value : '';
    var filtered = products.filter(function (p) {
      var matchSearch = p.name.toLowerCase().includes(searchTerm) || p.category.includes(searchTerm);
      var matchCategory = !category || p.category === category;
      return matchSearch && matchCategory;
    });
    renderAllProducts(filtered);
  }

  if (searchInput) searchInput.addEventListener('input', filterProducts);
  if (filterSelect) filterSelect.addEventListener('change', filterProducts);
}

function handleContactSubmit(e) {
  e.preventDefault();
  showToast('تم استلام رسالتك بنجاح، سنتواصل معك قريبًا');
  document.getElementById('contactForm').reset();
}

document.addEventListener('DOMContentLoaded', function () {
  renderFeaturedProducts();
  renderAllProducts();
  handleAddToCart();
  handleMenuToggle();
  handleHeaderScroll();
  handleSearchAndFilter();
});
