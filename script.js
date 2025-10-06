// script.js - Mobile Zone (Full)
/* Loader */
window.addEventListener('load', function(){
  setTimeout(()=>{
    const loader = document.getElementById('pageLoader');
    loader.style.opacity = '0';
    setTimeout(()=> loader.style.display='none',400);
  },600); // small delay for effect
});

/* Dark/Light toggle */
document.getElementById('darkToggle').addEventListener('click', function(){
  document.body.classList.toggle('light');
  if(document.body.classList.contains('light')) localStorage.setItem('mz-theme','light'); else localStorage.removeItem('mz-theme');
});
if(localStorage.getItem('mz-theme') === 'light') document.body.classList.add('light');

/* Scroll helper */
function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

/* Countdown Timer - example: offer ends in 2 days from now */
(function countdownInit(){
  // set target to 2 days from now at 23:59:59
  const target = new Date();
  target.setDate(target.getDate() + 2);
  target.setHours(23,59,59,999);
  function update(){
    const now = new Date();
    const diff = target - now;
    if(diff<=0){
      document.getElementById('countdown').innerHTML = '<div>انتهى العرض</div>';
      clearInterval(timer);
      return;
    }
    const days = Math.floor(diff / (1000*60*60*24));
    const hours = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
    const mins = Math.floor((diff%(1000*60*60))/(1000*60));
    const secs = Math.floor((diff%(1000*60))/1000);
    document.getElementById('cd-days').textContent = String(days).padStart(2,'0');
    document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('cd-min').textContent = String(mins).padStart(2,'0');
    document.getElementById('cd-sec').textContent = String(secs).padStart(2,'0');
  }
  update();
  const timer = setInterval(update,1000);
})();

/* Maintenance tracking - simple client-side demo data */
const invoiceDB = {
  'MZ-1001': {status:'قيد الفحص', updated:'2025-10-01'},
  'MZ-1002': {status:'تم الإصلاح - جاهز للاستلام', updated:'2025-10-04'},
  'MZ-1003': {status:'في انتظار قطع غيار', updated:'2025-09-30'}
};
function checkInvoice(){
  const code = document.getElementById('invoice').value.trim().toUpperCase();
  const res = document.getElementById('trackResult');
  if(!code){ res.innerHTML = '<p class="error">من فضلك أدخل رقم الفاتورة.</p>'; return; }
  if(invoiceDB[code]){
    res.innerHTML = `<div class="card"><h4>حالة: ${invoiceDB[code].status}</h4><p>آخر تحديث: ${invoiceDB[code].updated}</p></div>`;
  } else {
    res.innerHTML = `<div class="card"><h4>لم نعثر على رقم الفاتورة</h4><p>تأكد من الرقم أو تواصل معنا عبر واتساب: <a href="https://wa.me/20106109003?text=استفسار%20عن%20فاتورة%20${encodeURIComponent(code)}">راسلنا</a></p></div>`;
  }
}

/* Contact form - opens WhatsApp */
function submitContact(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name||!phone||!message){ alert('من فضلك املأ جميع الحقول.'); return; }
  const text = encodeURIComponent(`مرحبًا Mobile Zone!\nالاسم: ${name}\nالهاتف: ${phone}\nالرسالة: ${message}`);
  window.open('https://wa.me/20106109003?text=' + text, '_blank');
}

/* Order form - build order and open WhatsApp */
function submitOrder(e){
  e.preventDefault();
  const name = document.getElementById('orderName').value.trim();
  const phone = document.getElementById('orderPhone').value.trim();
  const product = document.getElementById('orderProduct').value;
  const notes = document.getElementById('orderNotes').value.trim();
  const addons = Array.from(document.querySelectorAll('#orderForm input[type=checkbox]:checked')).map(i=>i.value).join(', ') || 'لا شيء';
  if(!name||!phone){ alert('الاسم ورقم الهاتف مطلوبان'); return; }
  const text = encodeURIComponent(`طلب من Mobile Zone:\nالاسم: ${name}\nالهاتف: ${phone}\nالمنتج: ${product}\nإكسسوارات: ${addons}\nملاحظات: ${notes}`);
  window.open('https://wa.me/20106109003?text=' + text, '_blank');
}

/* Simple accessibility: focus outline on keyboard nav */
document.addEventListener('keyup', function(e){
  if(e.key === 'Tab') document.body.classList.add('keyboard-nav');
});