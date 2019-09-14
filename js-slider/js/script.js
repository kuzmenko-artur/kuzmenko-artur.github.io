const slidesBlock = document.querySelector('.js-slider');
const slides = document.querySelector('.js-slider-slides').children;
const dots = document.querySelector('.js-slider-dots');
let step = 0;

slides[step].classList.add('is-active');

// Dots
for (let i = 0; i < slides.length; i++) {
    const divElement = document.createElement('div');
    dots.append(divElement);
    dots.children[i].classList.add('slider-dots__item');
    dots.children[i].setAttribute('onclick', 'dotsClick(' + i + ')');
}
dots.children[step].classList.add('is-active')

// Arrows
const replacement = (add) => {
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('is-active');
    }
    slides[add].classList.add('is-active');
    step = add;
    updateDots(step);
}

// Update active dots
const updateDots = (step) => {
    for (let i = 0; i < dots.children.length; i++) {
        dots.children[i].classList.remove('is-active');
    }
    dots.children[step].classList.add('is-active');
}

// Next slide
const nextSlide = () => { step < slides.length - 1 ? replacement(++step) : step = 0, replacement(step) }
document.querySelector('.js-slider-next').onclick = () => nextSlide();
// Prev slide
const prevSlide = () => { step !== 0 ? replacement(--step) : step = slides.length - 1, replacement(step) }
document.querySelector('.js-slider-prev').onclick = () => prevSlide();
// Dots click
const dotsClick = (i) => replacement(i);

// AutoSlideShow
let timer;
const goAhead = () => {
    timer = setInterval(nextSlide, 3000);
}
goAhead();
slidesBlock.onmouseenter = (e) => {
    clearInterval(timer);
}
slidesBlock.onmouseleave = (e) => {
    goAhead();
}