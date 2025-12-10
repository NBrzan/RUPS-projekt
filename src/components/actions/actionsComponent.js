import { closeDropdown, rotateComponent, deleteComponent, toggleComponent, switchVoltageComponent, closeSubDropdown, switchResistanceComponent, switchThresholdComponent, switchMaxVoltageComponent } from "./dropDownOptions";
import { LabeledAction } from "../../ui/LabeledAction";

const getActionsForComponent = (scene, component) => {
  const logicComp = component.getData("logicComponent");
  const type = logicComp ? logicComp.type : 'unknown';

  const actions = [
    new LabeledAction('Delete', () => {
      deleteComponent(scene, component);
    }),
    new LabeledAction('Rotate', () => {
      rotateComponent(scene, component);
    }),
    new LabeledAction('Close', () => {
      closeDropdown(scene)
    })
  ];

  const createSubmenuActions = (baseActions) => {
    return [
      ...baseActions,
      new LabeledAction('Close', () => {
        closeSubDropdown(scene);
      })
    ];
  };

  switch (logicComp.type) {
    case 'switch':
      actions.unshift(
        new LabeledAction('Toggle', () => {
          toggleComponent(scene, component)
        }));
      break;
    case 'battery':
      actions.unshift(
        new LabeledAction('Spremeni napetost', null, createSubmenuActions([
          new LabeledAction('3.3V', () => {
            switchVoltageComponent(component, 3.3);
          }),
          new LabeledAction('5V', () => {
            switchVoltageComponent(component, 5);
          }),
        ]))
      );
      break;
    case 'resistor':
      actions.unshift(
        new LabeledAction('Spremeni upor', null, createSubmenuActions([
          new LabeledAction('33 Ω', () => {
            switchResistanceComponent(component, 33);
          }),
          new LabeledAction('47 Ω', () => {
            switchResistanceComponent(component, 47);
          }),
          new LabeledAction('68 Ω', () => {
            switchResistanceComponent(component, 68);
          }),
        ]))
      );
      break;
    case 'bulb':
        actions.unshift(
            new LabeledAction('Spremeni prag', null, createSubmenuActions([
                new LabeledAction('2 V', () => {
                    switchThresholdComponent(component, 2);
                }),
                new LabeledAction('3 V', () => {
                    switchThresholdComponent(component, 3);
                }),
                new LabeledAction('4 V', () => {
                    switchThresholdComponent(component, 4);
                }),
            ]))
        );
        actions.unshift(
            new LabeledAction('Spremeni maksimalno napetost', null, createSubmenuActions([
                new LabeledAction('3 V', () => {
                    switchMaxVoltageComponent(component, 3);
                }),
                new LabeledAction('6 V', () => {
                    switchMaxVoltageComponent(component, 6);
                }),
                new LabeledAction('12 V', () => {
                    switchMaxVoltageComponent(component, 12);
                }),
            ]))
        );
      break;
  }
  return actions;
}

export { getActionsForComponent }
