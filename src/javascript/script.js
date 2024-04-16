/*global console */

(function () {

    "use strict";

    // var SEEK_JUMP_KEYCODE_MAPPINGS = {
    //         // 0 to 9
    //         "48": 0,
    //         "49": 1,
    //         "50": 2,
    //         "51": 3,
    //         "52": 4,
    //         "53": 5,
    //         "54": 6,
    //         "55": 7,
    //         "56": 8,
    //         "57": 9,
    //         // 0 to 9 on numpad
    //         "96": 0,
    //         "97": 1,
    //         "98": 2,
    //         "99": 3,
    //         "100": 4,
    //         "101": 5,
    //         "102": 6,
    //         "103": 7,
    //         "104": 8,
    //         "105": 9
    //     };

    function inputActive(currentElement) {
        // If on an input or textarea
        if (currentElement.tagName.toLowerCase() === "input" ||
            currentElement.tagName.toLowerCase() === "textarea" ||
            currentElement.isContentEditable) {
            return true;
        } else {
            return false;
        }
    }

    // https://stackoverflow.com/questions/6121203/how-to-do-fade-in-and-fade-out-with-javascript-and-css
    function fadeout(element, startOpacity) {
        var op = startOpacity; // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1) {
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    function displayText(speed, boundingElement) {
        var elementId = "youtube-extension-text-box",
            HTML = '<div id="' + elementId + '">' + speed + 'x</div>',
            element = document.getElementById(elementId);

        // If the element doesn't exist, append it to the body
        // must check if it already exists
        if (!element) {
            boundingElement.insertAdjacentHTML('afterbegin', HTML);
            element = document.getElementById(elementId);
        } else {
            element.innerHTML = speed + "x";
        }

        element.style.display = 'block';
        element.style.opacity = 0.8;
        element.style.filter = 'alpha(opacity=' + (0.8 * 100) + ")"
        setTimeout(function () {
            fadeout(element, 0.8);
        }, 2500);

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
        let
            key = event.key,
            // ctrlKey = event.ctrlKey,
            video = document.getElementsByTagName("video")[0],
            mediaElement = document.getElementById("movie_player"),
            mediaElementChildren = mediaElement.getElementsByTagName("*"),
            activeElement = document.activeElement,
            i;

        // If an input/textarea element is active, don't go any further 
        if (inputActive(activeElement)) {
            return;
        }

        if (key === '[') {
            video.playbackRate = increment(video.playbackRate, -0.1);
        } else if (key === ']') { 
            video.playbackRate = increment(video.playbackRate, 0.1);
        }

        displayText(video.playbackRate, mediaElement);

        // Check if the media element, or any of its children are active.
        // Else we'll be overwriting the previous actions.
        for (i = 0; i < mediaElementChildren.length; i = i + 1) {
            if (mediaElementChildren[i] === activeElement) {
                return;
            }
        }

        // Also check if it's the media element itself.
        if (mediaElement === activeElement) {
            return;
        }

        // If seek key
        // TODO:
        // if (SEEK_JUMP_KEYCODE_MAPPINGS[keyCode] !== undefined) {
        //     video.currentTime = (SEEK_JUMP_KEYCODE_MAPPINGS[keyCode] / 10) * video.duration;
        // }

    };

}());