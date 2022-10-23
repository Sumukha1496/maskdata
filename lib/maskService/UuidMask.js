'use strict';

const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');
const uuidFormat = /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;

class UuidMask {
    static maskUuid(uuid, options) {
        if(!uuid || typeof(uuid) !== 'string' || !uuid.match(uuidFormat) || uuid.length !== 36) return uuid;
        if(!options) {
            options = Constants.defaultUuidMaskOptions;
        } else {
            options = MaskHelper.mapWithDefaultValues(options, Constants.defaultUuidMaskOptions);
            MaskHelper.validateUuidMaskOptions(options);
        }

        const toBeProcessedUuid =  uuid.replaceAll("-", "");

        const start = toBeProcessedUuid.slice(0, options.unmaskedStartCharacters);
        const end = toBeProcessedUuid.slice(32-options.unmaskedEndCharacters);
        const maskLength = toBeProcessedUuid.length - options.unmaskedStartCharacters - options.unmaskedEndCharacters;
        const tempMaskedUuid = start + (options.maskWith.repeat(maskLength)) + end;

        let maskedUuid = tempMaskedUuid.slice(0, 8) + "-" 
            + tempMaskedUuid.slice(8, 12) + "-" 
            + tempMaskedUuid.slice(12, 16) + "-" 
            + tempMaskedUuid.slice(16, 20) + "-" 
            + tempMaskedUuid.slice(20);

        return maskedUuid;
    }
}

module.exports = UuidMask