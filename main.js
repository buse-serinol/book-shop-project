let bookList = [],
basketList = [];

// toggle menu

const toggleModal = () => {
  const basketModal = document.querySelector(".basket-modal");
  basketModal.classList.toggle("active");
};

const getBooks = () => {
  fetch("./products.json")
    .then((res) => res.json())
    .then((books) => (bookList = books))
    .catch((err) => console.log(err));
};
getBooks();

const createBookStars = (starRate) => {
  let starRateHtml = "";
  for (let i = 1; i <= 5; i++) {
    if (Math.round(starRate) >= i) {
      starRateHtml += `<i class="bi bi-star-fill active"></i>`;
    } else {
      starRateHtml += `<i class="bi bi-star-fill"></i>`;
    }
  }
  return starRateHtml;
};

const createBookItemsHtml = () => {
  const bookListEl = document.querySelector(".book-list");
  let bookListHtml = "";

  bookList.forEach((book, index) => {
    bookListHtml += `
          <div class="col-5 ${index % 2 == 0 && "offset-2"} my-5">
              <div class="row book-card">
                  <div class="col-6">
                      <img 
                      src="${book.imgSource}"
                      alt=""
                      class="img-fluid  shadow"
  
                      />
                  </div>
                  <div class="col-6 d-flex flex-column ">
                      <div class="book-details">
                          <span class="font gray fs-5">${
                            book.author
                          }</span> <br>
                          <span class="fs-4 fw-bold">${book.name}</span> <br>
                          <span class="book-star-rate">
                          ${createBookStars(book.starRate)}
                          </span> <br>
                          <span class="gray">1938 reviews</span>
                      </div>
                      <p class="book-description font gray mt-2">
                         ${book.description}
                        </p>
                        <div>
                          <span class=" black fw-bold fs-4 me-2 "> ${
                            book.price
                          } TL</span>
                          <span class="fw-bold fs-4 old-price"> ${
                            book.oldPrice
                              ? `<span class="fw-bold fs-4 old-price"> ${book.oldPrice} TL</span>`
                              : ""
                          }
                          </span>
                        </div>
                        <button class="btn-purple mt-3" onClick="addBookBasket(${book.id})">Sepete Ekle</button>
                  </div>
              </div>
          </div>
          `;
  });

  bookListEl.innerHTML = bookListHtml;
};

const BOOK_TYPES = {
  ALL: "Tümü",
  NOVEL: "Roman",
  CHILDREN: "Çocuk",
  HISTORY: "Tarih",
  FINANCE: "Finans",
  SCIENCE: "Bilim",
  SELFIMPROVEMENT: "Kişisel Gelişim",
};

const createBookTypesHtml = () => {
  const filterEle = document.querySelector(".filter");
  let filterHtml = "";
  let filterTypes = ["ALL"];
  bookList.forEach((book) => {
    if (filterTypes.findIndex((filter) => filter == book.type) == -1) {
      filterTypes.push(book.type);
    }
  });
  filterTypes.forEach((type, index) => {
    filterHtml += `<li onClick="filterBooks(this)" data-types="${type}" class="${
      index == 0 ? "active" : null
    }">
      ${BOOK_TYPES[type] || type}</li>`;
  });
  filterEle.innerHTML = filterHtml;
};

const filterBooks = (filterEl) => {
document.querySelector(".filter .active").classList.remove("active")
filterEl.classList.add("active")
let bookType = filterEl.dataset.types;
getBooks()
if(bookType != "ALL"){
  bookList = bookList.filter((book) => book.type == bookType)
}
  createBookItemsHtml();
}

const listBasketItems = () => {
  const basketListEl =document.querySelector(".basket-list")
  const basketCountEl =document.querySelector(".basket-count")
  basketCountEl.innerHTML = basketList.length > 0 ? basketList.length : null;
  let basketListHtml="";
  let totalPrice = 0;
  basketList.forEach((item) => {
basketListHtml += `
<li class="basket-item">
                <img 
                src="${item.product.imgSource}" 
                alt="" 
                width="100" 
                height="110">
                <div class="basket-item-info">
                    <h3 class="book-name">${item.product.name}</h3>
                    <span class="book-price">${item.product.price}</span> <br>
                    <span class="book-remove">Sepetten Kaldır</span>
                </div>

                <div class="book-count">
                    <span class="decrease">-</span>
                    <span class="mx-2">${item.quantity}</span>
                    <span class="increase">+</span>
                </div>
            </li> `
  })
basketListEl.innerHTML = basketListHtml
}

const addBookBasket = (bookId) => {
 let findedBook = bookList.find((book) => book.id == bookId)
 if (findedBook){
const basketAlreadyIndex = basketList.findIndex(
  (basket) => basket.product.id == bookId)
if (basketAlreadyIndex == -1){
  let addItem = {quantity:1, product: findedBook}
  basketList.push(addItem)
}else{
  basketList[basketAlreadyIndex].quantity += 1
}
 }
 listBasketItems();
}








//datanın gelmesini bekledik
setTimeout(() => {
  createBookItemsHtml();
  createBookTypesHtml();
}, 100);
