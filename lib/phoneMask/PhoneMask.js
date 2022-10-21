const MaskHelper = require('../helpers/MaskHelper');

const defaultPhoneMaskOptions = {
    maskWith: "*",
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 1
  };

class PhoneMask {
    static maskPhone(phone, options) {
        if(!phone || typeof(phone) === 'object') return phone;
        phone += '';
        if(options) {
            options = MaskHelper.mapWithDefaultValues(options, defaultPhoneMaskOptions);
            MaskHelper.validatePhoneOptions(options);
        } else {
            options = defaultPhoneMaskOptions;
        }
        let maskLength = phone.length - options.unmaskedStartDigits - options.unmaskedEndDigits;
        if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= phone.length) {
            return phone;
        }
        return phone.substr(0, options.unmaskedStartDigits) + `${options.maskWith}`.repeat(maskLength) + phone.substr(phone.length-options.unmaskedEndDigits);
    }
}

module.exports = PhoneMask