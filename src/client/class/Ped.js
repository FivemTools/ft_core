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
     * @description Get how much money this ped is carrying 
     * @returns {Number}
     */
    get money() {
        return GetPedMoney(this.id);
    }

    /**
    * @description Set how much money this ped is carrying 
    * @param {Number}
    */
    set money(value) {
        SetPedMoney(this.id, value);
    }

    /**
    * @description Get the gender of this ped
    * @returns {Number} 0 => Male, 1 => Female
    */
    get gender() {
        return IsPedMale(this.id) ? 0 : 1;;
    }

    /**
    * @description Gets a value indicating whether this  is human
    * @returns {Boolean}
    */
    get isHuman() {
        return IsPedHuman(this.id);
    }

    /**
    * @description Set this ped as enemy
    * @returns {Boolean}
    */
    set isEnnemy(value) {
        return SetPedAsEnemy(this.id, value)
    }

    /**
        * @description Gets a value indicating whether this  is player
        * @returns {Boolean}
        */
    get isPlayer() {
        return IsPedAPlayer(this.id);
    }

    /**
     * @description Get how much armor of this ped
     * @returns {Number}
     */
    get armor() {
        return GetPedArmour(this.id);
    }

    /**
     * @description Set how much armor this ped have 
     * @param {Number} value between 0 and 100
     */
    set armor(value) {
        SetPedArmour(this.id, value);
    }

    /**
     * @description Gets how accurate this ped shooting ability is.
     * @returns {Number} The accuracy from 0 to 100, 0 being very innacurate, 100 being perfectly accurate.
     */
    get accuracy() {
        return GetPedAccuracy(this.id);
    }

    /**
    * @description Set how accurate this ped shooting ability is.
    * @param {Number}  value The accuracy from 0 to 100, 0 being very innacurate, 100 being perfectly accurate.
    */
    set accuracy(value) {
        SetPedAccuracy(this.id, value);
    }

    /**
    * @description sets the how much sweat should be rendered on this
    * @param {Number} value The sweat from 0 to 100, 0 being no sweat, 100 being saturated.
    */
    set sweat(value) {
        if (value < 0) {
            value = 0;
        }
        if (value > 100) {
            value = 100;
        }
        SetPedSweat(this.id, value);
    }

    /**
   * @description Sets how high up on this ped body water should be visible.
   * @param {Number} value The height ranges from 0.0 to 1.99, 0.0 being no water visible, 1.99 being covered in water.
   */
    set wetnessHeight(value) {
        if (value === 0) {
            ClearPedWetness(this.id);
        } else {
            SetPedWetnessHeight(this.id, value);
        }
    }

    /**
       * @description Sets the voice to use when this ped speaks.
       * @param {String}
       */
    set voice(value) {
        SetAmbientVoiceName(this.id, value);
    }


    /**
      * @description Sets the rate this ped will shoot at.
      * @param {Number} value The shoot rate from 0.0 to 1000.0, 100.0 is the default value.
      */
    set shootRate(value) {
        SetPedShootRate(this.id, value);
    }

    /**
       * @descriptionGets a value indicating whether this ped was killed by a stealth attack.
       * @param {Boolean}
       */
    get wasKilledByStealh() {
        return WasPedKilledByStealth(this.id);
    }

    /**
    * @descriptionGets a value indicating whether this ped  was killed by a takedown.
    * @param {Boolean}
    */
    get wasKilledByTakedown() {
        return WasPedKilledByTakedown(this.id);
    }

   /**
    * @description Get the style for customization of this ped
    * @returns {Style}
    */
   get style(){
       if(this._style === null){
            this._style = new Style(this);
       }
       return this._style
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
     * @description Get the VehicleSeat of this Ped is in;
     * @return {VehicleSeat}
     */
    get seatIndex() {
        if (!this.IsInVehicle()) {
            return VehicleSeat.None
        }
        for (seatIndexs = -1; seatIndexs < GetVehicleModelNumberOfSeats(Game.GenerateHash(this.CurrentVehicle.model)); seatIndexs++) {
            if (this.CurrentVehicle.GetPedOnSeat(seatIndexs).id === this.id) {
                return VehicleSeat[seatIndexs]
            }
        }
        return VehicleSeat.None
    }

    /**
     * @description Gets a value indicating whether this ped is jumping out of their vehicle.
     * @returns {Boolean}
     */
    get isJumpingOutOfVehicle() {
        return IsPedJumpingOutOfVehicle(this.id)
    }


    /**
     * @description ets a value indicating whether this Ped will stay in the vehicle when the driver gets jacked.
     * @param {Boolean}
     */
    set staysInVehicleWhenJacked(value) {
        SetPedStayInVehicleWhenJacked(this.id, value);
    }

    /**
     * @description Sets the maximum driving speed this Ped can drive at.
     * @param {Number}
     */
    set maxDrivingSpeed(value) {
        SetDriveTaskMaxCruiseSpeed(this.id, value);
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
     * @description cancel the ragdoll
     */
    CancelRagdoll() {
        SetPedToRagdoll(this.id, 1, 1, 1, false, false, false)
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