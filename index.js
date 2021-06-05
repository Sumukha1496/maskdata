'use strict';

const MaskHelper = require('./lib/helpers/MaskHelper');
const MaskEmail = require('./lib/emailMask/EmailMask');
const MaskCard = require('./lib/cardMask/CardMask');
const get = require('lodash.get');
const set = require('lodash.set');

const defaultPhoneMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

const defaultJsonMaskOptions = {
  maskWith: "*",
  fields: []
};

const defaultPasswordMaskOptions = {
  maskWith: "*",
  maxMaskedCharacters: 16,
  unmaskedStartCharacters: 0,
  unmaskedEndCharacters: 0
};

const defaultStringMaskOptions = {
  maskWith: "*",
  maskOnlyFirstOccurance: false,
  values: [],
  maskAll: false,
  maskSpace: true
};

class MaskData {

  static maskPassword(password, options) {
    if(!password) {
      return password;
    }
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultPasswordMaskOptions);
      MaskHelper.validatePasswordOptions(options);
    } else {
      options = defaultPasswordMaskOptions;
    }
    let maskPasswordLength = password.length;
    if(password.length > options.maxMaskedCharacters) {
      maskPasswordLength = parseInt(options.maxMaskedCharacters);
    }
    const maskingCharacters = maskPasswordLength - options.unmaskedStartCharacters - options.unmaskedEndCharacters;

    if(maskingCharacters < 0) {
      if(maskPasswordLength <= options.unmaskedStartCharacters) {
        return password.substr(0, maskPasswordLength);
      } else {
        let maskedPassword = password.substr(0, options.unmaskedStartCharacters);
        const remainingChars = maskPasswordLength - options.unmaskedStartCharacters;
        for(let i = password.length-remainingChars; i < password.length; i++) {
          maskedPassword += password[i];
        } 
        return maskedPassword;
      }
    }
    let maskedPassword = "";
    maskedPassword = password.substr(0, options.unmaskedStartCharacters);
    maskedPassword += `${options.maskWith}`.repeat(maskingCharacters)
    for(let i = password.length-options.unmaskedEndCharacters; i < password.length; i++) {
      maskedPassword += password[i];
    } 
    return maskedPassword;
  }

  static maskPhone(phone, options) {
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultPhoneMaskOptions);
      MaskHelper.validatePhoneOptions(options);
    } else {
      options = defaultPhoneMaskOptions;
    }
    let maskLength = phone.length - options.unmaskedStartDigits - options.unmaskedEndDigits;
    if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= phone.length) {
      return phone;
    }
    return phone.substr(0, options.unmaskedStartDigits) + `${options.maskWith}`.repeat(maskLength) + phone.substr(phone.length-options.unmaskedEndDigits);
  }

  static maskEmail2(email, options) {
    return MaskEmail.maskEmail2(email, options);
  }

  static maskCard(cardNumber, options) {
    return MaskCard.maskCard(cardNumber, options);
  }

  static maskJSONFields(obj, options) {
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultJsonMaskOptions);
      MaskHelper.validateJSONOptions(options);
    } else {
      options = defaultJsonMaskOptions;
    }
    let maskedObj = {};
    try {
      maskedObj = JSON.parse(JSON.stringify(obj));
    } catch (ex) {
      return obj;
    }
    const fields = options.fields;

    for(const field of fields) {
      try {
        if(field.includes('[*].')) {
          let [arrayFieldName, subField] = field.split('[*].');
          const arrayValue = get(maskedObj, arrayFieldName);
          for(const arrayElement of arrayValue) {
            const value = arrayElement[subField];
            if(value !== undefined && value !== null) {
              set(arrayElement, subField, (`${options.maskWith}`.repeat(value.toString().length)))
            }
          }
        } else if(field.includes('.*')) {
          let subField = field.split('.*')[0];
          const innerObject = get(maskedObj, subField);
          for(const innerObjectField of Object.keys(innerObject)) {
            const value = innerObject[innerObjectField];
            if(value !== undefined && value !== null) {
              set(innerObject, innerObjectField, (`${options.maskWith}`.repeat(value.toString().length)))
            }
          }
        } else {
          const value = get(maskedObj, field);
          if(value !== undefined && value !== null) {
          set(maskedObj, field, (`${options.maskWith}`.repeat(value.toString().length)))
        }
        }
      } catch(ex) { continue; }
    }
    return maskedObj;
  }

  static maskString(str, options) {
    str = str + '';
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultStringMaskOptions);
      MaskHelper.validateStringOptions(options);
    } else {
      options = defaultStringMaskOptions;
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

  static getInnerProperty(object, field) {
    return get(object, field);
  }

  static replaceValue(object, field, value) {
    return set(object, field, value);
  }

}

module.exports = MaskData;