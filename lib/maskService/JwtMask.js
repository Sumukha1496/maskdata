'use strict';
const MaskHelper = require('../helpers/MaskHelper');
const Constants = require('../helpers/Constants');

class JwtMask {
  static maskJwt(jwt, options) {
    if (!jwt || typeof jwt !== 'string' || jwt.length < 5) return jwt;
    const countOfDots = jwt.split('.').length - 1;
    if (countOfDots != 2) return jwt;
    let maskedJwt = '';
    options = options
      ? MaskHelper.mapWithDefaultValues(options, Constants.defaultJwtMaskOptions)
      : Constants.defaultJwtMaskOptions;
    MaskHelper.validateJwtMaskOptions(options);
    const indexOfFirstDot = jwt.indexOf('.');
    const indexOfSecondDot = jwt.indexOf('.', indexOfFirstDot + 1);

    if (!indexOfFirstDot || !indexOfSecondDot || indexOfFirstDot <= 0 || indexOfSecondDot <= 0) {
      return jwt;
    }

    const part1 = jwt.substring(0, indexOfFirstDot);
    const part2 = jwt.substring(indexOfFirstDot + 1, indexOfSecondDot);
    const part3 = jwt.substring(indexOfSecondDot + 1);

    const maxMasked =
      options.maxMaskedCharacters > 2
        ? options.maxMaskedCharacters - (options.maskDot === true ? 2 : 0)
        : options.maxMaskedCharacters;

    let maskpartcnt = 0;
    let maskLength = 0;
    if (options.maskHeader === true) {
      maskpartcnt++;
      maskLength += part1.length;
    }
    if (options.maskPayload === true) {
      maskpartcnt++;
      maskLength += part2.length;
    }
    if (options.maskSignature === true) {
      maskpartcnt++;
      maskLength += part3.length;
    }

    let residual = 0;
    let eachMask = 0;

    const isJwtLengthGreater = maskLength > maxMasked;

    if (isJwtLengthGreater) {
      residual = maxMasked % maskpartcnt;
      eachMask = maxMasked / maskpartcnt;
    }

    let maskedCharCount = 0;

    if (options.maskHeader === false) {
      maskedJwt += part1;
      maskedJwt += options.maskDot === true ? options.maskWith : '.';
    } else {
      maskedJwt += isJwtLengthGreater
        ? options.maskWith.repeat(residual + eachMask)
        : options.maskWith.repeat(part1.length);
      residual = 0;
      maskedCharCount += part1.length;
      maskedJwt += options.maskDot === true ? options.maskWith : '.';
    }

    if (options.maskPayload === false) {
      maskedJwt += part2;
      maskedJwt += options.maskDot === true ? options.maskWith : '.';
    } else {
      maskedJwt += isJwtLengthGreater
        ? options.maskWith.repeat(residual + eachMask)
        : options.maskWith.repeat(part2.length);
      residual = 0;
      maskedJwt += options.maskDot === true ? options.maskWith : '.';
    }

    if (options.maskSignature === false) {
      maskedJwt += part3;
    } else {
      maskedJwt += isJwtLengthGreater
        ? options.maskWith.repeat(residual + eachMask)
        : options.maskWith.repeat(part3.length);
    }
    return maskedJwt;
  }
}

module.exports = JwtMask;
