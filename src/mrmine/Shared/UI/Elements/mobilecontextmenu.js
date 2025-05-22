class MobileContextMenu extends ContextMenu
{
    initialize()
    {
        super.initialize();
        var buttonWidth = mainw * 0.075;
        this.closeButton.boundingBox = {
            x: this.boundingBox.width - buttonWidth,
            y: 0,
            width: buttonWidth,
            height: buttonWidth
        }
    }
}