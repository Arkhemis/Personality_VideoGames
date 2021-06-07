(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (global){(function (){
const { Game } = require('uno-engine')
global.window.Game = Game

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"uno-engine":3}],3:[function(require,module,exports){
(function (process){(function (){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Uno=t():e.Uno=t()}(window,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=9)}([function(e,t){e.exports=function(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},function(e,t,r){r(3);var n=r(6),i=r(7),o=e.exports={},s={deck:(new i).cards,random:function(){return Math.random()}};o.playingCards=function(){return(new i).cards},o.shuffle=function(e){return e||(e=s),e.deck||(e.deck=s.deck),e.random||(e.random=s.random),new n(e.deck,e.random)}},function(e,t,r){"use strict";var n,i="object"==typeof Reflect?Reflect:null,o=i&&"function"==typeof i.apply?i.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};n=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var s=Number.isNaN||function(e){return e!=e};function a(){a.init.call(this)}e.exports=a,a.EventEmitter=a,a.prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var u=10;function c(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?a.defaultMaxListeners:e._maxListeners}function h(e,t,r,n){var i,o,s,a;if(c(r),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),o=e._events),s=o[t]),void 0===s)s=o[t]=r,++e._eventsCount;else if("function"==typeof s?s=o[t]=n?[r,s]:[s,r]:n?s.unshift(r):s.push(r),(i=l(e))>0&&s.length>i&&!s.warned){s.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=s.length,a=u,console&&console.warn&&console.warn(a)}return e}function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,r){var n={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},i=f.bind(n);return i.listener=r,n.wrapFn=i,i}function d(e,t,r){var n=e._events;if(void 0===n)return[];var i=n[t];return void 0===i?[]:"function"==typeof i?r?[i.listener||i]:[i]:r?function(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(i):v(i,i.length)}function y(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function v(e,t){for(var r=new Array(t),n=0;n<t;++n)r[n]=e[n];return r}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return u},set:function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");u=e}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||s(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},a.prototype.getMaxListeners=function(){return l(this)},a.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var n="error"===e,i=this._events;if(void 0!==i)n=n&&void 0===i.error;else if(!n)return!1;if(n){var s;if(t.length>0&&(s=t[0]),s instanceof Error)throw s;var a=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw a.context=s,a}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)o(u,this,t);else{var c=u.length,l=v(u,c);for(r=0;r<c;++r)o(l[r],this,t)}return!0},a.prototype.addListener=function(e,t){return h(this,e,t,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(e,t){return h(this,e,t,!0)},a.prototype.once=function(e,t){return c(t),this.on(e,p(this,e,t)),this},a.prototype.prependOnceListener=function(e,t){return c(t),this.prependListener(e,p(this,e,t)),this},a.prototype.removeListener=function(e,t){var r,n,i,o,s;if(c(t),void 0===(n=this._events))return this;if(void 0===(r=n[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete n[e],n.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(i=-1,o=r.length-1;o>=0;o--)if(r[o]===t||r[o].listener===t){s=r[o].listener,i=o;break}if(i<0)return this;0===i?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,i),1===r.length&&(n[e]=r[0]),void 0!==n.removeListener&&this.emit("removeListener",e,s||t)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(e){var t,r,n;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0===arguments.length){var i,o=Object.keys(r);for(n=0;n<o.length;++n)"removeListener"!==(i=o[n])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(n=t.length-1;n>=0;n--)this.removeListener(e,t[n]);return this},a.prototype.listeners=function(e){return d(this,e,!0)},a.prototype.rawListeners=function(e){return d(this,e,!1)},a.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):y.call(e,t)},a.prototype.listenerCount=y,a.prototype.eventNames=function(){return this._eventsCount>0?n(this._events):[]}},function(e,t,r){var n=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++)r[t[n]]=Object.getOwnPropertyDescriptor(e,t[n]);return r},i=/%[sdj%]/g;t.format=function(e){if(!g(e)){for(var t=[],r=0;r<arguments.length;r++)t.push(a(arguments[r]));return t.join(" ")}r=1;for(var n=arguments,o=n.length,s=String(e).replace(i,(function(e){if("%%"===e)return"%";if(r>=o)return e;switch(e){case"%s":return String(n[r++]);case"%d":return Number(n[r++]);case"%j":try{return JSON.stringify(n[r++])}catch(e){return"[Circular]"}default:return e}})),u=n[r];r<o;u=n[++r])y(u)||!b(u)?s+=" "+u:s+=" "+a(u);return s},t.deprecate=function(e,r){if("undefined"!=typeof process&&!0===process.noDeprecation)return e;if("undefined"==typeof process)return function(){return t.deprecate(e,r).apply(this,arguments)};var n=!1;return function(){if(!n){if(process.throwDeprecation)throw new Error(r);process.traceDeprecation?console.trace(r):console.error(r),n=!0}return e.apply(this,arguments)}};var o,s={};function a(e,r){var n={seen:[],stylize:c};return arguments.length>=3&&(n.depth=arguments[2]),arguments.length>=4&&(n.colors=arguments[3]),d(r)?n.showHidden=r:r&&t._extend(n,r),w(n.showHidden)&&(n.showHidden=!1),w(n.depth)&&(n.depth=2),w(n.colors)&&(n.colors=!1),w(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=u),l(n,e,n.depth)}function u(e,t){var r=a.styles[t];return r?"["+a.colors[r][0]+"m"+e+"["+a.colors[r][1]+"m":e}function c(e,t){return e}function l(e,r,n){if(e.customInspect&&r&&O(r.inspect)&&r.inspect!==t.inspect&&(!r.constructor||r.constructor.prototype!==r)){var i=r.inspect(n,e);return g(i)||(i=l(e,i,n)),i}var o=function(e,t){if(w(t))return e.stylize("undefined","undefined");if(g(t)){var r="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(r,"string")}if(v(t))return e.stylize(""+t,"number");if(d(t))return e.stylize(""+t,"boolean");if(y(t))return e.stylize("null","null")}(e,r);if(o)return o;var s=Object.keys(r),a=function(e){var t={};return e.forEach((function(e,r){t[e]=!0})),t}(s);if(e.showHidden&&(s=Object.getOwnPropertyNames(r)),_(r)&&(s.indexOf("message")>=0||s.indexOf("description")>=0))return h(r);if(0===s.length){if(O(r)){var u=r.name?": "+r.name:"";return e.stylize("[Function"+u+"]","special")}if(m(r))return e.stylize(RegExp.prototype.toString.call(r),"regexp");if(E(r))return e.stylize(Date.prototype.toString.call(r),"date");if(_(r))return h(r)}var c,b="",C=!1,S=["{","}"];(p(r)&&(C=!0,S=["[","]"]),O(r))&&(b=" [Function"+(r.name?": "+r.name:"")+"]");return m(r)&&(b=" "+RegExp.prototype.toString.call(r)),E(r)&&(b=" "+Date.prototype.toUTCString.call(r)),_(r)&&(b=" "+h(r)),0!==s.length||C&&0!=r.length?n<0?m(r)?e.stylize(RegExp.prototype.toString.call(r),"regexp"):e.stylize("[Object]","special"):(e.seen.push(r),c=C?function(e,t,r,n,i){for(var o=[],s=0,a=t.length;s<a;++s)D(t,String(s))?o.push(f(e,t,r,n,String(s),!0)):o.push("");return i.forEach((function(i){i.match(/^\d+$/)||o.push(f(e,t,r,n,i,!0))})),o}(e,r,n,a,s):s.map((function(t){return f(e,r,n,a,t,C)})),e.seen.pop(),function(e,t,r){if(e.reduce((function(e,t){return t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1}),0)>60)return r[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+r[1];return r[0]+t+" "+e.join(", ")+" "+r[1]}(c,b,S)):S[0]+b+S[1]}function h(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,r,n,i,o){var s,a,u;if((u=Object.getOwnPropertyDescriptor(t,i)||{value:t[i]}).get?a=u.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):u.set&&(a=e.stylize("[Setter]","special")),D(n,i)||(s="["+i+"]"),a||(e.seen.indexOf(u.value)<0?(a=y(r)?l(e,u.value,null):l(e,u.value,r-1)).indexOf("\n")>-1&&(a=o?a.split("\n").map((function(e){return"  "+e})).join("\n").substr(2):"\n"+a.split("\n").map((function(e){return"   "+e})).join("\n")):a=e.stylize("[Circular]","special")),w(s)){if(o&&i.match(/^\d+$/))return a;(s=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(s=s.substr(1,s.length-2),s=e.stylize(s,"name")):(s=s.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),s=e.stylize(s,"string"))}return s+": "+a}function p(e){return Array.isArray(e)}function d(e){return"boolean"==typeof e}function y(e){return null===e}function v(e){return"number"==typeof e}function g(e){return"string"==typeof e}function w(e){return void 0===e}function m(e){return b(e)&&"[object RegExp]"===C(e)}function b(e){return"object"==typeof e&&null!==e}function E(e){return b(e)&&"[object Date]"===C(e)}function _(e){return b(e)&&("[object Error]"===C(e)||e instanceof Error)}function O(e){return"function"==typeof e}function C(e){return Object.prototype.toString.call(e)}function S(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(e){if(w(o)&&(o=process.env.NODE_DEBUG||""),e=e.toUpperCase(),!s[e])if(new RegExp("\\b"+e+"\\b","i").test(o)){var r=process.pid;s[e]=function(){var n=t.format.apply(t,arguments);console.error("%s %d: %s",e,r,n)}}else s[e]=function(){};return s[e]},t.inspect=a,a.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},a.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=p,t.isBoolean=d,t.isNull=y,t.isNullOrUndefined=function(e){return null==e},t.isNumber=v,t.isString=g,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=w,t.isRegExp=m,t.isObject=b,t.isDate=E,t.isError=_,t.isFunction=O,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=r(4);var x=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function P(){var e=new Date,t=[S(e.getHours()),S(e.getMinutes()),S(e.getSeconds())].join(":");return[e.getDate(),x[e.getMonth()],t].join(" ")}function D(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){console.log("%s - %s",P(),t.format.apply(t,arguments))},t.inherits=r(5),t._extend=function(e,t){if(!t||!b(t))return e;for(var r=Object.keys(t),n=r.length;n--;)e[r[n]]=t[r[n]];return e};var j="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function L(e,t){if(!e){var r=new Error("Promise was rejected with a falsy value");r.reason=e,e=r}return t(e)}t.promisify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(j&&e[j]){var t;if("function"!=typeof(t=e[j]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,j,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,r,n=new Promise((function(e,n){t=e,r=n})),i=[],o=0;o<arguments.length;o++)i.push(arguments[o]);i.push((function(e,n){e?r(e):t(n)}));try{e.apply(this,i)}catch(e){r(e)}return n}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),j&&Object.defineProperty(t,j,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,n(e))},t.promisify.custom=j,t.callbackify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');function t(){for(var t=[],r=0;r<arguments.length;r++)t.push(arguments[r]);var n=t.pop();if("function"!=typeof n)throw new TypeError("The last argument must be of type Function");var i=this,o=function(){return n.apply(i,arguments)};e.apply(this,t).then((function(e){process.nextTick(o,null,e)}),(function(e){process.nextTick(L,e,o)}))}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),Object.defineProperties(t,n(e)),t}},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var r=function(){};r.prototype=t.prototype,e.prototype=new r,e.prototype.constructor=e}},function(e,t){e.exports=function(e,t){this.reset=function(){this.cards=e.slice(0),this.length=this.cards.length},this.shuffle=function(){!function(e){var r=e.length;if(0===r)return!1;for(;--r;){var n=Math.floor(t()*(r+1)),i=e[r],o=e[n];e[r]=o,e[n]=i}}(this.cards)},this.reset(),this.shuffle(),this.deal=function(e,t){for(var r=0;r<e;r++)for(var n=0;n<t.length;n++)t[n].push(this.cards.pop());this.length=this.cards.length},this.draw=function(e){if(!e||e<=1)return this.length=this.cards.length-1,this.cards.pop();for(var t=[],r=0;r<e;r++)t.push(this.cards.pop());return this.length=this.cards.length,t},this.drawFromBottomOfDeck=function(e){(!e||e<1)&&(e=1);for(var t=[],r=0;r<e;r++)t.push(this.cards.shift());return this.length=this.cards.length,1===t.length?t[0]:t},this.drawRandom=function(e){var r=function(){var e=Math.floor(t()*this.cards.length),r=this.cards[e];return this.cards.splice(e,1),this.length=this.cards.length,r};if(!e||e<=1)return r.apply(this);for(var n=[],i=0;i<e;i++)n.push(r.apply(this));return n},this.putOnTopOfDeck=function(e){if(!e instanceof Array)this.cards.push(e);else for(var t=0;t<e.length;t++)this.cards.push(e[t]);this.length=this.cards.length},this.putOnBottomOfDeck=function(e){if(!e instanceof Array)this.cards.unshift(e);else for(var t=0;t<e.length;t++)this.cards.unshift(e[t]);this.length=this.cards.length}}},function(e,t,r){var n=r(8);e.exports=function(){this.cards=[new n("Club","Two",2),new n("Club","Three",3),new n("Club","Four",4),new n("Club","Five",5),new n("Club","Six",6),new n("Club","Seven",7),new n("Club","Eight",8),new n("Club","Nine",9),new n("Club","Ten",10),new n("Club","Jack",11),new n("Club","Queen",12),new n("Club","King",13),new n("Club","Ace",14),new n("Diamond","Two",2),new n("Diamond","Three",3),new n("Diamond","Four",4),new n("Diamond","Five",5),new n("Diamond","Six",6),new n("Diamond","Seven",7),new n("Diamond","Eight",8),new n("Diamond","Nine",9),new n("Diamond","Ten",10),new n("Diamond","Jack",11),new n("Diamond","Queen",12),new n("Diamond","King",13),new n("Diamond","Ace",14),new n("Heart","Two",2),new n("Heart","Three",3),new n("Heart","Four",4),new n("Heart","Five",5),new n("Heart","Six",6),new n("Heart","Seven",7),new n("Heart","Eight",8),new n("Heart","Nine",9),new n("Heart","Ten",10),new n("Heart","Jack",11),new n("Heart","Queen",12),new n("Heart","King",13),new n("Heart","Ace",14),new n("Spade","Two",2),new n("Spade","Three",3),new n("Spade","Four",4),new n("Spade","Five",5),new n("Spade","Six",6),new n("Spade","Seven",7),new n("Spade","Eight",8),new n("Spade","Nine",9),new n("Spade","Ten",10),new n("Spade","Jack",11),new n("Spade","Queen",12),new n("Spade","King",13),new n("Spade","Ace",14)]}},function(e,t){e.exports=function(e,t,r){this.suit=e,this.description=t,this.sort=r,this.toString=function(){return this.description+" of "+this.suit+"s"},this.toShortDisplayString=function(){var e,t=this.suit.substring(0,1);switch(this.sort){case 11:e="J";break;case 12:e="Q";break;case 13:e="K";break;case 14:e="A";break;default:e=this.sort}return e+t}}},function(e,t,r){"use strict";r.r(t),r.d(t,"Card",(function(){return a})),r.d(t,"Colors",(function(){return o})),r.d(t,"Values",(function(){return s})),r.d(t,"BeforeDrawEvent",(function(){return l})),r.d(t,"DrawEvent",(function(){return h})),r.d(t,"BeforePassEvent",(function(){return f})),r.d(t,"BeforeCardPlayEvent",(function(){return p})),r.d(t,"CardPlayEvent",(function(){return d})),r.d(t,"NextPlayerEvent",(function(){return y})),r.d(t,"GameEndEvent",(function(){return v})),r.d(t,"Game",(function(){return C}));var n=r(0),i=r.n(n);let o,s;!function(e){e[e.RED=1]="RED",e[e.BLUE=2]="BLUE",e[e.GREEN=3]="GREEN",e[e.YELLOW=4]="YELLOW"}(o||(o={})),function(e){e[e.ZERO=0]="ZERO",e[e.ONE=1]="ONE",e[e.TWO=2]="TWO",e[e.THREE=3]="THREE",e[e.FOUR=4]="FOUR",e[e.FIVE=5]="FIVE",e[e.SIX=6]="SIX",e[e.SEVEN=7]="SEVEN",e[e.EIGHT=8]="EIGHT",e[e.NINE=9]="NINE",e[e.DRAW_TWO=10]="DRAW_TWO",e[e.REVERSE=11]="REVERSE",e[e.SKIP=12]="SKIP",e[e.WILD=13]="WILD",e[e.WILD_DRAW_FOUR=14]="WILD_DRAW_FOUR"}(s||(s={}));class a{constructor(e,t){if(i()(this,"_value",void 0),i()(this,"_color",void 0),this._value=e,this._color=void 0===t?void 0:t,!this.isWildCard()&&void 0===this.color)throw Error("Only wild cards can be initialized with no color")}get color(){return this._color}set color(e){if(!this.isWildCard())throw new Error("Only wild cards can have theirs colors changed.");if(void 0===e||e<1||e>4)throw new Error("The color must be a value from Colors enum.");this._color=e}get value(){return this._value}isWildCard(){return this.value===s.WILD||this.value===s.WILD_DRAW_FOUR}isSpecialCard(){return this.isWildCard()||this.value===s.DRAW_TWO||this.value===s.REVERSE||this.value===s.SKIP}matches(e){if(this.isWildCard())return!0;if(void 0===this.color||void 0===e.color)throw new Error("Both cards must have theirs colors set before comparing");return e.value===this.value||e.color===this.color}get score(){switch(this.value){case s.DRAW_TWO:case s.SKIP:case s.REVERSE:return 20;case s.WILD:case s.WILD_DRAW_FOUR:return 50;default:return this.value}}is(e,t){let r=this.value===e;return t&&(r=r&&this.color===t),r}toString(){return"".concat(o[this.color]||"NO_COLOR"," ").concat(s[this.value])}}const u={isCancelable:!0};class c{get type(){return this._type}get isCancelable(){return this._isCancelable}get canceled(){return this._canceled}constructor(e,t){if(i()(this,"_type",void 0),i()(this,"_isCancelable",void 0),i()(this,"_canceled",void 0),!e)throw new Error("Event type is mandatory");void 0===(t=Object.assign({},u,t)).isCancelable&&(t.isCancelable=!0),this._type=e,this._isCancelable=t.isCancelable,this._canceled=!1}preventDefault(){this.isCancelable&&(this._canceled=!0)}}class l extends c{constructor(e,t){super("beforedraw"),this.player=e,this.quantity=t}}class h extends c{constructor(e,t){super("draw"),this.player=e,this.cards=t}}class f extends c{constructor(e){super("beforepass"),this.player=e}}class p extends c{constructor(e,t){super("beforecardplay"),this.card=e,this.player=t}}class d extends c{constructor(e,t){super("cardplay"),this.card=e,this.player=t}}class y extends c{constructor(e){super("nextplayer"),this.player=e}}class v extends c{constructor(e,t){super("end",{isCancelable:!1}),this.winner=e,this.score=t}}var g=r(1);function w(){const e=[],t=(e,t,r)=>{const n=[];for(let i=0;i<e;i++)n.push(new a(t,r));return n};for(let r=1;r<=4;r++){e.push.apply(e,t(1,s.ZERO,r));for(let n=s.ONE;n<=s.NINE;n++)e.push.apply(e,t(2,n,r));e.push.apply(e,t(2,s.DRAW_TWO,r)),e.push.apply(e,t(2,s.SKIP,r)),e.push.apply(e,t(2,s.REVERSE,r))}return e.push.apply(e,t(4,s.WILD)),e.push.apply(e,t(4,s.WILD_DRAW_FOUR)),e}class m{get cards(){return this.shuffle.cards}get length(){return this.shuffle.length}constructor(){i()(this,"originalDraw",void 0),i()(this,"shuffle",Object(g.shuffle)({deck:w()}))}draw(e){let t=[];if((e=e||1)>=this.length){const r=this.length;if(t=t.concat(this.shuffle.draw.call(this,r)),this.shuffle.reset(),this.shuffle.shuffle(),0===(e-=r))return t}return t.concat(this.shuffle.draw(e))}}var b=r(2);class E extends b.EventEmitter{on(e,t){return super.on(e,(r=t,n=this,function(e){return!1!==r.call(n,e)||e.preventDefault(),!e.canceled}));var r,n}emit(e,t){throw new Error("Event dispatching must be done via #dispatchEvent")}dispatchEvent(e){return this.listeners(e.type).every(t=>t(e))}}let _;!function(e){e[e.CLOCKWISE=1]="CLOCKWISE",e[e.COUNTER_CLOCKWISE=2]="COUNTER_CLOCKWISE"}(_||(_={}));class O{constructor(e){if(i()(this,"name",void 0),i()(this,"hand",[]),!(e=e?e.trim():e))throw new Error("Player must have a name");this.name=e}getCardByValue(e){if(e)return this.hand.find(t=>t.value===e)}hasCard(e){return!!e&&this.hand.some(t=>t.value===e.value&&t.color===e.color)}removeCard(e){if(!this.hasCard(e))return;const t=this.hand.findIndex(t=>t.value===e.value&&t.color===e.color);this.hand.splice(t,1)}valueOf(){return this.name}toString(){return this.name}}class C extends E{constructor(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];super(),i()(this,"drawPile",void 0),i()(this,"direction",void 0),i()(this,"_currentPlayer",void 0),i()(this,"_players",[]),i()(this,"_discardedCard",void 0),i()(this,"drawn",!1),i()(this,"yellers",{}),this._players=this.fixPlayers(e),t.forEach(e=>e.setup(this)),this.newGame()}newGame(){this.drawPile=new m,this.direction=_.CLOCKWISE,this._players.forEach(e=>e.hand=this.drawPile.draw(7));do{this._discardedCard=this.drawPile.draw()[0]}while(this._discardedCard.isSpecialCard());var e,t;this._currentPlayer=this._players[(e=0,t=this._players.length-1,Math.floor(Math.random()*(t-e+1))+e)]}getPlayer(e){const t=this._players[this.getPlayerIndex(e)];if(t)return t}get currentPlayer(){return this._currentPlayer}set currentPlayer(e){if(!(e=this.getPlayer(e.name)))throw new Error("The given player does not exist");this._currentPlayer=e}get nextPlayer(){return this.getNextPlayer()}get discardedCard(){return this._discardedCard}set discardedCard(e){if(e){if(void 0===e.color||null===e.color)throw new Error("Discarded cards cannot have theirs colors as null");this._discardedCard=e}}get players(){return this._players}get deck(){return this.drawPile}get playingDirection(){return this.direction}set playingDirection(e){if(e!==_.CLOCKWISE&&e!=_.COUNTER_CLOCKWISE)throw new Error("Invalid direction");e!==this.direction&&this.reverseGame()}draw(e,t){let{silent:r}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{silent:!1};if(0==arguments.length&&(e=this._currentPlayer),t=t||1,!r&&!this.dispatchEvent(new l(e,t)))return;const n=this.privateDraw(e,t);(r||this.dispatchEvent(new h(e,n)))&&(this.drawn=!0,this.yellers[e.name]=!1)}pass(){if(!this.drawn)throw new Error("".concat(this._currentPlayer," must draw at least one card before passing"));this.dispatchEvent(new f(this._currentPlayer))&&this.goToNextPlayer()}play(e){let{silent:t}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{silent:!1};const r=this._currentPlayer;if(e){if(!r.hasCard(e))throw new Error("".concat(r," does not have card ").concat(e," at hand"));if(t||this.dispatchEvent(new p(e,this._currentPlayer))){if(null==e.color)throw new Error("Card must have its color set before playing");if(!e.matches(this._discardedCard))throw new Error("".concat(this._discardedCard,", from discard pile, does not match ").concat(e));if(r.removeCard(e),this._discardedCard=e,t||this.dispatchEvent(new d(e,this._currentPlayer)))if(0!=r.hand.length){switch(this._discardedCard.value){case s.WILD_DRAW_FOUR:this.privateDraw(this.getNextPlayer(),4),this.goToNextPlayer(!0);break;case s.DRAW_TWO:this.privateDraw(this.getNextPlayer(),2),this.goToNextPlayer(!0);break;case s.SKIP:this.goToNextPlayer(!0);break;case s.REVERSE:this.reverseGame(),2==this._players.length&&this.goToNextPlayer(!0)}this.goToNextPlayer()}else{const e=this.calculateScore();this.dispatchEvent(new v(this._currentPlayer,e))}}}}uno(e){let t;return(e=e||this._currentPlayer).hand.length<=2&&!this.yellers[e.name]?(this.yellers[e.name]=!0,[]):(t=this._players.filter(e=>1==e.hand.length&&!this.yellers[e.name]),0==t.length&&(t=[e]),t.forEach(e=>this.privateDraw(e,2)),t)}fixPlayers(e){if(!e||!e.length||e.length<2||e.length>10)throw new Error("There must be 2 to 10 players in the game");if(function(e){const t=e.map((e,t)=>({count:1,name:e})).reduce((e,t)=>(e[t.name]=(e[t.name]||0)+t.count,e),{});return Object.keys(t).filter(e=>t[e]>1)}(e).length)throw new Error("Player names must be different");return e.map(e=>new O(e))}getNextPlayer(){let e=this.getPlayerIndex(this._currentPlayer);return++e==this._players.length&&(e=0),this._players[e]}getPlayerIndex(e){return"string"!=typeof e&&(e=e.name),this._players.map(e=>e.name).indexOf(e)}goToNextPlayer(e){this.drawn=!1,this._currentPlayer=this.getNextPlayer(),e||this.dispatchEvent(new y(this._currentPlayer))}reverseGame(){this._players.reverse(),this.direction=this.direction==_.CLOCKWISE?_.COUNTER_CLOCKWISE:_.CLOCKWISE}privateDraw(e,t){if(!e)throw new Error("Player is mandatory");const r=this.drawPile.draw(t);return e.hand=e.hand.concat(r),r}calculateScore(){return this._players.map(e=>e.hand).reduce((e,t)=>e+=t.reduce((e,t)=>e+t.score,0),0)}}}])}));

}).call(this)}).call(this,require('_process'))
},{"_process":1}]},{},[2]);
