const carouselItem = document.querySelector(".carousel").children;
// console.log(carouselItem);

const carousel = document.querySelector(".carousel");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const buttons = document.querySelector(".buttons");

let index = 0;

prev.addEventListener("click", function () {
  prevItem();
  updateCircleButtons();
  resetTimer();
})

next.addEventListener("click", function () {
  nextItem();
  updateCircleButtons();
  resetTimer();
})

function changeItem() {
  for (let i = 0; i < carouselItem.length; i++) {
    carouselItem[i].classList.remove("active")
  }
  carouselItem[index].classList.add("active");
}

function prevItem() {
  if (index == 0) {
    index = carouselItem.length - 1;
  } else {
    index--;
  }
  // console.log(index);
  changeItem();
}

function nextItem() {
  if (index == carouselItem.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeItem();
}

// create circle-buttons
function circleButtons() {
  for (let i = 0; i < carouselItem.length; i++) {
    const div = document.createElement("div");
    // div.innerHTML = 1;
    div.setAttribute("onclick", "buttonItems(this)");
    div.id = i;
    // 一開始就是 .active
    if (i == 0) {
      div.className = "active"
    }
    buttons.appendChild(div)
  }
}

circleButtons();
function buttonItems(element) {
  console.log(element);
  index = element.id;
  changeItem();
  updateCircleButtons();
}

function updateCircleButtons() {
  for (let i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove("active");
  }
  buttons.children[index].classList.add("active");
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoPlay, 4000);

}

function autoPlay() {
  nextItem();
  updateCircleButtons();
}

let timer = setInterval(autoPlay, 4000);

// 當滑鼠在輪播圖上方時，會停止輪播
carousel.setAttribute("onmouseover", "reset()");
carousel.setAttribute("onmouseout", "play()");

function reset() {
  clearInterval(timer);
}

function play() {
  timer = setInterval(autoPlay, 4000);
}