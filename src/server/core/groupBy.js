const { get } = require('object-path');
const orderBy = require('./orderBy');

/**
 * Return parent object path
 * @param   {string}    path
 * @returns {string}
 */
function getParentPath (path) {
    const pathArray = path.split('.');
    return pathArray.splice(0, pathArray.length - 1).join('.');
}

/**
 * return field name
 * @param   {string}    path
 * @returns {string}
 */
function getFieldName(path) {
    const pathArray = path.split('.');
    return pathArray[pathArray.length - 1];
}

module.exports = function (data = [], options = {}) {
    const { groupBy, orderDir } = options;

    if (!data.length && !groupBy) {
        return [];
    }

    const parentPath = getParentPath(groupBy);
    const fieldName = getFieldName(groupBy);

    const groupedData = data.reduce((acc, item) => {
        const data = parentPath? get(item, parentPath): item;
        const fieldValue = data[fieldName];

        if (acc.has(fieldValue)) {
            const sum = acc.get(fieldValue);
            sum.count += 1;
            sum.score += data.score;
        } else {
            acc.set(fieldValue, {
                [fieldName]: fieldValue,
                count: 1,
                score: data.score
            });
        }

        return acc;
    }, new Map()).values();

    return orderBy(Array.from(groupedData), { orderBy: 'count', orderDir });
};


module.exports.getParentPath = getParentPath;
module.exports.getFieldName = getFieldName;
