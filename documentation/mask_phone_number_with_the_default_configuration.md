## Mask Phone Number with the default configuration
To mask with the default options, don't pass the configurations.
```javascript
const MaskData = require('./maskdata');

/** Default Options
  maskWith: "*"
  unmaskedStartDigits: 4
  unmaskedEndDigits: 1 
**/
const phoneNumber = "+111234567890";

const maskedPhoneNumber = MaskData.maskPhone(phoneNumber);

//Output: +911********0

```
## Generic string masking
This functionality can be used to mask any string with the below configs.
#### Example1
```javascript
const MaskData = require('./maskdata');

const defaultStringMaskV2Options = {
  // Character to mask the data
  // default value is '*'
  maskWith: "*",

  // This is to limit the maximun characters in the output.
  // Default value is 256
  maxMaskedCharacters: 256,

  // To fix the length of output irrespective of the length of the input. This comes in handy when the input length < maxMaskedCharacters but we want a fixed output length.
  // Default value is undefined. If this value is set, then maxMaskedCharacters will not be considered and the output length will always be equal to fixedOutputLength characters.
  fixedOutputLength: undefined,

  // To show(not mask) first 'n' characters of the string.
  // Default value is 0. 
  unmaskedStartCharacters: 0,

  // To show(not mask) last 'n' characters of the string.
  // Default value is 0. 
  unmaskedEndCharacters: 0
};

const string1 = "Password1$";

const maskedString = MaskData.maskStringV2(string1, defaultStringMaskV2Options);

//Output: **********
``` 

#### Example2

```javascript
const MaskData = require('./maskdata');

const stringMaskV2Options = {
  maskWith: "X",
  maxMaskedCharacters: 20, // To limit the output length to 20.
  unmaskedStartCharacters: 4,
  unmaskedEndCharacters: 9,
  fixedOutputLength: undefined
};

const secret = "TEST:U2VjcmV0S2V5MQ==:CLIENT-A";

const maskedSecret = MaskData.maskStringV2(password, stringMaskV2Options);
//Output: TESTXXXXXXX:CLIENT-A

stringMaskV2Options.unmaskedStartCharacters = 0;

maskedSecret = MaskData.maskStringV2(password, stringMaskV2Options);
//Output: XXXXXXXXXXX:CLIENT-A
```

## Mask the characters or words in the string
This will mask the characters or words if present in the given string.
```javascript
const MaskData = require('./maskdata');

const maskStringOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: "*",

  /** 
   * It is the words/substrings to mask. 
   * Should be an array of strings.
   * Can give multiple words/substrings.
   * values[] can be used only when maskAll is false. If maskAll is true, then this is of no use.
  */
  values: ['is', 'test'], 

  /** 
   * If to mask only the first occurrence of each word/substring in the given string
   * Should be boolean
   * Default value is false
  */
  maskOnlyFirstOccurance: false,

  /** 
   * If to mask all the characters in a string make maskAll: true
   * If maskAll is true, the words/substrings inside values[] will not be considered. 
   * Default value is false
  */
  maskAll: false,

  /** 
   * This is to mask/not mask the spaces in a string when masking all the characters.
   * Can be used ONLY when maskAll: true
   * If maskSpace is false, the spaces in the string will not be masked.
   * This feature is to know the words and each word's length but to hide the content
   * Default value is true
  */
  maskSpace: true
};

const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

//Output: Th** ** a **** String

```

### Mask all characters in the String
```javascript
const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

const stringMaskOptions = {
  maskWith: "*",
  values: [],
  maskAll: true,
  maskSpace: false   // Maks all characters except spaces
};

// Output: **** ** * **** *****

const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

const stringMaskOptions = {
  maskWith: "*",
  values: [],
  maskAll: true,
  maskSpace: true   // Mask all characters including spaces
};

// Output: ********************

```

