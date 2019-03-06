class MaskHelper {

  static mapWithDefaultValues(options, defaultOptions) {
    for(let key of Object.keys(defaultOptions)) {
      if(!options[key] || options[key].toString().trim().length == 0) {
        options[key] = defaultOptions[key];
      }
    }
    return options;
  }

  static validatePasswordOptions(options) {
    let errorFields = [];
    try{
      options.maxMaskedCharacters = parseInt(options.maxMaskedCharacters);
    }catch(err) {
      errorFields.push('maxMaskedCharacters must be positive integer');
    }
    if(options.maxMaskedCharacters < 0) {
      options.maxMaskedCharacters = 0;
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(errorFields.length > 0) {
      console.log(errorFields);
      process.exit(1);
    }
  }

  static validatePhoneOptions(options) {
    let errorFields = [];
    try{
      options.unmaskedStartDigits = parseInt(options.unmaskedStartDigits);
      options.unmaskedEndDigits = parseInt(options.unmaskedEndDigits);
    }catch(err) {
      errorFields.push('unmaskedStartDigits and unmaskedEndDigits must be positive integers');
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
    if(errorFields.length > 0) {
      console.log(errorFields);
      process.exit(1);
    }
  }

  static validateEmailOptions(email, options) {
    let errorFields = [];
    if(!email || email.indexOf('@') < 0) {
      errorFields.push(`Email must contain one '@'`);
    }
    try{
      options.unmaskedStartCharacters = parseInt(options.unmaskedStartCharacters);
      options.unmaskedEndCharacters = parseInt(options.unmaskedEndCharacters);
      options.maxMaskedCharactersBeforeAtTheRate = parseInt(options.maxMaskedCharactersBeforeAtTheRate);
      options.maxMaskedCharactersAfterAtTheRate = parseInt(options.maxMaskedCharactersAfterAtTheRate);

    }catch(err) {
      errorFields.push('unmaskedStartCharacters, unmaskedEndCharacters, maxMaskedCharactersBeforeAtTheRate and maxMaskedCharactersAfterAtTheRate must be positive integers');
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
      errorFields.push('maskAtTheRate should be a boolean field');
    }
    if(errorFields.length > 0) {
      console.log(errorFields);
      process.exit(1);
    }
  }

  static validateJSONOptions(options) {
    let errorFields = [];
    if(!(options.fields instanceof Array)) {
      errorFields.push(`fields should be an Array`);
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(errorFields.length > 0) {
      console.log(errorFields);
      process.exit(1);
    }
  }

  static validateStringOptions(options) {
    let errorFields = [];
    if(!(options.values instanceof Array)) {
      errorFields.push(`values should be an Array`);
    }
    if(typeof(options.maskOnlyFirstOccurance) !== 'boolean') {
      errorFields.push('maskOnlyFirstOccurance should be a boolean field');
    }
    if((!options.maskWith) || options.maskWith.toString().length <= 0) {
      options.maskWith = '*';
    }
    if(errorFields.length > 0) {
      console.log(errorFields);
      process.exit(1);
    }
  }
}

module.exports = MaskHelper;
