var McTicker = McTicker || function() {
    // default settings
    var settings = {
        "googleFontFamily": "Henny Penny",
        "typeKitFontId": "",
        "fontSize": "48px"
    }

    // user config settings
    var fps = 30;
    //var speed = 5;
    var speedPixelsPerSec = 600;
    var pixelsPerInterval = speedPixelsPerSec / 60;
    var tickerWidth = window.innerWidth;
    var tickerHeight = 600;
    var text = "Howdy, this demo shows a line of ticker text smoothly scrolling using an HTML5 canvas element rendering Google WebFonts which are converted to HTML5 canvas pixel data at run-time which is then being translated using the WebKit CSS3 hardware transforms. -- Mark";
    var tickerId = "ticker";
    
    // ticker element variables
    var ticker;
    var context;
    var offScreenCanvas;
    var offScreenContext;

    // reset the control variables
    var highResCurrentX = 0;
    var currentX = 0;
    var currentY = 0;
    var metrics = {};
    var tickerImageData = {};

    // awr the timing control variables
    var then = new Date().getTime();
    var interval = 1000 / fps;
    var now;

    var delta;

    /*
    // fps detection
    var fpsDetected = false;
    var fpsFirstTimestamp = 0;
    var fpsIntervalCount = 0;
    var fpsDetectionIntervals = 200;
    */

    // determine the browser's 'request animation frame' method
    reqAnimFrame = window.requestAnimationFrame ||
                   window.mozRequestAnimationFrame ||
                   window.webkitRequestAnimationFrame ||
                   window.msRequestAnimationFrame ||
                   window.oRequestAnimationFrame;

    function isGoogleFont() {
        return (settings.googleFontFamily && (settings.googleFontFamily !== "")) ? true : false;
    }

    function isTypeKitFont() {
        return (settings.typeKitFontFamily && (settings.typeKitFontFamily !== "")) ? true : false;
    }

    function getFontString() {
        var fontFamily;
        if (isGoogleFont() == true) {
            fontFamily = settings.googleFontFamily;
        } else if (isTypeKitFont() == true) {
            fontFamily = settings.typeKitFontFamily;
        } else {
            fontFamily = "Verdana";
        }

        return settings.fontSize + " \"" + fontFamily + "\"";
    }

    function startTicker() {
        // resize the ticker element
        ticker = document.getElementById(tickerId);
        ticker.width = tickerWidth;
        ticker.height = tickerHeight;
        context = ticker.getContext("2d");

        // get the rendered text width
        context.font = getFontString();
        context.fillStyle = '#5555CC';
        context.shadowColor = "#aaaaaa";
        context.shadowOffsetX = 4;
        context.shadowOffsetY = 4;
        context.shadowBlur = 3;
        metrics = context.measureText(text);
        
        /*
        offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = metrics.width + 20;
        offScreenCanvas.height = ticker.height;
        offScreenContext = offScreenCanvas.getContext("2d");
        offScreenContext.font = getFontString();
        offScreenContext.fillStyle = '#5555CC';
        offScreenContext.shadowColor = "#aaaaaa";
        offScreenContext.shadowOffsetX = 4;
        offScreenContext.shadowOffsetY = 4;
        offScreenContext.shadowBlur = 3;
        offScreenContext.fillText(text, 0, offScreenCanvas.height / 2);
        tickerImageData = offScreenContext.getImageData(0, 0, offScreenCanvas.width, offScreenCanvas.height);
        */





        canvas = document.getElementById('ticker');
        canvas.style.marginLeft = "100%";
        canvas.width = metrics.width + 20;
        canvas.height = ticker.height;
        offScreenContext = canvas.getContext("2d");
        offScreenContext.font = getFontString();
        offScreenContext.fillStyle = '#5555CC';
        offScreenContext.shadowColor = "#aaaaaa";
        offScreenContext.shadowOffsetX = 4;
        offScreenContext.shadowOffsetY = 4;
        offScreenContext.shadowBlur = 3;
        offScreenContext.fillText(text, 0, canvas.height / 2);
        tickerImageData = offScreenContext.getImageData(0, 0, canvas.width, canvas.height);

        var pixelsPerSec = 450;
        var animationSec = metrics.width / pixelsPerSec;
        move('#ticker')
            .ease('linear')
            .to(-(metrics.width + tickerWidth), 0)
            //.rotate(10)
            //.scale(5.5)
            //.set('background-color', '#888')
            //.set('border-color', 'black')
            .duration("" + animationSec + "s")
            //.skew(45, 0)
            .then()
                .set('opacity', 0)
                .duration('3.0s')
                .scale(1.0)
                .pop()
            .end();








        // set the initial ticker text position
        highResCurrentX = ticker.width;
        currentY = 0;

        // kick-off the animation        
        //reqAnimFrame(animate);
        
        currentX = 0;
        currentY = 0;
        highResCurrentX = 0;
        //reqAnimFrame(render);
        
        reqAnimFrame(dummyRender)
    }

    function dummyRender() {
        reqAnimFrame(dummyRender);        
    }

    function render() {
        // re-request the animation frame callback
        reqAnimFrame(render);


        //imageSliceData = offScreenContext.getImageData(currentX, 0, ticker.width, ticker.height);
        //context.putImageData(imageSliceData, 100, 100);

        highResCurrentX += pixelsPerInterval;
        var highResFloorX = Math.floor(highResCurrentX);
        if (currentX != highResFloorX) {
            currentX = highResFloorX;

            // redraw the ticker bitmap
            context.clearRect(0, 0, ticker.width, ticker.height);
            context.putImageData(tickerImageData, -highResFloorX, 0, highResFloorX, 0, ticker.width, ticker.height);

            // wrap the x position when the entire line has scrolled through
            if (highResCurrentX > metrics.width) {
                highResCurrentX = 0;
            }
        }

        //context.putImageData(tickerImageData, currentX, 0, 0, 0, ticker.width, ticker.height);
        //context.drawImage(tickerImageData, 0, 0, ticker.width, ticker.height, currentX, 0, ticker.width, ticker.height);

        //currentX -= pixelsPerInterval;
    }

    function animate() {
        /*
        // if we need to detect the browser's fps
        if (fpsDetected === false) {
            // if the first timestamp has not been taken
            if (fpsIntervalCount === 0) {
                fpsFirstTimestamp = new Date().getTime();
            } else if (fpsIntervalCount >= (fpsDetectionIntervals - 1)) {
                // calculate the browser fps
                var fpsNow = new Date().getTime();
                var fpsDelta = fpsNow - fpsFirstTimestamp;
                var browserFps = 1000 / (fpsDelta / fpsDetectionIntervals);

                pixelsPerInterval = speedPixelsPerSec / fps;

                // set the fps detection flag
                fpsDetected = true;
            }

            // increment the fps interval count
            fpsIntervalCount++;
        }
        */

        //now = new Date().getTime();
        //delta = now - then;

        //if (delta > interval) {
            // update the x position value
            //currentX -= pixelsPerInterval;
            highResCurrentX -= pixelsPerInterval;
            var highResFloorX = Math.floor(highResCurrentX);
            if (currentX != highResFloorX) {
                currentX = highResFloorX;

                // redraw the ticker bitmap
                draw_orig();
            }

            // wrap the x position when the entire line has scrolled through
            if (highResCurrentX + metrics.width < 0) {
                highResCurrentX = ticker.width;
            }

            // update the last timestamp
            //then = now - (delta % interval);
            //then = then + interval;
            //then = now;
        //}

        // re-request the animation frame callback
        reqAnimFrame(animate);
    }
    
    function draw_orig() {
        context.clearRect(0, 0, ticker.width, ticker.height);
        context.putImageData(tickerImageData, currentX, currentY);
    }

    function loadFonts() {
        // if no external web fonts are given
        if ((isGoogleFont() == false) && (isTypeKitFont() == false)) {
            return;
        }

        // create the google web font loader config
        WebFontConfig = {
            active: function() {
                // web fonts are now loaded; start the ticker
                startTicker();
            },
            inactive: function() {
                // web fonts could not be loaded; start the ticker with the default system font
                startTicker();
            }
        };

        // configure the google or typekit web fonts to load
        if (isGoogleFont() == true) {
            WebFontConfig.google = {
                families: [ settings.googleFontFamily ]
            }
        } else if (isTypeKitFont() == true) {
            WebFontConfig.typekit = {
                id: settings.typeKitFontId
            }
        }
        
        // load the web fonts
        (function() {
            var wf = document.createElement('script');
            var wfid = "webfont" + new Date().getTime();
            wf.id = wfid;
            wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
                '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
            wf.type = 'text/javascript';
            wf.async = 'true';
            document.head.insertBefore(wf, document.head.firstChild);
        })();        
    }
    
    return {
        init: function(userSettings) {
            // merge the user settings into the default settings
            settings = $.extend(settings, userSettings);

            // load the web fonts
            loadFonts();
        }
    }

}();
