'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class StringMask {
  static maskString(str, options) {
    if (!str || typeof str === 'object') return str;
    str = str + '';
    if (options) {
      options = MaskHelper.mapWithDefaultValues(options, Constants.defaultStringMaskOptions);
      MaskHelper.validateStringOptions(options);
    } else {
      options = Constants.defaultStringMaskOptions;
    }
    let values = options.values;
    if (options.maskAll === true) {
      let result = '';
      if (options.maskSpace === true) {
        result = options.maskWith.repeat(str.length);
      } else {
        for (let eachChar of str) {
          if (eachChar === ' ') {
            result += ' ';
          } else {
            result += options.maskWith;
          }
        }
      }
      return result;
    } else if (options.maskOnlyFirstOccurance == true) {
      for (const value of Object.values(values)) {
        str = str.replace(value, `${options.maskWith}`.repeat(value.length));
      }
    } else {
      for (const value of Object.values(values)) {
        str = str.replace(new RegExp(value, 'g'), `${options.maskWith}`.repeat(value.length));
      }
    }
    return str;
  }

  static maskStringV2(string, options) {
    if (!string || typeof string === 'object') return string;
    string = string + '';
    if (options) {
      options = MaskHelper.mapWithDefaultValues(options, Constants.defaultStringMaskV2Options);
      MaskHelper.validateStringMask2Options(options);
    } else {
      options = Constants.defaultStringMaskV2Options;
    }
    let maskStringLength = string.length;
    if (string.length > options.maxMaskedCharacters) {
      maskStringLength = parseInt(options.maxMaskedCharacters);
    }
    const maskingCharacters =
      maskStringLength - options.unmaskedStartCharacters - options.unmaskedEndCharacters;

    if (maskingCharacters < 0) {
      if (maskStringLength <= options.unmaskedStartCharacters) {
        return string.substring(0, maskStringLength);
      } else {
        let maskedString = string.substring(0, options.unmaskedStartCharacters);
        const remainingChars = maskStringLength - options.unmaskedStartCharacters;
        for (let i = string.length - remainingChars; i < string.length; i++) {
          maskedString += string[i];
        }
        return maskedString;
      }
    }
    let maskedString = '';
    maskedString = string.substring(0, options.unmaskedStartCharacters);
    maskedString += `${options.maskWith}`.repeat(maskingCharacters);
    for (let i = string.length - options.unmaskedEndCharacters; i < string.length; i++) {
      maskedString += string[i];
    }
    return maskedString;
  }
}

module.exports = StringMask;
