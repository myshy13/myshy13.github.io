class MobileHeader extends Hitbox
{
    root;
    context;

    bigBars = [];
    smallBars = [];

    constructor(boundingBox)
    {
        super(boundingBox, {}, "");
        this.init();
        this.initialHeight = boundingBox.height;
    }

    onBecomeChild()
    {
        this.root = this.getFirstElementWithContext();
        this.context = this.root.context;
    }

    init()
    {
        var bar;

        var bigBarWidth = Math.ceil(this.boundingBox.width * 0.293);
        var bigBarHeight = this.boundingBox.height * 0.35;
        this.barHorizontalPadding = this.boundingBox.width * 0.04;
        var bigBarVerticalPadding = this.boundingBox.height * 0.04;

        var smallBarWidth = this.boundingBox.width * 0.21;
        var smallBarHeight = this.boundingBox.height * 0.3;
        var smallBarVerticalPadding = this.boundingBox.height * 0.08;
        var smallBarY = bigBarVerticalPadding + 1.4 * bigBarHeight + smallBarVerticalPadding;

        // MONEY
        var bar = new HeaderBar({
            x: this.barHorizontalPadding / 2,
            y: bigBarHeight * 0.2 + bigBarVerticalPadding,
            width: bigBarWidth,
            height: bigBarHeight
        })
        bar.getBarColor = () => "#000000";
        bar.getFillPercent = () => 0;
        bar.getText = function ()
        {
            if(money >= 1000000)
            {
                return "$" + shortenAndBeautifyNum(money, 2);
            }
            return "$" + beautifynum(money)
        }
        bar.setIcon(mobileHeaderMoneyIcon);
        this.addHitbox(bar);
        this.bigBars.push(bar);

        // CAPACITY
        bar = new HeaderBar({
            x: bigBarWidth + 3 * this.barHorizontalPadding / 2,
            y: bigBarHeight * 0.2 + bigBarVerticalPadding,
            width: bigBarWidth,
            height: bigBarHeight
        })
        bar.getBarColor = function ()
        {
            if(isCapacityFull())
            {
                var flashFrame = getAnimationFrameIndex(12, 10);
                if(numFramesRendered % 200 == 1 && playtime < 7200)
                {
                    newNews(_("Your Capacity is Full! Sell some minerals at the sell center so you can keep mining."));
                }
                if(flashFrame == 0 || flashFrame == 2 || flashFrame == 4)
                {
                    return "#de7c31";
                }
                else if(flashFrame == 1 || flashFrame == 3)
                {
                    return "#f03232"
                }
            }
            return "#D5802D";
        }
        bar.getFillPercent = () => Math.min(1, capacity / maxHoldingCapacity());
        bar.getText = () => beautifynum(capacity);
        bar.getText = function ()
        {
            if(money >= 1000000)
            {
                return shortenAndBeautifyNum(capacity, 1);
            }
            return beautifynum(capacity)
        }
        bar.setIcon(mobileHeaderCapacityIcon);
        this.addHitbox(bar);
        this.bigBars.push(bar);

        // DEPTH
        bar = new HeaderBar({
            x: 2 * bigBarWidth + 5 * this.barHorizontalPadding / 2,
            y: bigBarHeight * 0.2 + bigBarVerticalPadding,
            width: bigBarWidth,
            height: bigBarHeight
        })
        bar.getBarColor = () => "#00A1BB";
        bar.getFillPercent = () => Math.min(1, divideBigIntToDecimalNumber(progressTowardsNextDepth, depthDifficultyTable[depth]));
        bar.getText = () => depth + "Km";
        bar.setIcon(mobileHeaderDepthIcon);
        this.addHitbox(bar);
        this.bigBars.push(bar);

        // TICKETS
        bar = new HeaderBar({
            x: this.barHorizontalPadding / 2,
            y: smallBarY,
            width: smallBarWidth,
            height: smallBarHeight
        })
        bar.getBarColor = () => "#000000";
        bar.getFillPercent = () => 0;
        bar.getText = () => tickets;
        bar.setIcon(mobileHeaderTicketsIcon);
        bar.showPlusButton = true;
        bar.onmousedown = function ()
        {
            openUi(PurchaseWindow);
        }
        bar.shortenNum = true;
        this.addHitbox(bar);
        this.smallBars.push(bar);

        // BUILDING MATERIALS
        bar = new HeaderBar({
            x: smallBarWidth + 3 * this.barHorizontalPadding / 2,
            y: smallBarY,
            width: smallBarWidth,
            height: smallBarHeight
        })
        bar.getBarColor = () => "#000000";
        bar.getFillPercent = () => 0;
        bar.getText = () => worldResources[BUILDING_MATERIALS_INDEX].numOwned;
        bar.setIcon(mobileHeaderBuildingMaterialsIcon, -0.0175);
        this.addHitbox(bar);
        this.smallBars.push(bar);

        // OIL
        bar = new HeaderBar({
            x: 2 * smallBarWidth + 5 * this.barHorizontalPadding / 2,
            y: smallBarY,
            width: smallBarWidth,
            height: smallBarHeight
        })
        bar.isVisible = () => depth > 300;
        bar.getBarColor = () => "#147930";
        bar.getFillPercent = function ()
        {
            var oilProgress = (oilRigTime / (oilRigStats[oilrigStructure.level][0] * STAT.oilGenerationMultiplier()));
            var oilOwned = numOilOwned() + oilProgress;
            return oilRigStats[oilrigStructure.level][1] > 0 ? oilOwned / oilRigStats[oilrigStructure.level][1] : 0;
        }
        bar.getText = function ()
        {
            if(numOilOwned() > 1000)
            {
                return shortenAndBeautifyNum(numOilOwned(), 1) + "/" + shortenAndBeautifyNum(oilRigStats[oilrigStructure.level][1], 1);
            }
            return numOilOwned() + "/" + oilRigStats[oilrigStructure.level][1];
        }
        bar.setIcon(mobileHeaderOilIcon);
        this.addHitbox(bar);
        this.smallBars.push(bar);

        // ENERGY
        bar = new HeaderBar({
            x: 3 * smallBarWidth + 7 * this.barHorizontalPadding / 2,
            y: smallBarY,
            width: smallBarWidth,
            height: smallBarHeight
        })
        bar.isVisible = () => depth > 1133;
        bar.getBarColor = () => "#FFD11D";
        bar.getFillPercent = () => reactor.currentBatteryCharge() > 0 ? reactor.currentBatteryCharge() / reactor.grid.maxBatteryCapacity() : 0;
        bar.getText = function ()
        {
            if(reactor.currentBatteryCharge() > 1000)
            {
                return shortenAndBeautifyNum(reactor.currentBatteryCharge(), 1) + "/" + shortenAndBeautifyNum(reactor.grid.maxBatteryCapacity(), 1);
            }
            return reactor.currentBatteryCharge() + "/" + reactor.grid.maxBatteryCapacity();
        }
        bar.setIcon(mobileHeaderEnergyIcon, 0.02);
        this.addHitbox(bar);
        this.smallBars.push(bar);
    }

    render()
    {
        this.context.drawImage(
            mobileHeaderBackground,
            this.boundingBox.x,
            this.boundingBox.y,
            this.boundingBox.width,
            this.initialHeight
        );
        this.prepareBarsForRender(this.bigBars);
        this.prepareBarsForRender(this.smallBars);
        this.renderChildren();
    }

    prepareBarsForRender(barsArray)
    {
        var smallestFontSize = Number.MAX_SAFE_INTEGER;
        var numActiveBars = 0;
        for(var i in barsArray)
        {
            if(barsArray[i].isVisible())
            {
                ++numActiveBars;
                var fontSize = barsArray[i].calculateFontSize();
                if(fontSize < smallestFontSize)
                {
                    smallestFontSize = fontSize;
                }
            }
        }
        for(var i in barsArray)
        {
            var barWidth = barsArray[i].boundingBox.width;
            // 3 * barsArray[i].boundingBox.width + 7 * this.barHorizontalPadding / 2
            var totalBarWidth = numActiveBars * barWidth + (numActiveBars - 1) * this.barHorizontalPadding;
            barsArray[i].boundingBox.x = this.barHorizontalPadding + (i * barWidth + (i - 1) * this.barHorizontalPadding) + (this.boundingBox.width - totalBarWidth) / 2;
            barsArray[i].fontSize = smallestFontSize;
        }
    }

    onmousedown()
    {
        if(!mutebuttons) clickAudio[rand(0, clickAudio.length - 1)].play();
        this.isExpanded = !this.isExpanded;
        if(this.isExpanded)
        {
            this.parent.renderMineralDropDown()
            this.boundingBox.height = this.expandedHeight;
            this.expandableInfo.isVisible = () => true;
            this.expandableInfo.isEnabled = () => true;
        }
        else
        {
            this.boundingBox.height = this.collapsedHeight;
            this.expandableInfo.isVisible = () => false;
            this.expandableInfo.isEnabled = () => false;
        }
        this.parent.initializeScrollbar();
    }
    onmouseenter()
    {
    }
    onmouseexit()
    {
        if(!this.isAncestorOf(currentTargetHitbox.hitbox))
        {
            this.isExpanded = false;
            this.boundingBox.height = this.collapsedHeight;
            this.expandableInfo.isVisible = () => false;
            this.expandableInfo.isEnabled = () => false;
            this.parent.initializeScrollbar();
        }
    }
}