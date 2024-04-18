/* eslint-disable unicorn/prefer-query-selector */
/* global document */
/* global window */
(function () {
  function inputActive(currentElement) {
    // If on an input or textarea
    if (currentElement.tagName.toLowerCase() === 'input' || currentElement.tagName.toLowerCase() === 'textarea' || currentElement.isContentEditable) {
      return true;
    } else {
      return false;
    }
  }

  // https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
  function fadeout(element, startOpacity) {
    let opacity = startOpacity; // initial opacity
    const timer = setInterval(function () {
      if (opacity <= 0.1) {
        clearInterval(timer);
        element.style.display = 'none';
      }

      element.style.opacity = opacity;
      element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
      opacity -= opacity * 0.1;
    }, 50);
  }

  function displayTextOverlay(speed, boundingElement) {
    const elementId = 'youtube-extension-text-box';
    const HTML = '<div id="' + elementId + '">' + speed + 'x</div>';
    let element = document.getElementById(elementId);

    // If the element doesn't exist, append it to the body.
    if (element) {
      element.innerHTML = speed + 'x';
    } else {
      boundingElement.insertAdjacentHTML('afterbegin', HTML);
      element = document.getElementById(elementId);
    }

    element.style.display = 'block';
    const opacity = 0.8;
    element.style.opacity = opacity;
    element.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
    setTimeout(function () {
      fadeout(element, opacity);
    }, 2_500);
  }

  function displayLabelInLogo(speed) {
    const logoLabelId = 'youtube-extension-label-in-logo';
    const boundingElement = document.querySelector('#logo');
    const HTML = '<div id="' + logoLabelId + '">' + speed + 'x</div>';
    let element = document.getElementById(logoLabelId);

    // If the element doesn't exist, append it to the body.
    if (element) {
      element.innerHTML = speed + 'x';
    } else {
      boundingElement.insertAdjacentHTML('afterbegin', HTML);
      element = document.getElementById(logoLabelId);
    }
  }

  /**
   * instead of using math.js to preserve precision
   */
  function increment(originalValue, amountToChange) {
    let result = originalValue * 10;
    const x = amountToChange * 10;
    result += x;
    return result / 10;
  }

  window.onkeyup = function (event) {
    const key = event.key;
    // ctrlKey = event.ctrlKey,
    const video = document.querySelectorAll('video')[0];
    const mediaElement = document.querySelector('#movie_player');
    const mediaElementChildren = mediaElement.querySelectorAll('*');
    const activeElement = document.activeElement;
    let index;

    // If an input/textarea element is active, don't go any further
    if (inputActive(activeElement)) {
      return;
    }

    if (key === '[') {
      video.playbackRate = increment(video.playbackRate, -0.1);
    } else if (key === ']') {
      video.playbackRate = increment(video.playbackRate, 0.1);
    }

    displayTextOverlay(video.playbackRate, mediaElement);
    displayLabelInLogo(video.playbackRate);

    // Check if the media element, or any of its children are active.
    // Else we'll be overwriting the previous actions.
    for (index = 0; index < mediaElementChildren.length; index += 1) {
      if (mediaElementChildren[index] === activeElement) {
        return;
      }
    }

    // Also check if it's the media element itself.
    if (mediaElement !== activeElement) {
      // If seek key
      // TODO:
      // if (SEEK_JUMP_KEYCODE_MAPPINGS[keyCode] !== undefined) {
      //     video.currentTime = (SEEK_JUMP_KEYCODE_MAPPINGS[keyCode] / 10) * video.duration;
      // }
    }
  };
})();
