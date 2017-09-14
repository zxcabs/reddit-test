const sqlFormatter = require('../core/sqlFormatter');

module.exports = function (req, res, next) {
    const { format } = req.body;

    if (format && format.toLocaleLowerCase() === 'sql') {
        const send = res.send;

        res.send = (data) => {
            const { tableName, fields } = req.body;
            try {
                const sql = sqlFormatter(data, { tableName, fields });
                res.type('text');
                send.call(res, sql);
            } catch (error) {
                next(error);
            }
        };
    }

    next();
};
