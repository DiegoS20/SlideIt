class SlideIt
{
    constructor(container_id, options = {}) {
        this.declareInitialOptions(); // Declaring properties
        this.container = document.getElementById(container_id);
        this.modifyCSS(this.container, {
            position: 'relative',
            width: '100%',
            height: '35vh',
            minHeight: '150px',
            overflow: 'hidden',
        });

        if (this.container === null) { // Validating the container of the sliders exists
            throw new Error("The especified container id is not in the DOM.");
        }

        const children = this.container.getElementsByClassName('slide');
        if (children.length > 0) {
            if (Object.keys(options).length > 0) {
                this.coupleOptions(options);
                this.execFunctionOfValuesChanged(this.options);
            }
            this.createSlides(children);
            this.animateSlides(children);
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
                position: 'absolute',
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
        for(let i = 0; i < 2; i++) {
            const position = i == 0 ? "r" : "l";
            let control = document.createElement('div');
            control.classList.add('controls');
            this.modifyCSS(control, {
                width: '5%',
                height: '100%',
                top: 0,
                position: 'absolute',
                [position === 'r' ? "right" : "left"]: 0,
            });
            container.appendChild(control);
        }
    }

    animateSlides(slides) {
        const _animateSlides = this.options[4].value;
        if (!_animateSlides) { return; }
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
                const position = leftValue;
                slideCSS.left = `${position - 100}%`;
            }
        }, time);
    }

    stopSlidesAnimation() {
        clearInterval(this.animateInterval);
    }

    execFunctionOfValuesChanged(options) {
        const ops = this.valuesChangedByUser(options);
        ops.forEach(op => {
            const opFunc = op.onValueChanged;
            if (opFunc) {
                opFunc(op.value);
            }
        });
    }

    valuesChangedByUser(options) {
        let r = [];
        for(let i = 0; i < options.length; i++) {
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
                }
            },
            {
                name: "slidesWidth",
                value: "100%",
                changedByUser: false,
                onValueChanged: newValue => {
                    if (this.options[0].changedByUser) return;

                    const isNumber = this.isNumber(newValue);
                    const measure = isNumber ? `${newValue}%` : newValue;
                    this.modifyCSS(this.container, {
                        width: measure,
                    });
                }
            },
            {
                name: "slidesHeight",
                value: "100%",
                changedByUser: false,
                onValueChanged: newValue => {
                    if (this.options[0].changedByUser) return;

                    const isNumber = this.isNumber(newValue);
                    const measure = isNumber ? `${newValue}%` : newValue;
                    this.modifyCSS(this.container, {
                        height: measure,
                    });
                }
            },
            {
                name: "slidesControls",
                value: 'default',
                changedByUser: false,
                onValueChanged: newValue => {

                }
            },
            {
                name: "animateByItself",
                value: true,
                changedByUser: false,
            },
            {
                name: "animationIntervalTime",
                value: 3,
                changedByUser: false,
            }
        ];
    }

    // Auxiliar functions
    modifyCSS(element, css) {
        for (const key in css) {
            const value = css[key];
            element.style[key] = value;
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
        const nums = "123456789";
        for (let i = 0; i < number.length; i++) {
            const _i = number.charAt(i);
            if (nums.indexOf(_i) === -1) {
                return false;
            }
        }
        return true;
    }
}