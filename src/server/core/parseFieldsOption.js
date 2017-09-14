/**
 * Parse fields options from string "key=name, key2=name2" to [["key", "name"], ["key2", "name2"]]
 * @param   {String}    fieldsString
 * @returns {Array<key, name>}
 */
module.exports = function (fieldsString = '') {
    if (!fieldsString) {
        return [];
    }

    return fieldsString.split(',').map((item) => {
        const [key, name] = item.split('=');

        return [key.trim(), name? name.trim(): key.trim()];
    });
};
