import { closeDropdown, rotateComponent, deleteComponent, toggleComponent } from "./dropDownOptions";
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

  let actualComponenet = component.getData("logicComponent");

  switch (actualComponenet.type) {
    case 'switch':
      actions.unshift(
        new LabeledAction('Toogle', () => {
          toggleComponent(scene, component)
        }));
      break;
  }
  return actions;
}

export { getActionsForComponent }
