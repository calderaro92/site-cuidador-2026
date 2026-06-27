const details = {
  hospitalar: {
    title: 'Acompanhamento Hospitalar',
    body: 'Acompanhamento integral durante internações: verificação de sinais vitais, administração de medicamentos, contato com a equipe médica e suporte emocional ao paciente e família.'
  },
  domiciliar: {
    title: 'Cuidados Domiciliares',
    body: 'Atendimento na residência: higiene, alimentação, mobilização, curativos e orientações para familiares, garantindo conforto e segurança.'
  },
  paliativos: {
    title: 'Cuidados Paliativos',
    body: 'Foco no alívio de sintomas, conforto físico e emocional, para melhorar a qualidade de vida de pacientes com doenças avançadas.'
  },
  cognitiva: {
    title: 'Estimulação Cognitiva',
    body: 'Exercícios personalizados para memória, atenção e linguagem, ajudando a retardar o declínio cognitivo e manter a autonomia.'
  }
};

const modal = document.getElementById('serviceModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalWhats = document.getElementById('modalWhats');
const modalClose = document.getElementById('modalClose');

function openModal(key) {
  const info = details[key];
  if (!info) return;
  modalTitle.textContent = info.title;
  modalBody.textContent = info.body;
  modalWhats.href = `https://wa.me/5511962075048?text=Olá! Gostaria de saber mais sobre: ${encodeURIComponent(info.title)}`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

document.querySelectorAll('.service-card button').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.open));
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => e.target === modal && closeModal());
document.addEventListener('keydown', e => e.key === 'Escape' && closeModal());

// Animação de entrada das seções
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    setTimeout(() => card.classList.add('visible'), 150 * i);
  });

  // Rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Validação e envio do formulário
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = form.name.value.trim();
    const tel = form.phone.value.replace(/\D/g, '');
    const mensagem = form.message.value.trim();

    if (nome.length < 2) {
      showMsg('Por favor, informe seu nome completo.', false);
      return;
    }
    if (tel.length < 10) {
      showMsg('Informe um telefone/WhatsApp válido com DDD.', false);
      return;
    }
    if (mensagem.length < 10) {
      showMsg('Escreva uma mensagem com pelo menos 10 caracteres.', false);
      return;
    }

    showMsg('✅ Mensagem enviada com sucesso! Responderei em breve.', true);
    form.reset();
  });

  function showMsg(texto, sucesso) {
    msg.textContent = texto;
    msg.className = sucesso ? 'mensagem-retorno mensagem-sucesso' : 'mensagem-retorno mensagem-erro';
    setTimeout(() => { msg.style.display = 'none'; }, 6000);
  }

  // Botão flutuante de WhatsApp em celulares
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  if (isMobile) {
    const btn = document.createElement('a');
    btn.href = 'https://wa.me/5511962075048';
    btn.textContent = '📞 WhatsApp';
    Object.assign(btn.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      background: '#25D366',
      color: '#fff',
      padding: '12px 18px',
      borderRadius: '999px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
      textDecoration: 'none',
      fontWeight: '700',
      zIndex: '9999',
      fontSize: '1rem'
    });
    document.body.appendChild(btn);
  }
});
