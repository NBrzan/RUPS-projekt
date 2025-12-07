import { Component } from './component.js';

class Bulb extends Component {
    constructor(id, start, end, treshold, maxVoltage) {
        super(id, 'bulb', start, end, 'src/components/lamp.png', false);

        this.is_on = true;
        this.treshold = treshold;
        this.maxVoltage = maxVoltage;
    }

    // turnOn(){
    //     this.is_on = true;
    //     console.log(`💡 Bulb ${this.id} is now ON.`);
    // }

    // turnOff(){
    //     this.is_on = false;
    //     console.log(`💡 Bulb ${this.id} is now OFF.`);
    // }
}

export { Bulb };