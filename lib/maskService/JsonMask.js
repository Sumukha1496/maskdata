'use strict';

const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

const CardMask = require('./CardMask');
const EmailMask = require('./EmailMask');
const PasswordMask = require('./PasswordMask');
const PhoneMask = require('./PhoneMask');
const StringMask = require('./StringMask');
const UuidMask = require('./UuidMask');
const JwtMask = require('./JwtMask');
const JsonGetSet = require('../helpers/jsonGetSet');

const typeToFunctionMap = {
  card: [CardMask.maskCard, 'cardFields', 'cardMaskOptions'],
  email: [EmailMask.maskEmail2, 'emailFields', 'emailMaskOptions'],
  password: [PasswordMask.maskPassword, 'passwordFields', 'passwordMaskOptions'],
  phone: [PhoneMask.maskPhone, 'phoneFields', 'phoneMaskOptions'],
  string: [StringMask.maskString, 'stringFields', 'stringMaskOptions'],
  uuid: [UuidMask.maskUuid, 'uuidFields', 'uuidMaskOptions'],
  jwt: [JwtMask.maskJwt, 'jwtFields', 'jwtMaskOptions'],
  generic: [StringMask.maskStringV2, 'fields', 'config']
};

class JsonMask {
  static maskJSON2(obj, config) {
    if (!config) {
      config = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
    }
    const validatedConfig = MaskHelper.getValidatedJsonMask2Configs(config);
    let maskedObj = {};
    try {
      maskedObj = JSON.parse(JSON.stringify(obj));
    } catch (ex) {
      return obj;
    }

    for (const key of Object.keys(typeToFunctionMap)) {
      if (!validatedConfig[typeToFunctionMap[key][1]]) continue;
      for (const field of validatedConfig[typeToFunctionMap[key][1]]) {
        this.mask(maskedObj, field, key, validatedConfig[typeToFunctionMap[key][2]]);
      }
    }
    if (validatedConfig['genericStrings'] && validatedConfig['genericStrings'].length > 0) {
      for (let genericString of validatedConfig['genericStrings']) {
        if (genericString['fields'] && genericString['fields'].length > 0) {
          let validatedMaskConfig = MaskHelper.validateStringMask2Options(genericString['config']);
          for (let field of genericString['fields']) {
            this.mask(maskedObj, field, 'generic', validatedMaskConfig);
          }
        }
      }
    }
    return maskedObj;
  }

  static mask(json, field, type, maskConfig) {
    if (field.includes('.*') && !field.endsWith('.*')) {
      console.warn('Ignoring the invalid field while masking: ', field);
      return;
    }

    if (field.includes('[*].')) {
      const index = field.indexOf('[*]');
      const left = field.substring(0, index);
      const right = field.substring(index + 3);
      const count = JsonGetSet.get(json, left);
      if (count === undefined || count === null || count === '') return;
      let i = 0;
      for (let i = 0; i < count.length; i++) {
        this.mask(json, `${left}[${i}]${right}`, type, maskConfig);
      }
    } else if (field.includes('.*')) {
      const index = field.indexOf('.*');
      const left = field.substring(0, index);
      const keys = this.getNestedKeys(JsonGetSet.get(json, left), left);
      for (const key of keys) {
        this.mask(json, key, type, maskConfig);
      }
    } else {
      const value = JsonGetSet.get(json, field);
      if (value !== null && value !== undefined) {
        const masked = typeToFunctionMap[type][0](value, maskConfig);
        JsonGetSet.set(json, field, masked);
        return json;
      }
    }
  }

  static getNestedKeys(obj, prefix = '') {
    let keys = [];
    if (typeof obj === 'string') {
      keys.push(prefix);
      return keys;
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

module.exports = JsonMask;
