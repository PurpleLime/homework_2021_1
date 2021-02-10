'use strict';

const set = function (object, propertyPath, value) {
    const properties = propertyPath.split(".");
    properties.shift();
    let curObject = object;
    for (let i = 0; i < properties.length - 1; ++i) {
        if (curObject[properties[i]] === undefined) {
            curObject[properties[i]] = {};
        }
        curObject = curObject[properties[i]];
    }
    curObject[properties[properties.length - 1]] = value;
    return object;
}