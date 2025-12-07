class Branch {
    constructor(id, start, end, components = []) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.components = components;
    }

    addComponent(component) {
        this.components.push(component);
    }

    calculateResistance() {
        let totalResistance = 0;
        for (const comp of this.components) {
            if (comp.type === 'upor' && comp.resistance) {
                totalResistance += comp.resistance;
            }
        }
        return totalResistance;
    }

    calculateVoltageDrop(current) {
        let resistance = this.calculateResistance();
        return current * resistance;
    }
}