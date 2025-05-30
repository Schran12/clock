// Atualiza os horários de todos os relógios
function updateClocks() {
  const clockCards = document.querySelectorAll('.clock-card');
  clockCards.forEach(card => {
    const timezone = card.dataset.timezone;
    const timeElement = card.querySelector('.time');
    const now = new Date();

    // Usa Intl.DateTimeFormat para horário local no fuso horário especificado
    const options = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: timezone };
    const formatter = new Intl.DateTimeFormat([], options);
    const formattedTime = formatter.format(now);

    timeElement.textContent = formattedTime;
  });
}

// Filtra os relógios pelo país selecionado
function filterClocks() {
  const filterValue = document.getElementById('countryFilter').value;
  const clockCards = document.querySelectorAll('.clock-card');

  clockCards.forEach(card => {
    if (filterValue === 'all' || card.dataset.country === filterValue) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

const BUTTON = document.querySelector("button");
const SYNC = document.querySelector("#sync")

// Função para alternar modo escuro/claro ao clicar no botão
const TOGGLE = () => {
  const IS_PRESSED = BUTTON.matches("[aria-pressed=true]");
  if (SYNC.checked)
    document.body.setAttribute("data-dark-mode", IS_PRESSED ? false : true);
  BUTTON.setAttribute("aria-pressed", IS_PRESSED ? false : true);
};

BUTTON.addEventListener("click", TOGGLE);

// Função para alternar tema - parece que faltou no código original, vou criar uma versão simples
function toggleTheme() {
  const body = document.body;
  if (body.hasAttribute("data-dark-mode") && body.getAttribute("data-dark-mode") === "true") {
    body.setAttribute("data-dark-mode", "false");
  } else {
    body.setAttribute("data-dark-mode", "true");
  }
}

// Quando o DOM estiver carregado, inicializa funções e eventos
document.addEventListener('DOMContentLoaded', () => {
  // Atualiza relógios a cada segundo
  updateClocks();
  setInterval(updateClocks, 1000);

  // Filtrar relógios quando o filtro mudar
  document.getElementById('countryFilter').addEventListener('change', filterClocks);

  // Alternar tema ao clicar no botão com id "themeToggle"
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);

  // Mostra todos os relógios inicialmente
  filterClocks();
});

// BOTÃO "VOLTAR AO TOPO"

// Seleciona o botão com id 'btn-top'
const btnTop = document.getElementById('btn-top');

// Evento para mostrar/esconder o botão ao fazer scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    btnTop.style.display = 'flex'; // mostra botão (flex para centralizar conteúdo)
  } else {
    btnTop.style.display = 'none'; // esconde botão quando estiver perto do topo
  }
});

// Evento para rolar suavemente até o topo ao clicar no botão
btnTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
