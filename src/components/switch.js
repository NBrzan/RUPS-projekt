import { Component } from "./component";

class Switch extends Component{
    constructor(id, start, end, is_on=false) {
        if (is_on)
            super(id, 'switch', start, end, 'src/components/switch-on.png', true);
        else
            super(id, 'switch', start, end, 'src/components/switch-off.png', true);
        this.is_on = is_on
    }
    toggle() {
        this.is_on = !this.is_on;        
        this.image = this.is_on ? 'src/components/switch-on.png' : 'src/components/switch-off.png';
    }
}

export {Switch}