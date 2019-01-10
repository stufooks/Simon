// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../js/main.js":[function(require,module,exports) {
//set up variables
var colors = ['green', 'red', 'yellow', 'blue'];
var turn = 1;
var sequence = [];
var userResponse = [];
var i = 0;
var speed = 800;
var mode = 'Standard';
var squares = document.querySelectorAll('.squares-container .game-square');
var instructions = document.querySelector('h4'); //function to create random array of colors -----------------------------------------------------------

var randomizer = function randomizer() {
  for (var _i = 0; _i < turn + 2; _i++) {
    var random = Math.random();
    var length = colors.length;
    var index = Math.floor(length * random);
    sequence.push(colors[index]);
  }
}; // function to add a random color to the sequence ------------------------------------------------


var addRandom = function addRandom() {
  var random = Math.random();
  var length = colors.length;
  var index = Math.floor(length * random);
  sequence.push(colors[index]);
}; // toggle highlighted square in order of the sequence ------------------------------------------


var highlighter = function highlighter(color) {
  var currentSquare = squares[0];

  for (var _i2 = 0; _i2 < squares.length; _i2++) {
    if (squares[_i2].id === color) {
      currentSquare = squares[_i2];
    }
  }

  currentSquare.classList.toggle('highlighted');
};

var gameLoop = function gameLoop() {
  setTimeout(function () {
    var currentColor = sequence[i];
    highlighter(currentColor);
    setTimeout(function () {
      highlighter(currentColor);
    }, speed);
    setTimeout(function () {
      if (mode === 'Standard') {
        instructions.innerHTML = 'Now click the sequence of colors in the same order';
      } else {
        instructions.innerHTML = 'Now click the sequence of colors in the REVERSE order';
      }
    }, speed + speed * sequence.length + 100);
    i++;

    if (i < sequence.length) {
      gameLoop();
    }
  }, speed + 250);
};

var playGame = function playGame() {
  userResponse = [];
  instructions.innerHTML = 'Watch the sequence of colors...';

  if (turn === 1) {
    sequence = [];
    randomizer();
  }

  console.log(sequence);
  i = 0;
  gameLoop();
};

var readyButton = document.querySelector('.ready-container button');
readyButton.addEventListener('click', playGame); //now get the user's response -------------------------------------------------------------

var clickHandler = function clickHandler(evt) {
  var guess = evt.target.id;
  userResponse.push(guess);
  highlighter(guess);
  setTimeout(function () {
    highlighter(guess);
  }, 150);

  if (userResponse.length >= sequence.length && mode === 'Standard') {
    if (winTester(userResponse)) {
      winHandler();
    } else {
      lossHandler();
    }
  }

  if (userResponse.length >= sequence.length && mode === 'Reverse') {
    if (reverseTester(userResponse)) {
      winHandler();
    } else {
      lossHandler();
    }
  }
};

for (var _i3 = 0; _i3 < squares.length; _i3++) {
  squares[_i3].addEventListener('click', clickHandler);
} //functions for handling a correct response or an incorrect response -------------------------------------------


var winHandler = function winHandler() {
  setTimeout(function () {
    instructions.innerHTML = "Correct! Press 'Ready' again to try the next level.";
  }, 410);
  clearResponses();
  turn++;
  updateLevel();
  addRandom();
};

var lossHandler = function lossHandler() {
  if (turn != 1) {
    setTimeout(function () {
      instructions.innerHTML = "Not quite! Guess again, press 'Ready' to replay, or press 'Reset Game' to start over.";
    }, 410);
    clearResponses();
  } else {
    setTimeout(function () {
      instructions.innerHTML = "Not quite! Guess again, or press 'Ready' to start over.";
    }, 410);
    clearResponses();
  }
}; //now compare user's response to the sequence ----------------------------------------------------------


var winTester = function winTester(userResponse) {
  var count = 0;

  for (var _i4 = 0; _i4 < sequence.length; _i4++) {
    if (userResponse[_i4] === sequence[_i4]) {
      count++;
    }
  }

  return count === sequence.length;
}; //functions to move the game forward or reset the game -----------------------------------------------


var clearResponses = function clearResponses() {
  userResponse = [];
};

var reset = function reset() {
  clearResponses();
  turn = 1;
  updateLevel();
  sequence = [];
  speed = 800;
  mode = 'Standard';
  updateMode();
  instructions.innerHTML = "Press 'Ready' to begin";
};

var resetButton = document.querySelector('.reset-container button');
resetButton.addEventListener('click', reset);

var updateLevel = function updateLevel() {
  var levelDisplay = document.querySelector('.level');
  levelDisplay.innerHTML = turn;
}; //make button to speed up the game ---------------------------------------------------------------------------


var speedUp = function speedUp() {
  speed = speed * .5;
  console.log(speed);
};

var speedButton = document.querySelector('.speed-container button');
speedButton.addEventListener('click', speedUp); //make button for reverse mode --------------------------------------------------------------------------------

var reverseTester = function reverseTester(userResponse) {
  var count = 0;

  for (var _i5 = 0; _i5 < sequence.length; _i5++) {
    if (userResponse[_i5] === sequence[sequence.length - (_i5 + 1)]) {
      count++;
    }
  }

  return count === sequence.length;
};

var reverseMode = function reverseMode() {
  mode = 'Reverse';
  updateMode();
  console.log('Reverse mode');
  instructions.innerHTML = 'You are now in Reverse Mode';
};

var reverseButton = document.querySelector('.reverse-container button');
reverseButton.addEventListener('click', reverseMode);

var updateMode = function updateMode() {
  var modeDisplay = document.querySelector('.mode');
  modeDisplay.innerHTML = " ".concat(mode);
};
},{}],"../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56366" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/main.js"], null)
//# sourceMappingURL=/main.8f75cf09.map