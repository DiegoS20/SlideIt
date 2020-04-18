class SlideIt {
  constructor(container_id, options = {}) {
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
      overflow: "hidden",
    });

    const children = this.container.getElementsByClassName("slide");
    if (children.length > 0) {
      if (Object.keys(options).length > 0) {
        this.coupleOptions(options);
      }
      this.createSlides(children);
      this.animateSlides(children);
      this.execFunctionOfValuesChanged(this.options);
    }
  }

  coupleOptions(newOptions) {
    let thisOps = this.options.slice();
    thisOps.forEach((op) => {
      const opName = op.name;
      const newOp = newOptions[opName];

      if (opName in newOptions && op.value != newOp) {
        op.value = newOp;
        op.changedByUser = true;
      }
    });
    this.options = thisOps;
  }

  createSlides(children) {
    let slideDisplacement = 1;
    for (const child of children) {
      let cssStyles = {
        width: "100%",
        height: "100%",
        position: "absolute",
      };
      if (child !== children[0]) {
        cssStyles.left = `${100 * slideDisplacement++}%`;
      }
      this.modifyCSS(child, cssStyles);
      this.setAnimationPower(child, 0.3);
    }
    this.createSlidesControls(this.container);
  }

  createSlidesControls(container) {
    const controlsValue = this.options[3].value;
    for (let i = 0; i < 2; i++) {
      const position = !i ? "right" : "left";
      let control = document.createElement("div");
      control.classList.add("controls");
      this.modifyCSS(control, {
        width: "5%",
        height: "100%",
        top: 0,
        position: "absolute",
        [position]: 0,
      });

      let arrow = document.createElement("div");
      const pseudoBefore = {
        content: "",
        width: "100%",
        height: "100%",
        borderWidth: "6.67px 6.67px 0 0",
        borderStyle: "solid",
        borderColor: "#000",
        display: "block",
        transformOrigin: "100% 0",
      };
      const pseudoAfter = {
        content: "",
        float: "left",
        position: "relative",
        top: "-100%",
        width: "100%",
        height: "100%",
        borderWidth: "0 6.67px 0 0",
        borderStyle: "solid",
        borderColor: "#000",
        transformOrigin: "100% 0",
        transition: ".2s ease",
      };

      this.modifyCSS(
        arrow,
        {
          width: "50px",
          height: "50px",
          position: "absolute",
        },
        {
          before: pseudoBefore,
          after: pseudoAfter,
        }
      );
      container.appendChild(control);
    }
  }

  animateSlides(slides) {
    const time = this.options[5].value * 1000;
    this.animateInterval = setInterval(() => {
      for (const slide of slides) {
        const slideCSS = slide.style;
        const leftValue = slideCSS.left == "" ? 0 : parseInt(slideCSS.left);
        if (leftValue < 0) {
          this.setAnimationPower(slide, 0);
          slideCSS.left = `${100 * (slides.length - 2)}%`;
          this.setAnimationPower(slide, 0.3);
          continue;
        }
        slideCSS.left = `${leftValue - 100}%`;
      }
    }, time);
  }

  stopSlidesAnimation() {
    clearInterval(this.animateInterval);
  }

  execFunctionOfValuesChanged(options) {
    const ops = this.valuesChangedByUser(options);
    ops.forEach((op) => {
      const opFunc = op.onValueChanged;
      if (opFunc) {
        opFunc(op.value);
      }
    });
  }

  valuesChangedByUser(options) {
    let r = [];
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      if (option.changedByUser) r.push(option);
    }
    return r;
  }

  declareInitialOptions() {
    this.options = [
      {
        name: "fullScreenSize",
        value: false,
        changedByUser: false,
        onValueChanged: () => {
          const slidesWidthChanged = this.options[1].changedByUser;
          const slidesHeightChanged = this.options[2].changedByUser;
          if (slidesWidthChanged || slidesHeightChanged) return;
          this.modifyCSS(this.container, {
            width: "100vw",
            height: "100vh",
          });
        },
      },
      {
        name: "slidesWidth",
        value: "100%",
        changedByUser: false,
        onValueChanged: (newValue) => {
          if (this.options[0].changedByUser) return;

          const isNumber = this.isNumber(newValue);
          const measure = isNumber ? `${newValue}%` : newValue;
          this.modifyCSS(this.container, {
            width: measure,
          });
        },
      },
      {
        name: "slidesHeight",
        value: "100%",
        changedByUser: false,
        onValueChanged: (newValue) => {
          if (this.options[0].changedByUser) return;

          const isNumber = this.isNumber(newValue);
          const measure = isNumber ? `${newValue}%` : newValue;
          this.modifyCSS(this.container, {
            height: measure,
          });
        },
      },
      {
        name: "slidesControls",
        value: "default",
        changedByUser: false,
        onValueChanged: (newValue) => {},
      },
      {
        name: "animateByItself",
        value: true,
        changedByUser: false,
        onValueChanged: () => {
          this.stopSlidesAnimation(this.animateInterval);
        },
      },
      {
        name: "animationIntervalTime",
        value: 3,
        changedByUser: false,
      },
    ];
  }

  // Auxiliar functions
  modifyCSS(element, css, pseudos = {}) {
    if (!(css instanceof Object)) {
      throw new Error("CSS parameter is not defined as an key => value Object");
    }

    for (const key in css) {
      const value = css[key];
      element.style[key] = value;
    }

    if (!(pseudos instanceof Object)) {
      throw new Error(
        "Pseudos parameter is not defined as an key => value Object"
      );
    }

    if (Object.keys(pseudos).length > 0) {
      element.id = `id-${this.generateUniqID()}`;
      const pseudoNamesValues = Object.entries(pseudos);
      let cssContainer = this.container.querySelector(".styles-container");
      if (!cssContainer) {
        cssContainer = document.createElement("div");
        cssContainer.classList.add("styles-container");
        this.container.append(cssContainer);
      }
      let styleTag = document.createElement("style");
      pseudoNamesValues.forEach((pseudo) => {
        styleTag.innerHTML += `#${element.id}::${pseudo[0]} {\n`;
        const stylesKeys = Object.keys(pseudo[1]);
        stylesKeys.forEach((key) => {
          styleTag.innerHTML += `  ${this.convertToCSSInstructionFromat(
            key
          )}: ${pseudo[1][key] == "" ? "" : pseudo[1][key]};\n`;
        });
        styleTag.innerHTML += "}\n";
      });
      cssContainer.append(styleTag);
    }
  }

  setAnimationPower(element, time) {
    this.modifyCSS(element, {
      transition: `all ${time}s ease`,
      webkitTransition: `all ${time}s ease`,
      mozTransition: `all ${time}s ease`,
      msTransition: `all ${time}s ease`,
      oTransition: `all ${time}s ease`,
    });
  }

  isNumber(number) {
    const nums = "0123456789";
    for (let i = 0; i < number.length; i++) {
      const _i = number.charAt(i);
      if (nums.indexOf(_i) === -1) {
        return false;
      }
    }
    return true;
  }

  generateUniqID() {
    const now = new Date().toLocaleString();
    let nowNumbers = "";
    for (let i = 0; i < now.length; i++) {
      if (this.isNumber(now.charAt(i))) {
        nowNumbers += now.charAt(i);
      }
    }
    nowNumbers += parseInt(Math.random() * 100).toString();
    return parseInt(nowNumbers).toString(16);
  }

  convertToCSSInstructionFromat(cssInstruction) {
    const upperLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let cssInstructionConverted = "";
    for (let i = 0; i < cssInstruction.length; i++) {
      const letter = cssInstruction.charAt(i);
      if (upperLetters.indexOf(letter) === -1) {
        cssInstructionConverted += letter;
      } else {
        cssInstructionConverted += `-${letter.toLowerCase()}`;
      }
    }
    return cssInstructionConverted;
  }
}
