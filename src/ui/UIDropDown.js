const margin = 10;
const paddingHorizontal = 5;
const paddingVertical = 5;
const color = 'grey';

const makeDropDown = (scene, x, y, labeledActions) => {
    const menu = scene.add.container(x, y);
    const bg = scene.add.graphics();
    menu.add(bg);

    let currentY = paddingVertical;
    let maxWidth = 0;

    labeledActions.forEach((lAction) => {

        const text = scene.add.text(paddingHorizontal, currentY, lAction.label, {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff'
        })
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true });

        text.on('pointerdown', () => {
            if (lAction.onClick) lAction.onClick();
            console.log(`Clicked: ${lAction.label}`);
        });

        text.on('pointerover', () => text.setColor('#ddddddff'));
        text.on('pointerout', () => text.setColor('#ffffff'));

        menu.add(text);

        if (text.width > maxWidth) maxWidth = text.width;
        currentY += text.height + margin;
    });

    const totalWidth = maxWidth + (paddingHorizontal * 2);
    const totalHeight = currentY - margin + paddingVertical;

    bg.fillStyle(color, 1);
    bg.fillRoundedRect(0, 0, totalWidth, totalHeight, 5);

    menu.setSize(totalWidth, totalHeight);

    return menu;
};

export { makeDropDown };
