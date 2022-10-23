'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class StringMask {
    static maskString(str, options) {
        if(!str || typeof(str) === 'object') return str;
        str = str + '';
        if(options) {
          options = MaskHelper.mapWithDefaultValues(options, Constants.defaultStringMaskOptions);
          MaskHelper.validateStringOptions(options);
        } else {
          options = Constants.defaultStringMaskOptions;
        }
        let values = options.values;
        if(options.maskAll === true) {
          let result = '';
           if(options.maskSpace === true) {
              result = options.maskWith.repeat(str.length);
           } else {
              for(let eachChar of str) {
                if(eachChar === ' ') {
                  result += ' ';
                } else {
                  result += options.maskWith;
                }
               }
           }
          return result;
        }
        else if(options.maskOnlyFirstOccurance == true) {
          for(const value of Object.values(values)) {
            str = str.replace(value, `${options.maskWith}`.repeat(value.length));
          }
        } else {
          for(const value of Object.values(values)) {
            str = str.replace(new RegExp(value, 'g'), `${options.maskWith}`.repeat(value.length));
          }
        }
        return str;
    }
}

module.exports = StringMask