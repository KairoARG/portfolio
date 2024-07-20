document.addEventListener('DOMContentLoaded', function() {

  let canScroll = true;
  let scrollController = null;

  document.addEventListener('wheel', function(e) {
    if (!document.querySelector('.outer-nav').classList.contains('is-vis')) {
      e.preventDefault();

      const delta = e.deltaY || e.detail || -e.wheelDelta;

      if (delta > 50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function() {
          canScroll = true;
        }, 800);
        updateHelper(1);
      } else if (delta < -50 && canScroll) {
        canScroll = false;
        clearTimeout(scrollController);
        scrollController = setTimeout(function() {
          canScroll = true;
        }, 800);
        updateHelper(-1);
      }
    }
  });

  document.querySelectorAll('.side-nav li, .outer-nav li').forEach(function(item) {
    item.addEventListener('click', function() {
      if (!this.classList.contains('is-active')) {
        const curActive = document.querySelector('.side-nav .is-active');
        const curPos = Array.from(curActive.parentElement.children).indexOf(curActive);
        const nextPos = Array.from(this.parentElement.children).indexOf(this);
        const lastItem = this.parentElement.children.length - 1;
        updateNavs(nextPos);
        updateContent(curPos, nextPos, lastItem);
      }
    });
  });

  document.querySelector('.cta').addEventListener('click', function() {
    const curActive = document.querySelector('.side-nav .is-active');
    const curPos = Array.from(curActive.parentElement.children).indexOf(curActive);
    const lastItem = curActive.parentElement.children.length - 1;
    const nextPos = lastItem;
    updateNavs(lastItem);
    updateContent(curPos, nextPos, lastItem);
  });

  function updateNavs(nextPos) {
    document.querySelectorAll('.side-nav li, .outer-nav li').forEach(function(item) {
      item.classList.remove('is-active');
    });
    document.querySelectorAll('.side-nav li, .outer-nav li')[nextPos].classList.add('is-active');
  }


  function updateContent(curPos, nextPos, lastItem) {
    document.querySelectorAll('.main-content .section').forEach(function(section) {
      section.classList.remove('section--is-active', 'section--next', 'section--prev');
    });

    document.querySelectorAll('.main-content .section')[nextPos].classList.add('section--is-active');

    if ((curPos === lastItem && nextPos === 0) || (curPos === 0 && nextPos === lastItem)) {
      document.querySelectorAll('.main-content .section').forEach(function(section) {
        section.classList.remove('section--next', 'section--prev');
      });
    } else if (curPos < nextPos) {
      document.querySelectorAll('.main-content .section')[curPos].classList.add('section--next');
    } else {
      document.querySelectorAll('.main-content .section')[curPos].classList.add('section--prev');
    }

    document.querySelector('.header--cta').classList.toggle('is-active', !(nextPos === 0 || nextPos === lastItem));
  }

  function updateHelper(param) {
    const curActive = document.querySelector('.side-nav .is-active');
    const curPos = Array.from(curActive.parentElement.children).indexOf(curActive);
    const lastItem = curActive.parentElement.children.length - 1;
    let nextPos = 0;

    if (param === 1 || param.type === 'swipeup' || param.keyCode === 40) {
      nextPos = curPos !== lastItem ? curPos + 1 : 0;
    } else if (param === -1 || param.type === 'swipedown' || param.keyCode === 38) {
      nextPos = curPos !== 0 ? curPos - 1 : lastItem;
    }

    updateNavs(nextPos);
    updateContent(curPos, nextPos, lastItem);
  }

  function outerNav() {
    document.querySelector('.header--nav-toggle').addEventListener('click', function() {
      document.querySelector('.perspective').classList.add('perspective--modalview');
      setTimeout(function() {
        document.querySelector('.perspective').classList.add('effect-rotate-left--animate');
      }, 25);
      document.querySelectorAll('.outer-nav, .outer-nav li, .outer-nav--return').forEach(function(item) {
        item.classList.add('is-vis');
      });
    });

    document.querySelectorAll('.outer-nav--return, .outer-nav li').forEach(function(item) {
      item.addEventListener('click', function() {
        document.querySelector('.perspective').classList.remove('effect-rotate-left--animate');
        setTimeout(function() {
          document.querySelector('.perspective').classList.remove('perspective--modalview');
        }, 400);
        document.querySelectorAll('.outer-nav, .outer-nav li, .outer-nav--return').forEach(function(item) {
          item.classList.remove('is-vis');
        });
      });
    });
  }


  function workSlider() {
    document.querySelectorAll('.slider--prev, .slider--next').forEach(function(item) {
      item.addEventListener('click', function() {
        const curLeft = document.querySelector('.slider--item-left');
        const curCenter = document.querySelector('.slider--item-center');
        const curRight = document.querySelector('.slider--item-right');
        const totalWorks = document.querySelectorAll('.slider--item').length;

        document.querySelector('.slider').style.opacity = 0;

        setTimeout(function() {
          if (item.classList.contains('slider--next')) {
            if (Array.from(curLeft.parentElement.children).indexOf(curLeft) < totalWorks - 1 &&
                Array.from(curCenter.parentElement.children).indexOf(curCenter) < totalWorks - 1 &&
                Array.from(curRight.parentElement.children).indexOf(curRight) < totalWorks - 1) {
              curLeft.classList.remove('slider--item-left');
              curLeft.nextElementSibling.classList.add('slider--item-left');
              curCenter.classList.remove('slider--item-center');
              curCenter.nextElementSibling.classList.add('slider--item-center');
              curRight.classList.remove('slider--item-right');
              curRight.nextElementSibling.classList.add('slider--item-right');
            } else {
              if (Array.from(curLeft.parentElement.children).indexOf(curLeft) === totalWorks - 1) {
                curLeft.classList.remove('slider--item-left');
                curLeft.parentElement.firstElementChild.classList.add('slider--item-left');
                curCenter.classList.remove('slider--item-center');
                curCenter.nextElementSibling.classList.add('slider--item-center');
                curRight.classList.remove('slider--item-right');
                curRight.nextElementSibling.classList.add('slider--item-right');
              } else if (Array.from(curCenter.parentElement.children).indexOf(curCenter) === totalWorks - 1) {
                curLeft.classList.remove('slider--item-left');
                curLeft.nextElementSibling.classList.add('slider--item-left');
                curCenter.classList.remove('slider--item-center');
                curCenter.parentElement.firstElementChild.classList.add('slider--item-center');
                curRight.classList.remove('slider--item-right');
                curRight.nextElementSibling.classList.add('slider--item-right');
              } else {
                curLeft.classList.remove('slider--item-left');
                curLeft.nextElementSibling.classList.add('slider--item-left');
                curCenter.classList.remove('slider--item-center');
                curCenter.nextElementSibling.classList.add('slider--item-center');
                curRight.classList.remove('slider--item-right');
                curRight.parentElement.firstElementChild.classList.add('slider--item-right');
              }
            }
          } else {
            if (Array.from(curLeft.parentElement.children).indexOf(curLeft) !== 0 &&
                Array.from(curCenter.parentElement.children).indexOf(curCenter) !== 0 &&
                Array.from(curRight.parentElement.children).indexOf(curRight) !== 0) {
              curLeft.classList.remove('slider--item-left');
              curLeft.previousElementSibling.classList.add('slider--item-left');
              curCenter.classList.remove('slider--item-center');
              curCenter.previousElementSibling.classList.add('slider--item-center');
              curRight.classList.remove('slider--item-right');
              curRight.previousElementSibling.classList.add('slider--item-right');
            } else {
              if (Array.from(curLeft.parentElement.children).indexOf(curLeft) === 0) {
                curLeft.classList.remove('slider--item-left');
                curLeft.parentElement.lastElementChild.classList.add('slider--item-left');
                curCenter.classList.remove('slider--item-center');
                curCenter.previousElementSibling.classList.add('slider--item-center');
                curRight.classList.remove('slider--item-right');
                curRight.previousElementSibling.classList.add('slider--item-right');
              } else if (Array.from(curCenter.parentElement.children).indexOf(curCenter) === 0) {
                curLeft.classList.remove('slider--item-left');
                curLeft.previousElementSibling.classList.add('slider--item-left');
                curCenter.classList.remove('slider--item-center');
                curCenter.parentElement.lastElementChild.classList.add('slider--item-center');
                curRight.classList.remove('slider--item-right');
                curRight.previousElementSibling.classList.add('slider--item-right');
              } else {
                curLeft.classList.remove('slider--item-left');
                curLeft.previousElementSibling.classList.add('slider--item-left');
                curCenter.classList.remove('slider--item-center');
                curCenter.previousElementSibling.classList.add('slider--item-center');
                curRight.classList.remove('slider--item-right');
                curRight.parentElement.lastElementChild.classList.add('slider--item-right');
              }
            }
          }
          document.querySelector('.slider').style.opacity = 20;
        }, 500);
      });
    });
  }

  function transitionLabels() {
    document.querySelectorAll('.work-request--information input').forEach(function(input) {
      input.addEventListener('focusout', function() {
        if (this.value === "") {
          this.classList.remove('has-value');
        } else {
          this.classList.add('has-value');
        }

        window.scrollTo(0, 0);
      });
    });
  }

document.querySelector('.terminal').addEventListener('mouseover', function() {
  this.classList.add('animated');
});
  

outerNav();
workSlider();
transitionLabels();

});
