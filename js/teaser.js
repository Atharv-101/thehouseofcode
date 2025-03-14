// Make Timer
const second = 1000,
  minute = second * 60,
  hour = minute * 60,
  day = hour * 24;

var days = document.querySelector(".days");
var hours = document.querySelector(".hours");
var minutes = document.querySelector(".minutes");
var seconds = document.querySelector(".seconds");
var tickElements = Array.from(document.querySelectorAll(".tick"));

let today = new Date(),
  dd = String(today.getDate()).padStart(2, "0"),
  mm = String(today.getMonth() + 1).padStart(2, "0"),
  yyyy = today.getFullYear(),
  nextYear = yyyy + 1,
  dayMonth = "04/07/", 
  dday = dayMonth + yyyy;

today = mm + "/" + dd + "/" + yyyy;
if (today > dday) {
  dday = dayMonth + nextYear;
}

var tickState = true;

const countDown = new Date(dday).getTime(),
  x = setInterval(function () {
    const now = new Date().getTime(),
      distance = countDown - now;

    newDays = Math.floor(distance / day).toString();
    updateContainer(days, newDays);

    newHours = Math.floor((distance % day) / hour).toString();
    updateContainer(hours, newHours);

    newMinutes = Math.floor((distance % hour) / minute).toString();
    updateContainer(minutes, newMinutes);

    newSeconds = Math.floor((distance % minute) / second).toString();
    updateContainer(seconds, newSeconds);

    //seconds
  }, 0);

function tick() {
  tickElements.forEach((t) => t.classList.toggle("tick-hidden"));
}

function updateContainer(container, newTime) {
  var time = newTime.split("");

  if (time.length === 1) {
    time.unshift("0");
  }

  var first = container.firstElementChild;
  if (first.lastElementChild.textContent !== time[0]) {
    updateNumber(first, time[0]);
  }

  var last = container.lastElementChild;
  if (last.lastElementChild.textContent !== time[1]) {
    updateNumber(last, time[1]);
  }
}

function updateNumber(element, number) {
  //element.lastElementChild.textContent = number
  var second = element.lastElementChild.cloneNode(true);
  second.textContent = number;

  element.appendChild(second);
  element.classList.add("move");

  setTimeout(function () {
    element.classList.remove("move");
  }, 990);
  setTimeout(function () {
    element.removeChild(element.firstElementChild);
  }, 990);
}
setInterval(countDown, 100);

/*------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------*/

if ($(window).width() < 576) {
  setInterval(function () {
    $("#pannel").toggleClass('turn');
  }, 10000);

  $('.countnum').removeClass('title');
}

// Pannel Hover
$('#flip').on({
  click: function () {
    $("#pannel").removeClass('left');
    $("#pannel").removeClass('right');
    $("#pannel").toggleClass('turn');
  },
  mouseover: function () {
    $(document).mousemove(function (e) {
      var widthCalc = $(this).width() / 2;
      if (widthCalc > e.pageX) {
        $("#pannel").removeClass('right');
        $("#pannel").addClass('left');
      } else {
        $("#pannel").removeClass('left');
        $("#pannel").addClass('right');

      }
    })
  },

})

