class HeaderBar extends Hitbox
{
    root;
    context;
    allowBubbling = true;

    defaultFontSize;
    fontSize;
    icon;
    relativeIconPositionX;
    relativeIconHeight = 1.4;
    relativeIconWidth;

    textPadding = 0.06;
    textRightMargin = 0;
    textJustify = "left";

    shortenNum = false;
    showPlusButton = false;

    getFillPercent() { return 0; }
    getText() { return "PLACEHOLDER"; }
    getBarColor() { return "#00FF00"; }

    constructor(boundingBox)
    {
        super(boundingBox, {}, "");
        this.defaultFontSize = Math.ceil(this.boundingBox.height * 0.75);
        this.fontSize = this.defaultFontSize;
        this.scale = mainw / 1080;
    }

    setIcon(icon, iconPositionX = -0.025)
    {
        this.icon = icon;
        this.relativeIconPositionX = iconPositionX;
        this.relativeIconWidth = (icon.width * (this.relativeIconHeight * this.boundingBox.height) / icon.height) / this.boundingBox.width;
    }

    render()
    {
        if (!this.root)
        {
            this.root = this.getFirstElementWithContext();
            this.context = this.root.context;
        }
        if (this.showPlusButton)
        {
            this.textRightMargin = this.boundingBox.height / this.boundingBox.width;
        }
        this.context.save();

        var coords = this.getRelativeCoordinates(0, 0, this.root);

        this.context.strokeStyle = "#90E98F";
        this.context.lineWidth = Math.ceil(2 * this.scale);
        var radius = 10 * this.scale;

        this.context.fillStyle = "#000000";
        this.renderRoundedRect(
            coords.x, 
            coords.y, 
            this.boundingBox.width,
            this.boundingBox.height,
            radius,
            0.5,
            false
        );

        var fillPercent = this.getFillPercent();
        if (fillPercent > 0)
        {
            this.context.fillStyle = this.getBarColor();
            this.context.lineWidth = 0;
            this.renderRoundedRect(
                coords.x, 
                coords.y, 
                this.boundingBox.width * fillPercent,
                this.boundingBox.height,
                radius,
                1,
                false
            );
        }

        this.context.fillStyle = "#000000";
        this.renderRoundedRect(
            coords.x, 
            coords.y, 
            this.boundingBox.width,
            this.boundingBox.height,
            radius,
            0,
            true
        );
        this.renderText(coords);
        this.context.drawImage(
            this.icon,
            coords.x + this.relativeIconPositionX * this.boundingBox.width,
            coords.y - (this.relativeIconHeight - 1) * this.boundingBox.height / 2,
            this.relativeIconWidth * this.boundingBox.width,
            this.relativeIconHeight * this.boundingBox.height
        )

        if (this.showPlusButton)
        {
            var height = this.boundingBox.height * 1.25;
            var rightOffset = height * 0.9;
            drawNineSlice(
                this.context,
                bigbutton,
                coords.x + this.boundingBox.width - rightOffset,
                coords.y + (this.boundingBox.height - height) / 2,
                height,
                height,
                31,
                24,
                true
            );

            var fontSize = height;
            this.context.font = fontSize + "px KanitB";
            this.context.textBaseline = "top";
            this.context.fillStyle = "#0a702c"; 

            fillTextWrapWithHeightLimit(
                this.context,
                "+",
                coords.x + this.boundingBox.width - rightOffset,
                coords.y + (this.boundingBox.height - height) / 2,
                height,
                height,
                "center",
                0.5,
                "center"
            )
        }
        this.context.restore();
        this.renderChildren();
    }

    // Called from parent element to sync size with other bars
    calculateFontSize()
    {
        if (!this.root)
        {
            this.root = this.getFirstElementWithContext();
            this.context = this.root.context;
        }
        this.fontSize = this.defaultFontSize;
        this.context.textBaseline = "middle";
        this.context.font = this.fontSize + "px KanitB";

        var left = (this.relativeIconPositionX + this.relativeIconWidth + this.textPadding) * this.boundingBox.width;
        var right = this.boundingBox.width * (1 - this.textPadding - this.textRightMargin);

        var dimensions = fillTextShrinkToFit(
            this.context,
            this._getText(),
            0,
            0,
            right - left,
            this.textJustify,
            0,
            true
        )
        return dimensions.height;
    }

    renderText(coords)
    {
        this.context.textBaseline = "middle";
        this.context.font = this.fontSize + "px KanitB";
        this.context.strokeStyle = "#000000";
        this.context.lineWidth = 2;

        var left = (this.relativeIconPositionX + this.relativeIconWidth + this.textPadding) * this.boundingBox.width;
        var right = this.boundingBox.width * (1 - this.textPadding - this.textRightMargin);

        // Render text shadow

        this.context.fillStyle = "#000000";
        fillTextShrinkToFit(
            this.context,
            this._getText(),
            coords.x + left,
            coords.y + this.boundingBox.height / 2 + this.fontSize * 0.12,
            right - left,
            this.textJustify
        )
        strokeTextShrinkToFit(
            this.context,
            this._getText(),
            coords.x + left,
            coords.y + this.boundingBox.height / 2 + this.fontSize * 0.12,
            right - left,
            this.textJustify
        )

        // Render text

        this.context.fillStyle = "#FFFFFF";
        strokeTextShrinkToFit(
            this.context,
            this._getText(),
            coords.x + left,
            coords.y + this.boundingBox.height / 2,
            right - left,
            this.textJustify
        )
        fillTextShrinkToFit(
            this.context,
            this._getText(),
            coords.x + left,
            coords.y + this.boundingBox.height / 2,
            right - left,
            this.textJustify
        )
    }

    renderRoundedRect(x, y, width, height, radius, fillOpacity=1, drawOutline=true)
    {
        this.context.beginPath();
        this.context.moveTo(x + radius, y);
        this.context.lineTo(x + width - radius, y);
        this.context.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.context.lineTo(x + width, y + height - radius);
        this.context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.context.lineTo(x + radius, y + height);
        this.context.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.context.lineTo(x, y + radius);
        this.context.quadraticCurveTo(x, y, x + radius, y);
        this.context.globalAlpha = fillOpacity;
        this.context.fill();
        this.context.globalAlpha = 1;
        if (drawOutline)
        {
            this.context.stroke();
        }
    }

    _getText()
    {
        if (this.shortenNum)
        {
            return shortenAndBeautifyNum(this.getText());
        }
        return this.getText();
    }
}