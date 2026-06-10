var sampleProducts = [
  { id: 1, name: 'خلاط ماء ذهبي', category: 'خلاطات', price: 299, stock: 45 },
  { id: 2, name: 'مغسلة رخام فاخرة', category: 'مغاسل', price: 899, stock: 12 },
  { id: 3, name: 'مرحاض معلق', category: 'مراحيض', price: 1299, stock: 8 },
  { id: 4, name: 'حوض استحمام جاكوزي', category: 'أحواض', price: 4500, stock: 3 },
  { id: 5, name: 'خلاط مطبخ متحرك', category: 'خلاطات', price: 449, stock: 28 },
  { id: 6, name: 'دش سقفي فاخر', category: 'دش', price: 699, stock: 15 },
];

var sampleOrders = [
  { id: 101, customer: 'أحمد محمد', product: 'خلاط ماء ذهبي', date: '2026-06-08', status: 'completed', amount: 299 },
  { id: 102, customer: 'سارة علي', product: 'مغسلة رخام فاخرة', date: '2026-06-07', status: 'shipped', amount: 899 },
  { id: 103, customer: 'خالد عمر', product: 'مرحاض معلق', date: '2026-06-06', status: 'pending', amount: 1299 },
  { id: 104, customer: 'نورة سعد', product: 'حوض استحمام جاكوزي', date: '2026-06-05', status: 'completed', amount: 4500 },
  { id: 105, customer: 'فيصل أحمد', product: 'دش سقفي فاخر', date: '2026-06-04', status: 'cancelled', amount: 699 },
];

function updateDashboardStats() {
  var statProducts = document.getElementById('statProducts');
  var statOrders = document.getElementById('statOrders');
  var statUsers = document.getElementById('statUsers');
  var statRevenue = document.getElementById('statRevenue');
  if (statProducts) statProducts.textContent = sampleProducts.length;
  if (statOrders) statOrders.textContent = sampleOrders.length;
  if (statUsers) statUsers.textContent = '28';
  if (statRevenue) {
    var total = 0;
    sampleOrders.forEach(function (o) { total += o.amount; });
    statRevenue.textContent = total.toLocaleString() + ' ر.س';
  }
}

function renderOrdersTable() {
  var tbody = document.getElementById('ordersTableBody');
  if (!tbody) return;
  var html = '';
  sampleOrders.forEach(function (o) {
    var statusClass = o.status;
    var statusText = '';
    if (o.status === 'completed') statusText = 'مكتملة';
    else if (o.status === 'shipped') statusText = 'تم الشحن';
    else if (o.status === 'pending') statusText = 'قيد الانتظار';
    else if (o.status === 'cancelled') statusText = 'ملغية';
    var statusMap = { completed: 'مكتملة', shipped: 'تم الشحن', pending: 'قيد الانتظار', cancelled: 'ملغية' };
    html += '<tr>' +
      '<td>#' + o.id + '</td>' +
      '<td>' + o.customer + '</td>' +
      '<td>' + o.product + '</td>' +
      '<td>' + o.date + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + (statusMap[o.status] || o.status) + '</span></td>' +
      '<td>' + o.amount + ' ر.س</td>' +
    '</tr>';
  });
  tbody.innerHTML = html;
}

function initCharts() {
  if (typeof Chart === 'undefined') return;

  var salesCtx = document.getElementById('salesChart');
  if (salesCtx) {
    new Chart(salesCtx, {
      type: 'line',
      data: {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
        datasets: [{
          label: 'المبيعات',
          data: [12000, 19000, 15000, 22000, 28000, 24000],
          borderColor: '#28c4ff',
          backgroundColor: 'rgba(40,196,255,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#28c4ff',
          pointBorderColor: '#060b18',
          pointBorderWidth: 2,
          pointRadius: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6a7a99' } },
          y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#6a7a99', callback: function (v) { return v.toLocaleString(); } } }
        }
      }
    });
  }

  var productsCtx = document.getElementById('productsChart');
  if (productsCtx) {
    new Chart(productsCtx, {
      type: 'doughnut',
      data: {
        labels: ['خلاطات', 'مغاسل', 'مراحيض', 'أحواض', 'دش', 'أخرى'],
        datasets: [{
          data: [30, 20, 15, 10, 15, 10],
          backgroundColor: ['#28c4ff', '#63e2ff', '#ffd25c', '#4cd964', '#ff3b5c', '#a78bfa'],
          borderColor: '#060b18',
          borderWidth: 3,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#b8ccf0', font: { family: 'Cairo', size: 11 }, padding: 16 }
          }
        },
        cutout: '65%',
      }
    });
  }
}

function renderProductsList() {
  var container = document.getElementById('productsListBody');
  if (!container) return;
  var html = '';
  sampleProducts.forEach(function (p) {
    html += '<div class="product-list-item">' +
      '<div class="product-list-icon"><i class="fas fa-box"></i></div>' +
      '<div class="product-list-info">' +
        '<h4>' + p.name + '</h4>' +
        '<p>' + p.category + ' — المخزون: ' + p.stock + '</p>' +
      '</div>' +
      '<div class="product-list-price">' + p.price + ' ر.س</div>' +
      '<div class="product-list-actions">' +
        '<button class="btn-icon" onclick="editProduct(' + p.id + ')"><i class="fas fa-edit"></i></button>' +
        '<button class="btn-icon danger" onclick="deleteProduct(' + p.id + ')"><i class="fas fa-trash"></i></button>' +
      '</div>' +
    '</div>';
  });
  container.innerHTML = html;
}

function renderOrdersList() {
  var container = document.getElementById('ordersListBody');
  if (!container) return;
  var html = '';
  var statusMap = { completed: 'مكتملة', shipped: 'تم الشحن', pending: 'قيد الانتظار', cancelled: 'ملغية' };
  sampleOrders.forEach(function (o) {
    html += '<div class="product-list-item">' +
      '<div class="product-list-icon"><i class="fas fa-receipt"></i></div>' +
      '<div class="product-list-info">' +
        '<h4>#' + o.id + ' — ' + o.customer + '</h4>' +
        '<p>' + o.product + ' — ' + o.date + '</p>' +
      '</div>' +
      '<div><span class="status-badge ' + o.status + '">' + (statusMap[o.status] || o.status) + '</span></div>' +
      '<div class="product-list-price">' + o.amount + ' ر.س</div>' +
    '</div>';
  });
  container.innerHTML = html;
}

function editProduct(id) {
  showAdminToast('جاري فتح المنتج رقم #' + id + ' للتعديل');
}

function deleteProduct(id) {
  if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
    showAdminToast('تم حذف المنتج رقم #' + id);
    sampleProducts = sampleProducts.filter(function (p) { return p.id !== id; });
    renderProductsList();
  }
}

function showAdminToast(message) {
  var toast = document.createElement('div');
  toast.innerHTML = '<i class="fas fa-info-circle"></i> ' + message;
  Object.assign(toast.style, {
    position: 'fixed', bottom: '24px', right: '24px',
    background: 'linear-gradient(135deg, var(--accent-dark), var(--accent))',
    color: '#fff', padding: '16px 28px', borderRadius: '16px',
    fontFamily: "'Cairo', sans-serif", fontWeight: '600', fontSize: '0.9rem',
    zIndex: '10000', boxShadow: '0 10px 40px rgba(40,196,255,0.3)',
    display: 'flex', alignItems: 'center', gap: '10px',
    opacity: '0', transition: 'all 0.4s ease',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(function () { toast.style.opacity = '1'; });
  setTimeout(function () {
    toast.style.opacity = '0';
    setTimeout(function () { toast.remove(); }, 400);
  }, 3000);
}

function handleSidebarToggle() {
  var toggle = document.getElementById('sidebarToggle');
  if (!toggle) return;
  toggle.addEventListener('click', function () {
    document.getElementById('sidebar').classList.toggle('open');
  });
}

function handleContactSubmit(e) {
  e.preventDefault();
  showAdminToast('تم استلام رسالتك بنجاح، سنتواصل معك قريبًا');
}

document.addEventListener('DOMContentLoaded', function () {
  updateDashboardStats();
  renderOrdersTable();
  initCharts();
  renderProductsList();
  renderOrdersList();
  handleSidebarToggle();
});
