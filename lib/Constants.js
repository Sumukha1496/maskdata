const defaultJsonMaskOptions = {
    maskWith: "*",
    fields: [],
    maxMaskedCharactersStr: -1
};

const defaultPhoneMaskOptions = {
    maskWith: "*",
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 1
};
  
const defaultPasswordMaskOptions = {
    maskWith: "*",
    maxMaskedCharacters: 16,
    unmaskedStartCharacters: 0,
    unmaskedEndCharacters: 0
};

const defaultStringMaskOptions = {
    maskWith: "*",
    maskOnlyFirstOccurance: false,
    values: [],
    maskAll: false,
    maskSpace: true
};

const defaultEmailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 3,
  unmaskedEndCharactersAfterAt: 2,
  maskAtTheRate: false
};

const defaultCardMaskOptions = {
    maskWith: "*",
    unmaskedStartDigits: 4,
    unmaskedEndDigits: 1
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
    stringMaskOptions:  defaultStringMaskOptions,
    stringFields: []
};


module.exports = {
    defaultPhoneMaskOptions,
    defaultCardMaskOptions,
    defaultEmailMask2Options,
    defaultJsonMaskOptions,
    defaultPasswordMaskOptions,
    defaultStringMaskOptions,
    defaultjsonMask2Configs
}