class MiniWindow extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.setDepth(1000);
        this.setVisible(false);

        const width = 200;
        const height = 80;
        this.background = scene.add.rectangle(0, 0, width, height, 0x2c2c2c, 0.95);
        this.background.setStrokeStyle(2, 0xffffff);

        this.mainText = scene.add.text(0, 0, '', {
            fontSize: '14px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: width - 20 }
        }).setOrigin(0.5);

        this.add([this.background, this.mainText]);
    }

    show(text, x, y) {
        this.mainText.setText(text);
        if (x !== undefined) this.x = x;
        if (y !== undefined) this.y = y;
        this.setVisible(true);
    }

    hide() {
        this.setVisible(false);
    }
}

export {MiniWindow}