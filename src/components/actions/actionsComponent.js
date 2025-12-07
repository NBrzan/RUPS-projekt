import { closeDropdown, rotateComponent, deleteComponent, toggleComponent, switchVoltageComponent, closeSubDropdown, switchResistanceComponent, switchThresholdComponent, switchMaxVoltageComponent } from "./dropDownOptions";
import { LabeledAction } from "../../ui/LabeledAction";
import { makeButton } from "../../ui/UIButton";
import { makeDropDown } from "../../ui/UIDropDown";



//const submenuActions

const addSubmenu = (scene, component, subActions, subMenulabel) => {
  let subMenu;
  closeSubDropdown(scene);

  subActions.push(
    new LabeledAction('Close', () => {
      closeSubDropdown(scene);
  }));
  

  const action = new LabeledAction(subMenulabel, () => {
      subMenu = makeDropDown(scene, scene.currentDropDown.width, 0, subActions);
      closeSubDropdown(scene);
      scene.currentDropDown?.add(subMenu);
      scene.currentSubDropDown = subMenu;
  });


  return {subMenu, action};
}

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

  const voltageSubActions = [
    new LabeledAction('3.3V', () => {
      switchVoltageComponent(component, 3.3);
    }),
    new LabeledAction('5V', () => {
      switchVoltageComponent(component, 3.3);
    }),
  ];

  const resistanceSubActions = [
    new LabeledAction('33 Ω', () => {
      switchResistanceComponent(component, 33);
    }),
    new LabeledAction('47 Ω', () => {
      switchResistanceComponent(component, 47);
    }),
    new LabeledAction('68 Ω', () => {
      switchResistanceComponent(component, 68);
    }),
  ];

  const tresholdSubActions = [
    new LabeledAction('100 Ω', () => {
      switchThresholdComponent(component, 100);
    }),
    new LabeledAction('220 Ω', () => {
      switchThresholdComponent(component, 220);
    }),
    new LabeledAction('330 Ω', () => {
      switchThresholdComponent(component, 330);
    }),
  ];

  const bulbMaxVoltageSubActions = [
    new LabeledAction('3 V', () => {
      switchMaxVoltageComponent(component, 3);
    }),
    new LabeledAction('6 V', () => {
      switchMaxVoltageComponent(component, 6);
    }),
    new LabeledAction('12 V', () => {
      switchMaxVoltageComponent(component, 12);
    }),
  ];



  let actualComponenet = component.getData("logicComponent");
  let action;
  switch (actualComponenet.type) {
    case 'switch':
      actions.unshift(
        new LabeledAction('Toogle', () => {
          toggleComponent(scene, component)
        }));
      break;
    case 'battery':
        action = addSubmenu(scene, component, voltageSubActions, 'Spremeni napetost').action;
        actions.unshift(action);
      break;
    case 'resistor':
        action = addSubmenu(scene, component, resistanceSubActions, 'Spremeni upor').action;
        actions.unshift(action);
      break;
    case 'bulb':
        action = addSubmenu(scene, component, tresholdSubActions, 'Spremeni prag').action;
        actions.unshift(action);

        action = addSubmenu(scene, component, bulbMaxVoltageSubActions, 'Spremeni maksimalno napetost').action;
        actions.unshift(action);
      break;
  }
  return actions;
}

export { getActionsForComponent }
