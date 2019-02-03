// module 

const CompareObjectsForEquality = (viewModelSnapshot, viewModelCurrent) => {
    // let snapshot = (typeof viewModelSnapshot === 'string' || viewModelSnapshot instanceof String) ?
    //     JSON.parse(viewModelSnapshot) : viewModelSnapshot;
    // // delete viewModelCurrent.validationCounterForNumberOfParcels;
    // const akeys = Object.keys(snapshot);
    // const bkeys = Object.keys(viewModelCurrent);
    // const len = akeys.length;

    // if (len != bkeys.length) {
    //     console.log(len.toString() + ' ' + bkeys.length.toString());
    //     return false;
    // }
    // for (let i = 0; i < len; i++) {
    //     if (snapshot[akeys[i]] !== viewModelCurrent[akeys[i]]) {
    //         console.log(snapshot[akeys[i]] + ' ' + viewModelCurrent[akeys[i]]);
    //         return false;
    //     }
    // }
    return true;
}

module.exports = { CompareObjectsForEquality };