/*
 * @Project: FiveM Tools
 * @Authors: Samuelds, THEJean_Kevin
 * @License: GNU General Public License v3.0
 * @Source: https://github.com/FivemTools/ft_players
*/

/**
 * Creates a new Vehicle.
 * @example
 * let vehicle = new Vehicle();
 */
class Vehicle extends Entity {

    constructor(){
        super();
        this.windowsIndex = [
            'window_lf',
            'window_rf',
            'window_lr',
            'window_rr'
        ];
    }

    /**
     * @description Get body health
     * @return {number}
     */
    get bodyHealth() {
        this._bodyHealth = GetVehicleBodyHealth(this.id);
        return this._bodyHealth;
    }

    /**
     * @description Set body health
     * @param {number} amount
     * @return {void}
     */
    set bodyHealth(amount) {
        this._bodyHealth = Number(amount);
        SetVehicleBodyHealth(this.id, Number(amount));
    }

    /**
     * @description Get class
     * @return {string}
     */
    get class() {
        if (this._class === undefined) {
            this._class = GetVehicleClass(this.id);
        }
        return this._class;
    }

    /**
     * @description Get colours
     * @returns {object}
     */
    get colours() {
        const colours = GetVehicleColours(this.id);
        this._colours = { primary: colours[0], secondary: colours[1] };
        return this._colours;
    }

    /**
     * @description Set colours
     * @param {object} colours
     * @return {void}
     */
    set colours(colours) {
        this._colours = colours;
        SetVehicleColours(this.id, colours.primary, colours.secondary);
    }

    /**
     * @description Get custom tires
     * @return {boolean}
     */
    get customTires() {
        return this._customTires;
    }

    /**
     * @description Set custom tires
     * @param value
     */
    set customTires(value) {
        this._customTires = value;
    }

    /**
     * @description Get dirt level
     * @returns {number}
     */
    get dirtLevel() {
        this._dirtLevel = GetVehicleDirtLevel(this.id);
        return this._dirtLevel;
    }

    /**
     * @description Set dirt level
     * @param {number} level
     * @return {void}
     */
    set dirtLevel(level) {
        this._dirtLevel = Number(level);
        SetVehicleDirtLevel(this.id, Number(level));
    }

    /**
     * @description Return all doors
     * @{*} {object}
     */
    get doors() {
        return this._doors;
    }

    /**
     * @description Set all doors
     * @param {object} values
     */
    set doors(values) {
        this._doors = values;
    }

    /**
     * @description Get engine health
     * @return {number}
     */
    get engineHealth() {
        this._engineHealth = GetVehicleEngineHealth(this.id);
        return this._engineHealth;
    }

    /**
     * @description Set engine health
     * @param {number} amount
     * @return {void}
     */
    set engineHealth(amount) {
        this._engineHealth = Number(amount);
        SetVehicleEngineHealth(this.id, Number(amount));
    }

    /**
     * @description Get engine is running
     * @return {boolean}
     */
    get engineIsRunning() {
        this._engineIsRunning = GetIsVehicleEngineRunning(this.id);
        return this._engineIsRunning;
    }

    /**
     * @description Set engine is running
     * @param {boolean} status
     * @return {void}
     */
    set engineIsRunning(status) {
        this._engineIsRunning = Boolean(status);
        SetVehicleEngineOn(this.id, this._engineIsRunning, true, true);
    }

    /**
     * @description Get extra colours
     * @returns {object}
     */
    get extraColours() {
        const extraColours = GetVehicleExtraColours(this.id);
        this._extraColours = { pearlescent: extraColours[0], wheel: extraColours[1] };
        return this._extraColours;
    }

    /**
     * @description Set extra colours
     * @param {object} extraColours
     * @return {void}
     */
    set extraColours(extraColours) {
        this._extraColours = extraColours;
        SetVehicleExtraColours(this.id, extraColours.pearlescent, extraColours.wheel);
    }

    /**
     * @description Get Extras
     * @return {object}
     */
    get extras() {
        this._extras = {};
        for (let index = 0; index < 14; index++) {
            this._extras[index] = Boolean(this.IsVehicleExtraTurnedOn(index));
        }
        return this._extras;
    }

    /**
     * @description Set extras
     * @param {object} values
     * @return {void}
     */
    set extras(values) {
        this._extras[values.extra] = values.state;
        SetVehicleExtra(this.id, values.extra, values.state);
    }

    /**
     * @description Get fuel level
     * @{*} {number}
     */
    get fuelLevel() {
        this._fuelLevel = GetVehicleFuelLevel(this.id);
        return this._fuelLevel;
    }

    /**
     * @description Set fuel level
     * @param {number} amount
     * @return {void}
     */
    set fuelLevel(amount) {
        this._fuelLevel = Number(amount);
        SetVehicleFuelLevel(this.id, this._fuelLevel);
    }

    /**
     * @description Set light multiplier
     * @param {number} amount
     * @return {void}
     */
    set lightMultiplier(amount) {
        this._lightMultiplier = Number(amount);
        SetVehicleLightMultiplier(this.id, this._lightMultiplier);
    }

    /**
     * @description Get lights
     * @return {object}
     */
    get lights() {
        const state = GetVehicleLightsState(this.id);
        this._lights = state[1] + state[2];
        return this._lights;
    }

    /**
     * TODO
     */
    /*set lights(state) {
        this._lights = state;
        if (this._lights === 2) {
            SetVehicleLights(this.id, 2);
            SetVehicleFullbeam(this.id, true);
            this.lightsMode = 0;
        } else if (this._lights === 1) {
            SetVehicleLights(this.id, 2);
            this.lightsMode = 0;
        } else {
            SetVehicleLights(this.id, 0);
        }
    }*/

    /**
     * @description Set lights mode
     * @param {number} amount
     * @return {void}
     */
    set lightsMode(amount) {
        this._lightsMode = Number(amount);
        SetVehicleLightsMode(this.id, this._lightsMode);
    }

    /**
     * @description Get livery
     * @return {number}
     */
    get livery() {
        this._livery = GetVehicleLivery(this.id);
        return this._livery;
    }

    /**
     * @description Set livery
     * @param {number} value
     * @return {void}
     */
    set livery(value) {
        this._livery = value;
        SetVehicleLivery(this.id, value);
    }

    /**
     * @description Get look status
     * @{*} {boolean}
     */
    get lookStatus() {
        this._lookStatus = GetVehicleDoorLockStatus(this.id);
        return this._lookStatus;
    }

    /**
     * @description Set look status
     * @param status
     */
    set lookStatus(status) {
        this._lookStatus = Boolean(status);
        SetVehicleDoorsLocked(this.id, Boolean(status));
    }

    /**
     * @description Get mod color 1
     * @returns {object}
     */
    get modColor1() {
        const color = GetVehicleModColor_1(this.id);
        this._modColor1 = { paintType: color[0], color: color[1], pearlescent: color[2] };
        return this._modColor1;
    }

    /**
     * @description Set mod color 1
     * @param {object} color
     * @return {void}
     */
    set modColor1(color) {
        this._modColor1 = color;
        SetVehicleModColor_1(this.id, color.paintType, color.color, color.pearlescent);
    }

    /**
     * @description Get mod color 2
     * @return {object}
     */
    get modColor2() {
        const color = GetVehicleModColor_2(this.id);
        this._modColor2 = { paintType: color[0], color: color[1] };
        return this._modColor2;
    }

    /**
     * @description Set mod color 2
     * @param {object} color
     * @return {void}
     */
    set modColor2(color) {
        this._modColor2 = color;
        SetVehicleModColor_2(this.id, color.paintType, color.color);
    }

    /**
     * @description Get neon colour
     * @return {object}
     */
    get neonColour() {
        const colours = GetVehicleNeonLightsColour(this.id);
        this._neonColour = { red: colours[0], green: colours[1], blue: colours[2] };
        return this._neonColour;
    }

    /**
     * @description Set neon colour
     * @param {object} colour
     */
    set neonColour(colour) {
        this._neonColour = colour;
        SetVehicleNeonLightsColour(this.id, colour.red, colour.green, colour.blue);
    }

    /**
     * @description Get petrol tank health
     * @return {number}
     */
    get petrolTankHealth() {
        this._petrolTankHealth = GetVehiclePetrolTankHealth(this.id);
        return this._petrolTankHealth;
    }

    /**
     * @description Set petrol tank health
     * @param {number} amount
     * @return {void}
     */
    set petrolTankHealth(amount) {
        this._petrolTankHealth = Number(amount);
        SetVehiclePetrolTankHealth(this.id, this._petrolTankHealth);
    }

    /**
     * @description Get plate style
     * @returns {number}
     */
    get plateStyle() {
        this._plateStyle = GetVehicleNumberPlateTextIndex(this.id);
        return this._plateStyle;
    }

    /**
     * @description Set plate style
     * @param style
     * @return {void}
     */
    set plateStyle(style) {
        this._plateStyle = Number(style);
        SetVehicleNumberPlateTextIndex(this.id, this._plateStyle);
    }

    /**
     * @description Get plate text
     * @returns {string}
     */
    get plateText() {
        this._plateText = GetVehicleNumberPlateText(this.id);
        return this._plateText;
    }

    /**
     * @description Set plate text
     * @param {string} text
     * @return {void}
     */
    set plateText(text) {
        this._plateText = text;
        SetVehicleNumberPlateText(this.id, this._plateText);
    }

    /**
     * @description Get primary colour
     * @returns {object}
     */
    get primaryColour() {
        const color = GetVehicleCustomPrimaryColour(this.id);
        this._primaryColour = {red: color[0], green: color[1], blue: color[2]};
        return this._primaryColour;
    }

    /**
     * @description Set primary colour
     * @param {object} colour
     * @return {void}
     */
    set primaryColour(colour) {
        this._primaryColour = colour;
        SetVehicleCustomPrimaryColour(this.id, colour.red, colour.green, colour.blue);
    }

    /**
     * @description Get secondary colour
     * @returns {object}
     */
    get secondaryColour() {
        const colour = GetVehicleCustomSecondaryColour(this.id);
        this._secondaryColour = {red: colour[0], green: colour[1], blue: colour[2]};
        return this._secondaryColour;
    }

    /**
     * @description Set secondary colour
     * @param {object} colour
     * @return {void}
     */
    set secondaryColour(colour) {
        this._secondaryColour = colour;
        SetVehicleCustomSecondaryColour(this.id, colour.red, colour.green, colour.blue);
    }

    /**
     * @description Get is siren is On
     * @returns {boolean}
     */
    get siren() {
        this._siren = IsVehicleSirenOn(this.id);
        return this._siren;
    }

    /**
     * @description Get is siren is On
     * @param {boolean} status
     * @returns {void}
     */
    set siren(status) {
        this._siren = status;
        SetVehicleSiren(this.id, status);
    }

    /**
     * @description Get traier
     * @return {number}
     */
    get trailer() {
        const trailer = GetVehicleTrailerVehicle(this.id);
        this._trailer = trailer[1];
        return this._trailer;
    }

    /**
     * @description Set trailler
     * @param {number} trailerId
     * @return {void}
     */
    set trailer(trailerId) {
        this._trailer = trailerId;
        AttachVehicleToTrailer(this.id, trailerId);
    }

    /**
     * @description Get tyre smoke color
     * @return {object}
     */
    get tyreSmokeColor() {
        const color = GetVehicleTyreSmokeColor(this.id);
        this._tyreSmoke = { red: color[0], green: color[1], blue: color[2] };
        return this._tyreSmoke;
    }

    /**
     * @description Set tyre smoke color
     * @param {object} color
     */
    set tyreSmokeColor(color) {
        this._tyreSmoke = color;
        SetVehicleTyreSmokeColor(this.id, color.red, color.green, color.blue);
    }

    /**
     * @description Get wheel type
     * @returns {number}
     */
    get wheelType() {
        this._wheelType = GetVehicleWheelType(this.id);
        return this._wheelType;
    }

    /**
     * @description Set wheel type
     * @param {number} type
     * @return {number}
     */
    set wheelType(type) {
        this._wheelType = type;
        SetVehicleWheelType(this.id, type);
    }

    /**
     * @description Get window tint
     * @return {number}
     */
    get windowTint() {
        this._windowTint = GetVehicleWindowTint(this.id);
        return this._windowTint;
    }

    /**
     * @description Set window tint
     * @param value
     */
    set windowTint(value) {
        this._windowTint = value;
        SetVehicleWindowTint(this.id, value);
    }

    /**
     * @description Get all door state
     * @return {object}
     */
    GetAllDoorState() {
        this._doors = {};
        for (let index = 0; index < this.GetNumberDoors(); index++) {
            this.GetDoorState(index);
        }
        return this._doors;
    }

    /**
     * @description Set multiple door state
     * @param {object} states
     * @return {void}
     */
    SetAllDoorsState(states) {
        for (let index in states) {
            this.SetDoorState(index, states[index]);
        }
    }

    /**
     * @description Get all mods
     * @return {object}
     */
    GetAllMod() {
        for (let index = 0; index < 49; index++) {
            this.GetMod(index);
        }
        return this._mod;
    }

    /**
     * @description Set multiple mods
     * @param {object} status
     * @return {void}
     */
    SetAllMod(status) {
        for (let index in status) {
            this.SetMod(index, status[index]);
        }
    }

    /**
     * @description Get all neon light
     * @return {object}
     */
    GetAllNeonLight() {
        for (let index = 0; index < 3; index++) {
            this.GetNeonLight(index);
        }
        return this._neonLight;
    }

    /**
     * @description Set multiple neon light
     * @param {object} status
     * @return {void}
     */
    SetAllNeonLight(status) {
        for (let index in status) {
            this.SetNeonLight(index, status[index]);
        }
    }

    /**
     * @description Get all tyre burst bone
     * @return {object}
     */
    GetAllTyreBurst() {
        this._tyreBurst = {};

        const tireIndex = {
            "wheel_lf": 0,
            "wheel_rf": 1,
            "wheel_lm1": 2,
            "wheel_rm1": 3,
            "wheel_lr": 4,
            "wheel_rr": 5,
            "wheel_lm2": 45,
            "wheel_rm2": 47,
            "wheel_lm3": 46,
            "wheel_rm3": 48,
        };

        for (let index in tireIndex) {
            if (GetEntityBoneIndexByName(this.id, index) !== -1 && IsVehicleTyreBurst(this.id, tireIndex[index], false)) {
                this._tyreBurst[tireIndex[index]] = true;
            }
        }

        return this._tyreBurst;
    }

    /**
     * @description Set tyre burst
     * @param {number} index
     * @param {boolean} state
     * @param {number} p3
     */
    SetTyreBurst(index, state, p3 = 1000.0) {
        if (this._tyreBurst === undefined) {
            this._tyreBurst = {};
        }
        SetVehicleTyreBurst(this.id, Number(index), Boolean(state), p3);
        this._tyreBurst[Number(index)] = Boolean(state);
    }

    /**
     * @description Get all window state
     * @return {object}
     */
    GetAllWindowState() {
        this.__windows = {};

        for (let index in this.windowsIndex) {
            this.GetWindowIsIntact(index);
        }

        return this.__windows;
    }

    /**
     * @description return door angle
     * @param {number} index
     * @return {number}
     */
    GetDoorAngleRatio(index) {
        return GetVehicleDoorAngleRatio(this.id, Number(index));
    }

    /**
     * @description Get door state
     * @param {number} index
     * @return {number}
     */
    GetDoorState(index) {
        if (this._doors === undefined) {
            this._doors = {};
        }

        let door;
        if (this.IsDoorDamaged(index)) {
            door = -1;
        } else {
            door = this.GetDoorAngleRatio(index);
        }

        this._doors[Number(index)] = door;
        return door;
    }

    /**
     * @description Set door state
     * @param {number} index
     * @param {number} state
     * @return {void}
     */
    SetDoorState(index, state) {
        if (this._doors === undefined) {
            this._doors = {};
        }

        if (Number(state) === -1) {
            this.SetDoorBroken(index, true);
        } else if (Number(state) === 0) {
            this.SetDoorShut(index, true);
        } else {
            this.SetDoorOpen(index, false, true);
            let self = this;
            setTimeout(function () {
                self.SetDoorLatched(index, false, true);
            }, 100);
        }
        this._doors[Number(index)] = state;
    }

    /**
     * @description Get specific mod
     * @param {number} index
     * @return {object}
     */
    GetMod(index) {
        if (this._mod === undefined) {
            this._mod = {};
        }

        if (index >= 17 && index <= 22) {
            this._mod[Number(index)] = Boolean(IsToggleModOn(this.id, Number(index)));
        } else {
            this._mod[Number(index)] = GetVehicleMod(this.id, Number(index));
        }
        return this._mod;
    }

    /**
     * @description Set specific mod
     * @param {number} type
     * @param {number} index
     * @return {void}
     */
    SetMod(type, index) {
        if (this._mod === undefined) {
            this._mod = {};
            SetVehicleModKit(this.id, 0);
        }

        if (this._customTires === undefined) {
            this._customTires = false;
        }

        // Convert string to number
        if (Number(type) >= 17 && Number(type) <= 22) {
            ToggleVehicleMod(this.id, Number(type), Boolean(index));
            this._mod[Number(type)] = Boolean(index);
        } else {
            SetVehicleMod(this.id, Number(type), Number(index), this._customTires);
            this._mod[Number(type)] = Number(index);
        }
    }

    /**
     * @description Get neon light
     * @param {number} index
     * @return {void}
     */
    GetNeonLight(index) {
        if (this._neonLight === undefined) {
            this._neonLight = {};
        }
        this._neonLight[index] = Boolean(IsVehicleNeonLightEnabled(this.id, index));
    }

    /**
     * @description Set neon light
     * @param {number} index
     * @param {boolean} state
     * @return {void}
     */
    SetNeonLight(index, state) {
        if (this._neonLight === undefined) {
            this._neonLight = {};
        }
        this._neonLight[Number(index)] = Boolean(state);
        SetVehicleNeonLightEnabled(this.id, Number(index), Boolean(state));
    }

    /**
     * @description Get number doors
     * @return {number}
     */
    GetNumberDoors() {
        if (this._maxDoors === undefined) {
            this._maxDoors = GetNumberOfVehicleDoors(this.id);
        }
        return this._maxDoors;
    }

    /**
     * @description return neon light is enabled
     * @param {number} index
     * @return {boolean}
     */
    IsNeonLightEnabled(index) {
        return Boolean(IsVehicleNeonLightEnabled(this.id, Boolean(index)));
    }

    /**
     * @description return if door id damaged
     * @param {number} index
     * @return {boolean}
     */
    IsDoorDamaged(index) {
        return IsVehicleDoorDamaged(this.id, Number(index));
    }

    /**
     * @description Is vehicle extra turned on
     * @param {number} index
     * @return {boolean}
     */
    IsVehicleExtraTurnedOn(index) {
        return IsVehicleExtraTurnedOn(this.id, index);
    }

    /**
     * @description Set door is broken
     * @param {number} index
     * @param {boolean} remove
     * @return {void}
     */
    SetDoorBroken(index, remove) {
        SetVehicleDoorBroken(this.id, Number(index), Boolean(remove));
        this._doors[Number(index)] = -1;
    }

    /**
     * @description Set door shut
     * @param {number} index
     * @param {boolean} instantly
     * @return {void}
     */
    SetDoorShut(index, instantly) {
        SetVehicleDoorShut(this.id, Number(index), Boolean(instantly));
        this._doors[Number(index)] = 0;
    }

    /**
     * @description Set door open
     * @param {number} index
     * @param {boolean} loose
     * @param {boolean} instantly
     * @return {void}
     */
    SetDoorOpen(index, loose, instantly) {
        SetVehicleDoorOpen(this.id, Number(index), Boolean(loose), Boolean(instantly));
    }

    /**
     * @description Set door control
     * @param {number} index
     * @param {number} speed
     * @param {number} angle
     * @return {void}
     */
    SetDoorControl(index, speed, angle) {
        SetVehicleDoorControl(this.id, Number(index), Number(speed), Number(angle));
    }

    /**
     * @description Set door control
     * @param {number} index
     * @param {boolean} force
     * @param {boolean} lock
     * @return {void}
     */
    SetDoorLatched(index, force, lock) {
        SetVehicleDoorLatched(this.id, Number(index), Boolean(force), Boolean(lock));
    }

    /**
     * @description Set multiple tyre burst
     * @param {object} states
     */
    SetAllTyreBurst(states) {
        for (let index in states) {
            this.SetTyreBurst(index, states[index]);
        }
    }



    /**
     * @description Get is widows is intact
     * @param {number} index
     * @returns {boolean}
     */
    GetWindowIsIntact(index) {
        if (this.__windows === undefined) {
            this.__windows = {};
        }

        const windowName = this.windowsIndex[index];
        if (GetEntityBoneIndexByName(this.id, windowName) !== -1) {
            this.__windows[windowName] = Boolean(IsVehicleWindowIntact(this.id, Number(index)));
            return this.__windows[windowName];
        } else {
            return false;
        }
    }

    /**
     * @description Smash window
     * @param {number} index
     * @return {void}
     */
    SmashWindow(index) {
        SmashVehicleWindow(this.id, Number(index));
        this.__windows[Number(index)] = false;
    }

    /**
     * @description Set multiple window state
     * @param {object} states
     */
    SetAllWindowState(states) {
        if (this.__windows === undefined) {
            this.__windows = {};
        }

        for (let window in states) {
            if (states[window] === false) {
                for (let index in this.windowsIndex) {
                    if (this.windowsIndex[index] === window) {
                        this.SmashWindow(index);
                        break;
                    }
                }
            }
        }
    }

    /**
     * @description Get vehicle id for ped
     * @param {number} pedId
     * @return {number}
     */
    GetVehiclePed(pedId) {
        return this.id = GetVehiclePedIsUsing(pedId);
    }

    /**
     * @description Get the ped on the seat
     * @param {Number} seat 
     * @returns {Ped}
     */
    GetPedOnSeat(seat){
        return new Ped(GetPedInVehicleSeat(this.id, seat))
    }

    /**
     * @description Spawn
     * @param {function} callback
     * @param {boolean} isNetwork
     * @param {boolean} thisScriptCheck
     * @return {void}
     */
    Spawn(callback, isNetwork = false, thisScriptCheck = false) {
        if (IsModelAVehicle(this._model)) {

            let waiting = 0;
            let self = this;
            RequestModel(this._model);
            let timer = setInterval(function () {
                if (HasModelLoaded(self._model)) {
                    clearInterval(timer);
                    self.id = CreateVehicle(self._model, self._coords.x, self._coords.y, self._coords.z, self._heading, isNetwork, thisScriptCheck);

                    const exclude = ["id", "_model", "_coords", "_heading", "_networkId", "_mod", "_neonLight", "_doors", "_tyreBurst", "__windows"];
                    for (let key in self) {
                        if (!exclude.includes(key)) {
                            self[key.substring(1)] = self[key];
                        }
                    }

                    if (self._mod !== undefined) {
                        SetVehicleModKit(self.id, 0);
                        self.SetAllMod(self._mod);
                    }

                    if (self._neonLight !== undefined) {
                        self.SetAllNeonLight(self._neonLight);
                    }

                    if (self._doors !== undefined) {
                        self.SetAllDoorsState(self._doors);
                    }

                    if (self._tyreBurst !== undefined) {
                        self.SetAllTyreBurst(self._tyreBurst);
                    }

                    if (self.__windows !== undefined) {
                        self.SetAllWindowState(self.__windows);
                    }

                    SetModelAsNoLongerNeeded(self._model);
                    callback(self.id);
                }

                if (waiting === 50) {
                    clearInterval(timer);
                    callback(false);
                }
                waiting++;
            }, 20);

        } else {
            callback(false);
        }
    }
}