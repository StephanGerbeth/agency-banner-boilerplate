"use strict";

// Configuration

/**
 * A array of duration.
 * Array length as stats amount.
 * @type {Array}
 */
var defaultStats = [3000, 3000, 3000, 3000, 3000, 3000];

// #############

require('./embed/fontfaceObserver');

// Fallbacks
var animationFrame = require('./polyfills/animationFrame');
var transitionProperty = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'transition': 'transitionend'
}[Modernizr.prefixed('transition')];

// Tests
Modernizr.addTest('mix-blend-mode', function() {
    return Modernizr.testProp('mixBlendMode');
});

global.onload = function() {

    var isLaterIE9 = true;
    if (document.querySelector('.ie') && !document.querySelector('.gt-ie9')) {
        isLaterIE9 = false;
    }

    document.body.className += ' js-banner-init';

    if (isLaterIE9) {
        registerStats(defaultStats);
    } else {
        console.log('FALLBACK TRANSITION');
        if (document.querySelector('.ie8')) {
            document.body.className += ' js-banner-fallback';
        } else {
            registerStatsFallback(defaultStats);
        }
    }

};


function createStateFallback(durations, stats) {
    var duration = durations.pop();
    setTimeout(function() {
        if (durations.length) {
            document.body.className += ' js-banner-state-' + stats;
            stats++;
            createStateFallback(durations, stats);
        }
    }, duration);
}

function registerStatsFallback(stats) {
    stats = stats.reverse();
    createStateFallback(stats, 1);
}

function createState(index, cb) {
    console.log('.state-' + index);
    var state = document.querySelector('.js-state-' + index);
    var onTransition = function(e) {
        if (e.target === state) {
            state.removeEventListener(transitionProperty, onTransition);
            console.log('js-state-' + index);
            if (typeof cb === 'function') {
                cb();
            } else {
                animationFrame.add(function() {
                    document.body.className += ' js-banner-state-' + index;
                });
            }
        }
    };
    if (state) {
        state.addEventListener(transitionProperty, onTransition);
    }
}

function registerStats(stats) {

    for (var i = 1; i <= stats.length; i++) {
        createState(i);
    }

    // Status Reset
    createState('reset');

    // Status Repeat
    createState('repeat', function() {
        animationFrame.add(function() {
            document.body.className = '';
            console.log('state-repeat');
            registerStats(defaultStats);
            animationFrame.add(function() {
                document.body.className += ' js-banner-init';
            });
        });
    });

}
