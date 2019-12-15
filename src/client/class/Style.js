const PedComponents = new Enum([
    "Face",
    "Head",
    "Hair",
    "Torso",
    "Legs",
    "Hands",
    "Shoes",
    "Special1",
    "Special2",
    "Special3",
    "Textures",
    "Torso2"
]);

const PedProps = new Enum([
    "Hats",
    "Glasses",
    "EarPieces",
    "Unknown3",
    "Unknown4",
    "Unknown5",
    "Watches",
    "Wristbands",
    "Unknown8",
    "Unknown9",
])

class Style {
    constructor(ped) {
        this._ped = ped
    }

    _mother = 0;
    _father = 0;
    _skin = 0;
    _face = 0;
    _pedComponents = {};
    _pedProps = {};
    /**
    * @descriptionGets Set mother for ressemblance
    * @param {Number}
    */
    set mother(value) {
        this.this._mother = value;
        SetPedHeadBlendData(this._ped.id, this.this._father, this.this._mother, null, this.this._father, this.this._mother, null, this.this._face, this.this._skin, null, true);
    }
    /**
    * @descriptionGets Set father for ressemblance
    * @param {Number}
    */
    set father(value) {
        this.this._father = value;
        SetPedHeadBlendData(this._ped.id, this.this._father, this.this._mother, null, this.this._father, this.this._mother, null, this.this._face, this.this._skin, null, true);
    }
    /**
    * @descriptionGets Set face for ressemblance
    * @param {Number}
    */
    set face(value) {
        this.this._face = value;
        SetPedHeadBlendData(this._ped.id, this.this._father, this.this._mother, null, this.this._father, this.this._mother, null, this.this._face, this.this._skin, null, true);
    }
    /**
    * @descriptionGets Set skin for ressemblance
    * @param {Number}
    */
    set skin(value) {
        this.this._skin = value;
        SetPedHeadBlendData(this._ped.id, this.this._father, this.this._mother, null, this.this._father, this.this._mother, null, this.this._face, this.this._skin, null, true);
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
    PedProp(propId){
        if(this._pedProps[propId]){
            return this._pedProps[propId];
        }else{
            let variation = new PedProp(this._ped,propId);
            this._pedProps[propId] = variation;
            return variation;
        }
    }

    /**
     * @description Get all Components valid for the ped
     * @returns {Array}
     */
    GetAllComponents(){
        let component = [];
        Object.values(PedComponents).forEach((e)=>{
            if(typeof e === "number"){
                let cpm = this.PedComponent(e);
                if(cpm.HasAnyVariations){
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
    GetAllProps(){
        let prop = [];
        Object.value(PedProps).forEach((e)=>{
            if(typeof e === "number"){
                let prs = this.PedProp(e);
                if(prs.HasAnyVariations){
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
    GetAllVariations(){
        let variation = [];
        Array.prototype.push.apply(variation,this.GetAllComponents());
        Array.prototype.push.apply(variation,this.GetAllProps());
        return variation;
    }

    /**
     * @description randomize Outfit for the ped
     */
    RandomizeOutfit(){
        SetPedRandomComponentVariation(this._ped.id, false);
    }

    /**
     * @description randomize prop for the ped
     */
    RandomizeProps(){
        SetPedRandomProps(this._ped.id);
    }

    /**
     * @description clear all props
     */
    ClearProps(){
        ClearAllPedProps(this._ped.id);
    }

    /**
     * @description Set default component variation
     * @return {void}
     */
    SetDefaultComponentVariation() {
        SetPedDefaultComponentVariation(this._ped.id);
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
            SetPedComponentVariation(this._ped.id, this._componentId, index, textureIndex, 0);
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

    get hasVariations(){
        return this.count > 1;
    }
    get hasTextureVariation(){
        return this.count > 1 && this.textureCount > 1;
    }
    get HasAnyVariations(){
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

    get hasVariations(){
        return this.count > 1;
    }
    get hasTextureVariation(){
        return this.count > 1 && this.textureCount > 1;
    }
    get HasAnyVariations(){
        return this.hasVariations || this.hasTextureVariation;
    }
}