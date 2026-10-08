// === GERENCIAMENTO DE TEMA (Botões Light | Dark | System) ===
const btnLight = document.getElementById('theme-light-btn');
const btnDark = document.getElementById('theme-dark-btn');
const btnSystem = document.getElementById('theme-system-btn');

function applyTheme(theme) {
    const root = document.documentElement;
    
    // Controla a classe dark no HTML principal
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
    
    // Altera o visual dos botões na barra lateral
    updateButtonStates(theme);
}

function updateButtonStates(activeTheme) {
    const buttons = [
        { element: btnLight, key: 'light' },
        { element: btnDark, key: 'dark' },
        { element: btnSystem, key: 'system' }
    ];

    buttons.forEach(item => {
        if (!item.element) return;
        
        if (item.key === activeTheme) {
            // Estilo do botão selecionado ativo (Fundo destacado e texto branco)
            item.element.className = "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold bg-[#1f1f23] text-white transition-all cursor-pointer shadow-sm";
        } else {
            // Estilo dos botões inativos (Texto cinza opaco)
            item.element.className = "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-all cursor-pointer";
        }
    });
}

// Ouvintes de clique para cada botão de tema
if (btnLight) btnLight.addEventListener('click', () => { localStorage.setItem('theme', 'light'); applyTheme('light'); });
if (btnDark) btnDark.addEventListener('click', () => { localStorage.setItem('theme', 'dark'); applyTheme('dark'); });
if (btnSystem) btnSystem.addEventListener('click', () => { localStorage.setItem('theme', 'system'); applyTheme('system'); });

// Inicialização automática ao carregar a página
const savedTheme = localStorage.getItem('theme') || 'system';
applyTheme(savedTheme);

// Ouvinte para caso o sistema operacional mude de tema de fundo
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
    }
});


// === CONTROLE DE MENUS E SIDEBAR MOBILE ===
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const userDropdownBtn = document.getElementById('user-dropdown-btn');
const userDropdown = document.getElementById('user-dropdown');

if (toggleSidebarBtn && sidebar) {
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
}

if (userDropdownBtn && userDropdown) {
    userDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
        userDropdown.classList.add('hidden');
    });
}