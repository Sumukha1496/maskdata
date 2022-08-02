'use strict';

const MaskHelper = require('./lib/helpers/MaskHelper');
const MaskEmail = require('./lib/emailMask/EmailMask');
const MaskCard = require('./lib/cardMask/CardMask');
const {get, set} = require('lodash');

const defaultPhoneMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

const defaultJsonMaskOptions = {
  maskWith: "*",
  fields: [],
  maxMaskedCharactersStr: -1
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
    if(!phone) return phone;
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
    const setValueFunc = function(jsonObj, value, subField, options) {
      if (typeof(value) === 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
        set(jsonObj, subField, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
      }
      else {
        set(jsonObj, subField, (`${options.maskWith}`.repeat(value.toString().length)));
      }
    }

    for(const field of fields) {
      try {
        if(field.includes('[*]')) {
          const splitIdx = field.indexOf('[*]');
          const arrayFieldName  = field.substring(0, splitIdx);
          const subField = field.substring(splitIdx + 4);  // length of search string "[*]." - need trailing dot here for subpatterns
          const arrayValue = get(maskedObj, arrayFieldName);
          for(let idx in arrayValue) {
            if (subField === '') {
              setValueFunc(arrayValue, arrayValue[idx], idx, options);
            }
            if (subField.includes('.')) {
              const subOptions = Object.assign({}, options);
              subOptions.fields = [subField];
              arrayValue[idx] = this.maskJSONFields(arrayValue[idx], subOptions);
            }
            else {
              const value = arrayValue[idx][subField];
              if (value === undefined || value === null) continue;
              setValueFunc(arrayValue[idx], value, subField, options);
            }
          }
        }
        else if(field.includes('.*')) {
          const splitIdx = field.indexOf('.*');
          const jsonPath = field.substring(0, splitIdx);
          const innerObject = get(maskedObj, jsonPath);
          let subField = field.substring(splitIdx + 2);
          if (subField.startsWith('.')) subField = subField.slice(1);
          for(const innerObjectField of Object.keys(innerObject)) {
            const value = innerObject[innerObjectField];
            if (value === undefined || value === null) continue;
            if ((typeof value === 'object' || Array.isArray(value)) && subField !== '') {
              const subOptions = Object.assign({}, options);
              subOptions.fields = [subField];
              set(maskedObj, jsonPath + '.' + innerObjectField, this.maskJSONFields(innerObject[innerObjectField], subOptions));
            }
            else {
              if (innerObjectField === subField || subField === '') {
                setValueFunc(innerObject, value, innerObjectField, options);
              }
            }
          }
        } else {
          const value = get(maskedObj, field);
          if(value === undefined || value === null) continue;
          setValueFunc(maskedObj, value, field, options);
        }
      } catch(ex) { continue; }
    }
    return maskedObj;
  }

  static maskString(str, options) {
    if(!str) return str;
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
