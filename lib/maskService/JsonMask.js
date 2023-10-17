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

const typeToFunctionMap = {
  "card":  [CardMask.maskCard, "cardFields", "cardMaskOptions"],
  "email":  [EmailMask.maskEmail2, "emailFields", "emailMaskOptions"],
  "password":  [PasswordMask.maskPassword, "passwordFields", "passwordMaskOptions"],
  "phone":  [PhoneMask.maskPhone, "phoneFields", "phoneMaskOptions"],
  "string":  [StringMask.maskString, "stringFields", "stringMaskOptions"],
  "uuid":  [UuidMask.maskUuid, "uuidFields", "uuidMaskOptions"]
}

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

      for(const key of Object.keys(typeToFunctionMap)) {
        for(const field of validatedConfig[typeToFunctionMap[key][1]]) {
          this.mask(maskedObj, field, key, validatedConfig[typeToFunctionMap[key][2]])
        }
      }
      return maskedObj;
    }

    static mask(json, field, type, maskConfig) {

      if(field.includes(".*") && !field.endsWith(".*")) {
        console.log("Ignoring the invalid field: ", field)
        return;
      }
      
      if(field.includes("[*].")) {
          const index = field.indexOf("[*]")
          const left = field.substring(0, index);
          const right = field.substring(index+3);
          const count = JsonGetSet.get(json, left)
          if(count === undefined || count === null || count === "") return
          let i = 0;
          for(let i = 0; i < count.length; i++) {
            this.mask(json, `${left}[${i}]${right}`, type, maskConfig)
          }
      } else if(field.includes(".*")) {
        const index = field.indexOf(".*")
        const left = field.substring(0, index);
        const keys = this.getNestedKeys(JsonGetSet.get(json, left), left);
        for(const key of keys) {
          this.mask(json, key, type, maskConfig)
        }
      }
      else {
          const value = JsonGetSet.get(json, field)
          const masked = typeToFunctionMap[type][0](value, maskConfig)
          JsonGetSet.set(json, field, masked)
          return json;
      }
   }

   static getNestedKeys(obj, prefix = '') {
    let keys = [];
    if(typeof(obj) === 'string') {
      keys.push(prefix);
      return keys
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          keys = keys.concat(this.getNestedKeys(obj[key], fullPath));
        } else if (Array.isArray(obj[key])) {
          for (let i = 0; i < obj[key].length; i++) {
            keys = keys.concat(this.getNestedKeys(obj[key][i], `${fullPath}[${i}]`));
          }
        } else {
          keys.push(fullPath);
        }
      }
    }
    return keys;
  }
}

module.exports = JsonMask