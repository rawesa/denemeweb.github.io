// Sayfa Yüklendiğinde Çalışacak Fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animasyonları
    const scrollElements = document.querySelectorAll('.scroll-element');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Smooth Scroll
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach((link) => {
        link.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        window.scrollTo({
            top: document.querySelector(targetId).offsetTop - 70,
            behavior: 'smooth'
        });
    }

    // İletişim Formu Doğrulama
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Lütfen tüm alanları doldurunuz.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Lütfen geçerli bir e-posta adresi giriniz.');
            return;
        }

        // Burada form gönderme işlemi yapılabilir (örneğin, e-posta gönderme veya bir API'ye istek atma)
        alert('Mesajınız başarıyla gönderildi!');
        contactForm.reset();
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
