var DETAIL_IMAGE_SELECTOR = "[data-image-role=\"target\"]";
var DETAIL_TITLE_SELECTOR = "[data-image-role=\"title\"]";
var DETAIL_FRAME_SELECTOR = "[data-image-role=\"frame\"]";
var THUMBNAIL_LINK_SELECTOR = "[data-image-role=\"trigger\"]";
var NEXT_BUTTON_CLICK = "[data-next-button=\"next_button\"]";
var PERVIOUS_BUTTON_CLICK = "[data-previous-button=\"previous_button\"]";
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
  "use strict";
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function(event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function getTotalCount(thumbnails) {
  "use strict";
  return Object.keys(thumbnails).length;
}

function hideDetails() {
  "use strict";
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  "use strict";
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function() {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  "use strict";
  document.body.addEventListener("keyup", function(event) {
    event.preventDefault();
    /*console.log(event.keyCode);*/
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
}

function addPreviousButtonHandler(thumbnails) {
  "use strict";
  var previousbutton = document.querySelector(PERVIOUS_BUTTON_CLICK);
  previousbutton.addEventListener("click", function(event) {
    event.preventDefault();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var step;
    for (step = 0; step < getTotalCount(thumbnails); step++) {
      if ((thumbnails[step].getAttribute("data-image-url") === detailImage.getAttribute("src")) && (step-1>=0)) {
        setDetails(thumbnails[step-1].getAttribute("data-image-url"),thumbnails[step-1].getAttribute("data-image-title"));
        break;
      }
    }
  });
}

function addNextButtonHandler(thumbnails) {
  "use strict";
  var nextbutton = document.querySelector(NEXT_BUTTON_CLICK);
  nextbutton.addEventListener("click", function(event) {
    event.preventDefault();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var step;
    for (step = 0; step < getTotalCount(thumbnails); step++) {
      if ((thumbnails[step].getAttribute("data-image-url") === detailImage.getAttribute("src")) && (step+1<getTotalCount(thumbnails))) {
        setDetails(thumbnails[step+1].getAttribute("data-image-url"),thumbnails[step+1].getAttribute("data-image-title"));
        break;
      }
    }
  });
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
  addNextButtonHandler(thumbnails);
  addPreviousButtonHandler(thumbnails);
}

initializeEvents();
