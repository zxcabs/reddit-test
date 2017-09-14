const sqlString = require('sqlstring');
const { get } = require('object-path');
const parseFieldsOption = require('./parseFieldsOption');

module.exports = function (data = [], options = {}) {
    if (!data.length) {
        return '';
    }

    const { tableName = 'MyTable' } = options;
    const fields= parseFieldsOption(options.fields);
    const setValue = data.map(item => fields.reduce((acc, field) => {
        const [key, name] = field;
        acc[name] = get(item, key);
        return acc;
    }, {}));
    const insertString = `INSERT INTO ${tableName} SET ?;`;

    return setValue.map((value) => sqlString.format(insertString, value)).join('\r\n');
};
