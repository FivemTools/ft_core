class World {
  /**
   * @description Get the date of the world
   * @returns {Date}
   */
  get currentDate() {
    new Date(
      GetClockYear(),
      GetClockMonth(),
      GetClockDayOfMonth(),
      GetClockHours(),
      GetClockMinutes(),
      GetClockSeconds()
    )
  }

  /**
   * @description Sert the current date of the word
   * @param {Date}
   */
  set currentDate(date) {
    SetClockDate(date.getDate(), date.getMonth(), date.getFullYear);
    SetClockTime(date.getHours(), date.getMinutes(), date.getSeconds());
  }

  /**
 * @description Disables all emissive textures, street/building/vehicle lights. "EMP" effect.
 * @param {Boolean}
 */
  set blackout(value) {
    SetArtificialLightsState(value);
  }

  /**
   * @description Get the type of cloud
   * @return {CloudHat}
   */
  get cloudHat() {
    return this.currentCloudHat;
  }

  /**
   * @description Set the type of cloud
   * @param {CloudHat}
   */
  set cloudHat(value) {
    this.currentCloudHat = value;
    if (this.currentCloudHat === CloudHat.Unknown) {
      this.currentCloudHat = CloudHat.Clear;
      ClearCloudHat();
      return;
    }
    SetCloudHatTransition(this.currentCloudHat || '', 3);
  }

  /**
   * @description Get the cloud hat opacity
   * @return {Number}
   */
  get cloudHatOpacity() {
    return GetCloudHatOpacity();
  }

  /**
   * @description Set the cloud opacity
   * @param {Number} value between 0 and 1
   */
  set cloudHatOpacity(value) {
    SetCloudHatOpacity(value)
  }

  /**
   * @description Get the current weather type
   * @return {Weather}
   */
  get weather() {
    switch (GetPrevWeatherTypeHashName()) {
      case -1750463879:
        return Weather.ExtraSunny;
      case 916995460:
        return Weather.Clear;
      case -1530260698:
        return Weather.Neutral;
      case 282916021:
        return Weather.Smog;
      case -1368164796:
        return Weather.Foggy;
      case 821931868:
        return Weather.Clouds;
      case -1148613331:
        return Weather.Overcast;
      case 1840358669:
        return Weather.Clearing;
      case 1420204096:
        return Weather.Raining;
      case -1233681761:
        return Weather.ThunderStorm;
      case 669657108:
        return Weather.Blizzard;
      case -273223690:
        return Weather.Snowing;
      case 603685163:
        return Weather.Snowlight;
      case -1429616491:
        return Weather.Christmas;
      case -921030142:
        return Weather.Halloween;
      default:
        return Weather.Unknown;
    }
  }

  /**
   * @description Set the current weather
   * @param {Weather}
   */
  set weather(value) {
    if (value !== Weather.Unknown) {
      SetWeatherTypeOverTime(value, 1);
      setTimeout(() => {
        SetWeatherTypeNow(value);
      }, 100)
    }
  }

  /**
   * @description Get the next Weather
   * @returns {Weather}
   */
  get newtWeather() {
    switch (GetNextWeatherTypeHashName()) {
      case -1750463879:
        return Weather.ExtraSunny;
      case 916995460:
        return Weather.Clear;
      case -1530260698:
        return Weather.Neutral;
      case 282916021:
        return Weather.Smog;
      case -1368164796:
        return Weather.Foggy;
      case 821931868:
        return Weather.Clouds;
      case -1148613331:
        return Weather.Overcast;
      case 1840358669:
        return Weather.Clearing;
      case 1420204096:
        return Weather.Raining;
      case -1233681761:
        return Weather.ThunderStorm;
      case 669657108:
        return Weather.Blizzard;
      case -273223690:
        return Weather.Snowing;
      case 603685163:
        return Weather.Snowlight;
      case -1429616491:
        return Weather.Christmas;
      case -921030142:
        return Weather.Halloween;
      default:
        return Weather.Unknown;
    }
  }

  /**
   * @description Set the next Weather
   * @param {Weather}
   */
  set newtWeather(value) {
    if (value !== Weather.Unknown) {
      SetWeatherTypeOverTime(value, 0);
    }
  }

  /**
   * @description Transition to different weather type within a certain time
   * @param {Weather} weather
   * @param {Number} duration
   */
  TransitionToWeather(weather, duration) {
    if (weather !== Weather.Unknown) {
      SetWeatherTypeOverTime(weather, duration);
    }
  }
  /**
   * @description Draw a marker at desired location
   * @param {Boolean} enable Draw directly or not
   * @param {Number} type Type of marker https://docs.fivem.net/docs/game-references/markers/
   * @param {Vector3} position Location of marker
   * @param {Vector3} direction  Direction facing
   * @param {Vector3} rotation world rotation
   * @param {Vector3} scale Size of marker
   * @param {Color} color color of marker
   * @param {Boolean} bobUpAndDown Animated movement along marker's own X axis
   * @param {boolean} faceCamera Rendering marker facing rendering camera
   * @param {boolean} rotateY Rotate along Y axis
   * @param {String} textureDict Custom texture dictionary for custom marker
   * @param {String} textureName Custom texture name for custom marker
   * @param {Boolean} drawOnEntity Render the marker on an entity
   * 
   * @returns {Number} the id of marker
   */
  CreateMarker(enable, type, position, direction, rotation, scale, color, bobUpAndDown = false, faceCamera = false, rotateY = false, textureDict = null, textureName = null, drawOnEntity = false) {

    const length = Object.keys(_MarkerList).length;
    _MarkerList[length] =
    {
      enable: enable,
      type: type,
      position: position,
      direction: direction,
      rotation: rotation,
      scale: scale,
      color: color,
      bUaD: bobUpAndDown,
      faceCamera: faceCamera,
      rotateY: rotateY,
      textureDict: textureDict,
      textureName: textureName,
      drawOnEntity: drawOnEntity
    }
    return length
  }

  /**
   * @description Delete the marker
   * @param {Number} id The id of marker
   */
  DeleteMArker(id) {
    delete _MarkerList[id]
  }

  /**
   * @description Enable or disable the marker
   * 
   * @param {Number} id 
   * 
   * @returns {Boolean} The state of marker
   */
  ToggleMarker(id) {
    _MarkerList[id].enable != _MarkerList[id].enable

    return _MarkerList[id].enable
  }

  /**
   * @description Get the distance bewteen 2 point
   * @param {Vector3} pointA 
   * @param {Vector3} pointB 
   * @return {Number}
   */
  GetDistance(pointA, pointB) {
    return Math.sqrt(pointB.DistanceToSquared(pointA));
  }

  /**
   * @description Calculates the travel distance using roads and paths between 2 positions.
   * @param {Vector3} pointA 
   * @param {Vector3} pointB 
   * @return {Number}
   */
  CalculateTravelDistance(pointA, pointB) {
    return CalculateTravelDistanceBetweenPoints(pointA.x, pointA.y, pointA.z, pointB.x, pointB.y, pointB.z);
  }

  /**
   * @description Get the height of the point
   * @param {Vector3} point 
   */
  GetGroundHeight(point) {
    RequestCollisionAtCoord(point.x, point.y, 1000);
    const [bool,result] = GetGroundZFor_3dCoord(point.x, point.y, 1000, false);
    return result;
  }
}


const _MarkerList = {}

setTick(() => {
  for (let [k, v] of Object.entries(_MarkerList)) {
    if (v.enable) {
      DrawMarker(v.type, v.position.x, v.position.y, v.position.z, v.direction.x, v.direction.y, v.direction.z, v.rotation.x, v.rotation.y, v.rotation.z, v.scale.x, v.scale.y, v.scale.z, v.color.red, v.color.greend, v.color.blue, v.color.alpha, v.bUaD, v.faceCamera, 2, v.rotateY, v.textureDict, v.textureName, v.drawOnEntity);
    }
  }
})