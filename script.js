const themeButton = document.querySelector('.theme-toggle');

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  const label = dark ? '화이트 모드' : '다크 모드';
  themeButton.querySelector('.theme-label').textContent = label;
  themeButton.setAttribute('aria-label', label);
  themeButton.setAttribute('aria-pressed', String(dark));
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeButton();
}

updateThemeButton();
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(theme);
  try { localStorage.setItem('move-theme', theme); } catch { /* Keep working without storage. */ }
});
window.addEventListener('storage', event => {
  if (event.key === 'move-theme' && (event.newValue === 'light' || event.newValue === 'dark')) {
    applyTheme(event.newValue);
  }
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');

function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
}

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// 실제 문의 수신 이메일로 변경하면 이메일 앱에서 문의를 작성할 수 있습니다.
const contactEmail = '';
document.querySelector('#contact-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  if (!contactEmail) {
    status.textContent = '현재 예시 페이지입니다. script.js의 contactEmail에 회사 이메일을 설정하면 문의 내용을 이메일 앱으로 전달할 수 있습니다.';
    return;
  }
  const data = new FormData(event.currentTarget);
  const subject = `[프로젝트 문의] ${data.get('name')}`;
  const body = `이름 / 회사명: ${data.get('name')}\n회신 이메일: ${data.get('email')}\n\n${data.get('message')}`;
  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = '이메일 앱에서 내용을 확인하고 직접 전송해주세요.';
});
