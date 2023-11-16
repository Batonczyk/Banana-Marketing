export default slider;

function slider() {
  // ======== Slider ============
  let position = 0;
  let width;
  const sliderInner = document.querySelector('.slider-blog__inner');
  const sliderItems = document.querySelector('.slider-blog__items');
  const sliderItem = document.querySelectorAll('.slider-blog__item');
  const btnPrev = document.querySelector('.slider-blog--prev');
  const btnNext = document.querySelector('.slider-blog--next');
  const slideToShow = 1;
  const slideToScroll = 1;
  const slidLength = sliderItem.length;
  const slideWidth = sliderInner.clientWidth / slideToShow;
  const slideMove = slideToScroll * slideWidth;
  const lastElem = (slidLength - slideToShow) * slideWidth;
  sliderItem.forEach((elem) => {
    elem.style.minWidth = `${slideWidth}px`;
  });
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);
  function prevSlide() {
    const itemScroll = Math.abs(position) / slideWidth;
    if (itemScroll >= slideToScroll) {
      position += slideMove;
    } else {
      position += itemScroll * slideWidth;
    }
    movePosition()
    activeBtn()
    activeDots()
  }
  function nextSlide() {
    const itemScroll = slidLength - (Math.abs(position) + slideToShow * slideWidth) / slideWidth;
    console.log(`itemScroll: ${itemScroll}`)
    if (itemScroll >= slideToScroll) {
      position -= slideMove;
    } else {
      position -= itemScroll * slideWidth;
    }
    console.log(`position${position}`)
    movePosition()
    activeBtn()
    activeDots()
  }
  function autoScroll() {
    if (position <= -lastElem) {
      position = 0
      movePosition()
      activeDots()
      activeBtn()
    } else {
      nextSlide()
    }
  }
  setInterval(() => {
    autoScroll()
  }, 3000);
  function movePosition() {
    sliderItems.style.transform = `translateX(${position}px)`;
  }
  function activeBtn() {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -lastElem;
  }
  function dotsSlider() {
    const dostList = document.createElement('ul');
    dostList.classList.add('dots');
    dostList.addEventListener('click', function (e) {
      const dots = this.querySelectorAll('.dot');
      dots.forEach((elem, index) => {
        elem.addEventListener('click', () => {
          const dotsMove = index * slideToScroll;
          position = -dotsMove * slideWidth;
          dots.forEach(dot => dot.classList.remove('active'));
          elem.classList.add('active');
          movePosition()
          activeBtn()
        });
      });
    });
    for (let i = 0; i < slidLength; i++) {
      const itemDot = document.createElement('li');
      itemDot.classList.add('dot');
      dostList.appendChild(itemDot);
    }
    sliderInner.appendChild(dostList);
  }
  dotsSlider()
  function activeDots() {
    const activeDot = Math.abs(position) / slideWidth / slideToScroll;
    const dots = document.querySelectorAll('.dots li');
    dots.forEach((dot, index) => {
      if (index === activeDot) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    })
  }
  activeDots()
  function resize() {
    width = document.querySelector('.slider-blog__inner').offsetWidth;
    sliderItems.style.width = width * `${slidLength}px`;
    sliderItem.forEach((elem) => {
      elem.style.width = `${width}px`;
      elem.style.heigth = 'auto';
    });
    console.log(width)
  }
  window.addEventListener('resize', resize);
  activeBtn()
}