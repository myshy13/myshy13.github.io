var worldConfig = {
    leftBound: Math.floor(mainw * 0.09),
    rightBound: Math.ceil(mainw * 0.91),
    topBound: Math.floor(mainh * 0.05),
    levelHeight: -1,    // Calculated and defined within WorldLayer constructor
    levelWidth: -1,
    minerAspectRatio: 0.667,

    superMiners: {
        height: 0.75,
        yOffset: -0.1,
        leftBound: 0.1,
        rightBound: 0.7
    },

    levelImages: {
        0: {
            background: levelBackground,
            base: level,
            foreground: levelForeground,
            lights: light,
            hole: earthDrillHole1
        },
        100: {
            background: levelBackground,
            base: level2,
            foreground: levelForeground2,
            lights: light,
            hole: earthDrillHole2
        },
        200: {
            background: levelBackground,
            base: level3,
            foreground: levelForeground3,
            lights: light,
            hole: earthDrillHole3
        },
        300: {
            background: levelBackground,
            base: level4,
            foreground: levelForeground4,
            lights: light,
            hole: earthDrillHole4
        },
        400: {
            background: levelBackground,
            base: level5,
            foreground: levelForeground5,
            lights: light,
            hole: earthDrillHole5
        },
        900: {
            background: levelBackground,
            base: level6,
            foreground: levelForeground6,
            lights: light,
            hole: earthDrillHole6
        },
        1032: {
            background: lunarbackground,
            base: lunarlevel1,
            foreground: lunarlevel1,
            lights: lunarlight,
            hole: earthDrillHole6
        },
        1132: {
            background: lunarbackground,
            base: lunarlevel2,
            foreground: lunarlevel2,
            lights: lunarlight,
            hole: earthDrillHole6
        },
        1432: {
            background: lunarbackground,
            base: lunarlevel4,
            foreground: lunarlevel4,
            lights: lunarlight,
            hole: earthDrillHole6
        },
        1532: {
            background: lunarbackground,
            base: lunarlevel3,
            foreground: lunarlevel3,
            lights: lunarlight,
            hole: earthDrillHole6
        },
        1914: {
            background: lunarbackground,
            base: titanlevel4,
            foreground: titanlevel4,
            lights: lunarlight,
            hole: earthDrillHole6
        },
        1532: {
            background: lunarbackground,
            base: titanlevel1,
            foreground: titanlevel1,
            lights: lunarlight,
            hole: earthDrillHole6
        },
    },
    specialLevels: {
        topCity: {
            name: "topCity",
            depth: -5,
            height: 5
        },
        superMinerBuilding: {
            name: "superMinerBuilding",
            depth: 10,
            height: 1
        },
        tradingPost: {
            name: "tradingPost",
            depth: 15,
            height: 1
        },
        caveBuilding: {
            name: "caveBuilding",
            depth: 45,
            height: 1
        },
        underground: {
            name: "underground",
            depth: 300,
            height: 4
        },
        core: {
            name: "core",
            depth: 501,
            height: 1
        },
        earthEnd: {
            name: "earthEnd",
            depth: 1000,
            height: 4
        },
        space: {
            name: "space",
            depth: 1004,
            height: 23
        },
        moonTopCity: {
            name: "moonTopCity",
            depth: 1027,
            height: 5
        },
        moonTradingPost: {
            name: "moonTradingPost",
            depth: 1047,
            height: 1
        },
        reactor: {
            name: "reactor",
            depth: 1133,
            height: 2
        },
        buffLab: {
            name: "buffLab",
            depth: 1135,
            height: 1
        },
        moonEnd: {
            name: "moonEnd",
            depth: 1783,
            height: 4
        },
        space2: {
            name: "space2",
            depth: 1787,
            height: 22
        },
        titanTopCity: {
            name: "titanTopCity",
            depth: 1809,
            height: 5
        },
    }
}



function initWorldConfig()
{
    var levelImageWidth = 926;
    var levelImageHeight = 240;
    worldConfig.levelWidth = worldConfig.rightBound - worldConfig.leftBound;
    worldConfig.levelScale = worldConfig.levelWidth / levelImageWidth;
    worldConfig.levelHeight = Math.ceil(levelImageHeight * worldConfig.levelScale);
    worldConfig.numberOfDepthsVisible = (mainh * 0.95 - worldConfig.topBound) / worldConfig.levelHeight;
}

initWorldConfig();

var specialLevels = [];

function calculateClickableSizes()
{
    var clickableMaxHeight = worldConfig.levelHeight;
    var clickableMaxWidth = worldConfig.levelWidth / 10; // 10 workers + 9 gaps + left padding (0.5) + right padding (1)
    if(clickableMaxWidth / clickableMaxHeight > worldConfig.minerAspectRatio)
    {
        worldConfig.levelClickableHeight = clickableMaxHeight;
        worldConfig.levelClickableWidth = worldConfig.levelClickableHeight * worldConfig.minerAspectRatio;
    }
    else
    {
        worldConfig.levelClickableWidth = clickableMaxWidth;
        worldConfig.levelClickableHeight = worldConfig.levelClickableWidth / worldConfig.minerAspectRatio;
    }
    worldConfig.levelClickableSpacing = 0;
}
calculateClickableSizes();

// LEVEL HITBOX DEFINITIONS

function initializeLevelHitboxes()
{
    // TOP CITY

    var topCityHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.topCity.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.topCity.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    topCityHitbox.render = function ()
    {
        MAIN.save();
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage;
        if(hasUnlockedScientists == 0)
        {
            levelImage = toplevelmobile1;
        }
        else
        {
            levelImage = toplevelmobile2;
        }
        MAIN.drawImage(levelImage, coords.x, coords.y + this.boundingBox.height * 0.25, this.boundingBox.width, this.boundingBox.height * 0.75);

        MAIN.fillStyle = "#000000";
        MAIN.font = Math.ceil(this.boundingBox.height * 0.0325) + "px KanitM";
        MAIN.textBaseline = "top";
        // MAIN.fillText(_("SELL CENTER"), Math.ceil(mainw * .19) - MAIN.measureText(_("SELL CENTER")).width / 2, (4 * worldConfig.levelHeight) * ((4 - currentlyViewedDepth) / 4) - Math.ceil(mainh * .215));
        fillTextWrapWithHeightLimit(
            MAIN,
            _("SELL"),
            coords.x + Math.ceil(this.boundingBox.width * 0.1375),
            coords.y + Math.ceil(this.boundingBox.height * 0.525),
            Math.ceil(this.boundingBox.width * 0.199),
            Math.ceil(this.boundingBox.height * 0.05),
            "center",
            0.01
        )
        if(language == "german") MAIN.font = "12px KanitM";
        if(language == "spanish") MAIN.font = "12px KanitM";
        if(language == "japanese") MAIN.font = "12px KanitM";
        if(language == "french") MAIN.font = "12px KanitM";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("HIRE"),
            coords.x + Math.ceil(this.boundingBox.width * 0.353),
            coords.y + Math.ceil(this.boundingBox.height * 0.7225),
            Math.ceil(this.boundingBox.width * 0.202),
            Math.ceil(this.boundingBox.height * 0.05),
            "center",
            0.01
        )
        fillTextWrapWithHeightLimit(
            MAIN,
            _("CRAFT"),
            coords.x + Math.ceil(this.boundingBox.width * 0.736),
            coords.y + Math.ceil(this.boundingBox.height * 0.7225),
            Math.ceil(this.boundingBox.width * 0.205),
            Math.ceil(this.boundingBox.height * 0.05),
            "center",
            0.01
        )

        MAIN.fillStyle = "#558855";
        fillTextWrapWithHeightLimit(
            MAIN,
            tickets,
            coords.x + Math.ceil(this.boundingBox.width * 0.850),
            coords.y + Math.ceil(this.boundingBox.height * 0.618),
            Math.ceil(this.boundingBox.width * 0.07),
            Math.ceil(this.boundingBox.height * 0.022),
            "left",
            0.01
        )

        if(showGarageSparkles && depth > 20)
        {
            MAIN.globalAlpha = 0.25 + (0.25 * oscillate(numFramesRendered, 17));
            MAIN.drawImage(
                garageSparkle,
                (garageSparkle.width / 2) * (Math.floor(numFramesRendered / 3) % 2), 0, garageSparkle.width / 2, garageSparkle.height,
                coords.x + Math.ceil(this.boundingBox.width * 0.756),
                coords.y + Math.ceil(this.boundingBox.height * 0.6425),
                Math.ceil(this.boundingBox.width * 0.215),
                Math.ceil(this.boundingBox.height * 0.045)
            );
        }

        MAIN.restore();
        this.renderChildren();
    }

    // SELL BUILDING

    sellBuilding = topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.13,
            y: topCityHitbox.boundingBox.height * 0.517,
            width: topCityHitbox.boundingBox.width * 0.27,
            height: topCityHitbox.boundingBox.height * 0.21
        },
        {
            onmousedown: function ()
            {
                openUi(SellWindow, null, EARTH_INDEX);
            }
        }
    )).addHitbox(new EasyHintArrow(
        "down",
        function ()
        {
            var showArrow = (getEarth().workersHired == 0 && getValueOfMinerals() >= getEarth().workerHireCost()) || // Can hire first worker
                (getBlueprintCount() == 6 && getValueOfMinerals() >= 150) ||     // Can craft first blueprint
                (drillState.drill().level == 1 && getValueOfMinerals() >= 250) || // Can craft second blueprint
                (isCapacityFull() &&                                            // Capacity is full and has crafted <= 2 blueprints
                    drillState.engine().level + drillState.drill().level + drillState.fan().level + drillState.cargo().level <= 6 // Sum of drill part levels <= 6
                ) ||
                (drillState.engine().level == 1 && drillBlueprints[0].ingredients[0].item.getName() == _("Money") &&
                    getValueOfMineralsExcludingHe3() >= drillBlueprints[0].ingredients[0].quantity)
            isArrowOnTopLevel = showArrow;
            return showArrow;
        }
    ));

    // HIRE BUILDING

    topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.32,
            y: topCityHitbox.boundingBox.height * 0.72,
            width: topCityHitbox.boundingBox.width * 0.28,
            height: topCityHitbox.boundingBox.height * 0.20
        },
        {
            onmousedown: function ()
            {
                openUi(HireWindow, null, EARTH_INDEX);
            }
        }
    )).addHitbox(new EasyHintArrow(
        "down",
        function ()
        {
            var showArrow = money >= getEarth().workerHireCost() && getEarth().workersHired == 0;
            if(!isArrowOnTopLevel)
            {
                isArrowOnTopLevel = showArrow;
            }
            return showArrow;
        }
    ));

    // SCIENTISTS

    topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.37,
            y: topCityHitbox.boundingBox.height * 0.37,
            width: topCityHitbox.boundingBox.width * 0.24,
            height: topCityHitbox.boundingBox.height * 0.09
        },
        {
            onmousedown: function ()
            {
                if(hasUnlockedScientists)
                {
                    openUi(ScientistsWindow);
                }
            }
        }
    ));

    // MANAGER

    var managerHitbox = topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.48,
            y: topCityHitbox.boundingBox.height * 0.53,
            width: topCityHitbox.boundingBox.width * 0.16,
            height: topCityHitbox.boundingBox.height * 0.19
        },
        {
            onmouseenter: function ()
            {
                if(managerStructure.level == 0) return;

                if(managerStructure.level == 1)
                {
                    showTooltip(_("Manager Level {0}", managerStructure.level), _("- Unlocks sell center resource locking.<br><br>- Grants you offline progress at 25% efficiency for 12hrs."));
                } else if(managerStructure.level == 2)
                {
                    showTooltip(_("Manager Level {0}", managerStructure.level), _("- Unlocks sell center resource locking.<br><br>- Grants you offline progress at 50% efficiency for 24hrs."));
                } else
                {
                    showTooltip(_("Manager Level {0}", managerStructure.level), _("- Unlocks sell center resource locking.<br><br>- Grants you offline progress at 100% efficiency for 48hrs."));
                }
            },
            onmouseexit: function ()
            {
                hideTooltip();
            }
        }
    ));
    managerHitbox.render = function ()
    {
        if(managerStructure.level > 0)
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var managerImage;
            if(managerStructure.level == 1) managerImage = manager1;
            else if(managerStructure.level == 2) managerImage = manager2;
            else managerImage = manager3;
            drawImageFitInBox(
                MAIN,
                managerImage,
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            )
        }
    }

    // CHEST COLLECTOR, ETC.
    var chestCollectorHitbox = topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.01,
            y: topCityHitbox.boundingBox.height * 0.80,
            width: topCityHitbox.boundingBox.width * 0.27,
            height: topCityHitbox.boundingBox.height * 0.15
        },
        {
            onmousedown: function ()
            {
                if(chestCollectorStorageStructure.level > 0)
                {
                    openUi(ChestCollectorWindow);
                }
            }
        }
    ));
    chestCollectorHitbox.render = function ()
    {
        MAIN.save();
        var coords = this.getGlobalCoordinates(0, 0);

        if(chestCollectorChanceStructure.level > 0 && chestCollectorStorageStructure.level > 0)
        {
            var totalCollectorLevel = chestCollectorChanceStructure.level + chestCollectorStorageStructure.level;
            var collectorImage;
            var yOffset = this.boundingBox.height * 0.13;
            if(totalCollectorLevel < 4)
            {
                collectorImage = collector1;
                yOffset = this.boundingBox.height * 0.43;
            }
            else if(totalCollectorLevel >= 4 && totalCollectorLevel < 6)
            {
                collectorImage = collector2;
            }
            else if(totalCollectorLevel >= 6 && totalCollectorLevel < 8)
            {
                collectorImage = collector3;
            }
            else if(totalCollectorLevel >= 8 && totalCollectorLevel < 10)
            {
                collectorImage = collector4;
            }
            else if(totalCollectorLevel >= 10)
            {
                collectorImage = collector5;
            }
            var width = this.boundingBox.width * 1.75;
            var height = width * collectorImage.height / collectorImage.width;
            drawImageFitInBox(
                MAIN,
                collectorImage,
                coords.x - this.boundingBox.width / 2,
                coords.y + this.boundingBox.height - height + yOffset,
                width,
                height
            );
        }

        //metal detector
        if(metalDetectorStructure.level > 0)
        {
            var detectorImage;
            var detectorYOffset = 0;
            if(metalDetectorStructure.level == 1)
            {
                detectorImage = detector1;
            }
            else if(metalDetectorStructure.level == 2)
            {
                detectorImage = detector2;
            }
            else if(metalDetectorStructure.level == 3)
            {
                detectorImage = detector3;
            }
            else
            {
                detectorImage = detector4;
                detectorYOffset = mainh * (oscillate(numFramesRendered + 5, 26) * .005);
            }
            var width = this.boundingBox.width / 2;
            var height = width * detectorImage.height / detectorImage.width;
            MAIN.drawImage(
                detectorImage,
                0, 0, 65, 80,
                coords.x * 1.3,
                coords.y + this.boundingBox.height - height + detectorYOffset,
                width,
                height
            );
        }

        if(chestCompressorStructure.level > 0)
        {
            var compressorOffset = 0;
            if(clickedCompress)
            {
                compressorOffset = 1;
                clickedCompress = false;
            }

            var compactorImage = document.getElementById("compactor" + Math.min(5, chestCompressorStructure.level));
            var height = this.boundingBox.height;
            var width = height * (compactorImage.width / 2) / compactorImage.height;
            MAIN.drawImage(
                compactorImage,
                compressorOffset * compactorImage.width / 2,
                0,
                compactorImage.width / 2,
                compactorImage.height,
                coords.x + this.boundingBox.width - width,
                coords.y,
                width,
                height
            );
        }

        if(chestCollectorChanceStructure.level > 0 && chestCollectorStorageStructure.level > 0)
        {
            var text = chestService.getTotalStoredChests() + "/" + chestService.getMaxStoredChests();
            MAIN.strokeStyle = "#000000";
            MAIN.lineWidth = 4;
            MAIN.fillStyle = "#ffffff"
            MAIN.font = "12px Verdana";
            MAIN.textBaseline = "top";
            outlineTextWrap(MAIN, text, coords.x, coords.y, this.boundingBox.width, "center");
        }
        MAIN.restore();
    }

    // QUESTS

    var questHitbox = topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.83,
            y: topCityHitbox.boundingBox.height * 0.44,
            width: topCityHitbox.boundingBox.width * 0.17,
            height: topCityHitbox.boundingBox.height * 0.17
        },
        {
            onmousedown: function ()
            {
                openUi(QuestWindow);
            }
        }
    ));
    questHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        drawImageFitInBox(
            MAIN,
            questguy,
            coords.x,
            coords.y,
            this.boundingBox.width,
            this.boundingBox.height
        )
        this.renderChildren();
    }
    questHitbox.addHitbox(new EasyHintArrow(
        "down",
        function ()
        {
            for(var i = 0; i < questManager.quests.length; i++)
            {
                if(questManager.getQuest(i).isCollectable())
                {
                    //arrow on the quest guy since a quest was completed
                    arrowOnTopLevel = true;
                    return true;
                }
            }
            return false;
        },
        -0.1
    ))

    // TICKET BUILDING

    topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.72,
            y: topCityHitbox.boundingBox.height * 0.57,
            width: topCityHitbox.boundingBox.width * 0.28,
            height: topCityHitbox.boundingBox.height * 0.13
        },
        {
            onmousedown: function ()
            {
                openUi(PurchaseWindow);
            }
        }
    ));

    worldConfig.specialLevels.topCity.hitbox = topCityHitbox;

    // CRAFT BUILDING

    topCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.70,
            y: topCityHitbox.boundingBox.height * 0.72,
            width: topCityHitbox.boundingBox.width * 0.28,
            height: topCityHitbox.boundingBox.height * 0.21
        },
        {
            onmousedown: function ()
            {
                openUi(CraftingWindow, null, EARTH_INDEX);
            }
        }
    )).addHitbox(new EasyHintArrow(
        "down",
        function ()
        {
            var showArrow = (!hasCraftedABlueprint && canCraftAnyBlueprint(1)) ||
                (drillState.drill().level == 1 && canCraftBlueprint(1)) ||
                (tradingPostStructure.level == 0 && canCraftBlueprint(3, 0));
            if(!isArrowOnTopLevel)
            {
                isArrowOnTopLevel = showArrow;
            }
            return showArrow;
        }
    ));

    // SUPER MINER BUILDING

    var superMinerBuildingHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.superMinerBuilding.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                if(superMinerManager.recievedInitialSuperMiner)
                {
                    openUi(SuperMinersWindow);
                }
                else
                {
                    chestService.spawnChest(0, Chest.purchased, ChestType.black);
                    chestService.presentChest(0);
                    superMinerManager.recievedInitialSuperMiner = true;
                }
            }
        }
    )
    superMinerBuildingHitbox.render = function ()
    {
        MAIN.save();
        var coords = this.getGlobalCoordinates(0, 0);
        if(!superMinerManager.recievedInitialSuperMiner)
        {
            MAIN.drawImage(superMinerLevelChest, coords.x, coords.y - 2, this.boundingBox.width, this.boundingBox.height + 4);
            let glowAnimationDuration = 1500;
            MAIN.globalAlpha = 0.5 * oscillate(currentTime(), glowAnimationDuration);
            MAIN.drawImage(superMinerLevelGlow, coords.x, coords.y - 2, this.boundingBox.width, this.boundingBox.height + 4);
            MAIN.globalAlpha = 1;
        }
        else
        {
            MAIN.drawImage(superMinerLevel, coords.x, coords.y - 2, this.boundingBox.width, this.boundingBox.height + 4);
        }
        MAIN.fillStyle = "#000000";
        MAIN.font = Math.ceil(this.boundingBox.height * 0.12) + "px KanitM";
        MAIN.textBaseline = "top";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("SUPER MINERS"),
            coords.x + this.boundingBox.width * 0.419,
            coords.y + this.boundingBox.height * 0.271,
            this.boundingBox.width * 0.146,
            this.boundingBox.height * 0.092,
            "center",
            0.01
        );

        MAIN.restore();
        this.renderChildren();
    }
    worldConfig.specialLevels.superMinerBuilding.hitbox = superMinerBuildingHitbox;

    // EARTH TRADING POST

    var earthTradingPostHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.tradingPost.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                if(tradingPostStructures[0].level == 0)
                {
                    var craftingWindow = openUi(CraftingWindow, null, 0);
                    if(craftingWindow)
                    {
                        craftingWindow.openTab(1);
                        craftingWindow.selectedBlueprint = getBlueprintById(3, 0);
                        craftingWindow.initializeCraftingPane();
                    }
                }
                else
                {
                    openUi(TradeWindow, null, 0);
                }
            }
        }
    )
    earthTradingPostHitbox.render = function ()
    {
        MAIN.save();
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage;
        if(tradingPostStructures[0].level == 0)
        {
            levelImage = tradeConfig.tradingPosts[0].unbuiltImage;
        }
        else
        {
            levelImage = tradeConfig.tradingPosts[0].image;
        }
        MAIN.drawImage(levelImage, coords.x, coords.y - 2, this.boundingBox.width, this.boundingBox.height + 4);

        MAIN.fillStyle = "#000000";
        MAIN.font = Math.ceil(this.boundingBox.height * 0.12) + "px KanitM";
        MAIN.textBaseline = "top";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("TRADE"),
            coords.x + this.boundingBox.width * 0.40,
            coords.y + this.boundingBox.height * 0.27,
            this.boundingBox.width * 0.18,
            this.boundingBox.height * 0.14,
            "center",
            0.01
        )
        MAIN.restore();
        this.renderChildren();
    }
    earthTradingPostHitbox.addHitbox(new EasyHintArrow(
        "left",
        function ()
        {
            var trades = getTradesForWorld(0);
            return isTradeAvailable(trades[0]) && !tradeConfig.tradingPosts[0].playerHasSeenNewTrade
        },
        -0.45
    ));
    worldConfig.specialLevels.tradingPost.hitbox = earthTradingPostHitbox;

    // CAVE BUILDING

    var caveBuildingHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.caveBuilding.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                openUi(CaveManagementWindow, null);
            }
        }
    )
    caveBuildingHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage = caveBuildingLevel;
        MAIN.drawImage(levelImage, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.drawImage(
            caveBuildingDrone,
            getAnimationFrameIndex(2, 3) * caveBuildingDrone.width / 2,
            0,
            caveBuildingDrone.width / 2,
            caveBuildingDrone.height,
            coords.x + (this.boundingBox.width * 0.43),
            coords.y + (this.boundingBox.height * 0.59),
            this.boundingBox.width * 0.10,
            this.boundingBox.height * 0.38
        );
        drawImageRot(
            MAIN,
            caveBuildingGear1,
            0,
            0,
            caveBuildingGear1.width,
            caveBuildingGear1.height,
            coords.x + (this.boundingBox.width * 0.5),
            coords.y + (this.boundingBox.height * 0.36),
            this.boundingBox.width * 0.10,
            this.boundingBox.height * 0.38,
            (numFramesRendered % 32) * -11.25
        );
        drawImageRot(
            MAIN,
            caveBuildingGear2,
            0,
            0,
            caveBuildingGear2.width,
            caveBuildingGear2.height,
            coords.x + (this.boundingBox.width * 0.55),
            coords.y + (this.boundingBox.height * 0.75),
            this.boundingBox.width * 0.05,
            this.boundingBox.height * 0.19,
            (numFramesRendered % 16) * 22.5
        );
        drawImageRot(
            MAIN,
            caveBuildingGear3,
            0,
            0,
            caveBuildingGear3.width,
            caveBuildingGear3.height,
            coords.x + (this.boundingBox.width * 0.6),
            coords.y + (this.boundingBox.height * 0.60),
            this.boundingBox.width * 0.075,
            this.boundingBox.height * 0.285,
            (numFramesRendered % 24) * -15
        );
        this.renderChildren();
    }
    caveBuildingHitbox.addHitbox(new EasyHintArrow(
        "left",
        function ()
        {
            return !hasCollectedTreasure && treasureStorage.treasure.length > 0
        },
        -0.45
    ));
    worldConfig.specialLevels.caveBuilding.hitbox = caveBuildingHitbox;

    // UNDERGROUND CITY

    var undergroundHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.underground.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.underground.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    undergroundHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage = bottomlevelnew;
        MAIN.drawImage(levelImage, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.drawImage(
            undergroundcityfire,
            (undergroundcityfire.width / 4) * getAnimationFrameIndex(4, 5),
            0,
            (undergroundcityfire.width / 4),
            undergroundcityfire.height,
            coords.x + this.boundingBox.width * 0.78,
            coords.y + this.boundingBox.height * 0.78,
            this.boundingBox.width * 0.2,
            this.boundingBox.height * 0.2
        );

        MAIN.drawImage(
            undergroundcityfire,
            (undergroundcityfire.width / 4) * getAnimationFrameIndex(4, 3),
            0,
            (undergroundcityfire.width / 4),
            undergroundcityfire.height,
            coords.x + this.boundingBox.width * 0.08,
            coords.y + this.boundingBox.height * 0.78,
            this.boundingBox.width * 0.2,
            this.boundingBox.height * 0.2
        );

        this.renderChildren();
        MAIN.drawImage(bottomlevelnewborder, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
    }

    undergroundHitbox.addHitbox(new Hitbox(
        {
            x: undergroundHitbox.boundingBox.width * 0.26,
            y: undergroundHitbox.boundingBox.height * 0.58,
            width: undergroundHitbox.boundingBox.width * 0.4,
            height: undergroundHitbox.boundingBox.height * 0.4
        },
        {
            onmousedown: () => openUi(OilPumpWindow)
        }
    )).render = function ()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            MAIN.drawImage(
                getOilRigAsset(),
                !isOilRigFull() ? 200 * getAnimationFrameIndex(4, 2) : 0,
                0,
                200,
                Oil_Extractor.height,
                coords.x,
                coords.y,
                this.boundingBox.width,
                this.boundingBox.height
            );
        }

    undergroundHitbox.addHitbox(new Hitbox(
        {
            x: undergroundHitbox.boundingBox.width * -0.025,
            y: undergroundHitbox.boundingBox.height * 0.25,
            width: undergroundHitbox.boundingBox.width * 0.5,
            height: undergroundHitbox.boundingBox.height * 0.35
        },
        {
            onmousedown: () => openUi(GemForgeWindow)
        }
    )).render = function ()
        {
            var coords = this.getGlobalCoordinates(0, 0);
            var forgeAsset = undergroundcitygemassembler;
            if(gemForgeStructure.level == 2)
            {
                forgeAsset = undergroundcitygemassembler2;
            }
            else if(gemForgeStructure.level == 3)
            {
                forgeAsset = undergroundcitygemassembler3;
            }
            else if(gemForgeStructure.level == 4)
            {
                forgeAsset = undergroundcitygemassembler4;
            }
            else if(gemForgeStructure.level == 5)
            {
                forgeAsset = undergroundcitygemassembler5;
            }
            else if(gemForgeStructure.level >= 6)
            {
                forgeAsset = undergroundcitygemassembler6;
            }

            MAIN.drawImage(
                forgeAsset,
                (forgeAsset.width / 4) * getAnimationFrameIndex(4, 3),
                0,
                forgeAsset.width / 4,
                forgeAsset.height,
                coords.x,
                coords.y * 1.025,
                this.boundingBox.width,
                this.boundingBox.height
            );

            MAIN.drawImage(
                gemFloat,
                0,
                0,
                gemFloat.width,
                gemFloat.height,
                coords.x,
                coords.y + (this.boundingBox.height * 0.95),
                this.boundingBox.width,
                this.boundingBox.height * 0.3
            );
        }

    undergroundHitbox.addHitbox(new Hitbox(
        {
            x: undergroundHitbox.boundingBox.width * 0.72,
            y: undergroundHitbox.boundingBox.height * 0.24,
            width: undergroundHitbox.boundingBox.width * 0.27,
            height: undergroundHitbox.boundingBox.height * 0.68
        },
        {
            onmousedown: () => openUi(WeaponCraftingWindow)
        }
    )).render = function ()
        {
            var coords = this.parent.getGlobalCoordinates(0, 0);
            MAIN.drawImage(
                undergroundcitystatue,
                coords.x,
                coords.y,
                this.parent.boundingBox.width,
                this.parent.boundingBox.height
            );
        }

    worldConfig.specialLevels.underground.hitbox = undergroundHitbox;

    // CORE

    var coreHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.core.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                openUi(PitWindow, null);
            }
        }
    )
    coreHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage = lavachasm;
        MAIN.save();
        if(isCoreWarped)
        {
            MAIN.filter = 'hue-rotate(' + (130 + (oscillate(numFramesRendered, 40) * 50)) + 'deg) grayscale(67%) saturate(160%)';
        }
        else if(isCoreBlessed)
        {
            MAIN.filter = ' grayscale(75%) brightness(' + (150 + (oscillate(numFramesRendered, 40) * 50)) + '%) saturate(160%)';
        }
        MAIN.drawImage(levelImage, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.restore();
        MAIN.drawImage(coreEdges, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
    }
    worldConfig.specialLevels.core.hitbox = coreHitbox;

    // EARTH END

    var earthEndHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.earthEnd.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.earthEnd.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    earthEndHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        MAIN.drawImage(EndOfWorld, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        if(depth >= 1032 || decimalDepth() < 1000.1)
        {
            drawImageRot(
                MAIN,
                idleFarmer,
                getAnimationFrameIndex(6, 5) * (idleFarmer.width / 6),
                0,
                (idleFarmer.width / 6),
                idleFarmer.height,
                coords.x + worldConfig.levelWidth * 0.23,
                coords.y + this.boundingBox.height * 0.105,
                worldConfig.levelHeight * 0.7,
                worldConfig.levelHeight * 0.7,
                180
            );
        }
        else
        {
            drawImageRot(
                MAIN,
                shockedFarmer,
                getAnimationFrameIndex(2, 5) * (shockedFarmer.width / 2),
                0,
                (shockedFarmer.width / 2),
                shockedFarmer.height,
                coords.x + worldConfig.levelWidth * 0.23,
                coords.y + this.boundingBox.height * 0.105,
                worldConfig.levelHeight * 0.7,
                worldConfig.levelHeight * 0.7,
                180
            );
        }
        this.renderChildren();
    }

    var earthLaunchButton = new Button(
        upgradeb, _("LAUNCH"), "28px Verdana", "#000000",
        {
            x: worldConfig.levelWidth * 0.2,
            y: worldConfig.levelHeight * 1.25,
            width: worldConfig.levelWidth * 0.6,
            height: worldConfig.levelHeight * 0.5
        },
        {
            onmouseenter: function ()
            {
                if(!isLaunching && isWaitingForLiftoff())
                {
                    document.body.style.cursor = 'pointer';
                }
            },
            onmousedown: function ()
            {
                if(!isLaunching && isWaitingForLiftoff())
                {
                    isLaunching = true;
                    newNews("> 5 <");
                    if(!mutebuttons) {takeoffCountdownAudio.play();}
                    setTimeout(function () {newNews("> 4 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 1000);
                    setTimeout(function () {newNews("> 3 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 2000);
                    setTimeout(function () {newNews("> 2 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 3000);
                    setTimeout(function () {newNews("> 1 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 4000);
                    setTimeout(function ()
                    {
                        newNews("> 0 <");
                        if(!mutebuttons) {takeoffCountdownAudio.play();}
                        hasLaunched++;
                        isLaunching = false;
                    }, 5000);

                    //xCoordinateOfLevel + (this.boundingBox.width/uiScaleX)*.74, yCoordinateOfLevelTop - (this.boundingBox.height/uiScaleY)*.18, (this.boundingBox.width/uiScaleX)*.1, (this.boundingBox.height/uiScaleY)*.04
                }
            },
            onmouseexit: function ()
            {

            }
        },
        null,
        "launchButton",
        this
    );

    earthLaunchButton.isVisible = () => decimalDepth() >= 1000.9999 && depth < 1100 && hasLaunched == 0;
    earthLaunchButton.isEnabled = () => decimalDepth() >= 1000.9999 && depth < 1100 && hasLaunched == 0;

    earthEndHitbox.addHitbox(earthLaunchButton);

    worldConfig.specialLevels.earthEnd.hitbox = earthEndHitbox;

    // SPACE

    var spaceHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.space.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.space.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    spaceHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        MAIN.drawImage(blueSky, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(blueSky2, coords.x, coords.y + this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(skySpaceTransition, coords.x, coords.y + 2 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars, coords.x, coords.y + 3 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars2, coords.x, coords.y + 4 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars3, coords.x, coords.y + 5 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
    }
    spaceHitbox.maxDistanceFromViewportToRender = 28;
    worldConfig.specialLevels.space.hitbox = spaceHitbox;

    // MOON CITY

    var moonTopCityHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.moonTopCity.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.moonTopCity.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    moonTopCityHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage = lunarBase;
        MAIN.drawImage(levelImage, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.save();
        MAIN.fillStyle = "#000000";
        MAIN.font = "14px KanitM";
        MAIN.textBaseline = "top";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("SELL"),
            coords.x + Math.ceil(this.boundingBox.width * 0.15),
            coords.y + Math.ceil(this.boundingBox.height * 0.38),
            Math.ceil(this.boundingBox.width * 0.15),
            Math.ceil(this.boundingBox.height * 0.06),
            "center",
            0.01
        )
        if(language == "german") MAIN.font = "12px KanitM";
        if(language == "spanish") MAIN.font = "12px KanitM";
        if(language == "japanese") MAIN.font = "12px KanitM";
        if(language == "french") MAIN.font = "12px KanitM";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("HIRE"),
            coords.x + Math.ceil(this.boundingBox.width * 0.37),
            coords.y + Math.ceil(this.boundingBox.height * 0.66),
            Math.ceil(this.boundingBox.width * 0.15),
            Math.ceil(this.boundingBox.height * 0.06),
            "center",
            0.01
        )
        MAIN.font = "14px KanitM";
        if(language == "french") MAIN.font = "13px KanitM";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("CRAFT"),
            coords.x + Math.ceil(this.boundingBox.width * 0.78),
            coords.y + Math.ceil(this.boundingBox.height * 0.65),
            Math.ceil(this.boundingBox.width * 0.15),
            Math.ceil(this.boundingBox.height * 0.06),
            "center",
            0.01
        )

        MAIN.fillStyle = "#864B11";
        fillTextWrapWithHeightLimit(
            MAIN,
            tickets,
            coords.x + Math.ceil(this.boundingBox.width * 0.865),
            coords.y + Math.ceil(this.boundingBox.height * 0.473),
            Math.ceil(this.boundingBox.width * 0.07),
            Math.ceil(this.boundingBox.height * 0.022),
            "left",
            0.01
        )

        MAIN.restore();
    }

    moonTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.0,
            y: topCityHitbox.boundingBox.height * 0.37,
            width: topCityHitbox.boundingBox.width * 0.52,
            height: topCityHitbox.boundingBox.height * 0.25
        },
        {
            onmousedown: function ()
            {
                openUi(SellWindow, null, MOON_INDEX);
            }
        }
    ))

    moonTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.33,
            y: topCityHitbox.boundingBox.height * 0.64,
            width: topCityHitbox.boundingBox.width * 0.33,
            height: topCityHitbox.boundingBox.height * 0.27
        },
        {
            onmousedown: function ()
            {
                openUi(HireWindow, null, MOON_INDEX);
            }
        }
    ))

    moonTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.75,
            y: topCityHitbox.boundingBox.height * 0.64,
            width: topCityHitbox.boundingBox.width * 0.25,
            height: topCityHitbox.boundingBox.height * 0.26
        },
        {
            onmousedown: function ()
            {
                openUi(CraftingWindow);
            }
        }
    ))

    moonTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.68,
            y: topCityHitbox.boundingBox.height * 0.37,
            width: topCityHitbox.boundingBox.width * 0.32,
            height: topCityHitbox.boundingBox.height * 0.23
        },
        {
            onmousedown: function ()
            {
                openUi(PurchaseWindow);
            }
        }
    ));

    worldConfig.specialLevels.topCity.hitbox = topCityHitbox;

    worldConfig.specialLevels.moonTopCity.hitbox = moonTopCityHitbox;

    // MOON TRADING POST

    var moonTradingPostHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.moonTradingPost.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                if(tradingPostStructures[1].level == 0)
                {
                    var craftingWindow = openUi(CraftingWindow, null, 1);
                    if(craftingWindow)
                    {
                        craftingWindow.openTab(1);
                        craftingWindow.selectedBlueprint = getBlueprintById(3, 5);
                        craftingWindow.initializeCraftingPane();
                    }
                }
                else
                {
                    openUi(TradeWindow, null, 1);
                }
            }
        }
    )
    moonTradingPostHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage;
        if(tradingPostStructures[1].level == 0)
        {
            levelImage = tradeConfig.tradingPosts[1].unbuiltImage;
        }
        else
        {
            levelImage = tradeConfig.tradingPosts[1].image;
        }
        MAIN.drawImage(levelImage, coords.x, coords.y * .995, this.boundingBox.width, this.boundingBox.height * 1.005);
    }
    moonTradingPostHitbox.addHitbox(new EasyHintArrow(
        "left",
        function ()
        {
            var trades = getTradesForWorld(1);
            return isTradeAvailable(trades[1]) && !tradeConfig.tradingPosts[1].playerHasSeenNewTrade
        },
        -0.45
    ));
    worldConfig.specialLevels.moonTradingPost.hitbox = moonTradingPostHitbox;

    // REACTOR

    var reactorHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.reactor.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.reactor.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                openUi(ReactorWindow)
            }
        }
    )
    reactorHitbox.render = function ()
    {
        // FIX THIS
        var coords = this.getGlobalCoordinates(0, 0);
        var reactorWidth = 0;
        var reactorHeight = 0;
        var reactorHeightOffset = 0;

        if(reactorStructure.level == 1)
        {
            reactorAsset = reactor1;
            reactorWidth = .65;
            reactorHeight = .35;
            reactorHeightOffset = worldConfig.levelHeight * 0.74;
        }
        else if(reactorStructure.level == 2)
        {
            reactorAsset = reactor2;
            reactorWidth = .65;
            reactorHeight = .45;
            reactorHeightOffset = worldConfig.levelHeight * 0.48;
        }
        else if(reactorStructure.level == 3)
        {
            reactorAsset = reactor3;
            reactorWidth = .8;
            reactorHeight = .5;
            reactorHeightOffset = worldConfig.levelHeight * .32;
        }
        else if(reactorStructure.level == 4)
        {
            reactorAsset = reactor4;
            reactorWidth = .8;
            reactorHeight = .5;
            reactorHeightOffset = worldConfig.levelHeight * .32;
        }
        else if(reactorStructure.level >= 5)
        {
            reactorAsset = reactor5;
            reactorWidth = 1;
            reactorHeight = .6;
            reactorHeightOffset = worldConfig.levelHeight * .05;
        }
        var reactorFrameWidth = reactorAsset.width / 4;


        MAIN.drawImage(reactor_level, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);

        var reactorRenderWidth = Math.floor(mainw * .724 * reactorWidth);
        var reactorRenderHeight = Math.floor(mainh * .178 * 2 * reactorHeight);
        var xOffset = this.boundingBox.width / 2 - reactorRenderWidth / 2;

        MAIN.drawImage(
            reactorAsset,
            reactorFrameWidth * getAnimationFrameIndex(4, 5),
            0,
            reactorFrameWidth,
            reactorAsset.height,
            coords.x + xOffset,
            coords.y + reactorHeightOffset,
            reactorRenderWidth,
            reactorRenderHeight
        );
    }
    worldConfig.specialLevels.reactor.hitbox = reactorHitbox;

    // BUFF LAB

    var buffLabHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.buffLab.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {
            onmousedown: function ()
            {
                openUi(BuffLabWindow);
            }
        }
    )
    buffLabHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        MAIN.drawImage(lunarbackground, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.drawImage(lab_bg, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.drawImage(
            lab1,
            (lab1.width / 4) * getAnimationFrameIndex(4, 2),
            0,
            lab1.width / 4,
            lab1.height,
            coords.x,
            coords.y,
            this.boundingBox.width,
            this.boundingBox.height
        );
    }
    worldConfig.specialLevels.buffLab.hitbox = buffLabHitbox;

    // SPACE 2

    var spaceHitbox2 = new NewWorldEntityHitbox(
        worldConfig.specialLevels.space2.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.space.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    spaceHitbox2.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        MAIN.drawImage(spaceWithStars4, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars2, coords.x, coords.y + this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars5, coords.x, coords.y + 2 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars5, coords.x, coords.y + 3 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars5, coords.x, coords.y + 4 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
        MAIN.drawImage(spaceWithStars6, coords.x, coords.y + 5 * this.boundingBox.height / 6, this.boundingBox.width, this.boundingBox.height / 6);
    }
    spaceHitbox2.maxDistanceFromViewportToRender = 28;
    worldConfig.specialLevels.space2.hitbox = spaceHitbox2;

    // MOON END

    var moonEndHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.moonEnd.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.moonEnd.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    moonEndHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        MAIN.drawImage(EndOfMoon, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        this.renderChildren();
    }
    worldConfig.specialLevels.moonEnd.hitbox = moonEndHitbox;

    var moonLaunchButton = new Button(
        upgradeb, _("LAUNCH"), "28px Verdana", "#000000",
        {
            x: worldConfig.levelWidth * 0.2,
            y: worldConfig.levelHeight * 1.25,
            width: worldConfig.levelWidth * 0.6,
            height: worldConfig.levelHeight * 0.5
        },
        {
            onmouseenter: function ()
            {
                if(!isLaunching && isWaitingForLiftoff())
                {
                    document.body.style.cursor = 'pointer';
                }
            },
            onmousedown: function ()
            {
                if(!isLaunching && isWaitingForLiftoff())
                {
                    isLaunching = true;
                    newNews("> 5 <");
                    if(!mutebuttons) {takeoffCountdownAudio.play();}
                    setTimeout(function () {newNews("> 4 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 1000);
                    setTimeout(function () {newNews("> 3 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 2000);
                    setTimeout(function () {newNews("> 2 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 3000);
                    setTimeout(function () {newNews("> 1 <"); if(!mutebuttons) {takeoffCountdownAudio.play();} }, 4000);
                    setTimeout(function ()
                    {
                        newNews("> 0 <");
                        if(!mutebuttons) {takeoffCountdownAudio.play();}
                        hasLaunched++;
                        isLaunching = false;
                    }, 5000);
                }
            }
        },
        null,
        "launchButton",
        this
    );

    moonLaunchButton.isVisible = () => decimalDepth() >= 1782.9999 && depth < 1882 && hasLaunched == 1;
    moonLaunchButton.isEnabled = () => decimalDepth() >= 1782.9999 && depth < 1882 && hasLaunched == 1;

    moonEndHitbox.addHitbox(moonLaunchButton);

    // TITAN CITY

    var titanTopCityHitbox = new NewWorldEntityHitbox(
        worldConfig.specialLevels.titanTopCity.depth,
        {
            x: worldConfig.leftBound,
            y: 0,
            height: worldConfig.specialLevels.titanTopCity.height * worldConfig.levelHeight,
            width: worldConfig.levelWidth
        },
        {}
    )
    titanTopCityHitbox.render = function ()
    {
        var coords = this.getGlobalCoordinates(0, 0);
        var levelImage = titanBase;
        MAIN.drawImage(levelImage, coords.x, coords.y, this.boundingBox.width, this.boundingBox.height);
        MAIN.save();
        MAIN.fillStyle = "#000000";
        MAIN.font = "14px KanitM";
        MAIN.textBaseline = "top";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("SELL"),
            coords.x + Math.ceil(this.boundingBox.width * 0.15),
            coords.y + Math.ceil(this.boundingBox.height * 0.38),
            Math.ceil(this.boundingBox.width * 0.16),
            Math.ceil(this.boundingBox.height * 0.06),
            "center",
            0.01
        )
        if(language == "german") MAIN.font = "12px KanitM";
        if(language == "spanish") MAIN.font = "12px KanitM";
        if(language == "japanese") MAIN.font = "12px KanitM";
        if(language == "french") MAIN.font = "12px KanitM";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("HIRE"),
            coords.x + Math.ceil(this.boundingBox.width * 0.37),
            coords.y + Math.ceil(this.boundingBox.height * 0.66),
            Math.ceil(this.boundingBox.width * 0.15),
            Math.ceil(this.boundingBox.height * 0.06),
            "center",
            0.01
        )
        MAIN.font = "14px KanitM";
        if(language == "french") MAIN.font = "13px KanitM";
        fillTextWrapWithHeightLimit(
            MAIN,
            _("CRAFT"),
            coords.x + Math.ceil(this.boundingBox.width * 0.78),
            coords.y + Math.ceil(this.boundingBox.height * 0.66),
            Math.ceil(this.boundingBox.width * 0.17),
            Math.ceil(this.boundingBox.height * 0.06),
            "center",
            0.01
        )
        MAIN.restore();
    }

    titanTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.0,
            y: topCityHitbox.boundingBox.height * 0.37,
            width: topCityHitbox.boundingBox.width * 0.52,
            height: topCityHitbox.boundingBox.height * 0.25
        },
        {
            onmousedown: function ()
            {
                openUi(SellWindow, null, MOON_INDEX);
            }
        }
    ))

    titanTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.33,
            y: topCityHitbox.boundingBox.height * 0.64,
            width: topCityHitbox.boundingBox.width * 0.33,
            height: topCityHitbox.boundingBox.height * 0.27
        },
        {
            onmousedown: function ()
            {
                openUi(HireWindow, null, TITAN_INDEX);
            }
        }
    ))

    titanTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.75,
            y: topCityHitbox.boundingBox.height * 0.64,
            width: topCityHitbox.boundingBox.width * 0.25,
            height: topCityHitbox.boundingBox.height * 0.26
        },
        {
            onmousedown: function ()
            {
                openUi(CraftingWindow);
            }
        }
    ))

    titanTopCityHitbox.addHitbox(new Hitbox(
        {
            x: topCityHitbox.boundingBox.width * 0.68,
            y: topCityHitbox.boundingBox.height * 0.37,
            width: topCityHitbox.boundingBox.width * 0.32,
            height: topCityHitbox.boundingBox.height * 0.23
        },
        {
            onmousedown: function ()
            {
                openUi(PurchaseWindow);
            }
        }
    ));

    worldConfig.specialLevels.titanTopCity.hitbox = titanTopCityHitbox;
}

initializeLevelHitboxes();
var clickedCompress = false;