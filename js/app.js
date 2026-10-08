/*  tema - light - dark - system */
const root = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-btn');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme() {
  const theme = localStorage.getItem('theme') || 'system';
  const isDark = theme === 'dark' || (theme === 'system' && systemDark.matches);

  root.classList.toggle('dark', isDark);
  themeButtons.forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.theme === theme);
  });
}

themeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    localStorage.setItem('theme', btn.dataset.theme);
    applyTheme();
  });
});

systemDark.addEventListener('change', applyTheme);
applyTheme();

/* ===== SIDEBAR (mobile) ===== */
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function toggleSidebar() {
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

document.getElementById('openSidebar').addEventListener('click', toggleSidebar);
document.getElementById('closeSidebar').addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

/* ===== DROPDOWN DO USUÁRIO ===== */
const userMenu = document.getElementById('userMenu');

document.getElementById('userBtn').addEventListener('click', (e) => {
  e.stopPropagation();
  userMenu.classList.toggle('hidden');
  userMenu.classList.toggle('flex');
});

document.addEventListener('click', () => {
  userMenu.classList.add('hidden');
  userMenu.classList.remove('flex');
});

/* ===== MODAL + VALIDAÇÃO ===== */
const modal = document.getElementById('modal');
const form = document.getElementById('projectForm');
const fields = form.querySelectorAll('.field');
const success = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

function openModal() {
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeModal() {
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  form.reset();
  success.classList.add('hidden');
  submitBtn.disabled = false;
  fields.forEach((f) => {
    f.classList.remove('border-red-500', 'border-green-500');
    f.parentElement.querySelector('.msg').classList.add('hidden');
  });
}

document.querySelectorAll('.open-modal').forEach((btn) => btn.addEventListener('click', openModal));
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('cancelModal').addEventListener('click', closeModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let allValid = true;

  fields.forEach((field) => {
    const msg = field.parentElement.querySelector('.msg');
    const minLength = { nome: 3, descricao: 10 }[field.id] || 1;
    const valid = field.value.trim().length >= minLength;

    field.classList.toggle('border-red-500', !valid);
    field.classList.toggle('border-green-500', valid);
    msg.classList.remove('hidden');
    msg.classList.toggle('text-red-500', !valid);
    msg.classList.toggle('text-green-600', valid);
    msg.textContent = valid ? 'Tudo certo!' : 'Preencha este campo corretamente.';

    if (!valid) allValid = false;
  });

  if (allValid) {
    success.classList.remove('hidden');
    submitBtn.disabled = true;
    setTimeout(closeModal, 1500);
  }
});
