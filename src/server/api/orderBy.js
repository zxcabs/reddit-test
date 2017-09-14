const dataFetcher = require('../core/dataFetcher');
const order = require('../core/orderBy');

module.exports = function (req, res, next) {
    const { url, orderBy, orderDir } = req.body;

    dataFetcher(url)
        .then((json) => {
            const { data } = json;
            res.send(order(data.children, { orderBy, orderDir }));
        })
        .catch(error => next(error));
};
