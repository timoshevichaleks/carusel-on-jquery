let $container = $('#carousel');
let $slides = $('.slide');
let $indicatorsContainer = $('#indicators');
let $indicators = $('.indicator');
let currentSlide = 0;
let isPlaying = true;
let interval = 2000;

const prevButton = $('#prev');
const nextButton = $('#next');
const pauseButton = $('#pause');

const CODE_SPACE = 'Space';
const CODE_LEFT_ARROW = 'ArrowLeft';
const CODE_RIGHT_ARROW = 'ArrowRight';
const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';

function goToSlide(n) {
  $($slides[currentSlide]).toggleClass('active');
  $($indicators[currentSlide]).toggleClass('indicator-active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indicators[currentSlide]).toggleClass('indicator-active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function next() {
  pause();
  nextSlide();
}

function prev() {
  pause();
  prevSlide();
}

function pause() {
  if (isPlaying) {
    clearInterval(slideInterval);
    isPlaying = false;
    pauseButton.html(FA_PLAY);
  }
}

function play() {
  if (!isPlaying) {
    slideInterval = setInterval(nextSlide, interval)
    isPlaying = true;
    pauseButton.html(FA_PAUSE);
  }
}

function pausePlay() {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
}

function indicate(e) {
  pause();
  goToSlide(+$(e.target).attr('data-slide-to'));
}

function pressKey(e) {
  if (e.code === CODE_LEFT_ARROW) prev();
  if (e.code === CODE_RIGHT_ARROW) next();
  if (e.code === CODE_SPACE) pausePlay();
}

function swipeStart(e) {
  swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e) {
  swipeEndX = e.changedTouches[0].pageX;
  if (swipeStartX - swipeEndX > 100) next();
  if (swipeStartX - swipeEndX < -100) prev();
}

function stopSpaceScroll(e) {
  e.preventDefault();
}

let slideInterval = setInterval(nextSlide, interval);

prevButton.on('click', prev);
nextButton.on('click', next);
pauseButton.on('click', pausePlay);
$indicatorsContainer.on('click', $indicators, indicate);
$(document).on('keydown', pressKey);
$(document).on('touchstart', swipeStart);
$(document).on('touchend', swipeEnd);
$(document).on('keydown', stopSpaceScroll);