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

    if (!this.container) {
      /* Validating the container of the sliders exists */
      throw new Error("The especified container id is not in the DOM.");
    }

    this.modifyCSS(this.container, {
      position: "relative",
      width: "100%",
      height: "35vh",
      minHeight: "150px",
      overflow: "hidden"
    });
    var children = this.container.getElementsByClassName("slide");

    if (children.length > 0) {
      if (Object.keys(options).length > 0) {
        this.coupleOptions(options);
      }

      this.createSlides(children);
      this.animateSlides(children);
      this.execFunctionOfValuesChanged(this.options);
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
            width: "100%",
            height: "100%",
            position: "absolute"
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
        var position = !i ? "right" : "left";
        var control = document.createElement("div");
        control.classList.add("controls");
        this.modifyCSS(control, _defineProperty({
          width: "5%",
          height: "100%",
          top: 0,
          position: "absolute"
        }, position, 0));
        var arrow = document.createElement("div");
        var pseudoBefore = {
          content: "",
          width: "100%",
          height: "100%",
          borderWidth: "6.67px 6.67px 0 0",
          borderStyle: "solid",
          borderColor: "#000",
          display: "block",
          transformOrigin: "100% 0"
        };
        var pseudoAfter = {
          content: "",
          "float": "left",
          position: "relative",
          top: "-100%",
          width: "100%",
          height: "100%",
          borderWidth: "0 6.67px 0 0",
          borderStyle: "solid",
          borderColor: "#000",
          transformOrigin: "100% 0",
          transition: ".2s ease"
        };
        this.modifyCSS(arrow, {
          width: "50px",
          height: "50px",
          position: "absolute"
        }, {
          before: pseudoBefore,
          after: pseudoAfter
        });
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

              slideCSS.left = "".concat(100 * (slides.length - 2), "%");

              _this.setAnimationPower(slide, 0.3);

              continue;
            }

            slideCSS.left = "".concat(leftValue - 100, "%");
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
        var opFunc = op.onValueChanged;

        if (opFunc) {
          opFunc(op.value);
        }
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
      var _this2 = this;

      this.options = [{
        name: "fullScreenSize",
        value: false,
        changedByUser: false,
        onValueChanged: function onValueChanged() {
          var slidesWidthChanged = _this2.options[1].changedByUser;
          var slidesHeightChanged = _this2.options[2].changedByUser;
          if (slidesWidthChanged || slidesHeightChanged) return;

          _this2.modifyCSS(_this2.container, {
            width: "100vw",
            height: "100vh"
          });
        }
      }, {
        name: "slidesWidth",
        value: "100%",
        changedByUser: false,
        onValueChanged: function onValueChanged(newValue) {
          if (_this2.options[0].changedByUser) return;

          var isNumber = _this2.isNumber(newValue);

          var measure = isNumber ? "".concat(newValue, "%") : newValue;

          _this2.modifyCSS(_this2.container, {
            width: measure
          });
        }
      }, {
        name: "slidesHeight",
        value: "100%",
        changedByUser: false,
        onValueChanged: function onValueChanged(newValue) {
          if (_this2.options[0].changedByUser) return;

          var isNumber = _this2.isNumber(newValue);

          var measure = isNumber ? "".concat(newValue, "%") : newValue;

          _this2.modifyCSS(_this2.container, {
            height: measure
          });
        }
      }, {
        name: "slidesControls",
        value: "default",
        changedByUser: false,
        onValueChanged: function onValueChanged(newValue) {}
      }, {
        name: "animateByItself",
        value: true,
        changedByUser: false,
        onValueChanged: function onValueChanged() {
          _this2.stopSlidesAnimation(_this2.animateInterval);
        }
      }, {
        name: "animationIntervalTime",
        value: 3,
        changedByUser: false
      }];
    } // Auxiliar functions

  }, {
    key: "modifyCSS",
    value: function modifyCSS(element, css) {
      var _this3 = this;

      var pseudos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!(css instanceof Object)) {
        throw new Error("CSS parameter is not defined as an key => value Object");
      }

      for (var key in css) {
        var value = css[key];
        element.style[key] = value;
      }

      if (!(pseudos instanceof Object)) {
        throw new Error("Pseudos parameter is not defined as an key => value Object");
      }

      if (Object.keys(pseudos).length > 0) {
        element.id = "id-".concat(this.generateUniqID());
        var pseudoNamesValues = Object.entries(pseudos);
        var cssContainer = this.container.querySelector(".styles-container");

        if (!cssContainer) {
          cssContainer = document.createElement("div");
          cssContainer.classList.add("styles-container");
          this.container.append(cssContainer);
        }

        var styleTag = document.createElement("style");
        pseudoNamesValues.forEach(function (pseudo) {
          styleTag.innerHTML += "#".concat(element.id, "::").concat(pseudo[0], " {\n");
          var stylesKeys = Object.keys(pseudo[1]);
          stylesKeys.forEach(function (key) {
            styleTag.innerHTML += "  ".concat(_this3.convertToCSSInstructionFromat(key), ": ").concat(pseudo[1][key] == "" ? "" : pseudo[1][key], ";\n");
          });
          styleTag.innerHTML += "}\n";
        });
        cssContainer.append(styleTag);
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
  }, {
    key: "isNumber",
    value: function isNumber(number) {
      var nums = "0123456789";

      for (var i = 0; i < number.length; i++) {
        var _i = number.charAt(i);

        if (nums.indexOf(_i) === -1) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "generateUniqID",
    value: function generateUniqID() {
      var now = new Date().toLocaleString();
      var nowNumbers = "";

      for (var i = 0; i < now.length; i++) {
        if (this.isNumber(now.charAt(i))) {
          nowNumbers += now.charAt(i);
        }
      }

      nowNumbers += parseInt(Math.random() * 100).toString();
      return parseInt(nowNumbers).toString(16);
    }
  }, {
    key: "convertToCSSInstructionFromat",
    value: function convertToCSSInstructionFromat(cssInstruction) {
      var upperLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
      var cssInstructionConverted = "";

      for (var i = 0; i < cssInstruction.length; i++) {
        var letter = cssInstruction.charAt(i);

        if (upperLetters.indexOf(letter) === -1) {
          cssInstructionConverted += letter;
        } else {
          cssInstructionConverted += "-".concat(letter.toLowerCase());
        }
      }

      return cssInstructionConverted;
    }
  }]);

  return SlideIt;
}();