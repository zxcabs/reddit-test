const csvFormatter = require('../core/csvFormatter');

module.exports = function (req, res, next) {
    const { format } = req.body;

    if (format && format.toLocaleLowerCase() === 'csv') {
        const send = res.send;

        res.send = (data) => {
            const { delimiter, fields } = req.body;

            try {
                const csv = csvFormatter(data, { delimiter, fields });
                res.type('text');
                send.call(res, csv);
            } catch (error) {
                next(error);
            }
        };
    }

    next();
};
