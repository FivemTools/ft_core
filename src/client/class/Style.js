/*
 * @Project: FivemTools
 * @Author: THEJean_Kevin
 * @License: GNU General Public License v3.0
 * @Source: https://github.com/FivemTools/ft_core
*/

class Style {

    constructor(ped) {
        this._ped = ped
        if (ped.id) { this.GetHeadData() }
    }

    _mother = 0;
    _father = 0;
    _skin = 0;
    _shape = 0;
    _pedComponents = {};
    _pedProps = {};

    /**
     * @descriptionGets Set mother for ressemblance
     * @param {Number}
     */
    set mother(value) {
        this._mother = value;
        SetPedHeadBlendData(this._ped.id, this._father, this._mother, null, this._father, this._mother, null, this._shape, this._skin, null, true);
    }

    get mother() {
        return this._mother
    }

    /**
     * @descriptionGets Set father for ressemblance
     * @param {Number}
     */
    set father(value) {
        this._father = value;
        SetPedHeadBlendData(this._ped.id, this._father, this._mother, null, this._father, this._mother, null, this._shape, this._skin, null, true);
    }

    get father() {
        return this._father
    }

    /**
     * @descriptionGets "Select how much of your head shape should be inherited from your father or mother. All the way on 0.0 is your dad, all the way on 1.0 is your mom."
     * @param {Number}
     */
    set shape(value) {
        this._shape = value;
        SetPedHeadBlendData(this._ped.id, this._father, this._mother, null, this._father, this._mother, null, this._shape, this._skin, null, true);
    }

    get shape() {
        return this._shape
    }

    /**
     * @descriptionGets "Select how much of your body skin tone should be inherited from your father or mother. All the way on 0.0 is your dad, all the way on 1.0 is your mom."
     * @param {Number}
     */
    set skin(value) {
        this._skin = value;
        SetPedHeadBlendData(this._ped.id, this._father, this._mother, null, this._father, this._mother, null, this._shape, this._skin, null, true);
    }
    get sking() {
        return this._skin
    }

    /**
     * @description Get the head Data
     * @returns {Object}
     */
    GetHeadData() {
        var int = new Uint32Array(new ArrayBuffer(10 * 8));
        Citizen.invokeNative("0x2746BD9D88C5C5D0", ped.id, int);
        const buffer = int.buffer;
        this._father = int[0];
        this._mother = int[2];
        this._shape = new Float32Array(buffer, 48, 1)[0];
        this._skin = new Float32Array(buffer, 56, 1)[0];
        return { mother: this._mother, father: this._father, shape: this._shape, skin: this._skin }
    }

    /**
     * @description Sets the various face features
     * @param {FaceEnum}
     * @param {Number} value Range between -1 and 1
     */
    Setface(index, value) {
        SetPedFaceFeature(this._ped.id, index, value);
    }

    /**
     * @description Get the various face features
     * @param {FaceEnum} index 
     * @returns {Number} Returns ped's face feature value, or 0.0 if fails to get.
     */
    GetFace(index) {
        return GetPedFaceFeature(this._ped.id, index);
    }

    /**
     * @description Set the head appearance (Eyes,beard...)
     * @param {HeadAppearanceEnum}
     * @param {Number} value
     * @param {Number} opacity between 0.0 and 1.0
     */
    SetHeadAppearance(index, value, opacity) {
        SetPedHeadOverlay(this._ped.id, index, value, opacity);
    }

    /**
     * @description Set the head appearance Color
     * @param {HeadAppearanceEnum} index 
     * @param {Number} color 
     */
    SetHeadAppearanceColor(index, color) {
        var colorType = 0
        switch (index) {
            case 1:
            case 2:
            case 10:
                colorType = 1;
                break;
            case 5:
            case 8:
                colorType = 2;
                break;
            default:
                break;
        }
        SetPedHeadOverlayColor(this._ped.id, index, colorType, color, 0);
    }

    /**
     * @description Get the head Appearance details
     * @param {HeadAppearanceEnum} index 
     * @returns {Object}
     */
    GetHeadAppearance(index) {
        const data = GetPedHeadOverlayData(this._ped.id, index);
        return { index: index, value: data[1], opacity: data[5], colorType: data[2], color: data[3] };
    }

    /**
     * @description Set the Eyes color
     * @param {Number}
     */
    set eyeColor(value) {
        SetPedEyeColor(this._ped.id, value);
    }

    /**
     * @description Get the Eyes Color
     * @returns {Number}
     */
    get eyeColor() {
        return GetPedEyeColor(this._ped.id);
    }

    /**
     * @description Set the hair color
     * @param {Number}
     */
    set hairColor(color) {
        SetPedHairColor(this._ped.id, color, 0);
    }

    /**
     * @description Get the hair Color
     * @returns {Number}
     */
    get hairColor() {
        GetPedHairColor(this._ped.id)
    }

    /**
     * @description small function to setup type and color
     * @param {Number} type 
     * @param {Number} color 
     */
    SetHair(type, color) {
        if (type) {
            this.PedComponent(2).index = type;
        }
        if (color) {
            SetPedHairColor(this._ped.id, color, 0);
        }
    }

    /**
     * @description small function to get type and color
     * @returns {Object} 
     */
    GetHair() {
        return {
            type: this.PedComponent(2).index,
            color: GetPedHairColor(this._ped.id)
        }
    }

    /**
     * @description Get a specify pedComponent
     * @param {PedComponents}
     * @returns {PedComponent} an interface for the component
     */
    PedComponent(componentId) {
        if (this._pedComponents[componentId]) {
            return this._pedComponents[componentId];
        } else {
            let variation = new PedComponent(this._ped, componentId);
            this._pedComponents[componentId] = variation;
            return variation;
        }
    }

    /**
     * @description Get a specify ped props
     * @param {PedProps}
     * @returns {PedProp} an interface for the prop
     */
    PedProp(propId) {
        if (this._pedProps[propId]) {
            return this._pedProps[propId];
        } else {
            let variation = new PedProp(this._ped, propId);
            this._pedProps[propId] = variation;
            return variation;
        }
    }

    /**
     * @description Get all Components valid for the ped
     * @returns {Array}
     */
    GetAllComponents() {
        let component = [];
        Object.values(PedComponents).forEach((e) => {
            if (typeof e === "number") {
                let cpm = this.PedComponent(e);
                if (cpm.HasAnyVariations) {
                    component.push(cpm);
                }
            }
        });
        return component;
    }

    /**
     * @description Get all props valid for the ped
     * @returns {Array}
     */
    GetAllProps() {
        let prop = [];
        Object.value(PedProps).forEach((e) => {
            if (typeof e === "number") {
                let prs = this.PedProp(e);
                if (prs.HasAnyVariations) {
                    prop.push(prs);
                }
            }
        });
        return props
    }

    /**
     * @description Get all props AND components valid for the ped
     * @returns {Array}
     */
    GetAllVariations() {
        let variation = [];
        Array.prototype.push.apply(variation, this.GetAllComponents());
        Array.prototype.push.apply(variation, this.GetAllProps());
        return variation;
    }

    /**
     * @description randomize Outfit for the ped
     */
    RandomizeOutfit() {
        SetPedRandomComponentVariation(this._ped.id, false);
    }

    /**
     * @description randomize prop for the ped
     */
    RandomizeProps() {
        SetPedRandomProps(this._ped.id);
    }

    /**
     * @description clear all props
     */
    ClearProps() {
        ClearAllPedProps(this._ped.id);
    }

    /**
     * @description Set default component variation
     * @return {void}
     */
    SetDefaultComponentVariation() {
        SetPedDefaultComponentVariation(this._ped.id);
    }

    /**
     * @description Clean all tattoos of the ped
     */
    ClearTattoos() {
        ClearPedDecorations(this._ped.id);
    }

    /**
     * @description Add Tattoo to the ped
     * @param {String} collection 
     * @param {String} name 
     */
    AddTattos(collection, name) {
        AddPedDecorationFromHashes(this._ped.id, Game.GenerateHash(collection), Game.GenerateHash(name));
    }
}

class PedComponent {
    _ped;
    _componentId;

    constructor(ped, componentId) {
        this._ped = ped;
        this._componentId = componentId;
    }

    /**
     * @description Get the number of Drawble Variation for this components
     * @returns {Number}
     */
    get count() {
        return GetNumberOfPedDrawableVariations(this._ped.id, this._componentId);
    }

    /**
     * @description Get the actual drawable 
     * @returns {Number}
     */
    get index() {
        return GetPedDrawableVariation(this._ped.id, this._componentId);
    }

    /**
     * @description Set the Drawble for this components
     * @param {Number}
     * @returns {Void}
     */
    set index(value) {
        this.SetVariation(value)
    }

    /**
     * @description Get the number Texture possible for the actual drawable
     * @returns {Number}
     */
    get textureCount() {
        return GetNumberOfPedTextureVariations(this._ped.id, this._componentId, this.index);
    }

    /**
     * @description Get the actual Texture of drawable
     * @returns {Number}
     */
    get textureIndex() {
        return GetPedTextureVariation(this._ped.id, this._componentId);
    }

    /**
     * @description Set the texture for drawable 
     * @param {Number}
     * @returns {Void}
     */
    set textureIndex(value) {
        SetVariation(this.index, value);
    }

    /**
     * @description Set The ped component on the player
     * @returns {Boolean}
     */
    SetVariation(index, textureIndex = 0) {
        if (this.IsVariationValid(index, textureIndex)) {
            SetPedComponentVariation(this._ped.id, this._componentId, index, textureIndex, 2);
            return true
        }
        return false
    }

    /**
     * @description Check if the drawable texture exist
     * @returns {Boolean}
     */
    IsVariationValid(index, textureIndex) {
        return IsPedComponentVariationValid(this._ped.id, this._componentId, index, textureIndex);
    }

    get hasVariations() {
        return this.count > 1;
    }
    get hasTextureVariation() {
        return this.count > 1 && this.textureCount > 1;
    }
    get HasAnyVariations() {
        return this.hasVariations || this.hasTextureVariation;
    }
}

class PedProp {

    _ped;
    _propId;

    constructor(ped, propId) {
        this._ped = ped;
        this._propId = propId;
    }

    /**
     * @description Get the number of Props drawable for this prop
     * @returns {Number}
     */
    get count() {
        return GetNumberOfPedPropDrawableVariations(this._ped.id, this._propId) + 1;//+1 to accomodate for no prop selected(value = -1)
    }

    /**
     * @description Get the actual prop 
     * @returns {Number}
     */
    get index() {
        return GetPedPropIndex(this._ped.id, this._propId + 1);
    }

    /**
     * @description Set the prop for this components
     * @param {Number}
     * @returns {Void}
     */
    set index(value) {
        this.SetVariation(value)
    }

    /**
     * @description Get the number Texture possible for the actual Prop
     * @returns {Number}
     */
    get textureCount() {
        return GetNumberOfPedPropTextureVariations(this._ped.id, this._propId, this.index + 1);
    }

    /**
     * @description Get the actual Texture of prop
     * @returns {Number}
     */
    get textureIndex() {
        return this.index === 0 ? 0 : GetPedPropTextureIndex(this._ped.id, this._propId);
    }

    /**
     * @description Set the texture for Prop
     * @param {Number}
     * @returns {Void}
     */
    set textureIndex(value) {
        if (this.index > 0) {
            SetVariation(this.index, value)
        }
    }

    /**
     * @description Set The ped prop on the player
     * @returns {Boolean}
     */
    SetVariation(index, textureIndex = 0) {

        if (index === 0) {
            ClearPedProp(this._ped.id, this._propId);
            return true;
        }
        if (this.IsVariationValid(index, textureIndex)) {
            SetPedPropIndex(this._ped.id, this._propId, index - 1, textureIndex, true);
            return true
        }
        return false
    }

    /**
     * @description Check if the Prop texture/drawable exist
     * @returns {Boolean}
     */
    IsVariationValid(index, textureIndex = 0) {
        if (index === 0) {
            return true // no prop always valid
        }
        return IsPedPropValid(this._ped.id, this._propId, index - 1, textureIndex);
    }

    get hasVariations() {
        return this.count > 1;
    }
    get hasTextureVariation() {
        return this.count > 1 && this.textureCount > 1;
    }
    get HasAnyVariations() {
        return this.hasVariations || this.hasTextureVariation;
    }
}