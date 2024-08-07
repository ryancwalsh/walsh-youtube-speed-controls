/* eslint-disable unicorn/prefer-query-selector */
/* global document */
/* global window */
(function () {
  let savedPlaybackRate = 1; // Default playback speed

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

  function displayTextOverlay(content, boundingElement) {
    const elementId = 'youtube-extension-text-box';
    const HTML = '<div id="' + elementId + '">' + content + '</div>';
    let element = document.getElementById(elementId);

    // If the element doesn't exist, append it to the body.
    if (element) {
      element.innerHTML = content;
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
    const HTML = '<div id="' + logoLabelId + '">' + speed + 'x</div>';
    let element = document.getElementById(logoLabelId);

    // If the element doesn't exist, append it to the body.
    if (element) {
      element.innerHTML = speed + 'x';
    } else {
      const boundingElement = document.querySelector('#logo');
      if (boundingElement) {
        boundingElement.insertAdjacentHTML('afterbegin', HTML);
      }
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

  function setPlaybackRate(video, rate) {
    if (video) {
      video.playbackRate = rate;
      console.log(`setPlaybackRate ${video.playbackRate}x`);
      displayTextOverlay(`${video.playbackRate}x`, document.querySelector('#movie_player'));
      displayLabelInLogo(video.playbackRate);
    }
  }

  window.onkeyup = function (event) {
    const key = event.key;
    // ctrlKey = event.ctrlKey,
    const video = document.querySelector('video');
    const mediaElement = document.querySelector('#movie_player');
    const mediaElementChildren = mediaElement.querySelectorAll('*');
    const activeElement = document.activeElement;
    let index;

    // If an input/textarea element is active, don't go any further
    if (inputActive(activeElement)) {
      return;
    }

    if (['[', ']'].includes(key)) {
      if (key === '[') {
        setPlaybackRate(video, increment(video.playbackRate, -0.1));
      } else if (key === ']') {
        setPlaybackRate(video, increment(video.playbackRate, 0.1));
      }
    }

    // Check if the media element, or any of its children are active.
    // Else we'll be overwriting the previous actions.
    for (index = 0; index < mediaElementChildren.length; index += 1) {
      if (mediaElementChildren[index] === activeElement || mediaElement === activeElement) {
        return;
      }
    }

    // This is unnecessary because the left arrow button already allows jumping backwards.
    // // If seek key
    // if (key === 'b') {
    //   const jumpBackSeconds = 10;
    //   video.currentTime -= jumpBackSeconds;
    //   displayTextOverlay(`Back ${jumpBackSeconds} sec`, mediaElement);
    // }
  };

  // // Save playback rate before ad plays and restore it after. (This came from ChatGPT but might not work and might hang the browser.)
  // const observer = new MutationObserver(function (mutations) {
  //   mutations.forEach(function (mutation) {
  //     const video = document.querySelector('video');
  //     if (!video) return;

  //     if (video.playbackRate !== savedPlaybackRate) {
  //       savedPlaybackRate = video.playbackRate;
  //     }

  //     const adsContainer = document.querySelector('.ad-interrupting');
  //     if (adsContainer && adsContainer.style.display !== 'none') {
  //       console.log('Ad is playing.');
  //       video.playbackRate = 1;
  //     } else if (!adsContainer || adsContainer.style.display === 'none') {
  //       console.log('Ad finished. Restoring playback rate.');
  //       setPlaybackRate(video, savedPlaybackRate);
  //     }
  //   });
  // });

  // observer.observe(document.body, {
  //   attributes: true,
  //   childList: true,
  //   subtree: true,
  // });
})();
