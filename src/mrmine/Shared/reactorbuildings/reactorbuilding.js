class ReactorBuilding
{
    isActive = true;
    level = 1;
    baseEnergyUsePerSecond;

    constructor(level)
    {
        this.level = level;
        // Call this.update() once per second
        updatePerSecond.addCallback(this.update.bind(this));
    }

    update() { }

    useEnergy()
    {
        var energyUsePerSecond = this.getEnergyUsePerSecond();
        if(worldResources[NUCLEAR_ENERGY_INDEX].numOwned >= energyUsePerSecond)
        {
            worldResources[NUCLEAR_ENERGY_INDEX].numOwned -= energyUsePerSecond;
            return true;
        }
        else
        {
            worldResources[NUCLEAR_ENERGY_INDEX].numOwned = 0;
            return false;
        }
    }

    getEnergyUsePerSecond()
    {
        return this.baseEnergyUsePerSecond;
    }
}


//######################## HELPERS #########################

function loadAllReactorBuildings()
{
    buffLab = loadReactorBuilding(BuffLab, buffLab, isBuffLabBuilt, buffLabLevel, isBuffLabActive);
}

function loadReactorBuilding(buildingClass, instanceVar, isBuilt, buildingLevel, isActive, ...params)
{
    if(isBuilt && (typeof (instanceVar) != 'object' || Object.keys(instanceVar).length == 0))
    {
        return new buildingClass(buildingLevel, isActive, ...params);
    }
    return instanceVar;
}