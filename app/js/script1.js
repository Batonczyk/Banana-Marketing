import slider from "./slider.js";
slider();

const categoryBtn = document.querySelectorAll(".portfolio__btn");
const contentImage = document.querySelectorAll(".portfolio-content__item");
const container = document.querySelector(".portfolio-content__items");
// ======= Mix Element portfolio =======
categoryBtn.forEach((elem) => {
  elem.addEventListener("click", function () {
    categoryBtn.forEach((elem) => {
      elem.classList.remove("active-btn");
    });
    elem.classList.add("active-btn");
    const dataFilter = elem.getAttribute("data-filter");
    const imgItems = [];
    contentImage.forEach((img) => {
      const dataItem = img.getAttribute("data-item");
      if (dataItem === dataFilter || dataFilter === "All") {
        imgItems.push(img);
      } else {
        img.classList.add("hide");
      }
    });
    console.log(imgItems);
    container.innerHTML = "";
    console.log(container);
    imgItems.forEach((elem) => {
      container.appendChild(elem);
      elem.classList.remove("hide");
    });
  });
});
// ========== Modal Box for video Play =======
const modal = document.querySelector(".modal");
const videoPlay = document.querySelector(".portfolio__videolink");
// const overlay = document.querySelector('.overlay');
const closeModal = document.querySelector(".modal__close");
const iframe = document.querySelector(".modal__video");
let scrollPosition = 0;
videoPlay.addEventListener("click", play);
closeModal.addEventListener("click", close);
function play(e) {
  // Open modal
  e.preventDefault();
  modal.style.display = "block";
  iframe.setAttribute("src", "//www.youtube.com/embed/Q_WHGV5bejk");
  scrollFixed();
}
window.onclick = function (e) {
  // close modal
  if (
    e.target.classList.contains("modal__content") ||
    e.target.classList.contains("modal__close")
  ) {
    modal.style.display = "none";
    iframe.setAttribute("src", " ");
    scrollEnable();
  }
};
console.log(window.scrollY);
function scrollFixed() {
  // function fixed position page
  scrollPosition = window.scrollY;
  document.body.style.overflow = "hidden";
  document.body.style.position = "fixed";
  document.body.style.top = -scrollPosition + "px";
}
function scrollEnable() {
  // enable fixed position page
  document.body.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, scrollPosition);
}
// // ==== form POST
const form = document.querySelector(".getform__form");
form.addEventListener("submit", function (e) {
  fetch("/index/", {
    method: "POST",
    body: new FormData(this),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.text();
    })
    .then((text) => {
      alert(text);
    })
    .catch((err) => {
      alert(`Sorry, your data is not get server. Please try again ${err}`);
    });
  e.preventDefault();
});
// function validate email input
const inputEmail = document.querySelector(".getform__input--email");
const validate =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
inputEmail.addEventListener("blur", inputValid);
function inputValid() {
  if (valid(inputEmail.value)) {
    inputEmail.style.backgroundColor = "#90f5a8";
  } else {
    inputEmail.style.backgroundColor = "#f56151";
  }
}
function valid(val) {
  return validate.test(val);
}
// // ==== Menu Burger
const menuList = document.querySelector(".menu__list");
const itemLi = document.querySelectorAll(".menu__list-item");
const burger = document.querySelector(".burger");
burger.addEventListener("click", function (e) {
  menuList.classList.toggle("active-menu");
  if (menuList) {
    document.body.classList.toggle("unscroll");
  }
  itemLi.forEach((elem) => {
    elem.classList.toggle("menu__list--active");
  });
});
// smooth scroll section
const elemsLink = document.querySelectorAll('a[href*="#"]');
const dataAttr = document.querySelectorAll('[data-scroll]');
elemsLink.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1); // delite first symbol href #
    dataAttr.forEach((elem) => {
      if (elem.dataset.scroll === targetId) {
        console.log(elem.dataset.scroll)
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    })
  });
});
// corection padding in header-top to scroll
const headerTop = document.querySelector('.header-top');
window.onscroll = function () {
  if (window.scrollY > 200) {
    headerTop.classList.add('header-top--padding');
    menuList.style.top = '84px';
  } else {
    headerTop.classList.remove('header-top--padding');
    menuList.style.top = '93px';
  }
}