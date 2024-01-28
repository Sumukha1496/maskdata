maskdata is a Node.js module to mask various kinds of data. With the help of maskdata, you can mask email, phone number, card number, JSON fields, password, etc... 
<br/>Also, it provides utility methods to get a field, or replace a field from any complex/nested JSON.

# Table of Contents
- [Features](#features)
- [Install maskdata](#install-maskdata)
- [Version 1.3.1 Features](#release-features)
- [How to Use](#how-to-use)
- [Maskdata for Typescript](#maskdata-for-typescript)
    - [Mask Card number](#mask-card-number)
    - [Mask Email](#mask-email-id)
      - [Mask Email id with the default configuration](#mask-email-id-with-the-default-configuration)
    - [Mask JSON fields](#mask-json)
      - [JSON mask examples with nested fields](#json-mask-examples)
      - [Mask multiple fields at once using .* and [*].](#mask-multiple-fields)
    - [Mask Password](#mask-password)
      - [Mask Password with the default configuration](#mask-password-with-the-default-configuration)
    - [Mask Phone Number](#mask-phone-number)
      - [Mask Phone Number with the default configuration](#mask-phone-number-with-the-default-configuration)
    - [Generic String masking](#generic-string-masking)
    - [Mask words/characters in a string](#mask-the-characters-or-words-in-the-string)
    - [Mask UUID](#mask-uuid)
    - [Mask JWT Token](#mask-jwt-token)
    - [Get Nested JSON Property](#get-nested-json-property)
    - [Replace the value of a JSON field](#replace-the-value-of-a-json-field)
- [Report Bugs](#report-bugs)
- [Give a Star](#give-a-star)
- [LICENSE - "MIT"](#license---mit)

# Features
* Mask Card numbers
* Mask Email ids
* Mask Password
* Mask Phone numbers
* Mask the given words/substrings from throughout a String
* Mask UUIDs
* Mask JWT tokens
* Mask JSON - JSON can contain cards, emails, passwords, phones, strings, and UUIDs. Mask all of them with a single call using - [Mask JSON fields](#mask-json)
* Get nested field from JSON
* Set/Replace nested field values from JSON
* [Maskdata for typescript](#maskdata-for-typescript)

# Install maskdata
> npm i maskdata

# Release Features
### Version 1.3.1
- Removal of maskJSONFields function: https://www.npmjs.com/package/maskdata/v/1.1.10#mask-fields-in-a-json 
- String mask version2 for generic string masking in response to the below issues: [Details](#generic-string-masking)
  - https://github.com/Sumukha1496/maskdata/issues/17
  - https://github.com/Sumukha1496/maskdata/issues/40
  - https://github.com/Sumukha1496/maskdata/issues/42 
- Supporting generic string masking(string mask V2) as part of maskJson2: [generic String masking in a JSON](#json-mask-examples)
### Version 1.2.6 
- JWT token masking: Mask JWT tokens with configs to mask as per your need. More details: [Mask JWT Token](#mask-jwt-token)
- Mask Json now supports JWT token masking also. More details: [Mask JWT in a JSON](#mask-json)
- Bug fix in maskJson2 where it was not checking for the empty/null/undefined fields and was resulting in error `"TypeError: validatedConfig[typeToFunctionMap[key][1]] is not iterable"`
- Better test coverage to the module with the addition of new test cases
### Version 1.2.3
- Bug fix for masking a list of elements in the nested json. More details: [Mask multiple fields](#mask-multiple-fields)
- Deprecated *maskJsonFields*(For documentation on the maskJsonFields, check previous version README.md files) function and will be removed in the subsequent versions. Use *maksJson2* instead: https://www.npmjs.com/package/maskdata#mask-json

# How to Use
```javascript
const MaskData = require('./maskdata');
```

<br/>

## Maskdata for Typescript
> Follow this document for more details: 
[Maskdata for typescript](./MASKDATA_FOR_TYPESCRIPT.md)

<br/>

## Mask card number
This will mask the digits in a card number.<br/>This will mask only the numerical data and not any non-numeric delimiters, alphabets, or any other types of data
```javascript
const MaskData = require('./maskdata');

const maskCardOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: "*",

  // Should be positive Integer
  // If the starting 'n' digits need to be visible/unmasked
  // Default value is 4
  unmaskedStartDigits: 4,

  // Should be positive Integer
  // If the ending 'n' digits need to be visible/unmasked
  // Default value is 1. 
  unmaskedEndDigits: 1 
};

const cardNumber = "1234-5678-1234-5678";

const cardAfterMasking = MaskData.maskCard(cardNumber, maskCardOptions);

//Output: 1234-****-****-***8

```


## Mask Email id
Use this method instead of maskEmail(). To mask with the default options, don't pass the configurations.
```javascript
const MaskData = require('./maskdata');

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
};

const email = "my.test.email@testEmail.com";

const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);

//Output: my.********@**********om

```
### Consider an email: abcd@email.com 
Here, 
- number of characters before @ -> 4
- number of characters after @ --> 9

1. **unmaskedStartCharactersBeforeAt** --> number of starting characters (before @)not to be masked.
      * If unmaskedStartCharactersBeforeAt > number of characters before @, then it will not mask the characters before @
2. **unmaskedEndCharactersAfterAt** --> number of characters not to be masked starting from the end till @.
      * If unmaskedEndCharactersAfterAt > number of characters after @, then it will not mask the characters after @

### Mask only the characters before '@' 
```javascript
const MaskData = require('./maskdata');

const emailMask2Options = {
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 0,
    unmaskedEndCharactersAfterAt: 257, // Give a number which is more than the characters after @
    maskAtTheRate: false
};

const email = "abcd@email.com";

const maskedEmail = MaskData.maskEmail2(email, emailMask2Options);

//Output: ****@email.com

```

## Mask Email id with the default configuration
To mask with the default options, don't pass the configurations.
```javascript
const MaskData = require('./maskdata');

/** Default Options
    maskWith: "*", 
    unmaskedStartCharactersBeforeAt: 3,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
**/
const email = "my.test.email@testEmail.com";

const maskedEmail = MaskData.maskEmail2(email);

//Output: my.********@**********om

```

## Mask JSON
This is the new functionality in version 1.2.0+ to handle masking of multiple types of data in the JSON object with a single mask function call. 

```javascript
const MaskData = require('./maskdata');

// Default configs are as below. If specific masking changes are needed, use the corresponding configs for each type of field.
const defaultjsonMask2Configs = {
    cardMaskOptions: defaultCardMaskOptions, // Optional 
    cardFields: [], // List of card fields to be masked

    emailMaskOptions: defaultEmailMask2Options, // Optional 
    emailFields: [], // List of email fields to be masked

    // For passwords, tokens, etc...
    passwordMaskOptions: defaultPasswordMaskOptions, // Optional 
    passwordFields: [], // List of password fields to be masked

    phoneMaskOptions: defaultPhoneMaskOptions, // Optional 
    phoneFields: [], // List of phone fields to be masked

    stringMaskOptions:  defaultStringMaskOptions, // Mandatory if stringFields are given. Otherwise, stringFields won't be masked
    stringFields: [], // List of String fields to be masked

    uuidMaskOptions: defaultUuidMaskOptions, // Optional 
    uuidFields: [], // List of UUID fields to be masked

    jwtMaskOptions: defaultJwtMaskOptions, // Optional 
    jwtFields: [], // List of JWT fields to be masked

    genericStrings: [
      {
        config: defaultStringMaskV2Options,
        fields: []
      }
    ]
};
```
> NOTE: For details on the configs mentioned above, refer: <br /> [defaultCardMaskOptions](#mask-card-number)<br/>[defaultEmailMask2Options](#mask-email-id)<br/> [defaultPasswordMaskOptions](#mask-password)<br/> [defaultPhoneMaskOptions](#mask-phone-number)<br/> [defaultStringMaskOptions](#mask-the-characters-or-words-in-the-string)<br/> [defaultUuidMaskOptions](#mask-uuid)<br /> [defaultJwtMaskOptions](#mask-jwt-token)<br /> [defaultStringMaskV2Options / generic String Maksing](#generic-string-masking) 

```javascript
const defaultjsonMask2Configs = {
    cardMaskOptions: {
        maskWith: "*",
        unmaskedStartDigits: 4,
        unmaskedEndDigits: 1
    },
    cardFields: [],

    emailMaskOptions: {
        maskWith: "*",
        unmaskedStartCharactersBeforeAt: 3,
        unmaskedEndCharactersAfterAt: 2,
        maskAtTheRate: false
    },
    emailFields: [],

    passwordMaskOptions: {
        maskWith: "*",
        maxMaskedCharacters: 16,
        unmaskedStartCharacters: 0,
        unmaskedEndCharacters: 0
    },
    passwordFields: [],

    phoneMaskOptions: {
        maskWith: "*",
        unmaskedStartDigits: 4,
        unmaskedEndDigits: 1
    },
    phoneFields: [],

    stringMaskOptions:  {
        maskWith: "*",
        maskOnlyFirstOccurance: false,
        values: [],
        maskAll: false,
        maskSpace: true
    },
    stringFields: [],

    uuidMaskOptions: {
        maskWith: "*",
        unmaskedStartCharacters: 0,
        unmaskedEndCharacters: 0
    },
    uuidFields: [],

    jwtMaskOptions: {
        maskWith: '*',
        maxMaskedCharacters: 512,
        maskDot: true,
        maskHeader: true,
        maskPayload: true,
        maskSignature: true
    },
    jwtFields: [],
    // To extend the mask function to other types of data. 
    genericStrings: [
      {
        config: {
          maskWith: "*",
          maxMaskedCharacters: 256,
          unmaskedStartDigits: 0,
          unmaskedEndDigits: 0
        },
        fields: []
      }
    ]
};

```

### JSON mask examples
Example1: 
```javascript
const jsonInput = {
  'credit': '1234-5678-8765-1234', 
  'debit': '0000-1111-2222-3333', 
  'primaryEmail': 'primary@Email.com', 
  'secondaryEmail': 'secondary@Email.com',
  'password': 'dummyPassword',
  'homePhone': "+1 1234567890",
  'workPhone': "+1 9876543210",
  'addressLine1': "This is my addressline 1. This is my home",
  'addressLine2': "AddressLine 2",
  'uuid1': '123e4567-e89b-12d3-a456-426614174000',
  'randomStrings': {
    'row1': 'This is row 1 random string',
    'row2': ['Entry1', 'Entry2', 'Entry3'],
    'row3': {
      'key1': 'Row3 Object 1',
      'key2': 'Row3 Object 2',
      'key3': ['Entry1', 'Entry2', 'Entry3']
    }
  }
};

const jsonMaskConfig = {
    cardFields: ['credit', 'debit'],
    emailFields: ['primaryEmail', 'secondaryEmail'],
    passwordFields: ['password'],
    phoneFields: ['homePhone', 'workPhone'],
    stringMaskOptions:  {
      maskWith: "*",
      maskOnlyFirstOccurance: false,
      values: ["This"]
    },
    stringFields: ['addressLine1', 'addressLine2'],
    uuidFields: ['uuid1'],
    genericStrings: [
        {
          fields: ['randomStrings.row1'],
          config: {
            maskWith: '*',
            unmaskedStartCharacters: 2,
            unmaskedEndCharacters: 3,
            maxMaskedCharacters: 8
          }
        },
        { fields: ['randomStrings.row2.*'], config: { maskWith: 'X', unmaskedEndCharacters: 1 } },
        { fields: ['randomStrings.row3.key1'] },
        {
          fields: ['randomStrings.row3.key3.*'],
          config: { maskWith: '@', unmaskedEndCharacters: 1 }
        }
    ]
};

const maskedJsonOutput = maskData.maskJSON2(jsonInput, jsonMaskConfig);

Output:
{
  credit: '1234-****-****-***4',
  debit: '0000-****-****-***3',
  primaryEmail: 'pri****@*******om',
  secondaryEmail: 'sec******@*******om',
  password: '*************',
  homePhone: '+1 1********0',
  workPhone: '+1 9********0',
  addressLine1: '**** is my addressline 1. **** is my home',
  addressLine2: 'AddressLine 2',
  uuid1: '********-****-****-****-************',
  randomStrings: {
    row1: 'Th***ing',
    row2: ['XXXXX1', 'XXXXX2', 'XXXXX3'],
    row3: {
      key1: '*************',
      key2: 'Row3 Object 2',
      key3: ['@@@@@1', '@@@@@2', '@@@@@3']
    }
  }
}


Example2: Mask with custom configs for each/any type of fields

const jsonInput2 = {
  'credit': '1234-5678-8765-1234', 
  'debit': '0000-1111-2222-3333', 
  'primaryEmail': 'primary@Email.com', 
  'secondaryEmail': 'secondary@Email.com',
  'password': 'dummyPasswordANDdummyPassword',
  'homePhone': "+1 1234567890",
  'workPhone': "+1 9876543210",
  'addressLine1': "This is my addressline 1. This is my home",
  'addressLine2': "AddressLine 2",
  'uuid1': '123e4567-e89b-12d3-a456-426614174000'
};

const jsonMaskConfig2 = {
    // Card
    cardMaskOptions: { maskWith: "X", unmaskedStartDigits: 2,unmaskedEndDigits: 4 },
    cardFields: ['credit', 'debit'],

    // Email
    emailMaskOptions: { maskWith: "*", unmaskedStartCharactersBeforeAt: 2, unmaskedEndCharactersAfterAt: 2, maskAtTheRate: false },
    emailFields: ['primaryEmail', 'secondaryEmail'],

    // Password
    passwordMaskOptions: { maskWith: "*", maxMaskedCharacters: 10, unmaskedStartCharacters: 0, unmaskedEndCharacters: 0 },
    passwordFields: ['password'],

    // Phone
    phoneMaskOptions: { maskWith: "*", unmaskedStartDigits: 2, unmaskedEndDigits: 1 },
    phoneFields: ['homePhone', 'workPhone'],

    // String
    stringMaskOptions: { maskWith: "*", maskOnlyFirstOccurance: false, values: [], maskAll: true, maskSpace: false },
    stringFields: ['addressLine1', 'addressLine2'],

    // UUID
    uuidMaskOptions: { maskWith: "*", unmaskedStartCharacters: 4, unmaskedEndCharacters: 2 },
    uuidFields: ['uuid1']
};

const maskedJsonOutput2 = maskData.maskJSON2(jsonInput2, jsonMaskConfig2);

Output:

{
  credit: '12XX-XXXX-XXXX-1234',
  debit: '00XX-XXXX-XXXX-3333',
  primaryEmail: 'pr*****@*******om',
  secondaryEmail: 'se*******@*******om',
  password: '**********',
  homePhone: '+1**********0',
  workPhone: '+1**********0',
  addressLine1: '**** ** ** *********** ** **** ** ** ****',
  addressLine2: '*********** *',
  uuid1: '123e****-****-****-****-**********00'
}
```

Example3: Mask nested json fields -> Use dot(.) and Array([]) notation to specify the inner fields.

```javascript

const jsonInput2 = {
  cards: {
    creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
    debitCards: ['0000-1111-2222-3333', '2222-1111-3333-4444']
  },
  emails: {
    primaryEmail: 'primary@Email.com', 
    secondaryEmail: 'secondary@Email.com'
  },
  passwords: [
    ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword']
  ],
  phones: {
    homePhone: "+1 1234567890",
    workPhone: "+1 9876543210",
  },
  address: {
    addressLine1: "This is my addressline 1. This is my home",
    addressLine2: "AddressLine 2"
  },
  uuids: {
    uuid1: '123e4567-e89b-12d3-a456-426614174000'
  },
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ'
};

const jsonMaskConfig2 = {
    // Card
    cardMaskOptions: { maskWith: "X", unmaskedStartDigits: 2,unmaskedEndDigits: 4 },
    cardFields: ['cards.creditCards[0]', 'cards.creditCards[1]', 'cards.debitCards[0]', 'cards.debitCards[1]'],

    // Email
    emailMaskOptions: { maskWith: "*", unmaskedStartCharactersBeforeAt: 2, unmaskedEndCharactersAfterAt: 2, maskAtTheRate: false },
    emailFields: ['emails.primaryEmail', 'emails.secondaryEmail'],

    // Password
    passwordMaskOptions: { maskWith: "*", maxMaskedCharacters: 10, unmaskedStartCharacters: 0, unmaskedEndCharacters: 0 },
    passwordFields: ['passwords[0][0]]', 'passwords[0][1]'],

    // Phone
    phoneMaskOptions: { maskWith: "*", unmaskedStartDigits: 2, unmaskedEndDigits: 1 },
    phoneFields: ['phones.homePhone', 'phones.workPhone'],

    // String
    stringMaskOptions: { maskWith: "*", maskOnlyFirstOccurance: false, values: [], maskAll: true, maskSpace: false },
    stringFields: ['address.addressLine1', 'address.addressLine2'],

    // UUID
    uuidMaskOptions: { maskWith: "*", unmaskedStartCharacters: 4, unmaskedEndCharacters: 2 },
    uuidFields: ['uuids.uuid1']

    // JWT
    jwtMaskOptions: { maskWith: '*', maxMaskedCharacters: 512, maskDot: true, maskHeader: true, maskPayload: true, maskSignature: true},
    jwtFields: ['jwt']
};

const maskedJsonOutput2 = MaskData.maskJSON2(jsonInput2, jsonMaskConfig2);
// OUTPUT:
{
  cards: {
    creditCards: [ '12XX-XXXX-XXXX-1234', '11XX-XXXX-XXXX-2222' ],
    debitCards: [ '00XX-XXXX-XXXX-3333', '22XX-XXXX-XXXX-4444' ]
  },
  emails: {
    primaryEmail: 'pr*****@*******om',
    secondaryEmail: 'se*******@*******om'
  },
  passwords: [ [ '**********', '**********' ] ],
  phones: { homePhone: '+1**********0', workPhone: '+1**********0' },
  address: {
    addressLine1: '**** ** ** *********** ** **** ** ** ****',
    addressLine2: '*********** *'
  },
  uuids: { uuid1: '123e****-****-****-****-**********00' },
  jwt: '*********************************************************************************************************'
}

```
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

## Mask Password with the default configuration
To mask with the default options, don't pass the configurations.
```javascript
const MaskData = require('./maskdata');

  /** Default Options
    maskWith: "*"
    maxMaskedCharacters: 16,
    unmaskedStartCharacters: 0,
    unmaskedEndCharacters: 0
  **/

const password = "Password1$";

const maskedPassword = MaskData.maskPassword(password)

```

#### Example: Mask password OR secretKey with some meta info at the end

```javascript
const MaskData = require('./maskdata');

const maskPasswordOptions = {
  maskWith: "X",
  maxMaskedCharacters: 20, // To limit the output String length to 20.
  unmaskedStartCharacters: 4,
  unmaskedEndCharacters: 9 // As the last 9 characters of the secret key is meta info which can be printed for debugging or other purposes
};

const password = "TEST:U2VjcmV0S2V5MQ==:CLIENT-A";

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);
//Output: TESTXXXXXXX:CLIENT-A

maskPasswordOptions.unmaskedStartCharacters = 0;

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);
//Output: XXXXXXXXXXX:CLIENT-A
```


## Mask Phone Number
```javascript
const MaskData = require('./maskdata');

const maskPhoneOptions = {
  // Character to mask the data
  // default value is '*'
  maskWith: "*",

  //Should be positive Integer
  // If the starting 'n' digits need to be unmasked
  // Default value is 4
  unmaskedStartDigits: 5, 

  // Should be positive Integer
  //If the ending 'n' digits need to be unmasked
  // Default value is 1
  unmaskedEndDigits: 1 
};

const phoneNumber = "+911234567890";

const maskedPhoneNumber = MaskData.maskPhone(phoneNumber, maskPhoneOptions);
//Output: +9112*******0

```

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
  unmaskedEndCharacters: 9
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


## Mask UUID
This will mask the alphanumeric characters in a UUID.<br/>This will not mask the hyphen present in the UUID. Masking is done, only when the input is a valid UUID with only a-f, A-F, and 0-9 and has 36 characters (32 alphanumerics + 4 hyphens, and should work with the <b>regex:</b> 
> /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;). 

If the input is not a valid UUID, it will return the input itself without masking.
```javascript
const MaskData = require('./maskdata');

const maskUuidOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: "*",

  // Should be a positive Integer <= 32
  // If the starting 'n' alphanumeric characters need to be visible/unmasked
  // Default value is 0
  unmaskedStartCharacters: 0, 
  
  //Should be a positive Integer <= 32
  //If the ending 'n' alphanumeric characters need to be visible/unmasked
  // Default value is 0 
  unmaskedEndCharacters: 0
};

const uuidInput = "123e4567-e89b-12d3-a456-426614174000";

const uuidAfterMasking = MaskData.maskUuid(uuidInput, maskUuidOptions);

// Output: ********-****-****-****-************

```

## Mask JWT Token
This function returns the masked JWT tokens. A JWT token consists of 3 parts separated by 2 dots. i.e, `{header}.{payload}.{signature}`. Based on the usecase, we will have to mask/keep a part/s of jwt token. With maskdata you can mask JWT tokens with all possible combinations. 
If the input is null, undefined, non-string, string with length < 5, doesn't contain 2 dots(invalid JWT format), the function will return the input as it is without masking.

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: '*',

  // Max masked characters in the output(EXCLUDING the unmasked characters). Default value is 512
  maxMaskedCharacters: 512,

  // Config to mask OR keep the dots(.). Default value is true, i.e, mask dots
  maskDot: true,

  // Config to mask OR keep the first part of the JWT. i.e, the header part. Default value is true, i.e, mask the header part
  maskHeader: true,

  // Config to mask OR keep the second part of the JWT. i.e, the payload part. Default value is true, i.e, mask the payload part
  maskPayload: true,

  // Config to mask OR keep the third part of the JWT. i.e, the signature part. Default value is true, i.e, mask the signature part
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
*********************************************************************************************************

```

#### Example: Mask only the signature part

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 512,
  maskDot: false,
  maskHeader: false,
  maskPayload: false,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.*******************************************

```

#### Example: Mask header and the signature part

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 512,
  maskDot: false,
  maskHeader: true,
  maskPayload: false,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
************************************.eyJpYXQiOjE1MTYyMzkwMjJ9.*******************************************

```

#### Example: Mask all parts except dots and limit the max masked characters in the output to lower value, say 16

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 16,
  maskDot: false,
  maskHeader: true,
  maskPayload: true,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
******.*****.*****

```

## Get Nested JSON Property
This method returns the value of the nested JSON property if it exists. Otherwise, it returns ```undefined```
```javascript
const MaskData = require('./maskdata');

const innerPropety = Maskdata.getInnerProperty(object, field);

Example: 

const nestedObject = {
  level1: {
    field1: "field1",
    level2: {
      field2: "field2",
      level3: {
        field3: "field3",
        field4: [ { Hello: "world" }, { Hello: "Newworld" }, "Just a String" ]
      }
    }
  },
  value1: "value"
};

const innerPropety = Maskdata.getInnerProperty(nestedObject, 'level1.level2.level3.field4[0].Hello');

```


## Replace the value of a JSON field
To replace a value by keeping the type.
```javascript

const input = {
  name: "John",
  age: 33,
  married: true
}

let afterReplacing = MaskData.replaceValue(input, 'age', 99);
afterReplacing = MaskData.replaceValue(input, 'married', false);

//Output: 
Before replacing: {"name":"John","age":33,"married":true}
After replacing: {"name":"John","age":99,"married":false}

Type of age: number
Type of married: boolean

```

### Mask Multiple Fields
```javascript
const jsonInput = {
  cards: [
    {
      number: '1234-5678-8765-1234'
    },
    {
      number: '1111-2222-1111-2222'
    },
    {
      number: '0000-1111-2222-3333'
    },
    {
      name: "No card number here"
    }
  ],
  emails: {
    primaryEmail: 'primary@Email.com', 
    secondaryEmail: 'secondary@Email.com',
    moreEmails: ["email1@email.com", "email2@email.com", "email3@email.com", {childEmail: "child@child.com", secondChild: {nestedkid: "hello@hello.com"}}]
  },
  array: ["element1", "element22", "element333"],
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU'
};

const jsonMaskConfig = {
  cardMaskOptions: { maskWith: "X", unmaskedStartDigits: 0, unmaskedEndDigits: 0},

  emailMaskOptions: { maskWith: "*", unmaskedStartCharactersBeforeAt: 0, 
  unmaskedEndCharactersAfterAt: 0, maskAtTheRate: false },

  stringMaskOptions: { maskWith: "?", maskOnlyFirstOccurance: false, values: [], maskAll: true, maskSpace: false },
  jwtMaskOptions: { maskWith: '*', maxMaskedCharacters: 32, maskDot: false, maskHeader: true, maskPayload: true, maskSignature: true},

  cardFields: ['cards[*].number'],
  emailFields: ['emails.*'],
  stringFields: ['array.*'],
  jwtFields: ['jwt']
}

const maskedOutput = maskData.maskJSON2(jsonInput, jsonMaskConfig);

// Output: 
{
  "cards": [
    {
      "number": "XXXX-XXXX-XXXX-XXXX"
    },
    {
      "number": "XXXX-XXXX-XXXX-XXXX"
    },
    {
      "number": "XXXX-XXXX-XXXX-XXXX"
    },
    {
      "name": "No card number here"
    }
  ],
  "emails": {
    "primaryEmail": "*******@*********",
    "secondaryEmail": "*********@*********",
    "moreEmails": [
      "******@*********",
      "******@*********",
      "******@*********",
      {
        "childEmail": "*****@*********",
        "secondChild": {
          "nestedkid": "*****@*********"
        }
      }
    ]
  },
  "array": ["????????", "?????????", "??????????"],
  "jwt": "************.**********.**********"
}

```


# Report Bugs 
If there is any help needed with the library functionalities or if there is any bug/issue, please raise an issue in GitHub: https://github.com/Sumukha1496/maskdata/issues

# Give a Star
You can give a star at: https://github.com/Sumukha1496/maskdata/stargazers 

# LICENSE - "MIT" 
Licensed under MIT Licence

Copyright (c) 2019 Sumukha H S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
