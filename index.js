'use strict';

const MaskHelper = require('./lib/helpers/MaskHelper');

const defaultPhoneMaskOptions = {
  maskWith : "*",
  unmaskedStartDigits : 4,
  unmaskedEndDigits : 1
};

const defaultEmailMaskOptions = {
  maskWith : "*",
  unmaskedStartCharacters : 3,
  unmaskedEndCharacters : 2,
  maskAtTheRate : false,
  maxMaskedCharactersBeforeAtTheRate : 10,
  maxMaskedCharactersAfterAtTheRate : 10,
};

const defaultJsonMaskOptions = {
  maskWith : "*",
  fields : []
};

const defaultPasswordMaskOptions = {
  maskWith : "*",
  maxMaskedCharacters : 16
};

const defaultStringMaskOptions = {
  maskWith : "*",
  maskOnlyFirstOccurance : false,
  values : []
};

class MaskData {

  static simplePasswordMask(password) {
    return MaskData.maskPassword(password, defaultPasswordMaskOptions);
  }

  static maskPassword(password, options) {
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultPasswordMaskOptions);
      MaskHelper.validatePasswordOptions(options);
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

  static maskEmail(email, options) {
    let maskedEmail = null;
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultEmailMaskOptions);
      MaskHelper.validateEmailOptions(email, options);
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
      maskedEmail = email.substr(0, options.unmaskedStartCharacters) + `${options.maskWith}`.repeat(maskLengthBeforeAtTheRate)
        + '@' + `${options.maskWith}`.repeat(maskLengthAfterAtTheRate) + email.substr(email.length - options.unmaskedEndCharacters);
    }
    return maskedEmail;
  }

  static maskJSONFields(obj, options) {
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultJsonMaskOptions);
      MaskHelper.validateJSONOptions(options);
    }
    let maskedObj = obj;
    let fields = options.fields;
    for(const key of Object.keys(obj)) {
      if(fields.includes(key)) {
        maskedObj[key] = `${options.maskWith}`.repeat(obj[key].toString().length);
      }
    }
    return maskedObj;
  }

  static maskString(str, options) {
    str = str + '';
    if(options) {
      options = MaskHelper.mapWithDefaultValues(options, defaultStringMaskOptions);
      MaskHelper.validateStringOptions(options);
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
}

module.exports = MaskData;
