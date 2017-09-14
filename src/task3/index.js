/**
 * Make nested array
 * @param   {Array} source
 * @returns {Array}
 */
module.exports = function (source = []) {
    const rootObject = new Map();
    const allObjects = new Map();

    source.forEach((item) => {
        const copy = Object.assign({}, item);
        const { id, parentId } = copy;

        allObjects.set(id, copy);

        const hasParent = allObjects.has(parentId);

        if (hasParent) {
            const parent = allObjects.get(parentId);
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(copy);

            rootObject.delete(id);
        } else {
            rootObject.set(id, copy);
        }
    });

    return Array.from(rootObject.values());
};
