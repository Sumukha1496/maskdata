const {get, set} = require('lodash');

class JsonGetSet {
    static get(object, field) {
        return get(object, field);
    }

    static set(object, field, value) {
        return set(object, field, value);
    }
}

module.exports = JsonGetSet
  