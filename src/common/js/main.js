"use strict";

require('./embed/fontfaceObserver');
Modernizr.addTest('mix-blend-mode', function() {
    return Modernizr.testProp('mixBlendMode');
});

// document.body.style.mixBlendMode

var transitionProperty = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'transition': 'transitionend'
}[Modernizr.prefixed('transition')];

window.onload = function() {
    
    var isLaterIE9 = true;
    if (document.querySelector('.ie') && !document.querySelector('.gt-ie9')) {
        isLaterIE9 = false;
    }

    document.body.className += ' js-banner-init';

    if (isLaterIE9) {
        // Status 1
        var state1 = document.querySelector('.state-1');
        var onTransition1 = function() {
            document.body.className += ' js-banner-state-1';
            state1.removeEventListener(transitionProperty, onTransition1);
            console.log('state-1');
        };
        state1.addEventListener(transitionProperty, onTransition1);

        // Status 2
        var state2 = document.querySelector('.state-2');
        var onTransition2 = function() {
            document.body.className += ' js-banner-state-2';
            state2.removeEventListener(transitionProperty, onTransition2);
            console.log('state-2');
        };
        if (state2) {
            state2.addEventListener(transitionProperty, onTransition2);
        }
        // Status 3
        var state3 = document.querySelector('.state-3');
        var onTransition3 = function() {
            document.body.className += ' js-banner-state-3';
            state3.removeEventListener(transitionProperty, onTransition3);
            console.log('state-3');
        };
        if (state3) {
            state3.addEventListener(transitionProperty, onTransition3);
        }

        // Status 4
        var state4 = document.querySelector('.state-4');
        var onTransitionState4 = function() {
            document.body.className += ' js-banner-state-4';
            state4.removeEventListener(transitionProperty, onTransitionState4);
            console.log('state-4');
        };
        if (state4) {
            state4.addEventListener(transitionProperty, onTransitionState4);
        }

        // Status 5
        var state5 = document.querySelector('.state-5');
        var onTransitionStatus5 = function() {
            document.body.className += ' js-banner-state-5';
            state5.removeEventListener(transitionProperty, onTransitionStatus5);
            console.log('state-5');
        };
        if (state5) {
            state5.addEventListener(transitionProperty, onTransitionStatus5);
        }

        // Status 6
        var state6 = document.querySelector('.state-6');
        var onTransitionStatus6 = function() {
            document.body.className += ' js-banner-state-6';
            state6.removeEventListener(transitionProperty, onTransitionStatus6);
            console.log('state-6');
        };
        if (state6) {
            state6.addEventListener(transitionProperty, onTransitionStatus6);
        }


    } else {
        console.log('FALLBACK TRANSITION');
        if (document.querySelector('.ie8')) {
            document.body.className += ' js-banner-fallback';
        } else {
            var duration = 3000;
            setTimeout(function() {
                document.body.className += ' js-banner-state-1';
                setTimeout(function() {
                    document.body.className += ' js-banner-state-2';
                    setTimeout(function() {
                        document.body.className += ' js-banner-state-3';
                        setTimeout(function() {
                            document.body.className += ' js-banner-state-4';
                            setTimeout(function() {
                                document.body.className += ' js-banner-state-5';
                                setTimeout(function() {
                                    document.body.className += ' js-banner-state-6';
                                }, duration);
                            }, duration);
                        }, duration);
                    }, duration);
                }, duration);
            }, duration);
        }
    }

};
