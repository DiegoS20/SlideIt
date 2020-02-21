"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SlideIt =
/*#__PURE__*/
function () {
  function SlideIt(container_id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SlideIt);

    this.declareInitialOptions(); // Declaring properties

    this.container = document.getElementById(container_id);
    this.modifyCSS(this.container, {
      position: 'relative',
      width: '100%',
      height: '35vh',
      minHeight: '150px',
      overflow: 'hidden'
    });

    if (this.container === null) {
      // Validating the container of the sliders exists
      throw new Error("The especified container id is not in the DOM.");
    }

    var children = this.container.getElementsByClassName('slide');

    if (children.length > 0) {
      if (Object.keys(options).length > 0) {
        this.coupleOptions(options);
        this.execFunctionOfValuesChanged(this.options);
      }

      this.createSlides(children);
      this.animateSlides(children);
    }
  }

  _createClass(SlideIt, [{
    key: "coupleOptions",
    value: function coupleOptions(newOptions) {
      var thisOps = this.options.slice();
      thisOps.forEach(function (op) {
        var opName = op.name;
        var newOp = newOptions[opName];

        if (opName in newOptions && op.value != newOp) {
          op.value = newOp;
          op.changedByUser = true;
        }
      });
      this.options = thisOps;
    }
  }, {
    key: "createSlides",
    value: function createSlides(children) {
      var slideDisplacement = 1;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var child = _step.value;
          var cssStyles = {
            width: this.options[1].value,
            height: this.options[2].value,
            position: 'absolute'
          };

          if (child !== children[0]) {
            cssStyles.left = "".concat(100 * slideDisplacement++, "%");
          }

          this.modifyCSS(child, cssStyles);
          this.setAnimationPower(child, 0.3);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.createSlidesControls(this.container);
    }
  }, {
    key: "createSlidesControls",
    value: function createSlidesControls(container) {
      var controlsValue = this.options[3].value;

      for (var i = 0; i < 2; i++) {
        var position = i == 0 ? "r" : "l";
        var control = document.createElement('div');
        control.classList.add('controls');
        this.modifyCSS(control, _defineProperty({
          width: '5%',
          height: '100%',
          top: 0,
          position: 'absolute'
        }, position === 'r' ? "right" : "left", 0));
        container.appendChild(control);
      }
    }
  }, {
    key: "animateSlides",
    value: function animateSlides(slides) {
      var _this = this;

      var time = this.options[5].value * 1000;
      this.animateInterval = setInterval(function () {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = slides[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var slide = _step2.value;
            var slideCSS = slide.style;
            var leftValue = slideCSS.left == "" ? 0 : parseInt(slideCSS.left);

            if (leftValue < 0) {
              _this.setAnimationPower(slide, 0);

              _this.modifyCSS(slide, {
                left: "".concat(100 * (slides.length - 2), "%")
              });

              _this.setAnimationPower(slide, 0.3);

              continue;
            }

            var position = leftValue;
            slideCSS.left = "".concat(position - 100, "%");
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }, time);
    }
  }, {
    key: "stopSlidesAnimation",
    value: function stopSlidesAnimation() {
      clearInterval(this.animateInterval);
    }
  }, {
    key: "execFunctionOfValuesChanged",
    value: function execFunctionOfValuesChanged(options) {
      var ops = this.valuesChangedByUser(options);
      ops.forEach(function (op) {
        op.onValueChanged(op.value);
      });
    }
  }, {
    key: "valuesChangedByUser",
    value: function valuesChangedByUser(options) {
      var r = [];

      for (var i = 0; i < options.length; i++) {
        var option = options[i];
        if (option.changedByUser) r.push(option);
      }

      return r;
    }
  }, {
    key: "declareInitialOptions",
    value: function declareInitialOptions() {
      this.options = [{
        name: "fullScreenSize",
        value: false,
        changedByUser: false
      }, {
        name: "slidesWidth",
        value: "100%",
        changedByUser: false
      }, {
        name: "slidesHeight",
        value: "100%",
        changedByUser: false
      }, {
        name: "slidesControls",
        value: 'default',
        changedByUser: false
      }, {
        name: "animateByItself",
        value: true,
        changedByUser: false,
        onValueChanged: function onValueChanged(newValue) {}
      }, {
        name: "animationIntervalTime",
        value: 3,
        changedByUser: false
      }];
    } // Auxiliar functions

  }, {
    key: "modifyCSS",
    value: function modifyCSS(element, css) {
      for (var key in css) {
        var value = css[key];
        element.style[key] = value;
      }
    }
  }, {
    key: "setAnimationPower",
    value: function setAnimationPower(element, time) {
      this.modifyCSS(element, {
        transition: "all ".concat(time, "s ease"),
        webkitTransition: "all ".concat(time, "s ease"),
        mozTransition: "all ".concat(time, "s ease"),
        msTransition: "all ".concat(time, "s ease"),
        oTransition: "all ".concat(time, "s ease")
      });
    }
  }]);

  return SlideIt;
}();