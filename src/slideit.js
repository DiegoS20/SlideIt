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
            transition: "all 0.3s ease",
            webkitTransition: "all 0.3s ease",
            mozTransition: "all 0.3s ease",
            msTransition: "all 0.3s ease",
            oTransition: "all 0.3s ease",
        });

        if (this.container === null) { // Validating the container of the sliders exists
            throw new Error("The especified container id is not in the DOM.");
        }

        const children = this.container.getElementsByClassName('slide');
        if (children.length > 0) {
            if (Object.keys(options).length > 0) {
                this.coupleOptions(options);
            }
            this.createSlides(children);
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
                width: this.options[1].value,
                height: this.options[2].value,
                position: 'absolute'
            };
            if (child !== children[0]) {
                cssStyles.left = `${100 * slideDisplacement++}%`;
            }
            this.modifyCSS(child, cssStyles);
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

    modifyCSS(element, css) {
        for(const key in css) {
            const value = css[key];
            element.style[key] = value;
        }
    }

    declareInitialOptions() {
        this.options = [
            {
                name: "fullScreenSize",
                value: false,
                changedByUser: false
            },
            {
                name: "slidesWidth",
                value: "100%",
                changedByUser: false
            },
            {
                name: "slidesHeight",
                value: "100%",
                changedByUser: false
            },
            {
                name: "slidesControls",
                value: 'default',
                changedByUser: false,
            }
        ];
    }
}