

let cart = [];
let modalQuantidade;
let modalKey = 0;

// Percorre ao array pizzaJson
pizzaJson.map((item, index) => {
  const cloneModels = document.querySelector('.models .pizza-item').cloneNode(true);
  cloneModels.querySelector('.pizza-item--name').innerHTML = item.name;
  cloneModels.querySelector('.pizza-item--price').innerHTML = `${item.price.toLocaleString("pt-br", {style: "currency" ,currency: "BRL" })}`;
  cloneModels.querySelector('.pizza-item--desc').innerHTML = item.description;
  cloneModels.querySelector('.pizza-item--img img').src = item.img;
  cloneModels.setAttribute('data-key', index);

  document.querySelector('.pizza-area').append(cloneModels);


  // Função de abrir o Modal

  const toClick = (event) => {
    modalQuantidade = 1;
    let key = event.target.closest('.pizza-item').getAttribute('data-key');
    modalKey = key;
    console.log(item);
    event.preventDefault();
    const divModal = document.querySelector('.pizzaWindowArea');
    divModal.style.display = 'flex';
    divModal.style.opacity = 0;
    setTimeout(() => divModal.style.opacity = 1, 200);

    const pizzaImgInfo = document.querySelector('.pizzaBig img');
    pizzaImgInfo.src = item.img;

    const pizzaInfo = document.querySelector('.pizzaInfo h1');
    pizzaInfo.innerHTML = item.name;

    const pizzaInfoDesc = document.querySelector('.pizzaInfo--desc');
    pizzaInfoDesc.innerHTML = item.description;

    const pizzaInfoSize = document.querySelectorAll('.pizzaInfo--size');
    const pizzaInfoSelected = document.querySelector('.pizzaInfo--size.selected');
    pizzaInfoSelected.classList.remove('selected');
    pizzaInfoSize.forEach((size, sizeIndex) => {
      if(sizeIndex == 2) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = item.sizes[sizeIndex];
      pizzaInfoQt.innerText = modalQuantidade;
      
    });
    
    
    const pizzaInfoPrice = document.querySelector('.pizzaInfo--actualPrice');
    pizzaInfoPrice.innerText = item.price.toLocaleString("pt-br", {style: "currency" ,currency: "BRL" });
    modalQuantidade = 1;
  }

  // callback da função toClick, que abre o modal;
  const clickerModal = cloneModels.querySelector('a');
  clickerModal.addEventListener('click', toClick);
});

const pizzaInfoQt = document.querySelector('.pizzaInfo--qt');
const pizzaInfoActualPrice = document.querySelector('.pizzaInfo--actualPrice');

// Função que dimiminui a quantidade no modal
const qntMenos = (event) => {
  event.preventDefault();
  
  if (pizzaInfoQt.innerText > 1) {
    modalQuantidade--;
  } 
  pizzaInfoQt.innerText = modalQuantidade;
  pizzaInfoActualPrice.innerText = (pizzaJson[modalKey].price * modalQuantidade).toLocaleString("pt-br", {style: "currency" ,currency: "BRL" })

}
// Função que aumenta a quantidade no modal
const qntMais = (event) => {
  
  if (pizzaInfoQt.innerText >= 1 && pizzaInfoQt.innerText < 10) {
    modalQuantidade++;
  }
  event.preventDefault();
  pizzaInfoQt.innerText = modalQuantidade;
  pizzaInfoActualPrice.innerText = (pizzaJson[modalKey].price * modalQuantidade).toLocaleString("pt-br", {style: "currency" ,currency: "BRL" })

  
};
// Callback de aumento e diminuição de quantidade do item no modal
const clickerQtmais = document.querySelector('.pizzaInfo--qtmais');
  clickerQtmais.addEventListener('click', qntMais);

const clickerQtMenos = document.querySelector('.pizzaInfo--qtmenos');
clickerQtMenos.addEventListener('click', qntMenos);
  
  
// Função que fecha o modal
const closeModal = () => {
  const divModal = document.querySelector('.pizzaWindowArea');
  divModal.style.opacity = 0;
  setTimeout(() => divModal.style.display = 'none', 200);
  
}


// Função que muda o background dos tamanhos ao clique
const changeSizes = (event) => {
  event.preventDefault();
  document.querySelector('.pizzaInfo--size.selected').classList.remove('selected');
  event.currentTarget.classList.add('selected');
}

// Função para quando clicar, no modal, adicionar ao carrinho 
const abrirCart = (event) => {
  event.preventDefault();
  
  let size = +document.querySelector('.pizzaInfo--size.selected').getAttribute('data-key');
  let indentifier = `${pizzaJson[modalKey].id}@${size}`;
  let keyCart = cart.findIndex((item) => item.indentifier == indentifier);
  if (keyCart > -1 ) {
    cart[keyCart].qt += modalQuantidade;
  } else {
    cart.push({
      indentifier,
      id:pizzaJson[modalKey].id,
      size,
      qt: modalQuantidade
    });

  }
  updateCart();
  closeModal();


}

document.querySelector('.menu-openner').addEventListener('click', () => {
  if (cart.length > 0) {
    document.querySelector('aside').style.left = 0;
  }
  
});

// Callback e função que fecha o modal, no mobile
document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
  closeModal();
});

//Callback e função que que fecha o carrinho ao clicar no X
document.querySelector('.menu-closer').addEventListener('click', () => {
  document.querySelector('aside').style = '100vw';
})

// Função que atualiza a array Cart e conforme isso o abre.
const updateCart = () => {
  document.querySelector('.menu-openner span').innerText = cart.length;
  if (cart.length > 0) {
    document.querySelector('aside').classList.add('show');
    document.querySelector('.cart').innerHTML = '';
    let sub = 0;
    let desc = 0;
    let total = 0;

    // Loop dentro da array cart, onde adiciona os itens de acordo com o array cart
    for (let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      let cartItem = document.querySelector('.models .cart--item').cloneNode(true);
      sub += pizzaItem.price * cart[i].qt;
      
      switch (cart[i].size) {
        case 0: 
          cart[i].size = 'P';
          break;
        case 1: 
          cart[i].size = 'M';
          break;
        case 2: 
          cart[i].size = 'G';
          break;
      }
      cartItem.querySelector('.cart--item img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerText = `${pizzaItem.name} (${cart[i].size})`;
      cartItem.querySelector('.cart--item--qt').innerText = cart[i].qt;


      // Função para quantidade, ao clique aumenta, ao chegar a 10, ele para de aumentar.
      const cartQtMais = () => {
        if (cart[i].qt < 10) {
          cart[i].qt++;
        }
        updateCart();
      }

      // Função para a quantidade, ao clique diminui, se chegar ao 1 e clicar dnv, retira do array Cart
      const cartQtMenos = () => {
        if (cart[i].qt > 1) {
          cart[i].qt--;
        } else {
          cart.splice(i, 1);
          
        }
        updateCart();
      }

      // Callback das funções cartQtMenos e cartQtMais
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click', cartQtMais);
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', cartQtMenos);

      // Adiciona à classe cart o clone do cartItem
      document.querySelector('.cart').append(cartItem)
    }

    // Desconto e total, calculo.
    desc = sub * 0.1;
    total = sub - desc;

    // Inserção dos valores, total, desconto e subtotal nas classes.
    document.querySelector('.subtotal span:last-child').innerHTML = `R$ ${sub.toFixed(2)}`;
    document.querySelector('.desconto span:last-child').innerHTML = `R$ ${desc.toFixed(2)}`;
    document.querySelector('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;


  } else {
    document.querySelector('aside').classList.remove('show');
    document.querySelector('aside').style.left = '100vw';
  }
}

// Função onde ao clique no botão finalizar carrinho, feche o carrinho
const finalizarCart = () => {
  document.querySelector('aside').classList.remove('show');
  document.querySelector('aside').style.left = '100vw';
}

// Callback de clique ao finalizar carrinho.
document.querySelector('.cart--finalizar').addEventListener('click', finalizarCart);







// CALLBACKS DE EVENTOS
document.querySelectorAll('.pizzaInfo--size').forEach((sizes) => {
  sizes.addEventListener('click', changeSizes);
})
document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', closeModal);
document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', closeModal);
document.querySelector('.pizzaInfo--addButton').addEventListener('click', abrirCart)
