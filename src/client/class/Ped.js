/*
 * @Project: FiveM Tools
 * @Authors: Samuelds, THEJean_Kevin
 * @License: GNU General Public License v3.0
 * @Source: https://github.com/FivemTools/ft_players
*/

/**
 * Creates a new Entity.
 * @example
 * let ped = new Ped();
 */
class Ped extends Entity {

    /**
     * @description Get ped id for player id
     * @param {number} playerId
     * @return {void}
     */
    GetPlayer(playerId) {
        this.id = GetPlayerPed(playerId);
    }

    /**
     * @description Set default component variation
     * @return {void}
     */
    SetDefaultComponentVariation() {
        SetPedDefaultComponentVariation(this.id);
    }

    /**
     * @description Set component variation on a ped
     * @param {number} componentId
     * @param {number} drawableId
     * @param {number} textureId
     * @return {void}
     */
    SetComponentVariation(componentId, drawableId, textureId) {
        SetPedComponentVariation(this.id, componentId, drawableId, textureId, this.GetPaletteVariation(componentId));
    }
    
    /**
     * @description Get the palette Variation on a component
     * @param {number} componentId
     * @return {number} between 0-3
     */
    GetPaletteVariation(componentId){
        return GetPedPaletteVariation(this.id, componentId)
    }

    /**
     * @description Get if ped play anim
     * @param {string} animDictionary
     * @param {string} animationName
     * @param {number} flag
     * @returns {boolean}
     * @constructor
     */
    IsPlayingAnim(animDictionary, animationName, flag = 3) {
        return IsEntityPlayingAnim(this.id, animDictionary, animationName, flag);
    }

    /**
     * @description Play animation on ped
     * @param {string} animDictionary
     * @param {string} animationName
     * @param {function} callback
     * @param {number} blendInSpeed
     * @param {number} blendOutSpeed
     * @param {number} duration
     * @param {number} flag
     * @param {number} playbackRate
     * @param {boolean} lockX
     * @param {boolean} lockY
     * @param {boolean} lockZ
     * @return {void}
     */
    TaskPlayAnim(animDictionary, animationName, duration = -1, flag = 0, callback, playbackRate = 0, blendInSpeed = 8.0, blendOutSpeed = 8.0, lockX = false, lockY = false, lockZ = false) {
        if (DoesAnimDictExist(animDictionary)) {
            RequestAnimDict(animDictionary);
            let self = this;
            let timer = setInterval(function () {
                if (HasAnimDictLoaded(animDictionary)) {
                    clearInterval(timer);
                    if (duration === -1 && flag === 0) {
                        duration = GetAnimDuration(animDictionary, animationName);
                        setTimeout(function () {
                            callback();
                        }, duration * 1000);
                    }
                    TaskPlayAnim(self.id, animDictionary, animationName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, lockX, lockY, lockZ);
                }
            }, 10);
        } else {
            console.log("Anim " + animDictionary + " not exist !");
        }
    }

    /**
     * @description Play animation on ped
     * @param {string} animDictionary
     * @param {string} animationName
     * @param {number} posX
     * @param {number} posY
     * @param {number} posZ
     * @param {number} rotX
     * @param {number} rotY
     * @param {number} rotZ
     * @param {number} duration
     * @param {number} flag
     * @param {function} callback
     * @param {number} speed
     * @param {number} speedMultiplier
     * @param {number} animTime
     * @constructor
     */
    TaskPlayAnimAdvanced(animDictionary, animationName, posX, posY, posZ, rotX, rotY, rotZ, duration = -1, flag = 0, callback, speed = 8.0, speedMultiplier = 8.0, animTime = 0) {
        if (DoesAnimDictExist(animDictionary)) {
            RequestAnimDict(animDictionary);
            let self = this;
            let timer = setInterval(function () {
                if (HasAnimDictLoaded(animDictionary)) {
                    clearInterval(timer);
                    if (duration === -1 && flag === 0) {
                        duration = GetAnimDuration(animDictionary, animationName);
                        setTimeout(function () {
                            callback();
                        }, duration * 1000);
                    }
                    TaskPlayAnimAdvanced(self.id, animDictionary, animationName, posX, posY, posZ, rotX, rotY, rotZ, speed, speedMultiplier, duration, flag, animTime);
                }
            }, 10);
        } else {
            console.log("Anim " + animDictionary + " not exist !");
        }
    }

    /**
     * @description Clear primary tasks
     */
    ClearPrimaryTasks() {
        ClearPedTasks(this.id);
    }

    /**
     * @description Clear secondary tasks
     */
    ClearSecondaryTasks() {
        ClearPedSecondaryTask(this.id);
    }

    /**
     * @description Clear all tasks
     */
    ClearAllTasks() {
        this.ClearPrimaryTasks();
        this.ClearSecondaryTasks();
    }

    /**
     *
     * @param {function} callback
     * @param {boolean} isNetwork
     * @param {boolean} thisScriptCheck
     * @constructor
     */
    Spawn(callback, isNetwork = false, thisScriptCheck = false) {
        if (IsModelAPed(this._model)) {
            let waiting = 0;
            let self = this;
            RequestModel(this._model);
            let timer = setInterval(function () {
                if (HasModelLoaded(self._model)) {
                    clearInterval(timer);
                    self.id = CreatePed(2, self._model, self._coords.x, self._coords.y, self._coords.z, self._heading, isNetwork, thisScriptCheck);
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

    /**
     * @description Return current vehicle
     * @return {Vehicle|boolean}
     */
    CurrentVehicle() {
        const vehicle = new Vehicle(GetVehiclePedIsIn(this.id, false));
        return vehicle.Exists() ? vehicle : false;
    }

    /**
     * @description Return last vehicle
     * @return {Vehicle|boolean}
     */
    LastVehicle() {
        const vehicle = new Vehicle(GetVehiclePedIsIn(this.id, true));
        return vehicle.Exists() ? vehicle : false;
    }

    /**
     * @description Return Trying ToEnter vehicle
     * @return {Vehicle|boolean}
     */
    VehicleTryingToEnter() {
        const vehicle = new Vehicle(GetVehiclePedIsTryingToEnter(this.id));
        return vehicle.Exists() ? vehicle : false;
    }

    /**
     * @description Set Driving style
     * @param {DrivingStyle} style
     * @constructor
     */
    SetDrivingStyle(style) {
        SetDriveTaskDrivingStyle(this.id, Number(DrivingStyle[style]));
    }

    /**
     * @description Check if ped is any vehicle
     * @returns {boolean}
     */
    IsInAnyVehicle() {
        return IsPedInAnyVehicle(this.id, false);
    }

    /**
     * @description
     * @param {Vehicle} vehicle
     * @returns {boolean}
     */
    IsInVehicle(vehicle) {
        return IsPedInVehicle(this.id, vehicle.id, false);
    }

    /**
     * @description
     * @returns {boolean}
     */
    IsSittingInAnyVehicle() {
        return IsPedSittingInAnyVehicle(this.id);
    }

    /**
     * @description
     * @param {Vehicle} vehicle
     * @returns {boolean}
     */
    IsSittingInVehicle(vehicle) {
        return IsPedSittingInVehicle(this.id, vehicle.id);
    }

    /**
     * @description
     * @param {Vehicle} vehicle
     * @param {number} seat
     * @return {void}
     */
    SetIntoVehicle(vehicle, seat) {
        SetPedIntoVehicle(this.id, vehicle.id, seat);
    }

    /**
     * @description
     * @return {void}
     */
    Kill() {
        this.health = -1;
    }

    /**
     * @description
     * @return {void}
     */
    Resurrect() {
        const maxHealth = this.maxHealth;
        const isCollisionEnabled = this.collision;

        ResurrectPed(this.id);
        this.health = maxHealth;
        this.collision = isCollisionEnabled;
        ClearPedTasksImmediately(this.id);
    }

    /**
     * @description
     * @return {void}
     */
    ResetVisibleDamage() {
        ResetPedVisibleDamage(this.id);
    }

    /**
     * @description
     * @return {void}
     */
    ClearBloodDamage() {
        ClearPedBloodDamage(this.id);
    }

    /**
     * @description
     * @returns {boolean}
     */
    IsInGroup() {
        return IsPedInGroup(this.id);
    }

    /**
     * @description
     * @param {boolean} value
     * @return {void}
     */
    NeverLeavesGroup(value) {
        SetPedNeverLeavesGroup(this.id, value);
    }

    /**
     * @description
     * @return {void}
     */
    LeaveGroup() {
        RemovePedFromGroup(this.id);
    }

    // PlayAmbientSpeed(
    //     speechName: string,
    //     voiceName: string = '',
    //     modifier: SpeechModifier = SpeechModifier.Standard,
    // ): void {
    //     if (Number(modifier) >= 0 && Number(modifier) < this.speechModifierNames.length) {
    //         if (voiceName === '') {
    //             PlayAmbientSpeech1(this.handle, speechName, this.speechModifierNames[Number(modifier)]);
    //         } else {
    //             PlayAmbientSpeechWithVoice(
    //                 this.handle,
    //                 speechName,
    //                 voiceName,
    //                 this.speechModifierNames[Number(modifier)],
    //                 false,
    //             );
    //         }
    //     } else {
    //         throw new RangeError('modifier');
    //     }
    // }

    /**
     * @description
     * @param {number} damageAmount
     * @return {void}
     */
    ApplyDamage(damageAmount) {
        ApplyDamageToPed(this.id, damageAmount, true);
    }

    /**
     * @description
     * @param {string} weapon
     * @returns {boolean}
     */
    HasBeenDamagedBy(weapon) {
        return HasPedBeenDamagedByWeapon(this.id, weapon, 0);
    }

    /**
     * @description
     * @returns {boolean}
     */
    HasBeenDamagedByAnyWeapon() {
        return HasPedBeenDamagedByWeapon(this.id, 0, 2);
    }

    /**
     * @description
     * @returns {boolean}
     */
    HasBeenDamagedByAnyMeleeWeapon() {
        return HasPedBeenDamagedByWeapon(this.id, 0, 1);
    }

    /**
     * @description
     * @return {void}
     */
    ClearLastWeaponDamage() {
        ClearPedLastWeaponDamage(this.id);
    }

    /**
     * @description
     * @param {number} weapon
     * @param {number} ammoCount
     * @param {boolean} isHidden
     * @param {boolean} equipNow
     * @return {void}
     */
    GiveWeapon(weapon, ammoCount = 999, isHidden = false, equipNow = true) {
        GiveWeaponToPed(this.id, weapon, ammoCount, isHidden, equipNow);
    }

    /**
     * @description
     * @param {number} weapon
     * @return {void}
     */
    RemoveWeapon(weapon) {
        RemoveWeaponFromPed(this.id, weapon);
    }

    /**
     * @description
     * @return {void}
     */
    RemoveAllWeapons() {
        RemoveAllPedWeapons(this.id, true);
    }

    /**
     * @description
     * @returns {boolean}
     */
    get CanRagdoll() {
        return CanPedRagdoll(this.id);
    }

    /**
     * @description
     * @param {boolean} value
     */
    set CanRagdoll(value) {
        SetPedCanRagdoll(this.id, value);
    }

    /**
     * @description
     * @param {number} duration
     * @param {RagdollType} ragdollType
     */
    Ragdoll(duration = -1, ragdollType = RagdollType.Normal) {
        this.CanRagdoll = true;
        SetPedToRagdoll(this.id, duration, duration, Number(ragdollType), false, false, false);
    }

    /**
     * @description
     * @param {boolean} canBeRemovedByPed
     * @param {HelmetType} helmetType
     * @param {number} textureIndex
     * @return {void}
     */
    GiveHelmet(canBeRemovedByPed, helmetType, textureIndex) {
        GivePedHelmet(this.id, !canBeRemovedByPed, Number(helmetType), textureIndex);
    }

    /**
     * @description
     * @param {boolean} instantly
     */
    RemoveHelmet(instantly = true) {
        RemovePedHelmet(this.id, instantly);
    }

    /**
     * @description
     * @return {void}
     */
    OpenParachute() {
        ForcePedToOpenParachute(this.id);
    }

    /**
     * @description
     * @param {number} flagId
     * @returns {boolean}
     * @constructor
     */
    GetConfigFlag(flagId) {
        return GetPedConfigFlag(this.id, flagId, true);
    }

    /**
     * @description
     * @param {number} flagId
     * @param {boolean} value
     * @return {void}
     */
    SetConfigFlag(flagId, value) {
        SetPedConfigFlag(this.id, flagId, value);
    }

    /**
     * @description
     * @param {number} flagId
     * @return {void}
     */
    ResetConfigFlag(flagId) {
        SetPedResetFlag(this.id, flagId, true);
    }

    /**
     * @description
     * @param {number} id
     * @returns {Ped}
     */
    Clone(id) {
        return new Ped(ClonePed(this.id, id, false, false));
    }

}
