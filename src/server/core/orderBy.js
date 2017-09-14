const { get } = require('object-path');

module.exports = function(data = [], query = {}) {
    const { orderBy, orderDir = 'asc' } = query;

    if (!orderBy) {
        return data.slice(0);
    }

    const isOrderDirAsc = orderDir.toLocaleLowerCase() === 'asc';

    return data.slice(0).sort(function (a, b) {
        const propA = get(a, orderBy);
        const propB = get(b, orderBy);

        if (propA > propB) return isOrderDirAsc? 1: -1;
        if (propA < propB) return isOrderDirAsc? -1: 1;
        return 0;
    });
};
