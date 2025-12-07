const deleteComponent = (scene, component) => {
  if (scene.currentDropDown) {
    scene.currentDropDown.destroy();
    scene.currentDropDown = null;
  }
  component.destroy();
};

const rotateComponent = (scene, component) => {
  const currentRotation = component.getData('rotation');
  const newRotation = (currentRotation + 90) % 360;

  component.setData('rotation', newRotation);
  component.setData('isRotated', !component.getData('isRotated'));

  scene.tweens.add({
    targets: component,
    angle: "+=90",
    duration: 150,
    ease: 'Cubic.easeOut',
    onComplete: () => {
      scene.updateLogicNodePositions(component);
    }
  });

}

const closeDropdown = (scene) => {
  if (scene.currentDropDown) {
    scene.currentDropDown.destroy();
    scene.currentDropDown = null;
  }
};


// CLASS SPECIFIC STUFF

// SWITCH
const toggleComponent = (scene, component) => {
  let actualComponenet = component.getData("logicComponent");
  actualComponenet.toggle();
  const visualImage = component.list.find(child => child.type === 'Image');

  if (visualImage) {
    const newTexture = actualComponenet.is_on ? 'stikalo-on' : 'stikalo-off';
    component.setData('type', newTexture);
    visualImage.setTexture(newTexture);
  }

}

export { deleteComponent, rotateComponent, closeDropdown, toggleComponent }
