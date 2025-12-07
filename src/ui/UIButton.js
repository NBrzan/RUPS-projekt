const buttonWidth = 150;
const buttonHeight = 45;
const cornerRadius = 8;

const makeButton = (scene, color, hoverColor, x, y, label, onClick) => {
  const button = scene.add.container(x, y);

  const bg = scene.add.graphics();
  bg.fillStyle(color, 1);
  bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);

  const text = scene.add.text(0, 0, label, {
    fontFamily: 'Arial',
    fontSize: '20px',
    color: '#ffffff'
  }).setOrigin(0.5);

  button.add([bg, text]);

  button
    .setSize(buttonWidth, buttonHeight)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => {
      bg.clear();
      bg.fillStyle(hoverColor, 1);
      bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
    })
    .on('pointerout', () => {
      bg.clear();
      bg.fillStyle(color, 1);
      bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
    })
    .on('pointerdown', onClick);

  return { button, bg, text };
};

export { makeButton };