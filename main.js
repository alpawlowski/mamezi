const productsGrid = document.getElementById('products-grid');
const selectNumberOfProducts = document.getElementById('select-number-of-products');


const loadDataFromJSON = async () => {
  const response = await fetch("https://www.mamezi.pl/praca/front/products/data.json");
  const data = await response.json();

  setNumberOfProducts(data);
}
loadDataFromJSON();


const setNumberOfProducts = (data) => {
  let numberOfProducts = parseInt(selectNumberOfProducts.value);

  selectNumberOfProducts.addEventListener('change', () => {
    numberOfProducts = parseInt(selectNumberOfProducts.value);
    displayProducts(data, numberOfProducts);
  })

  displayProducts(data, numberOfProducts);
}


const displayProducts = (data, number) => {
  productsGrid.innerHTML = "";

  for (let i = 0; i < number; i++) {
    let product = data.list[i];
    
    let availability = product.availability.name;
    
    let productElement = document.createElement('div');
    productElement.classList.add('product-card');
    productElement.innerHTML = generateNewProductCard(product, availability)
    productsGrid.appendChild(productElement);
    product = null;
  }
}


const generateNewProductCard = (product, availability) => {
  let productCardTemplate = `
      <div class="product-card__header">
        <div class="product-card__quantity">
          <img src="./assets/shopping-cart.svg" alt="">
          <p>
            sztuk:
            <span class="quantity">${setProductQuantity(availability)}</span>
          </p>
        </div>
        <div class="product-card__saved">
          <p>
            oszczędzasz:
            <span class="saved"><b>${product.price.gross.base_float - product.price.gross.promo_float} zł</b></span>
          </p>
        </div>
      </div>
      <div class="product-card__image">
        <img src="https://www.mamezi.pl/praca/front/products/upload/${product.main_image}.png" alt="${product.name}">
      </div>
      <div class="product-card__bottom">
        <div class="product-card__price">
          <p class="product-card__price-discounted">${product.price.gross.promo}</p>
          <p class="product-card__price-original">${product.price.gross.base}</p>
        </div>
        <div class="product-card__title">${product.name}</div>
        <div class="product-card__producer">${product.producer.name}</div>
      </div>
  `; 

  return productCardTemplate;
}


const setProductQuantity = (availability) => {
  let quantity = null;
  
  switch (availability) {
    case "brak towaru":
      quantity = 0;
      break;
    case "ostatnia sztuka!":
      quantity = 1;
      break;
    case "mała ilość":
      quantity = 2;
      break;
    default:
      quantity = 0;
      break;
  }

  return quantity
}

const daysText = document.getElementById('days');
const hoursText = document.getElementById('hours');
const minutesText = document.getElementById('minutes');
const secondsText = document.getElementById('seconds');

const setCountdownDate = () => {
  const numberOfDaysToFutureDate = 5;
  const currentDate = new Date();
  const countdownDate = new Date(currentDate);
  countdownDate.setDate(currentDate.getDate() + numberOfDaysToFutureDate);
  countdownDate.setHours(0, 0, 0, 0);

  return countdownDate;
};

const countdown = () => {
  const countdownDate = setCountdownDate(false);
  const currentDate = new Date();

  const countdownSeconds = (countdownDate - currentDate) / 1000;

  const days = Math.floor(countdownSeconds / 3600 / 24);
  const hours = Math.floor(countdownSeconds / 3600) % 24;
  const minutes = Math.floor(countdownSeconds / 60) % 60;
  const seconds = Math.floor(countdownSeconds) % 60;

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  }
  
  daysText.innerHTML = days;
  hoursText.innerHTML = formatTime(hours);
  minutesText.innerHTML = formatTime(minutes);
  secondsText.innerHTML = formatTime(seconds);

  if (countdownSeconds <= 0) {
    countdownDate = setCountdownDate();
    countdownSeconds = (countdownDate - currentDate) / 1000;
  }
  
  setInterval(countdown, 1000);
};

countdown();