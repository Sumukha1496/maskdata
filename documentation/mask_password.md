## Mask Password
```javascript
const MaskData = require('./maskdata');

const maskPasswordOptions = {
  // Character to mask the data
  // default value is '*'
  maskWith: "*",

  // To limit the *s in the response when the password length is more
  // Default value is 16
  maxMaskedCharacters: 16,

  // To fix the length of output irrespective of the length of the input. This comes in handy when the input length < maxMaskedCharacters but we want a fixed output length.
  // Default value is undefined. If this value is set, then maxMaskedCharacters will not be considered and the output length will always be equal to fixedOutputLength characters.
  fixedOutputLength: undefined,

  // To show(not mask) first 'n' characters in the password/secret key. 
  // Default value is 0. 
  unmaskedStartCharacters: 0,

  // To show(not mask) last 'n' characters in the password/secret key. 
  // Default value is 0. 
  unmaskedEndCharacters: 0
};

const password = "Password1$";

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);

//Output: **********
