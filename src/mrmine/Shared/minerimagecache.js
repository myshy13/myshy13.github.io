class MinerImageCache
{
    _cache = [];
    _animationFrames = 8;
    _individualMinerImageWidth = 32;
    _individualMinerImageSpacing = 2;

    phaseShiftBetweenMiners = 3;

    failedRenderCount = 0;

    constructor()
    {
        this.paddedMinerWidth = worldConfig.levelClickableSpacing + worldConfig.levelClickableWidth;
        this.dpiScale = GLOBAL_DPI_SCALE;
    }

    renderMinerImage(kmDepth, mainCanvasCoords, isolatedMinerIndexes=[])
    {
        try
        {
            var world = worldAtDepth(kmDepth);
            // Last frame in the cached array is the idle frame
            var frame = isCapacityFull() ? this._animationFrames : ((numFramesRendered + kmDepth) % this._animationFrames);
            var image = this.getImage(world.index, frame);
            var dimensions = this.getCroppedImageDimensions(world, isolatedMinerIndexes);
            for (var x of dimensions.xValues)
            {
                MAIN.drawImage(
                    image,
                    x[0],
                    dimensions.y,
                    x[1] - x[0],
                    dimensions.height,
                    mainCanvasCoords.x + x[0] / this.dpiScale,
                    mainCanvasCoords.y,
                    (x[1] - x[0]) / this.dpiScale,
                    dimensions.height / this.dpiScale
                );
            }
        }
        catch (e)
        {
            ++this.failedRenderCount;
            console.error(e);
        }
    }

    getImage(worldIndex, frameIndex)
    {
        if (frameIndex < 0 || frameIndex >= this._animationFrames + 1) return null;

        if (!this._cache[worldIndex] || this._cache[worldIndex].workerLevel != worlds[worldIndex].workerLevel)
        {
            this.generateImageArray(worldIndex);
        }
        return this._cache[worldIndex].images[frameIndex]
    }

    generateImageArray(worldIndex)
    {
        var workerLevel = worlds[worldIndex].workerLevel
        this._cache[worldIndex] = {
            workerLevel: workerLevel,
            images: []
        }
        for (var i = 0; i < this._animationFrames + 1; ++i)
        {
            this._cache[worldIndex].images[i] = this.generateImage(worldIndex, i);
        }
    }

    generateImage(worldIndex, frameIndex)
    {
        var canvas;
        if (this._cache[worldIndex] && this._cache[worldIndex].images[frameIndex])
        {
            canvas = this._cache[worldIndex].images[frameIndex];
        }
        else
        {
            canvas = document.createElement("canvas");
            canvas.width = this.paddedMinerWidth * 10;
            canvas.height = worldConfig.levelHeight;
            setDpi(canvas, this.dpiScale);
        }
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        var renderYOffset = worldConfig.levelHeight * 0.3;
        var workerLevel = worlds[worldIndex].workerLevel;
        for (var i = 0; i < 10; ++i)
        {
            var frame = (frameIndex + i * this.phaseShiftBetweenMiners) % this._animationFrames;
            if (frameIndex == this._animationFrames)
            {
                // Idle frame
                frame = 0;
            }
            var coords = {
                x: 1 + this.paddedMinerWidth * i,
                y: 0
            }
            if (worldIndex == EARTH_INDEX)
            {
                context.drawImage(
                    minerImages[workerLevel],
                    (this._individualMinerImageSpacing + this._individualMinerImageWidth) * frame,
                    0,
                    this._individualMinerImageWidth,
                    48,
                    coords.x,
                    coords.y + renderYOffset,
                    worldConfig.levelClickableWidth,
                    worldConfig.levelClickableHeight
                );
                context.drawImage(minerHatImages[workerLevel],
                    (this._individualMinerImageSpacing + this._individualMinerImageWidth) * frame,
                    0,
                    this._individualMinerImageWidth,
                    48,
                    coords.x,
                    coords.y + renderYOffset,
                    worldConfig.levelClickableWidth,
                    worldConfig.levelClickableHeight
                );
                
            }
            else if (worldIndex == MOON_INDEX)
            {
                context.drawImage(
                    lunarMinerImages[workerLevel],
                    (this._individualMinerImageSpacing + this._individualMinerImageWidth) * frame,
                    0,
                    this._individualMinerImageWidth,
                    48,
                    coords.x,
                    coords.y + renderYOffset,
                    worldConfig.levelClickableWidth,
                    worldConfig.levelClickableHeight
                );
            }
            else
            {
                context.drawImage(
                    titanMinerImages[workerLevel],
                    (this._individualMinerImageSpacing + this._individualMinerImageWidth) * frame,
                    0,
                    this._individualMinerImageWidth,
                    48,
                    coords.x,
                    coords.y + renderYOffset,
                    worldConfig.levelClickableWidth,
                    worldConfig.levelClickableHeight
                );
            }
        }
        return canvas;
    }

    getCroppedImageDimensions(world, isolatedMinerIndexes = [])
    {
        var result = {
            y: 0,
            height: this.dpiScale * worldConfig.levelHeight,
            xValues: []
        };

        if (isolatedMinerIndexes.length == 0)
        {
            var width = 1 + this.paddedMinerWidth * world.workersHired;
            result.xValues.push([0, this.dpiScale * width]);
        }
        else
        {
            isolatedMinerIndexes.sort();
            result.xValues.push([0, this.getMinerPosition(isolatedMinerIndexes[0]).left * this.dpiScale]);
            for (var i = 0; i < isolatedMinerIndexes.length; ++i)
            {
                var x0 = this.getMinerPosition(isolatedMinerIndexes[i]).right;
                var x1;
                if (i == isolatedMinerIndexes.length - 1)
                {
                    x1 = 1 + this.paddedMinerWidth * world.workersHired;
                }
                else
                {
                    x1 = this.getMinerPosition(isolatedMinerIndexes[i + 1]).left;
                }
                result.xValues.push([this.dpiScale * x0, this.dpiScale * x1]);
            }
        }
        return result;
    }

    getMinerPosition(minerIndex)
    {
        return {
            left: 1 + this.paddedMinerWidth * minerIndex,
            right: 1 + this.paddedMinerWidth * (minerIndex + 1)
        }
    }

    clearCache()
    {
        this._cache = [];
    }

    isActive()
    {
        return this.failedRenderCount < 3;
    }
}

var minerImageCache = new MinerImageCache();