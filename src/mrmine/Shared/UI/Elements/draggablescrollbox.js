class DraggableScrollbox extends Scrollbox
{
    scrollMomentum = 0;
    scrollMomentumCoefficient = 1;
    scrollMomentumDecayFactor = 1.05;
    minScrollMomentum = 0.2;

    constructor(contentWidth, contentHeight, targetCanvasContext, x, y, width, height, scrollbarWidth)
    {
        super(contentWidth, contentHeight, targetCanvasContext, x, y, width, height, scrollbarWidth)
        // this.context.imageSmoothingEnabled = true;
    }
    
    addHitbox(hitbox)
    {
        if (!hitbox.onmousemove)
        {
            hitbox.onmousemove = this.onmousemove.bind(this);
        }
        return super.addHitbox(hitbox);
    }

    update(deltaTime)
    {
        if (Math.abs(this.scrollMomentum) > this.minScrollMomentum && !isMouseDown)
        {
            this.scrollMomentum /= this.scrollMomentumDecayFactor;
            this.scroll(this.scrollMomentum * uiScaleY);
        }
        else
        {
            this.scrollMomentum = 0;
        }
    }

    onmousemove()
    {
        if (prevMouseY >= 0)
        {
            this.scrollMomentum = -(mouseY - prevMouseY) * this.scrollMomentumCoefficient;
            this.scroll(-(mouseY - prevMouseY) * uiScaleY);
        }
    }
}

class HorizontalDraggableScrollbox extends HorizontalScrollbox
{
    scrollMomentum = 0;
    scrollMomentumCoefficient = 3;
    scrollMomentumDecayFactor = 1.05;
    minScrollMomentum = 0.2;
    
    addHitbox(hitbox)
    {
        if (!hitbox.onmousemove)
        {
            hitbox.onmousemove = this.onmousemove.bind(this);
        }
        return super.addHitbox(hitbox);
    }

    update(deltaTime)
    {
        if (Math.abs(this.scrollMomentum) > this.minScrollMomentum && !isMouseDown)
        {
            this.scrollMomentum /= this.scrollMomentumDecayFactor;
            this.scroll(this.scrollMomentum * uiScaleY);
        }
        else
        {
            this.scrollMomentum = 0;
        }
    }

    onmousemove()
    {
        if (prevMouseX >= 0)
        {
            this.scrollMomentum = -(mouseX - prevMouseX) * this.scrollMomentumCoefficient;
            this.scroll(-(mouseX - prevMouseX) * uiScaleX);
        }
    }
}