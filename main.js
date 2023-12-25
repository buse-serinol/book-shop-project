let bookList = [];

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
let starRateHtml = ""
for(let i = 1; i <=5; i++){
    if(Math.round(starRate) >= i){
        starRateHtml += `<i class="bi bi-star-fill active"></i>`
    }else{
        starRateHtml += `<i class="bi bi-star-fill"></i>`   
    }
}
return starRateHtml; 
}

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
                          <span class="font gray fs-5">${book.author}</span> <br>
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
                        <button class="btn-purple mt-2">Sepete Ekle</button>
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

//   const createBookTypesHtml = () => {
//     const filterEle = document.querySelector(".filter")
//     let filterHtml = "";
//     let filterTypes = ["ALL"];
//     bookList.forEach(book=>{
//         if()

//     })
//   } 



//datanın gelmesini bekledik
setTimeout(() => {
  createBookItemsHtml();
  createBookTypesHtml();
}, 100);
