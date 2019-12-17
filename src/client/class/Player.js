class Player extends Ped {
    /**
     * @description Create a player class
     * @param {Number} identifier Get a specified player if it's indicate
     */
    constructor(identifier =-1){
        this.id = GetPlayerPed(identifier);
        this.PvPEnabled = true;
    }

    /**
     * @description Get the name of the player's
     * @return {String}
     */
    get name(){
        return GetPlayerName(this.id);
    }

    /**
     * @description Get if the player can fight other player
     * @return {Boolean}
     */
    get PvPEnabled(){
        return this.pvp;
    }

    /**
     * @description Set if the player can attack other
     * @param {Boolean}
     */
    set PvPEnabled(value){
        NetworkSetFriendlyFireOption(value);
        SetCanAttackFriendly(this.character.id, value, value)
        this.pvp = value
    }

    /**
     * @description Get the wanted level of the player
     * @returns {Number}
     */
    get wantedLevel(){
        return GetPlayerWantedLevel(this.id);
    }

    set wantedLevel(value){
        SetPlayerWantedLevel(this.id, value, false);
        SetPlayerWantedLevelNow(this.id, false);
    }

    /**
     * @description Checks whether the specified player has a Ped, the Ped is not dead, is not injured and is not arrested.  
     * @return {boolean}
     */
    get isPlaying(){
        return IsPlayerPlaying(this.id)
    }

    /**
     * @description Get the server Id of the player
     * @returns {Number}
     */
    get serverId(){
        return GetPlayerServerId(this.id);
    }

    /**
     * @description spawn the player
     * @param {function} callback
     */
    Spawn(callback) {
        exports.spawnmanager.forceRespawn();
        exports.spawnmanager.spawnPlayer(null,callback);
    }

}