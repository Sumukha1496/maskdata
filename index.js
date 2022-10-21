'use strict';

const MaskHelper = require('./lib/helpers/MaskHelper');
const MaskEmail = require('./lib/emailMask/EmailMask');
const MaskCard = require('./lib/cardMask/CardMask');
const MaskPhone = require('./lib/phoneMask/PhoneMask');
const MaskString = require('./lib/stringMask/StringMask');
const MaskPassword = require('./lib/passwordMask/PasswordMask');
const JsonMask = require('./lib/jsonMask/JsonMask');

const {get, set} = require('lodash');

class MaskData {
  
  static maskPassword(password, options) {
    return MaskPassword.maskPassword(password, options);
  }

  static maskJSONFields(password, options) {
    return JsonMask.maskJSONFields(password, options);
  }

  static maskPhone(phone, options) {
    return MaskPhone.maskPhone(phone, options);
  }

  static maskEmail2(email, options) {
    return MaskEmail.maskEmail2(email, options);
  }

  static maskCard(cardNumber, options) {
    return MaskCard.maskCard(cardNumber, options);
  }

  static maskString(str, options) {
    return MaskString.maskString(str, options);
  }

  static getInnerProperty(object, field) {
    return get(object, field);
  }

  static replaceValue(object, field, value) {
    return set(object, field, value);
  }

}

module.exports = MaskData;