(function() {
  'use strict';

  window.addEventListener("DOMContentLoaded", init, false);

  function init() {

    var menu = document.getElementById("menu");
    var navigation = document.getElementById("navigation");

    menu.addEventListener("click", function() {
      activeMenu();
    }, false);

    function activeMenu() {
      navigation.classList.toggle("navactive");
    }


    var playpause = document.getElementsByClassName("buttons");
    var audios = document.querySelectorAll("audio");

    for (let i = 0; i < playpause.length; i++) {
      if (i % 2 == 1) playpause[i].classList.add("hide");
      playpause[i].addEventListener("click", function() {
        playPause(i);
      }, false);
    }

    var observer = new IntersectionObserver(onChange, {
      threshold: 0
    });

    var allImg = document.querySelectorAll("section > img");
    allImg.forEach(img => observer.observe(img));

    function onChange(changes, observer) {
      changes.forEach(change => {
        for (let i = 0; i < audios.length; i++) {
          if (!audios[i].paused && change.isIntersecting == false) {
            audios[i].pause();
            playpause[i * 2 + 1].classList.add("hide");
            playpause[i * 2].classList.remove("hide");
          }
        }
      });
    }

    function playPause(i) {
      var index = i;
      if (index % 2 != 0) index -= 1;
      var aud = audios[index / 2];
      for (let i = 0; i < audios.length; i++) {
        if (aud != audios[i]) audios[i].pause();
        playpause[i * 2 + 1].classList.add("hide");
        playpause[i * 2].classList.remove("hide");
      }
      if (aud.paused) {
        aud.play();
        playpause[index].classList.add("hide");
        playpause[index + 1].classList.remove("hide");
      } else {
        aud.pause();
        playpause[index + 1].classList.add("hide");
        playpause[index].classList.remove("hide");
      }
    }




  }
})();