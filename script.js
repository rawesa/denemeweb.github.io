// 1. Scroll Animasyonları (Intersection Observer API)
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  
  const options = {
    threshold: 0.1, // Elemanın %10'u göründüğünde animasyon tetiklenir
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Animasyon sadece bir kez tetiklenir
      }
    });
  }, options);

  sections.forEach(section => {
    observer.observe(section);
  });
});

// CSS'de kullanmak üzere "visible" class ekliyoruz
document.head.insertAdjacentHTML("beforeend", `
  <style>
    section {
      opacity: 0;
      transform: translateY(50px);
      transition: all 0.6s ease-in-out;
    }
    section.visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`);

// 2. Navbar Scroll Shrink (Navbar Küçültme)
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (window.scrollY > 50) {
    navbar.style.padding = "10px 20px"; // Navbar küçültülür
    navbar.style.backgroundColor = "#0d1117"; // Sayfa kaydırıldıkça sabit bir arka plan verilir
  } else {
    navbar.style.padding = "20px"; // Eski boyutuna döner
    navbar.style.backgroundColor = "transparent"; // Sayfanın en üstünde şeffaf olur
  }
});

// 3. Smooth Scrolling (Yumuşak Kaydırma)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    window.scrollTo({
      top: target.offsetTop - 60, // Navbar'ın boyutunu hesaba katar
      behavior: "smooth"
    });
  });
});

// 4. İletişim Formu Doğrulama (Basit Form Doğrulaması)
const form = document.getElementById("contact-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!validateEmail(email)) {
    alert("Lütfen geçerli bir e-posta adresi giriniz.");
    return;
  }

  if (message.trim() === "") {
    alert("Mesaj kısmı boş bırakılamaz.");
    return;
  }

  alert("Mesajınız başarıyla gönderildi!");
  form.reset(); // Form temizlenir
});

// E-posta doğrulama fonksiyonu (Basit bir regex)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// 5. Scroll'da Görsel Parallax Efekti (Arkaplan Hareketi)
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector("header");

  header.style.backgroundPositionY = `${scrolled * 0.5}px`; // Arkaplan daha yavaş kayar
});

// 6. Tooltip (Butonların Üzerine Gelince Açıklama Görünmesi)
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.innerText = "Mesaj gönder!";
    document.body.appendChild(tooltip);

    const rect = button.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight}px`;
  });

  button.addEventListener("mouseleave", () => {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) tooltip.remove();
  });
});

// Tooltip CSS'i ekleyelim
document.head.insertAdjacentHTML("beforeend", `
  <style>
    .tooltip {
      position: absolute;
      background-color: #333;
      color: #fff;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      pointer-events: none;
      opacity: 0;
      transform: translateY(-10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .tooltip-visible {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
`);
