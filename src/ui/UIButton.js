// UIButton.js
const buttonWidth = 150;
const buttonHeight = 45;
const cornerRadius = 8;

const makeButton = (scene, color, hoverColor, x, y, label, onClick, options = {}) => {
  const { enabled = true } = options;

  const button = scene.add.container(x, y);

  const bg = scene.add.graphics();
  const drawBg = (fill) => {
    bg.clear();
    bg.fillStyle(fill, 1);
    bg.fillRoundedRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, cornerRadius);
  };
  drawBg(color);

  const text = scene.add.text(0, 0, label, {
    fontFamily: 'Arial',
    fontSize: '20px',
    color: '#ffffff'
  }).setOrigin(0.5);

  button.add([bg, text]);

  // expose children for outside use
  button.bg = bg;
  button.text = text;
  button.drawBg = drawBg;

  // set size + interactive
  button
    .setSize(buttonWidth, buttonHeight)
    // create a hit area (so container receives pointer events)
    .setInteractive(new Phaser.Geom.Rectangle(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains, { useHandCursor: true })
    .on('pointerover', () => {
      if (!button.getData('enabled')) return;
      drawBg(hoverColor);
    })
    .on('pointerout', () => {
      drawBg(button.getData('enabled') ? color : 0x777777);
    })
    .on('pointerdown', () => {
      if (!button.getData('enabled')) return;
      onClick();
    });

  // store state + helper methods
  button.setData('enabled', enabled);

  button.enable = () => {
    button.setData('enabled', true);
    text.setAlpha(1);
    drawBg(color);
    // make non-interactive -> interactive transition
    if (!button.input || !button.input.enabled) {
      button.setInteractive(new Phaser.Geom.Rectangle(-buttonWidth/2, -buttonHeight/2, buttonWidth, buttonHeight), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    }
  };

  button.disable = () => {
    button.setData('enabled', false);
    text.setAlpha(0.5);
    drawBg(0x777777);
    // disable interactivity so pointer events stop firing
    if (button.input && button.input.enabled) {
      button.disableInteractive();
    }
  };

  if (!enabled) {
    button.disable();
  }

  return button; // return the container directly
};

export { makeButton };
