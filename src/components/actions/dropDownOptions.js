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

export { deleteComponent, rotateComponent, closeDropdown}
