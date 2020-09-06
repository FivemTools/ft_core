/**
 * @Project: FivemTools
 * @Author: Samuelds
 * @License: GNU General Public License v3.0
 * @Source: https://github.com/FivemTools/ft_core
 */

class Color{constructor(t=0,i=0,h=0,s=0){this.red=t,this.green=i,this.blue=h,this.alpha=s}RGBToHex(){let t=this.r.toString(16),i=this.g.toString(16),h=this.b.toString(16);return 1==t.length&&(t="0"+t),1==i.length&&(i="0"+i),1==h.length&&(h="0"+h),"#"+t+i+h}RGBAToHexA(){let t=this.r.toString(16),i=this.g.toString(16),h=this.b.toString(16),s=Math.round(255*this.a).toString(16);return 1==t.length&&(t="0"+t),1==i.length&&(i="0"+i),1==h.length&&(h="0"+h),1==s.length&&(s="0"+s),"#"+t+i+h+s}hexToRGB(t){if(/^#([\da-f]{3}){1,2}$/i.test(t))return 4==t.length?(this.r="0x"+t[1]+t[1],this.g="0x"+t[2]+t[2],this.b="0x"+t[3]+t[3]):7==t.length&&(this.r="0x"+t[1]+t[2],this.g="0x"+t[3]+t[4],this.b="0x"+t[5]+t[6]),this;console.error(t+" was not a hex value")}hexAToRGBA(t){if(/^#([\da-f]{4}){1,2}$/i.test(t))return 5==t.length?(this.r="0x"+t[1]+t[1],this.g="0x"+t[2]+t[2],this.b="0x"+t[3]+t[3],this.a="0x"+t[4]+t[4]):9==t.length&&(this.r="0x"+t[1]+t[2],this.g="0x"+t[3]+t[4],this.b="0x"+t[5]+t[6],this.a="0x"+t[7]+t[8]),this.a=+(this.a/255).toFixed(3),this;console.error(t+" was not a hex a value")}}
function Enum(t){if(t instanceof Array){let i={},h=0;return t.forEach(t=>{i[t]=h,h++}),Object.freeze(i)}{let i=t;for(let[t,h]of Object.entries(value))i[h]=t;return Object.freeze(i)}}
class Vector3{constructor(t=0,i=0,h=0){this.x=t,this.y=i,this.z=h}Clone(){return new Vector3(this.x,this.y,this.z)}Add(t,i,h){return t&&i&&h?(this.x+=t,this.y+=i,this.z+=h):"number"==typeof t?(this.x+=t,this.y+=t,this.z+=t):t instanceof Vector3&&(this.x+=t.x,this.y+=t.y,this.z+=t.z),this}Subtract(t,i,h){return t&&i&&h?(this.x-=t,this.y-=i,this.z-=h):"number"==typeof t?(this.x-=t,this.y-=t,this.z-=t):t instanceof Vector3&&(this.x-=t.x,this.y-=t.y,this.z-=t.z),this}Multiply(t,i,h){return t&&i&&h?(this.x*=t,this.y*=i,this.z*=h):"number"==typeof t?(this.x*=t,this.y*=t,this.z*=t):t instanceof Vector3&&(this.x*=t.x,this.y*=t.y,this.z*=t.z),this}Divide(t,i,h){return t&&i&&h?(this.x/=t,this.y/=i,this.z/=h):"number"==typeof t?(this.x/=t,this.y/=t,this.z/=t):t instanceof Vector3&&(this.x/=t.x,this.y/=t.y,this.z/=t.z),this}DotProduct(t){return this.x*t.x+this.y*t.y+this.z*t.z}CrossProduct(t){const i=this.y*t.z-this.z*t.y,h=this.z*t.x-this.z*t.z,s=this.x*t.y-this.z*t.x;return new Vector3(i,h,s)}Normalize(){return this.Divide(this.Length())}IsEquals(t,i,h){return t&&i&&h?this.x===t&&this.y===i&&this.z===h:"number"==typeof t?this.x===t&&this.y===t&&this.z===t:t instanceof Vector3?this.x===t.x&&this.y===t.y&&this.z===t.z:void 0}AngleTo(t){const i=Math.sqrt(this.Length()*t.Length());0===i&&console.error("Vector3: angleTo() can't handle zero length vectors.");const h=this.DotProduct(t)/i;return Math.acos(Math.clamp(h,-1,1))}Length(){return this.x*this.x+this.y*this.y+this.z*this.z}Max(t){return t?(this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this):Math.max(this.x,this.y,this.z)}Min(t){return t?(this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this):Math.min(this.x,this.y,this.z)}Negative(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}ToArray(){return[this.x,this.y,this.z]}DistanceTo(t){return Math.sqrt(this.DistanceToSquared(t))}DistanceToSquared(t){const i=this.x-t.x,h=this.y-t.y,s=this.z-t.z;return i*i+h*h+s*s}}