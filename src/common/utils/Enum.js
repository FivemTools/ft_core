/*
 * @Project: FiveM Tools
 * @Author: Samuelds
 * @License: GNU General Public License v3.0
 * @Source: https://github.com/FivemTools/ft_players
*/

function Enum(values) {
    if(values instanceof Array) {
        let object = {};
        let index = 0;
        values.forEach(element => {
            object[element] = index;
            object[index] = element;
            index++;
        });
        return Object.freeze(object);
    } else {
        let object = values;
        for(let[k,v] of Object.entries(value)){
            object[v] = k;
        }
        return Object.freeze(object);
    }
}