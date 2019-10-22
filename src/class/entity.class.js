/*
 * @Project: FivemTools
 * @Author: Samuelds
 * @License: GNU General Public License v3.0
 * @Source: https://github.com/FivemTools/ft_core
*/

class Entity {

    /**
     * @param {number} entityId
     */
    constructor(entityId = 0) {
        this.id = entityId;
    }

    /**
     * @description Get entity model
     * @return {string}
     */
    get model() {
        if (this._model === undefined) {
            this._model = GetEntityModel(this.id);
        }
        return this._model;
    }

    /**
     * @description Set entity model value
     * @param {string} value
     * @return {void}
     */
    set model(value) {
        this._model = value;
    }

    /**
     * @description Get entity health
     * @return {number}
     */
    get health() {
        this._health = GetEntityHealth(this.id);
        return this._health;
    }

    /**
     * @description Set entity health
     * @param amount
     * @return {void}
     */
    set health(amount) {
        this._health = amount;
        SetEntityHealth(this.id, amount);
    }

    /**
     * @description Get max health
     * @return {number}
     */
    get maxHealth() {
        this._maxHealth = GetEntityMaxHealth(this.id);
        return this._maxHealth;
    }

    /**
     * @description Set max health
     * @param {number} amount
     * @return {void}
     */
    set maxHealth(amount) {
        this._maxHealth = amount;
        SetEntityMaxHealth(this.id, this._maxHealth);
    }

    /**
     * @description Get coords
     * @return {object} coords
     */
    get coords() {
        const coords = GetEntityCoords(this.id);
        this._coords = { x : coords[0], y : coords[1], z : coords[2] };
        return this._coords;
    }

    /**
     * @description Set coords
     * @param {object} coords
     * @return {void}
     */
    set coords(coords) {
        this._coords = coords;
        SetEntityCoords(this.id, coords.x, coords.y, coords.z, false, false, false, true);
    }

    /**
     * @description Set coords no offset
     * @param {object} coords
     * @return {void}
     */
    set coordsNoOffset(coords) {
        this._coords = coords;
        SetEntityCoordsNoOffset(this.id, coords.x, coords.y, coords.z, true, true, true);
    }

    /**
     * @description Get heading
     * @return {number}
     */
    get heading() {
        this._heading = GetEntityHeading(this.id);
        return this._heading;
    }

    /**
     * @description Set heading
     * @param heading
     * @return {void}
     */
    set heading(heading) {
        this._heading = heading;
        SetEntityHeading(this.id, heading);
    }

    /**
     * @description Get collision status
     * @return {boolean}
     */
    get collision() {
        this._collision = !GetEntityCollisionDisabled(this.id);
        return this._collision;
    }

    /**
     * @description Set collision
     * @param status
     * @return {void}
     */
    set collision(status) {
        this._collision = value;
        SetEntityCollision(this.id, status, false);
    }

    /**
     * @description Get network id
     * @return {number}
     */
    get networkId() {
        this._networkId = NetworkGetNetworkIdFromEntity(this.id);
        return this._networkId;
    }

    /**
     * @param {number} netId
     * @return {void}
     */
    GetByNetworkId(netId) {
        this.id         = NetworkGetEntityFromNetworkId(netId);
        this._networkId = netId;
    }

    /**
     * @description Get if entity is dead
     * @return {boolean}
     */
    IsDead() {
        return Boolean(IsEntityDead(this.id));
    }

    /**
     * @description Get if entity is alive
     * @return {boolean}
     */
    IsAlive() {
        return !this.isDead();
    }

    /**
     * @description Get if entity exist
     * @return {boolean}
     */
    Exist() {
        return Boolean(DoesEntityExist(this.id));
    }

    /**
     * @description Delete entity
     * @return {void}
     */
    Delete() {
        SetEntityAsMissionEntity(this.id, false, true);
        DeleteEntity(this.id);
    }

    /**
     * @param {string} boneName
     * @return {number}
     */
    GetBoneIndex(boneName) {
        return GetEntityBoneIndexByName(this.id, boneName);
    }

    /**
     * @description Set as mission
     * @param {function} callback
     * @return void
     */
    AsMission(callback) {
        let waiting = 0;
        let self    = this;
        let timer   = setInterval(function() {
            if (NetworkHasControlOfEntity(self.id)) {
                SetEntityAsMissionEntity(self.id);
                if (IsEntityAMissionEntity(self.id)) {
                    clearInterval(timer);
                    callback(true);
                }
            } else {
                NetworkRequestControlOfEntity(this.id);
            }

            if (waiting === 10) {
                clearInterval(timer);
                callback(false);
            }
            waiting++;
        }, 20);
    }

    /**
     * @description Register as networked
     * @param {function} callback
     * @return {void}
     */
    AsNetworked(callback) {
        let netId   = false;
        let waiting = 0;
        let self    = this;
        let timer   = setInterval(function() {
            if (NetworkHasControlOfEntity(self.id)) {
                NetworkRegisterEntityAsNetworked(self.id);
                netId = self.networkId;
                if (netId) {
                    SetNetworkIdCanMigrate(netId, true);
                    SetNetworkIdExistsOnAllMachines(netId, true);
                    if (NetworkDoesNetworkIdExist(netId)) {
                        clearInterval(timer);
                        callback(netId);
                    }
                }
            } else {
                NetworkRequestControlOfEntity(this.id);
            }

            if (waiting === 10) {
                clearInterval(timer);
                callback(false);
            }
            waiting++;
        }, 20);
    }

}