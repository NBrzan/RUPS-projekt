import { Branch } from "../components/branch.js";
class CircuitGraph {
  constructor() {
    this.nodes = new Map();
    this.components = [];
    this.MERGE_RADIUS = 25;
    this.junctionNodes = new Set();
    this.circuitVoltage = 0;
    this.circuitResistance = 0;
    this.circuitCurrent = 1;
  }

    addNode(node) {
        if (!node) return null;

        if (!node.connected) node.connected = new Set();

        for (const existingNode of this.nodes.values()) {
            const dx = existingNode.x - node.x;
            const dy = existingNode.y - node.y;
            const distance = Math.hypot(dx, dy);

            if (distance < this.MERGE_RADIUS) {
                // Merge the connections
                // node.connected.forEach(c => existingNode.connected.add(c));
                // Connect the nodes to each other
                existingNode.connected.add(node);
                node.connected.add(existingNode);

                return existingNode;
            }
        }

        this.nodes.set(node.id, node);
        return node;
    }

    addComponent(component) {
        if (!component || !component.start || !component.end) return;

        component.start = this.addNode(component.start);
        component.end = this.addNode(component.end);

        component.start.connected.add(component.end);
        component.end.connected.add(component.start);

        console.log(
        `Creating component: ${component.id} of type ${component.type} between ${component.start.id} and ${component.end.id}`
        );
        this.components.push(component);
    }

  /**
   * Detect branch points in the graph.
   * A branch point is a node with 3 or more connections.
   * Call this after all components are added.
   */
  detectJunctionNodes() {
    this.junctionNodes = new Set();
    for (const node of this.nodes.values()) {
      if (node.connected && node.connected.size >= 3) {
        this.junctionNodes.add(node);
      }
    }
    return this.junctionNodes;
  }

  findBranches() {
    const branches = [];
    const visited = new Set();

    for (const junction of this.junctionNodes) {
      const neighbors = this.getJunctionNeighbors(junction);

      console.log("Neighbors of junction " + junction.id + ": ", neighbors);

      for (const neighbor of neighbors) {
        const key = `${junction.id}-${neighbor.id}`;
        if (visited.has(key)) continue;

        const branch = this.followBranch(junction, neighbor);
        branches.push(branch);

        visited.add(`${branch.start.id}-${branch.end.id}`);
        visited.add(`${branch.end.id}-${branch.start.id}`);
      }
    }

    return branches;
  }

  followBranch(startNode, nextNode) {
    const elements = [];
    let prev = startNode;
    let current = nextNode;

    elements.push(this.getElementBetween(startNode, nextNode));

    while (!this.junctionNodes.has(current)) {
      const neighbors = this.getNeighbors(current);

      const next = neighbors.find((n) => n !== prev);

      elements.push(this.getElementBetween(current, next));

      prev = current;
      current = next;
    }

    const endNode = current;
    const id = "brn_" + this.getRandomInt(1000, 9999);
    const branch = new Branch(id, startNode, endNode, elements);
    console.log("Found branch: ", branch);

    return branch;
  }

  getJunctionNeighbors(node) {
    const neighbors = new Set();

    for (const comp of this.components) {
      const startIsNode = this.sameNode(comp.start, node);
      const endIsNode = this.sameNode(comp.end, node);

      if (!startIsNode && !endIsNode) continue;

      const startIdBase = comp.id + "_start";
      const endIdBase = comp.id + "_end";

      if (node.id === startIdBase || node.id === endIdBase) {
        continue;
      }

      if (startIsNode) neighbors.add(comp.end);
      if (endIsNode) neighbors.add(comp.start);
    }

    return [...neighbors];
  }

  getNeighbors(node) {
    const neighbors = new Set();

    for (const comp of this.components) {
      if (this.sameNode(comp.start, node)) neighbors.add(comp.end);
      if (this.sameNode(comp.end, node)) neighbors.add(comp.start);
    }

    return [...neighbors];
  }

  getElementBetween(nodeA, nodeB) {
    return this.components.find(
      (comp) =>
        (this.sameNode(comp.start, nodeA) && this.sameNode(comp.end, nodeB)) ||
        (this.sameNode(comp.start, nodeB) && this.sameNode(comp.end, nodeA))
    );
  }

  getConnections(node) {
    return this.components.filter(
      (comp) => this.sameNode(comp.start, node) || this.sameNode(comp.end, node)
    );
  }

  componentConducts(comp) {
    if (!comp) return false;
    const conductiveTypes = ["wire", "bulb", "resistor", "battery"];
    if (comp.type === "switch") return comp.is_on;
    return conductiveTypes.includes(comp.type);
  }

  sameNode(a, b) {
    return a && b && a.x === b.x && a.y === b.y;
  }

  hasClosedLoop(current, target, visitedComps = new Set()) {
    if (!current || !target) return false;

    if (this.sameNode(current, target) && visitedComps.size > 0) {
      return true;
    }

    for (const comp of this.getConnections(current)) {
      if (!this.componentConducts(comp) || visitedComps.has(comp)) continue;

      visitedComps.add(comp);

      let next = this.sameNode(comp.start, current) ? comp.end : comp.start;
      if (!next) continue;

      if (next == target && visitedComps.size < 2) continue;

      if (next.type === "switch" && !next.is_on) continue;

      if (this.hasClosedLoop(next, target, visitedComps)) {
        return true;
      }

      visitedComps.delete(comp);
    }

    console.log("Breaks at " + current.id);
    return false;
  }

  simulate(isHighSchool = false) {
    // this.junctionNodes = this.detectJunctionNodes();
    // console.log("Junction nodes:", this.junctionNodes);
    // const branches = this.findBranches();
    // console.log("Branches found:", branches);
    const batteries = this.components.filter((c) => c.type === "battery");
    if (!batteries.length) {
      console.log("No battery found.");
      return -1;
    }

    if (isHighSchool) {
      this.circuitVoltage = 0;
      batteries.forEach((b) => {
        this.circuitVoltage += b.voltage;
      });
    }

    const switches = this.components.filter((c) => c.type === "switche");
    switches.forEach((s) => {
      if (!s.is_on) {
        console.log("Switch " + s.id + " is OFF");
        return -2;
      }
    });

    const start = batteries[0].start;
    const end = batteries[0].end;

    for (const n of this.nodes.values()) {
      console.log(
        `Node ${n.id}: (${n.x},${n.y}) connected to ${[...n.connected]
          .map((c) => c.id)
          .join(",")}`
      );
    }
    console.log("----------------------------------------");

    const closed = this.hasClosedLoop(start, end);

    if (closed) {
      if (isHighSchool) {
        this.circuitResistance = 0;
        const resistors = this.components.filter((c) => c.type === "resistor");
        for (const r of resistors) {
          this.circuitResistance += r.ohm;
        }

        this.circuitVoltage -= this.circuitResistance * this.circuitCurrent;
        console.log("Circuit closed! Current flows.");
        const bulbs = this.components.filter((c) => c.type === "bulb");
        console.log(bulbs);

        for (const b of bulbs) {
          this.circuitVoltage -= b.treshold;
          if (this.circuitVoltage < 0) {
            return -3;
          }
        }
      }
      return 1;
    } else {
      console.log("Circuit open. No current flows.");
      const bulbs = this.components.filter((c) => c.type === "bulb");
      bulbs.forEach((b) => {
        if (typeof b.turnOff === "function") b.turnOff();
      });
      return 0;
    }
  }

  getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }
}

export { CircuitGraph };
