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

const defaultEmailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharacters: 3,
  unmaskedEndCharacters: 2,
  maskAtTheRate: false,
  maxMaskedCharactersBeforeAtTheRate: 10,
  maxMaskedCharactersAfterAtTheRate: 10,
};

const defaultJsonMaskOptions = {
  maskWith: "*",
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

  static simplePasswordMask(password) {
    return MaskData.maskPassword(password, defaultPasswordMaskOptions);
  }

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

  static simplePhoneMask(phone) {
    return MaskData.maskPhone(phone, defaultPhoneMaskOptions);
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

  static simpleEmailMask(email) {
    return MaskData.maskEmail(email, defaultEmailMaskOptions);
  }

  static maskEmail2(email, options) {
    return MaskEmail.maskEmail2(email, options);
  }

  static maskEmail(email, options) {
    let maskedEmail = null;
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultEmailMaskOptions);
        MaskHelper.validateEmailOptions(email, options);
    } else {
      options = defaultEmailMaskOptions;
    }
    const indexOfAt = email.indexOf('@');
    let maskLengthBeforeAtTheRate = indexOfAt - options.unmaskedStartCharacters;
    let maskLengthAfterAtTheRate = email.length - indexOfAt - options.unmaskedEndCharacters;

    if(maskLengthBeforeAtTheRate > options.maxMaskedCharactersBeforeAtTheRate) {
      maskLengthBeforeAtTheRate = options.maxMaskedCharactersBeforeAtTheRate;
    }
    if(maskLengthAfterAtTheRate > options.maxMaskedCharactersAfterAtTheRate) {
      maskLengthAfterAtTheRate = options.maxMaskedCharactersAfterAtTheRate;
    }
    if((options.unmaskedStartCharacters + options.unmaskedEndCharacters + 1) >= email.length) {
      maskLengthBeforeAtTheRate = 0;
      maskLengthAfterAtTheRate = 0;
      maskedEmail = email;
    }
    if(!maskedEmail) {
      if (maskLengthBeforeAtTheRate < 0) maskLengthBeforeAtTheRate = 0
      maskedEmail = email.substr(0, options.unmaskedStartCharacters) + `${options.maskWith}`.repeat(maskLengthBeforeAtTheRate)
        + '@' + `${options.maskWith}`.repeat(maskLengthAfterAtTheRate) + email.substr(email.length - options.unmaskedEndCharacters);
    }
    return maskedEmail;
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