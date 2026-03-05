/* ===== PORTFOLIO CAROUSEL JS ===== */

document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-portfolio', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: 700,
    coverflowEffect: {
      rotate: 15,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    // Autoplay disabled - carousel only moves on user interaction
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
    on: {
      init: function () {
        // Pause all videos on initialization
        this.slides.forEach(slide => {
          const video = slide.querySelector('video');
          if (video) {
            video.pause();
            video.currentTime = 0;
          }
        });
        // Play only the center (active) video
        const activeSlide = this.slides[this.activeIndex];
        const activeVideo = activeSlide.querySelector('video');
        if (activeVideo) {
          activeVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }
      },
      slideChangeTransitionStart: function () {
        // Pause all videos when slide change starts
        this.slides.forEach(slide => {
          const video = slide.querySelector('video');
          if (video) {
            video.pause();
          }
        });
      },
      slideChangeTransitionEnd: function () {
        // Play only the center (active) video after slide change completes
        const activeSlide = this.slides[this.activeIndex];
        const activeVideo = activeSlide.querySelector('video');
        if (activeVideo) {
          activeVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }
      }
    }
  });
});
