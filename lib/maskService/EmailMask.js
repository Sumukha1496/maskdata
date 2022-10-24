'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class EmailMask {

    static maskEmail2(email, options) {
        if(!email || typeof(email) !== 'string') return email;
        let maskedEmail = '';
        options = options ? MaskHelper.mapWithDefaultValues(options, Constants.defaultEmailMask2Options) 
          : Constants.defaultEmailMask2Options;
        MaskHelper.validateEmailOptions2(email, options);
        const indexOfAt = email.indexOf('@');
        // if(indexOfAt < 0) return email; // Not needed since we have the validation for mandatory '@'
        const [before, after] = email.split('@');
        const beforeLength = before.length;
        const afterLength = after.length;

        maskedEmail += (options.unmaskedStartCharactersBeforeAt >= beforeLength) ? before : 
          before.substring(0, options.unmaskedStartCharactersBeforeAt) + `${options.maskWith}`.repeat(beforeLength - options.unmaskedStartCharactersBeforeAt);
        
        maskedEmail += options.maskAtTheRate ? options.maskWith : '@';

        maskedEmail += (options.unmaskedEndCharactersAfterAt >= afterLength) ? after : 
          (`${options.maskWith}`.repeat(afterLength-options.unmaskedEndCharactersAfterAt) + after.substring(afterLength - options.unmaskedEndCharactersAfterAt));
        return maskedEmail;
      }
}

module.exports = EmailMask