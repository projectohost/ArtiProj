const TELEGRAM_USERNAME = 'amudri';

// Мобільне меню
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburgerBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburgerBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
    });
});

// Аккордеон FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isOpen) item.classList.add('active');
    });
});

// Модалка
const modal = document.getElementById('bookingModal');
const openButtons = document.querySelectorAll('.open-modal-btn');
const closeButton = document.getElementById('closeModalBtn');
const bookingForm = document.getElementById('bookingForm');
const phoneInput = document.getElementById('userPhone');
const dateInput = document.getElementById('bookingDate');

const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
dateInput.min = now.toISOString().slice(0, 16);

const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
};

openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

closeButton.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

phoneInput.addEventListener('input', (e) => {
    if (!e.target.value.startsWith('+380')) e.target.value = '+380';
    e.target.value = e.target.value.replace(/[^\d+]/g, '');
});

// Відправка форми в Telegram @amudri
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    const surname = document.getElementById('userSurname').value;
    const phone = phoneInput.value;
    const zone = document.getElementById('bookingZone').value;
    const date = dateInput.value.replace('T', ' о ');

    if (phone.length < 13) {
        alert('Будь ласка, введіть коректний номер телефону!');
        return;
    }

    const textMessage = `Вітаю! Хочу заблокувати ПК:%0A👤 Клієнт: ${name} ${surname}%0A📞 Тел: ${phone}%0A🖥️ Зона: ${zone}%0A📅 Дата/Час: ${date}`;

    window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${textMessage}`, '_blank');

    bookingForm.reset();
    phoneInput.value = '+380';
    closeModal();
});