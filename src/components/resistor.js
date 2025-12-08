import { Component } from "./component";

class Resistor extends Component{
    constructor(id, start, end, ohm) {
        super(id, 'resistor', start, end, 'src/components/resistor.png', true);
        this.ohm = ohm
    }

    getSpecialPropertiesDescription() {
        const hasSpecial = true;
        const description = "Upor: " + this.ohm + "\u03a9";
        return {hasSpecial, description}
    }
}

export {Resistor}