const fetch = require('node-fetch');
const cache = new Map();

module.exports = function (url) {
    if (cache.has(url)) {
        return cache.get(url);
    }

    const requestPromise = fetch(url)
        .then((res) => {
            cache.delete(url);
            return res.json();
        })
        .catch((e) => {
            cache.delete(url);
            return Promise.reject(e);
        });

    cache.set(url, requestPromise);

    return requestPromise;
};
