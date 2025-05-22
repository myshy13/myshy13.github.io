class NotificationIcon extends Hitbox
{
    image;
    root;
    context;
    allowBubbling = true;

    renderOnStage = false;

    notificationIds;
    spritesheet;
    frameCount = 9;
    frameWidth = 51;
    frameSpacing = 2;
    startFrame = -1;
    waitFrames = 20;
    phaseShift;

    constructor(x, y, notificationIds)
    {
        var boundingBox = {
            x: x,
            y: y,
            width: mainw * 0.04,
            height: 0
        }
        super(boundingBox, {}, "");
        this.notificationIds = notificationIds;
        this.spritesheet = notificationSpritesheet;
        this.boundingBox.height = this.spritesheet.height * this.boundingBox.width / this.frameWidth; 
        this.boundingBox.y -= this.boundingBox.height;
    }

    render()
    {
        if(!this.root)
        {
            if (!this.renderOnStage)
            {
                this.root = this.getFirstElementWithContext();
                this.context = this.root.context;
            }
            else
            {
                this.root = activeLayers.Stage;
                this.context = STAGE;
            }
        }
        var coords = this.getRelativeCoordinates(0, 0, this.root, false);
        if (this.renderOnStage)
        {
            if (!activeLayers.Stage.isRendered)
            {
                activeLayers.Stage.showStage();
            }
            this.context.clearRect(coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        }
        var frameNum = (numFramesRendered - this.startFrame + this.phaseShift) % (this.frameCount + this.waitFrames) - this.waitFrames;
        if (frameNum < 0)
        {
            frameNum = 0;
        }
        STAGE.drawImage(
            this.spritesheet,
            (this.frameWidth + this.frameSpacing) * frameNum,
            0,
            this.frameWidth,
            this.spritesheet.height,
            coords.x,
            coords.y,
            this.boundingBox.width,
            this.boundingBox.height
        )
    }

    isVisible()
    {
        var isVisible = notificationManager.checkForUnseenNotifications(this.notificationIds);
        if (isVisible && this.startFrame < 0)
        {
            this.startFrame = numFramesRendered;
            this.phaseShift = rand(0, this.waitFrames);
        }
        else if (!isVisible)
        {
            this.startFrame = -1;
        }
        return isVisible;
    }

    isEnabled()
    {
        return false;
    }
}