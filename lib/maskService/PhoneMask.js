'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class PhoneMask {
    static maskPhone(phone, options) {
        if(!phone || typeof(phone) === 'object') return phone;
        phone += '';
        if(options) {
            options = MaskHelper.mapWithDefaultValues(options, Constants.defaultPhoneMaskOptions);
            MaskHelper.validatePhoneOptions(options);
        } else {
            options = Constants.defaultPhoneMaskOptions;
        }
        let maskLength = phone.length - options.unmaskedStartDigits - options.unmaskedEndDigits;
        if((options.unmaskedStartDigits + options.unmaskedEndDigits) >= phone.length) {
            return phone;
        }
        return phone.substring(0, options.unmaskedStartDigits) + `${options.maskWith}`.repeat(maskLength) + phone.substring(phone.length-options.unmaskedEndDigits);
    }
}

module.exports = PhoneMask