const dataFetcher = require('../core/dataFetcher');
const group = require('../core/groupBy');

module.exports = function (req, res, next) {
    const { url, groupBy, orderDir } = req.body;

    dataFetcher(url)
        .then((json) => {
            const { data } = json;
            res.send(group(data.children, { groupBy, orderDir }));
        })
        .catch(error => next(error));
};
