const defaultCardMaskOptions = {
  maskWith: '*',
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

const defaultEmailMask2Options = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

const defaultJwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 512,
  maskDot: true,
  maskHeader: true,
  maskPayload: true,
  maskSignature: true
};

const defaultJsonMaskOptions = {
  maskWith: '*',
  fields: [],
  maxMaskedCharactersStr: -1
};

const defaultPasswordMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 16,
  unmaskedStartCharacters: 0,
  unmaskedEndCharacters: 0
};

const defaultStringMaskV2Options = {
  maskWith: '*',
  maxMaskedCharacters: 256,
  unmaskedStartCharacters: 0,
  unmaskedEndCharacters: 0
};

const defaultPhoneMaskOptions = {
  maskWith: '*',
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

const defaultStringMaskOptions = {
  maskWith: '*',
  maskOnlyFirstOccurance: false,
  values: [],
  maskAll: false,
  maskSpace: true
};

const defaultUuidMaskOptions = {
  maskWith: '*',
  unmaskedStartCharacters: 0,
  unmaskedEndCharacters: 0
};

const defaultjsonMask2Configs = {
  cardMaskOptions: defaultCardMaskOptions,
  cardFields: [],
  emailMaskOptions: defaultEmailMask2Options,
  emailFields: [],
  passwordMaskOptions: defaultPasswordMaskOptions,
  passwordFields: [],
  phoneMaskOptions: defaultPhoneMaskOptions,
  phoneFields: [],
  stringMaskOptions: defaultStringMaskOptions,
  stringFields: [],
  uuidMaskOptions: defaultUuidMaskOptions,
  uuidFields: [],
  jwtMaskOptions: defaultJwtMaskOptions,
  jwtFields: [],
  genericStrings: []
};

module.exports = {
  defaultPhoneMaskOptions,
  defaultCardMaskOptions,
  defaultEmailMask2Options,
  defaultJsonMaskOptions,
  defaultPasswordMaskOptions,
  defaultStringMaskOptions,
  defaultStringMaskV2Options,
  defaultUuidMaskOptions,
  defaultjsonMask2Configs,
  defaultJwtMaskOptions
};
