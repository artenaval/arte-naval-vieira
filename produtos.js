// Dados dos produtos com id, título e preço para controle do carrinho
const products = [
  { id: 'relogio-resina', title: 'Relógio de Resina', price: 150.00 },
  { id: 'porta-chaves', title: 'Porta Chaves', price: 60.00 },
  { id: 'quadro-nos', title: 'Quadro de Nós', price: 320.00 }
];

let cart = [];

// Adiciona produto ao carrinho
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = products.find(p => p.id === id);
    if (product) {
      cart.push({ ...product, qty: 1 });
    }
  }
  renderCart();
}

// Renderiza o carrinho na página
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutLink = document.getElementById('checkout-link');

  if (cart.length === 0) {
    cartItems.textContent = 'Carrinho vazio.';
    cartTotal.textContent = 'Total: R$ 0,00';
    checkoutLink.style.display = 'none';
    return;
  }

  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.textContent = `${item.title} (x${item.qty}) - R$ ${(item.price * item.qty).toFixed(2).replace('.', ',')}`;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
  checkoutLink.style.display = 'inline-block';
}

// Envia o carrinho para a página de contato
document.getElementById('checkout-link').addEventListener('click', (event) => {
  event.preventDefault();

  let mensagem = "🛍️ *Resumo do Pedido - Arte Naval Vieira:*\n\n";
  let total = 0;

  cart.forEach((item) => {
    mensagem += `• ${item.title} - R$ ${item.price.toFixed(2)}\n`;
    total += item.price * item.qty;
  });

  mensagem += `\n*Total:* R$ ${total.toFixed(2)}\n\n`;

  // Salva no localStorage (para enviar depois pela página de contato)
  localStorage.setItem("pedido", mensagem);

  // Redireciona para a página de contato
  window.location.href = "contato.htm";
});

// Modal de imagem
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".product-image").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => (modal.style.display = "none");

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

// Cria botões "Adicionar ao Carrinho" dinamicamente e adiciona evento
function setupAddButtons() {
  products.forEach(product => {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      const titleEl = card.querySelector('h3');
      if (titleEl && titleEl.textContent.trim() === product.title) {
        if (!card.querySelector('button')) {
          const btn = document.createElement('button');
          btn.textContent = 'Adicionar ao Carrinho';
          btn.classList.add('btn', 'btn-primary');
          btn.addEventListener('click', () => addToCart(product.id));
          card.appendChild(btn);
        }
      }
    });
  });
}

// Inicializa tudo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  setupAddButtons();
  renderCart();
});

