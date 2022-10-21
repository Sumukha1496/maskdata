const MaskHelper = require('../helpers/MaskHelper');
const MaskEmail = require('../emailMask/EmailMask');
const MaskCard = require('../cardMask/CardMask');
const MaskPhone = require('../phoneMask/PhoneMask');
const MaskPassword = require('../passwordMask/PasswordMask');
const MaskString = require('../stringMask/StringMask');
const Constants = require('../Constants');
const CardMask = require('../cardMask/CardMask');

const {get, set} = require('lodash');
const EmailMask = require('../emailMask/EmailMask');
const PasswordMask = require('../passwordMask/PasswordMask');
const PhoneMask = require('../phoneMask/PhoneMask');
const StringMask = require('../stringMask/StringMask');

class JsonMask {
    static maskJSONFields(obj, options) {
        if(options) {
          options = MaskHelper.mapWithDefaultValues(options, Constants.defaultjsonMask2Configs);
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
                if(value === undefined || value === null) {
                  continue;
                } else {
                  if(typeof(value) == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                    set(arrayElement, subField, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
                  } else {
                    set(arrayElement, subField, (`${options.maskWith}`.repeat(value.toString().length)));
                  }
                }
              }
            } else if(field.includes('.*')) {
              let subField = field.split('.*')[0];
              const innerObject = get(maskedObj, subField);
              for(const innerObjectField of Object.keys(innerObject)) {
                const value = innerObject[innerObjectField];
                if(value === undefined || value === null) {
                  continue;
                } else {
                  if(typeof(value) == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                    set(innerObject, innerObjectField, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
                  } else {
                    set(innerObject, innerObjectField, (`${options.maskWith}`.repeat(value.toString().length)));
                  }
                }
              }
            } else {
                const value = get(maskedObj, field);
                if(value === undefined || value === null) {
                  continue;
                }
                if(typeof(value) == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                  set(maskedObj, field, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
                } else {
                  set(maskedObj, field, (`${options.maskWith}`.repeat(value.toString().length)))
                }
            }
          } catch(ex) { continue; }
        }
        return maskedObj;
    }

    static maskJSON2(obj, config) {
      const validatedConfig = MaskHelper.getValidatedJsonMask2Configs(config)
      let maskedObj = {};
      try {
        maskedObj = JSON.parse(JSON.stringify(obj));
      } catch (ex) {
        return obj;
      }
      for(const field of validatedConfig.cardFields) {
        maskedObj = CardMask.maskCard(get(maskedObj, field), validatedConfig.cardMaskOptions);
      }

      for(const field of validatedConfig.emailFields) {
        maskedObj = EmailMask.maskEmail2(get(maskedObj, field), validatedConfig.emailMaskOptions);
      }

      for(const field of validatedConfig.passwordFields) {
        maskedObj = PasswordMask.maskPassword(get(maskedObj, field), validatedConfig.passwordMaskOptions);
      }

      for(const field of validatedConfig.phoneFields) {
        maskedObj = PhoneMask.maskPhone(get(maskedObj, field), validatedConfig.phoneMaskOptions);
      }

      for(const field of validatedConfig.stringFields) {
        maskedObj = StringMask.maskString(get(maskedObj, field), validatedConfig.stringMaskOptions);
      }
      return maskedObj;
    }
}

module.exports = JsonMask