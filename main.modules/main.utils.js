"use strict";

// PURPOSE: used to see if model has changed, because that would indicate a "dirty" file.
const CompareObjectsForEquality = (viewModelSnapshot, viewModelCurrent) => {
    if(
        viewModelCurrent === null 
            || viewModelCurrent === undefined
            || viewModelSnapshot === null 
            || viewModelSnapshot === undefined
        ){ 
        return false; 
    }
    
    let snapshot = (typeof viewModelSnapshot === 'string' || viewModelSnapshot instanceof String) ?
        JSON.parse(viewModelSnapshot) : viewModelSnapshot;
    const akeys = Object.keys(snapshot);
    const bkeys = Object.keys(viewModelCurrent);
    const len = akeys.length;

    if(viewModelCurrent === null || viewModelCurrent === undefined){ return false; }
    if (len != bkeys.length) {
        console.log(len.toString() + ' ' + bkeys.length.toString());
        return false;
    }
    for (let i = 0; i < len; i++) {
        if (snapshot[akeys[i]] !== viewModelCurrent[akeys[i]]) {
            console.log(snapshot[akeys[i]] + ' ' + viewModelCurrent[akeys[i]]);
            return false;
        }
    }
    return true;
}

module.exports = { CompareObjectsForEquality };