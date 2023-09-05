export default slider;

function slider() {
  // ======== Slider ============

  // актуальна позиція items
  let position = 0;
  let width;
  // контейнер слайдера
  const sliderInner = document.querySelector('.slider-blog__inner');
  // Трек слайдера зі слайдами 
  const sliderItems = document.querySelector('.slider-blog__items');
  // Слайди
  const sliderItem = document.querySelectorAll('.slider-blog__item');
  // Кнопки
  const btnPrev = document.querySelector('.slider-blog--prev');
  const btnNext = document.querySelector('.slider-blog--next');
  // Кількість показуваних слайдів 
  const slideToShow = 1;
  // скільки стреба проскролити 
  const slideToScroll = 1;
  // повна кількість слайдів
  const slidLength = sliderItem.length;
  // ширина контейнера поділина на кількість показаних слайдів = ширина слайда
  const slideWidth = sliderInner.clientWidth / slideToShow;
  // ширина на яку треба буде прокрутити слайдер 
  const slideMove = slideToScroll * slideWidth;
  // останій елемент. 
  const lastElem = (slidLength - slideToShow) * slideWidth;
  // console.log(lastElem)

  // кожен елемент отримує ширину 
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
    // від загальної дожини всього сладу віднімається слайд котрий прокрутився вліво в мінусову позицію
    // Наприклад є 5 слайдів один пішов вліво залишилося на полосі прокрутки 4 і так далі поки не закінчаться, коли дійде до останього і він буде на екрані, то далі вже буде 0 і крутити не буде.
    const itemScroll = slidLength - (Math.abs(position) + slideToShow * slideWidth) / slideWidth;
    console.log(itemScroll)

    if (itemScroll >= slideToScroll) {
      position -= slideMove;
    } else {
      position -= itemScroll * slideWidth;
    }
    console.log(position)
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

  function movePosition() { // функція зміщення слайду на ширину слайду 
    sliderItems.style.transform = `translateX(${position}px)`;
  }

  function activeBtn() {
    btnPrev.disabled = position === 0;
    btnNext.disabled = position <= -lastElem;
  }

  function dotsSlider() { // Dots 
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

  function resize() { // adaptive slider size
    width = document.querySelector('.slider-blog__inner').offsetWidth;
    sliderItems.style.width = width * `${slidLength}px`;
    sliderItem.forEach((elem) => {
      elem.style.width = `${width}px`;
      elem.style.heigth = 'auto';
    });
    console.log(width)
  }
  //  функція запускається при запускусторінки 
  window.addEventListener('resize', resize);
  activeBtn()
}