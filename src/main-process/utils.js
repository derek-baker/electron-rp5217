'use strict';

/**
 * @param {string | any} viewModelSnapshot
 * @param {*} viewModelCurrent
 * @return {boolean} - True when object values are the same. False otherwise.
 */
const compareObjectsForEquality = (viewModelSnapshot, viewModelCurrent) => {
    if (!viewModelCurrent || !viewModelSnapshot) {
        return false;
    }
    const snapshot =
        (typeof viewModelSnapshot === 'string')
            ? JSON.parse(viewModelSnapshot) : viewModelSnapshot;

    const akeys = Object.keys(snapshot);
    const bkeys = Object.keys(viewModelCurrent);
    const len = akeys.length;

    if (len != bkeys.length) {
        return false;
    }
    for (let i = 0; i < len; i++) {
        if (snapshot[akeys[i]] !== viewModelCurrent[akeys[i]]) {
            return false;
        }
    }
    return true;
};

module.exports = { compareObjectsForEquality };
