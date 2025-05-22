class MinerHitbox extends Hitbox
{
    levelDepth;
    minerIndex;
    context = MAIN;

    isMouseOver = false;

    renderYOffset;

    constructor(levelDepth, minerIndex)
    {
        super(
            {
                x: 1 + ((worldConfig.levelClickableSpacing + worldConfig.levelClickableWidth) * minerIndex),
                y: 0,
                width: worldConfig.levelClickableWidth - 2,
                height: worldConfig.levelHeight
            },
            {},
            "",
            "miner_" + levelDepth + "_" + minerIndex
        );
        this.levelDepth = levelDepth;
        this.minerIndex = minerIndex;
        this.renderYOffset = worldConfig.levelHeight * 0.3;
    }

    onmousedown() 
    {
        var chest = chestService.getChest(this.levelDepth, this.minerIndex + 1);
        if(chest)
        {
            chestService.presentChest(this.levelDepth, this.minerIndex + 1);
        }
        else if(this.minerIndex == battleWaiting[0] - 1 && battleWaiting[1] == this.levelDepth && this.levelDepth > 303)
        {
            battleui(battleWaiting[2], battleWaiting[3]);
            depthOfMonster = battleWaiting[1];
            battleWaiting = [];
        }
        else if(this.minerIndex < workersHiredAtDepth(this.levelDepth))
        {
            addWorkerQuoteFromClickByDepth(this.levelDepth, this.minerIndex);
        }
    }

    onmouseenter()
    {
        this.isMouseOver = true;
    }

    onmouseexit()
    {
        this.isMouseOver = false;
    }


    render()
    {
        if(this.levelDepth > depth || isBossLevel(this.levelDepth)) return;
        var coords = this.getGlobalCoordinates(0, 0);
        var workerLevel = workersLevelAtDepth(this.levelDepth);
        if(this.minerIndex < workersHiredAtDepth(this.levelDepth))
        {
            if(!this.renderChest(workerLevel, coords))
            {
                this.renderMiner(workerLevel, coords);
                this.renderOverheadEffects(coords);
                this.renderName(coords);
            }
        }
    }



    renderChest(workerLevel, coords)
    {
        var chest = chestService.getChest(this.levelDepth, this.minerIndex + 1);
        if(chest)
        {
            var chestImage;
            if(chest.type == ChestType.gold)
            {
                if(this.levelDepth < 1000)
                {
                    if(workerLevel < 5)
                    {
                        chestImage = found2;
                    }
                    else
                    {
                        chestImage = window["found" + workerLevel];
                    }
                }
                else
                {
                    chestImage = foundm2;
                }
            }
            else if(chest.type == ChestType.black)
            {
                if(this.levelDepth < 1000)
                {
                    if(workerLevel < 5)
                    {
                        chestImage = foundb;
                    }
                    else
                    {
                        chestImage = window["foundb" + workerLevel];
                    }
                }
                else
                {
                    chestImage = foundmb;
                }
            }
            else
            {
                if(this.levelDepth < 1000)
                {
                    if(workerLevel < 5)
                    {
                        chestImage = foundt;
                    }
                    else
                    {
                        chestImage = window["foundt" + workerLevel];
                    }
                }
                else
                {
                    chestImage = foundmt;
                }
            }


            this.context.drawImage(
                chestImage,
                32 * getAnimationFrameIndex(4, 10, this.minerIndex + this.levelDepth),
                0,
                32,
                96,
                coords.x,
                coords.y + this.renderYOffset - worldConfig.levelClickableHeight,
                worldConfig.levelClickableWidth,
                worldConfig.levelClickableHeight * 2
            );
            return true;
        }
        return false;
    }

    isEnabled()
    {
        return !isBossLevel(this.levelDepth);
    }

    renderMiner(workerLevel, coords)
    {
        if(minerImageCache.isActive() && this.minerIndex != this.parent.isolatedMinerIndex)
        {
            return;
        }
        if(this.levelDepth <= 1000)
        {
            var frame = isCapacityFull() ? 0 : ((numFramesRendered + this.minerIndex - 1 + this.levelDepth) % 4);
            this.context.drawImage(
                minerImages[workerLevel],
                32 * frame,
                0,
                32,
                48,
                coords.x,
                coords.y + this.renderYOffset,
                worldConfig.levelClickableWidth,
                worldConfig.levelClickableHeight
            );
            this.context.drawImage(minerHatImages[workerLevel],
                32 * frame,
                0,
                32,
                48,
                coords.x,
                coords.y + this.renderYOffset,
                worldConfig.levelClickableWidth,
                worldConfig.levelClickableHeight
            );

        }
        else if(this.minerIndex == 8 && this.levelDepth == 1089) //render jeb, c'mon jeb what are you doing...
        {
            drawImageRot(
                this.context,
                lunarMinerImages[workerLevel],
                32 * ((numFramesRendered + (this.minerIndex - 1) + this.levelDepth) % 4),
                0,
                32,
                48,
                coords.x,
                coords.y + this.renderYOffset,
                worldConfig.levelClickableWidth,
                worldConfig.levelClickableHeight, 180
            );
        }
        else if(this.levelDepth < worlds[TITAN_INDEX].startDepth)
        {
            this.context.drawImage(
                lunarMinerImages[workerLevel],
                32 * ((numFramesRendered + (this.minerIndex - 1) + this.levelDepth) % 4),
                0,
                32,
                48,
                coords.x,
                coords.y + this.renderYOffset,
                worldConfig.levelClickableWidth,
                worldConfig.levelClickableHeight
            );
        }
        else
        {
            this.context.drawImage(
                titanMinerImages[workerLevel],
                32 * ((numFramesRendered + (this.minerIndex - 1) + this.levelDepth) % 4),
                0,
                32,
                48,
                coords.x,
                coords.y + this.renderYOffset,
                worldConfig.levelClickableWidth,
                worldConfig.levelClickableHeight
            );
        }
    }

    renderOverheadEffects(coords)
    {
        var screenLevel = (currentlyViewedDepth - this.levelDepth);
        if(screenLevel >= 0 && screenLevel < found.length && quality == 1)
        {
            var popupFrames = 24;
            var typeFound = found[screenLevel][0][this.minerIndex - 1];
            var startFrame = found[screenLevel][1][this.minerIndex - 1];
            var framesRemainingToShow = popupFrames - (Math.ceil((numFramesRendered - startFrame) / 2));
            if(typeFound > -1 && framesRemainingToShow >= 1)
            {
                this.context.globalAlpha = MINERAL_COLLECTED_POPUP_ALPHA_SEQUENCE[framesRemainingToShow];
                var yOffsetForSequence = MINERAL_COLLECTED_POPUP_OFFSET_SEQUENCE[framesRemainingToShow];
                var iconSize = this.boundingBox.width / 2;
                this.context.drawImage(
                    worldResources[typeFound + 1].smallIcon,
                    coords.x + this.boundingBox.width / 2 - iconSize / 2,
                    coords.y + yOffsetForSequence + this.renderYOffset,
                    iconSize,
                    iconSize
                );
                this.context.globalAlpha = 1;
            }
        }
        if(this.minerIndex == battleWaiting[0] - 1 && battleWaiting[1] == this.levelDepth && this.levelDepth > 303)
        {
            var coords = this.getGlobalCoordinates(0, 0);
            this.context.drawImage(
                Exclamation,
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.width
            );
        }
    }

    renderName(coords)
    {
        var context = MAIN;
        var premiumName = getPremiumMinerName(this.levelDepth, this.minerIndex);
        if(this.isMouseOver || premiumName)
        {
            context.save();
            if(premiumName)
            {
                var name = premiumName;
                context.fillStyle = "#FF7777";
            }
            else
            {
                var name = getMinerName(this.levelDepth, this.minerIndex);
                context.fillStyle = "#FFFFFF";
            }
            context.font = "12px Arial";
            context.strokeStyle = "#000000";
            context.lineWidth = 4;
            context.textBaseline = "top";
            var box = fillTextWrap(
                context,
                name,
                coords.x + this.boundingBox.width / 2 - 100,
                coords.y + this.renderYOffset + worldConfig.levelClickableHeight - 10,
                200,
                "center",
                0.5,
                true
            );
            var xOffset = 0;
            if(coords.x + box.width > worldConfig.rightBound - 1)
            {
                xOffset = worldConfig.rightBound - (coords.x + box.width) - 1;
            }
            else if(coords.x + this.boundingBox.width / 2 - box.width / 2 < worldConfig.leftBound + 1)
            {
                xOffset = worldConfig.leftBound - (coords.x + this.boundingBox.width / 2 - box.width / 2) + 1;
            }
            outlineTextWrap(
                context,
                name,
                coords.x + this.boundingBox.width / 2 - box.width / 2 + xOffset,
                coords.y + this.renderYOffset + worldConfig.levelClickableHeight - 10,
                box.width,
                "right",
            )
            context.restore();
        }
    }
}