'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class PasswordMask {
    static maskPassword(password, options) {
        if(!password || typeof(password) === 'object') return password;
        password = password + ''
        if(options) {
          options = MaskHelper.mapWithDefaultValues(options, Constants.defaultPasswordMaskOptions);
          MaskHelper.validatePasswordOptions(options);
        } else {
          options = Constants.defaultPasswordMaskOptions;
        }
        let maskPasswordLength = password.length;
        if(password.length > options.maxMaskedCharacters) {
          maskPasswordLength = parseInt(options.maxMaskedCharacters);
        }
        const maskingCharacters = maskPasswordLength - options.unmaskedStartCharacters - options.unmaskedEndCharacters;
    
        if(maskingCharacters < 0) {
          if(maskPasswordLength <= options.unmaskedStartCharacters) {
            return password.substring(0, maskPasswordLength);
          } else {
            let maskedPassword = password.substring(0, options.unmaskedStartCharacters);
            const remainingChars = maskPasswordLength - options.unmaskedStartCharacters;
            for(let i = password.length-remainingChars; i < password.length; i++) {
              maskedPassword += password[i];
            } 
            return maskedPassword;
          }
        }
        let maskedPassword = "";
        maskedPassword = password.substring(0, options.unmaskedStartCharacters);
        maskedPassword += `${options.maskWith}`.repeat(maskingCharacters)
        for(let i = password.length-options.unmaskedEndCharacters; i < password.length; i++) {
          maskedPassword += password[i];
        } 
        return maskedPassword;
    }
}

module.exports = PasswordMask