class SlideIt
{
    constructor(container_id, options = {}) {
        // Declaring properties
        this.declareInitialOptions();
        this.container = document.getElementById(container_id);

        // Validating the container of the sliders exists
        if (this.container === null) {
            throw new Error("The especified container id is not in the DOM.");
        }

        const children = this.container.getElementsByClassName('slide');
        if (children.length > 0) {
            this.createSlides(children);
        }

        if (Object.entries(options).length > 0) {
            this.coupleOptions(options);
        }
    }

    declareInitialOptions() {
        this.options = [
            {
                name: "fullPage",
                value: false,
                changedByUser: false
            }
        ];
    }

    coupleOptions(new_options) {
        let this_ops = this.options.slice();
        this_ops.forEach((op, i) => {
            const new_op = new_options[op.name];
            if(op.value != new_op) {
                this_ops[i].value = new_op;
                this_ops[i].changedByUser = true;
            }
        });
        this.options = this_ops;
    }

    createSlides(children) {
        
    }
}