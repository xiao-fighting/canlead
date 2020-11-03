window.onload = function () {
  var carousel = document.getElementsByClassName('carousel');
  var list = document.getElementById('list');
  var buttons = document.getElementById('buttons').getElementsByTagName('span');
  var prev = document.getElementById('prev');
  var next = document.getElementById('next');
  var index = 1;
  var timer;

  function animate(offset) {
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';

    //無限滾動判斷
    if (newLeft > -720) {
      list.style.left = -2880 + 'px';
    }
    if (newLeft < -2880) {
      list.style.left = -720 + 'px';
    }
  }

  function play() {
    //重複執行
    timer = setInterval(function () {
      next.onclick();
    }, 2000)
  }

  function stop() {
    clearInterval(timer);
  }

  function buttonsShow() {
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].className == "on") {
        buttons[i].className = "";
      }
    }
    // index 從0開始，故index 需要-1
    buttons[index - 1].className = "on";
  }

  prev.onclick = function () {
    index -= 1;
    if (index < 1) {
      index = 4
    }
    buttonsShow();
    animate(720);
  };

  next.onclick = function () {
    // 有四個小圓點
    index += 1;
    if (index > 4) {
      index = 1
    }
    animate(-720);
    buttonsShow();
  };

  for (var i = 0; i < buttons.length; i++) {
    (function (i) {
      buttons[i].onclick = function () {

        var clickIndex = parseInt(this.getAttribute('index'));
        var offset = 720 * (index - clickIndex);
        animate(offset);
        index = clickIndex;
        buttonsShow();
      }
    })(i)
  }

  carousel.onmouseover = stop;
  carousel.onmouseout = play;
  play();

}