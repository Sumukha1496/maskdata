'use strict';

const MaskHelper = require('./lib/helpers/MaskHelper');
const MaskEmail = require('./lib/emailMask/EmailMask');
const get = require('lodash.get');
const set = require('lodash.set');

const defaultPhoneMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

const defaultJsonMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 0,
  unmaskedEndDigits: 0,
  fields: []
};

const defaultPasswordMaskOptions = {
  maskWith: "*",
  maxMaskedCharacters: 16
};

const defaultStringMaskOptions = {
  maskWith: "*",
  maskOnlyFirstOccurance: false,
  values: []
};

const defaultCardMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

class MaskData {

  static maskPassword(password, options) {
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
    return `${options.maskWith}`.repeat(maskPasswordLength);
  }

  static maskPhone(phone, options) {
    let maskedPhone = null;
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultPhoneMaskOptions);
      MaskHelper.validatePhoneOptions(options);
    } else {
      options = defaultPhoneMaskOptions;
    }
    let maskLength = phone.length - options.unmaskedStartDigits - options.unmaskedEndDigits;
    if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= phone.length) {
      maskLength = 0;
      maskedPhone = phone;
    }
    if(!maskedPhone) {
      maskedPhone = phone.substr(0, options.unmaskedStartDigits) + `${options.maskWith}`.repeat(maskLength) + phone.substr(phone.length-options.unmaskedEndDigits);
    }
    return maskedPhone;
  }

  static maskEmail2(email, options) {
    return MaskEmail.maskEmail2(email, options);
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
            if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= value.length) {
              set(maskedObj, field, (`${options.maskWith}`.repeat(value.toString().length)))
            }else{
              let maskLength = value.length - options.unmaskedStartDigits - options.unmaskedEndDigits;
              set(maskedObj, field, (value.substr(0, options.unmaskedStartDigits) + `${options.maskWith}`.repeat(maskLength) + value.substr(value.length-options.unmaskedEndDigits)))  
            }
          
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
    if(options.maskOnlyFirstOccurance == true) {
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

  static maskCard(card, options) {
    card = card + '';
    card = card.trim();
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultCardMaskOptions);
      MaskHelper.validateCardMaskOptions(options);
    } else {
      options = defaultCardMaskOptions;
    }
    let maskedCard;
    if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= card.length) {
      return card;
    }
    if(!maskedCard) {
      maskedCard = '';
      for(let i = 0; i < options.unmaskedStartDigits; i++) {
        maskedCard += card[i];
      }

      for(let i = options.unmaskedStartDigits; i < (card.length-options.unmaskedEndDigits); i++) {
        if(isNaN(parseInt(card[i]))) {
          maskedCard += card[i];
        } else {
          maskedCard += options.maskWith;
        }
      }
      for(let i = (card.length-options.unmaskedEndDigits); i < card.length; i++) {
        maskedCard += card[i];
      }
      return maskedCard;
    }
  }

  static getInnerProperty(object, field) {
    return get(object, field);
  }

  static replaceValue(object, field, value) {
    return set(object, field, value);
  }

}

module.exports = MaskData;