class Checkbox extends Hitbox 
{
    root;
    context;


    labelText = "Placeholder";

    font = "14px Verdana";
    fontColor = "#FFFFFF";
    backgroundColor = "#FFFFFF";
    strokeColor = "#000000"; 
    strokeWidth = 1;

    allowToggleOnLabelClick = true;

    checkboxWidth;
    labelPadding = 4;

    box;
    labelBox;
    
    // Override these
    setValue(newValue) { }
    getValue() { return false }

    constructor(boundingBox)
    {
        super(boundingBox, {}, "");
        this.checkboxWidth = this.boundingBox.height;
        this.init();
    }

    onBecomeChild()
    {
        this.root = this.getFirstElementWithContext();
        this.context = this.root.context;
    }

    init()
    {
        this.box = this.addHitbox(new Hitbox(
            {
                x: 0,
                y: 0,
                width: this.checkboxWidth,
                height: this.checkboxWidth
            },
            {
                onmousedown: function()
                {
                    if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
                    this.parent.toggle();
                }
            },
            "pointer"
        ));
        this.box.render = function()
        {
            var coords = this.getRelativeCoordinates(0, 0, this.parent.root);
            this.parent.context.save();
            this.parent.context.fillStyle = this.parent.backgroundColor;
            this.parent.context.strokeStyle = this.parent.strokeColor;
            this.parent.context.lineWidth = this.parent.strokeWidth;
            this.parent.context.fillRect(coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            this.parent.context.strokeRect(coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            if(this.parent.getValue())
            {
                this.parent.context.drawImage(checkmark2b, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
            }
            this.parent.context.restore();
        }
        this.labelBox = this.addHitbox(new Hitbox(
            {
                x: this.checkboxWidth + this.labelPadding,
                y: this.labelPadding,
                width: this.boundingBox.width - this.checkboxWidth - this.labelPadding * 2,
                height: this.boundingBox.height - this.labelPadding * 2
            },
            {},
            ""
        ));
        this.labelBox.render = function()
        {
            var coords = this.getRelativeCoordinates(0, 0, this.parent.root);
            this.parent.context.save();
            this.parent.context.font = this.parent.font;
            this.parent.context.fillStyle = this.parent.fontColor;
            this.parent.context.textBaseline = "middle";
            fillTextWrapWithHeightLimit(
                this.parent.context,
                this.parent.labelText,
                coords.x,
                coords.y + this.boundingBox.height / 2,
                this.boundingBox.width,
                this.boundingBox.height,
                "left"
            )
            this.parent.context.restore();
        }
        if (this.allowToggleOnLabelClick) this.labelBox.onmousedown = this.box.onmousedown;
    }

    toggle()
    {
        this.setValue(!this.getValue())
    }
}