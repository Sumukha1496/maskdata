'use strict';

const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

const CardMask = require('./CardMask');
const EmailMask = require('./EmailMask');
const PasswordMask = require('./PasswordMask');
const PhoneMask = require('./PhoneMask');
const StringMask = require('./StringMask');
const UuidMask = require('./UuidMask');
const JsonGetSet = require('../helpers/jsonGetSet');

class JsonMask {
    static maskJSONFields(obj, options) {
        if(options) {
          options = MaskHelper.mapWithDefaultValues(options, Constants.defaultJsonMaskOptions);
          MaskHelper.validateJSONOptions(options);
        } else {
          options = Constants.defaultJsonMaskOptions;
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
              const arrayValue = JsonGetSet.get(maskedObj, arrayFieldName);
              for(const arrayElement of arrayValue) {
                const value = arrayElement[subField];
                if(value === undefined || value === null) {
                  continue;
                } else {
                  if(typeof(value) == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                    JsonGetSet.set(arrayElement, subField, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
                  } else {
                    JsonGetSet.set(arrayElement, subField, (`${options.maskWith}`.repeat(value.toString().length)));
                  }
                }
              }
            } else if(field.includes('.*')) {
              let subField = field.split('.*')[0];
              const innerObject = JsonGetSet.get(maskedObj, subField);
              for(const innerObjectField of Object.keys(innerObject)) {
                const value = innerObject[innerObjectField];
                if(value === undefined || value === null) {
                  continue;
                } else {
                  if(typeof(value) == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                    JsonGetSet.set(innerObject, innerObjectField, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
                  } else {
                    JsonGetSet.set(innerObject, innerObjectField, (`${options.maskWith}`.repeat(value.toString().length)));
                  }
                }
              }
            } else {
                const value = JsonGetSet.get(maskedObj, field);
                if(value === undefined || value === null) {
                  continue;
                }
                if(typeof(value) == 'string' && options.maxMaskedCharactersStr != -1 && options.maxMaskedCharactersStr < value.length) {
                  JsonGetSet.set(maskedObj, field, (`${options.maskWith}`.repeat(options.maxMaskedCharactersStr)))
                } else {
                  JsonGetSet.set(maskedObj, field, (`${options.maskWith}`.repeat(value.toString().length)))
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
        const masked = CardMask.maskCard(JsonGetSet.get(maskedObj, field), validatedConfig.cardMaskOptions);
        JsonGetSet.set(maskedObj, field, masked);
      }

      for(const field of validatedConfig.emailFields) {
        const masked = EmailMask.maskEmail2(JsonGetSet.get(maskedObj, field), validatedConfig.emailMaskOptions);
        JsonGetSet.set(maskedObj, field, masked);
      }

      for(const field of validatedConfig.passwordFields) {
        const masked = PasswordMask.maskPassword(JsonGetSet.get(maskedObj, field), validatedConfig.passwordMaskOptions);
        JsonGetSet.set(maskedObj, field, masked);
      }

      for(const field of validatedConfig.phoneFields) {
        const masked = PhoneMask.maskPhone(JsonGetSet.get(maskedObj, field), validatedConfig.phoneMaskOptions);
        JsonGetSet.set(maskedObj, field, masked);
      }

      for(const field of validatedConfig.stringFields) {
        const masked = StringMask.maskString(JsonGetSet.get(maskedObj, field), validatedConfig.stringMaskOptions);
        JsonGetSet.set(maskedObj, field, masked);
      }

      for(const field of validatedConfig.uuidFields) {
        const masked = UuidMask.maskUuid(JsonGetSet.get(maskedObj, field), validatedConfig.uuidMaskOptions);
        JsonGetSet.set(maskedObj, field, masked);
      }
      return maskedObj;
    }
}

module.exports = JsonMask