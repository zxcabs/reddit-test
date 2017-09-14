const json2csv = require('json2csv');

module.exports = function (data = [], options = {}) {
    const { fields, delimiter: del } = options;
    const parsedFields = fields.split(',').map(s => s.trim());
    return json2csv({ data, fields: parsedFields, del });
};
