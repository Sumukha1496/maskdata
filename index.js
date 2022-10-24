'use strict';

const MaskEmail = require('./lib/maskService/EmailMask');
const MaskCard = require('./lib/maskService/CardMask');
const MaskPhone = require('./lib/maskService/PhoneMask');
const MaskString = require('./lib/maskService/StringMask');
const MaskPassword = require('./lib/maskService/PasswordMask');
const MaskUuid = require('./lib/maskService/UuidMask');
const JsonMask = require('./lib/maskService/JsonMask');
const JsonGetSet = require('./lib/helpers/jsonGetSet');

class MaskData {
  
  static maskPassword(password, options) {
    return MaskPassword.maskPassword(password, options);
  }

  static maskJSONFields(json, options) {
    return JsonMask.maskJSONFields(json, options);
  }

  static maskJSON2(json, options) {
    return JsonMask.maskJSON2(json, options);
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

  static maskUuid(uuid, options) {
    return MaskUuid.maskUuid(uuid, options);
  }

  static getInnerProperty(object, field) {
    return JsonGetSet.get(object, field);
  }

  static replaceValue(object, field, value) {
    return JsonGetSet.set(object, field, value);
  }

}

module.exports = MaskData;