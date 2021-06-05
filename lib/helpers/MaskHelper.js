const BadOption = require('../ExceptionsHandler/BadOption');

class MaskHelper {

  static mapWithDefaultValues(options, defaultOptions) {
    for(let key of Object.keys(defaultOptions)) {
      if(options[key] === undefined || options[key] === null) {
        options[key] = defaultOptions[key];
      }
    }
    return options;
  }

  static validatePasswordOptions(options) {
    let reasons = [];
    try{
      options.maxMaskedCharacters = parseInt(options.maxMaskedCharacters);
      options.unmaskedStartCharacters = parseInt(options.unmaskedStartCharacters);
      options.unmaskedEndCharacters = parseInt(options.unmaskedEndCharacters);
      if(isNaN(options.maxMaskedCharacters) || isNaN(options.unmaskedStartCharacters) || 
        isNaN(options.unmaskedEndCharacters)) {
        throw Error();
      };
    } catch(err) {
      reasons.push('maxMaskedCharacters, unmaskedStartCharacters and unmaskedEndCharacters must be positive integer');
    }
    if(options.maxMaskedCharacters < 0) {
      options.maxMaskedCharacters = 16;
    }
    if(options.unmaskedStartCharacters < 0) {
      options.unmaskedStartCharacters = 0;
    }
    if(options.unmaskedEndCharacters < 0) {
      options.unmaskedEndCharacters = 0;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Password mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validatePhoneOptions(options) {
    let reasons = [];
    try{
      options.unmaskedStartDigits = parseInt(options.unmaskedStartDigits);
      options.unmaskedEndDigits = parseInt(options.unmaskedEndDigits);
      if(isNaN(options.unmaskedStartDigits) || isNaN(options.unmaskedEndDigits)){
        throw Error();
      };
    }catch(err) {
      reasons.push('unmaskedStartDigits and unmaskedEndDigits must be positive integers');
    }
    if(options.unmaskedStartDigits < 0) {
      options.unmaskedStartDigits = 0;
    }
    if(options.unmaskedEndDigits < 0) {
      options.unmaskedEndDigits = 0;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Phone mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateEmailOptions(email, options) {
    let reasons = [];
    if(!email || email.indexOf('@') < 0) {
      reasons.push(`Email must contain one '@'`);
    }
    try{
      options.unmaskedStartCharacters = parseInt(options.unmaskedStartCharacters);
      options.unmaskedEndCharacters = parseInt(options.unmaskedEndCharacters);
      options.maxMaskedCharactersBeforeAtTheRate = parseInt(options.maxMaskedCharactersBeforeAtTheRate);
      options.maxMaskedCharactersAfterAtTheRate = parseInt(options.maxMaskedCharactersAfterAtTheRate);
      if(isNaN(options.unmaskedStartCharacters) || isNaN(options.unmaskedEndCharacters) ||
        isNaN(options.maxMaskedCharactersBeforeAtTheRate) || isNaN(options.maxMaskedCharactersAfterAtTheRate)){
        throw Error();
      };
    }catch(err) {
      reasons.push('unmaskedStartCharacters, unmaskedEndCharacters, maxMaskedCharactersBeforeAtTheRate and maxMaskedCharactersAfterAtTheRate must be positive integers');
    }
    if(options.unmaskedStartCharacters < 0) {
      options.unmaskedStartCharacters = 0;
    }
    if(options.unmaskedEndCharacters < 0) {
      options.unmaskedEndCharacters = 0;
    }
    if(options.maxMaskedCharactersBeforeAtTheRate < 0) {
      options.maxMaskedCharactersBeforeAtTheRate = 20;
    }
    if(options.maxMaskedCharactersAfterAtTheRate < 0) {
      options.maxMaskedCharactersAfterAtTheRate = 20;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(typeof(options.maskAtTheRate) !== 'boolean') {
      reasons.push('maskAtTheRate should be a boolean field');
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Email mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }
  
  static validateEmailOptions2(email, options) {
    let reasons = [];
    if(!email || email.indexOf('@') < 0) {
      reasons.push(`Email must contain one '@'`);
    }
    try{
      options.unmaskedStartCharactersBeforeAt = parseInt(options.unmaskedStartCharactersBeforeAt);
      options.unmaskedEndCharactersAfterAt = parseInt(options.unmaskedEndCharactersAfterAt);
      if(isNaN(options.unmaskedStartCharactersBeforeAt) || isNaN(options.unmaskedEndCharactersAfterAt)){
        throw Error();
      };
    }catch(err) {
      reasons.push('unmaskedStartCharactersBeforeAt, unmaskedEndCharactersAfterAt must be positive integers');
    }
    if(options.unmaskedStartCharactersBeforeAt < 0) {
      options.unmaskedStartCharactersBeforeAt = 0;
    }
    if(options.unmaskedEndCharactersAfterAt < 0) {
      options.unmaskedEndCharactersAfterAt = 0;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(typeof(options.maskAtTheRate) !== 'boolean') {
      reasons.push('maskAtTheRate should be a boolean field');
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Email mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateJSONOptions(options) {
    let reasons = [];
    if(!(options.fields instanceof Array)) {
      reasons.push(`fields should be an Array`);
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('JSON mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateStringOptions(options) {
    let reasons = [];
    if(!(options.values instanceof Array)) {
      reasons.push(`values should be an Array`);
    }
    if(typeof(options.maskOnlyFirstOccurance) !== 'boolean') {
      reasons.push('maskOnlyFirstOccurance should be a boolean field');
    }
    if(typeof(options.maskAll) !== 'boolean') {
      reasons.push('maskAll should be a boolean field');
    }
    if(typeof(options.maskSpace) !== 'boolean') {
      reasons.push('maskSpace should be a boolean field');
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('string mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }

  static validateCardMaskOptions(options, cardLength) {
    let reasons = [];
    try{
      options.unmaskedStartDigits = parseInt(options.unmaskedStartDigits);
      options.unmaskedEndDigits = parseInt(options.unmaskedEndDigits);
      if(isNaN(options.unmaskedStartDigits) || isNaN(options.unmaskedEndDigits)){
        throw Error();
      };
    }catch(err) {
      reasons.push('unmaskedStartDigits and unmaskedEndDigits must be positive integers');
    }
    if(options.unmaskedStartDigits < 0) {
      options.unmaskedStartDigits = 0;
    } else if(options.unmaskedStartDigits > cardLength) {
      options.unmaskedStartDigits = cardLength;
    }
    if(options.unmaskedEndDigits < 0) {
      options.unmaskedEndDigits = 0;
    } else if(options.unmaskedEndDigits > cardLength) {
      options.unmaskedEndDigits = cardLength;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(reasons.length > 0) {
      const badOptions = new BadOption('Phone mask configuration', reasons);
      badOptions.throwBadOptionException();
    }
  }
}

module.exports = MaskHelper;