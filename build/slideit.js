"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SlideIt =
/*#__PURE__*/
function () {
  function SlideIt(container_id) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SlideIt);

    // Declaring properties
    this.declareInitialOptions();
    this.container = document.getElementById(container_id); // Validating the container of the sliders exists

    if (this.container === null) {
      throw new Error("The especified container id is not in the DOM.");
    }

    var children = this.container.getElementsByClassName('slide');

    if (children.length > 0) {
      this.createSlides(children);
    }

    if (Object.entries(options).length > 0) {
      this.coupleOptions(options);
    }
  }

  _createClass(SlideIt, [{
    key: "declareInitialOptions",
    value: function declareInitialOptions() {
      this.options = [{
        name: "fullPage",
        value: false,
        changedByUser: false
      }];
    }
  }, {
    key: "coupleOptions",
    value: function coupleOptions(new_options) {
      var this_ops = this.options.slice();
      this_ops.forEach(function (op, i) {
        var new_op = new_options[op.name];

        if (op.value != new_op) {
          this_ops[i].value = new_op;
          this_ops[i].changedByUser = true;
        }
      });
      this.options = this_ops;
    }
  }, {
    key: "createSlides",
    value: function createSlides(children) {}
  }]);

  return SlideIt;
}();