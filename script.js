


let modalQuantidade;
pizzaJson.map((item, index) => {
  const cloneModels = document.querySelector('.models .pizza-item').cloneNode(true);
  cloneModels.querySelector('.pizza-item--name').innerHTML = item.name;
  cloneModels.setAttribute('data-key', index);
  cloneModels.querySelector('.pizza-item--price').innerHTML = `${item.price.toLocaleString("pt-br", {style: "currency" ,currency: "BRL" })}`;
  cloneModels.querySelector('.pizza-item--desc').innerHTML = item.description;
  cloneModels.querySelector('.pizza-item--img img').src = item.img;

  document.querySelector('.pizza-area').append(cloneModels);


  // Função de abrir o Modal

  const toClick = (event) => {
    modalQuantidade = 1;
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
    });

    const pizzaInfoPrice = document.querySelector('.pizzaInfo--actualPrice');
    pizzaInfoPrice.innerText = item.price.toLocaleString("pt-br", {style: "currency" ,currency: "BRL" });
  }



  const clickerModal = cloneModels.querySelector('a');
  clickerModal.addEventListener('click', toClick);



});

const qntMais = (event) => {
  event.preventDefault();
  modalQuantidade++;
  const pizzaInfoQt = document.querySelector('.pizzaInfo--qt');
  pizzaInfoQt.innerText = modalQuantidade;
  const pizzaInfoPrice = document.querySelector('.pizzaInfo--actualPrice');
    pizzaInfoPrice.innerText = (pizzaJson.price * modalQuantidade).toLocaleString("pt-br", {style: "currency" ,currency: "BRL" });
  
}

const clickerQtmais = document.querySelector('.pizzaInfo--qtmais');
clickerQtmais.addEventListener('click', qntMais);



const closeModal = () => {
  const divModal = document.querySelector('.pizzaWindowArea');
  divModal.style.opacity = 0;
  setTimeout(() => divModal.style.display = 'none', 200);

}

document.querySelector('.pizzaInfo--cancelButton').addEventListener('click', closeModal);
document.querySelector('.pizzaInfo--cancelMobileButton').addEventListener('click', closeModal);


