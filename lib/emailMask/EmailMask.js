const MaskHelper = require('../helpers/MaskHelper');

const defaultEmailMask2Options = {
    maskWith: "*",
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

class EmailMask {

    static maskEmail2(email, options) {
        let maskedEmail = '';
        options = options ? MaskHelper.mapWithDefaultValues(options, defaultEmailMask2Options) : defaultEmailMask2Options;
        MaskHelper.validateEmailOptions2(email, options);
        const indexOfAt = email.indexOf('@');

        if(indexOfAt < 0) return email;

        const [before, after] = email.split('@');
        const beforeLength = before.length;
        const afterLength = after.length;

        maskedEmail += (options.unmaskedStartCharactersBeforeAt >= beforeLength) ? before : 
          before.substr(0, options.unmaskedStartCharactersBeforeAt) + `${options.maskWith}`.repeat(beforeLength - options.unmaskedStartCharactersBeforeAt);
        
        maskedEmail += options.maskAtTheRate ? options.maskWith : '@';

        maskedEmail += (options.unmaskedEndCharactersAfterAt >= afterLength) ? after : 
          (`${options.maskWith}`.repeat(afterLength-options.unmaskedEndCharactersAfterAt) + after.substr(afterLength - options.unmaskedEndCharactersAfterAt));
        return maskedEmail;
      }
}

module.exports = EmailMask