maskdata is a Node.js module to mask various kinds of data. With the help of maskdata, you can mask email, phone number, card number, JSON fields, password, etc... 
<br/>Also, it provides utility methods to get a field, or replace a field from any complex/nested JSON.

# Table of Contents
- [Features](#features)
- [Install maskdata](#install-maskdata)
- [Version 1.2.0 Features](#release-features)
- [How to Use](#how-to-use)
    - [Mask Card number](#mask-card-number)
    - [Mask Email](#mask-email-id)
      - [Mask Email id with the default configuration](#mask-email-id-with-the-default-configuration)
    - [Mask JSON fields](#mask-json)
      - [JSON mask examples with nested fields](#json-mask-examples)
    - [Mask Password](#mask-password)
      - [Mask Password with the default configuration](#mask-password-with-the-default-configuration)
    - [Mask Phone Number](#mask-phone-number)
      - [Mask Phone Number with the default configuration](#mask-phone-number-with-the-default-configuration)
    - [Mask words/characters in a string](#mask-the-characters-or-words-in-the-string)
    - [Mask UUID](#mask-uuid)
    - [Get Nested JSON Property](#get-nested-json-property)
    - [Replace the value of a JSON field](#replace-the-value-of-a-json-field)
    - [Mask JSON fields](#mask-fields-in-a-json)
      - [Mask nested JSON fields](#mask-fields-of-a-nested-object)
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
* Mask JSON - JSON can contain cards, emails, passwords, phones, strings, and UUIDs. Mask all of them with a single call using - [Mask JSON fields](#mask-json)
* Get nested field from JSON
* Set/Replace nested field values from JSON

# Install maskdata
> npm i maskdata

# Release Features
### Version 1.2.0
- Support for masking cards, emails, passwords, phones, strings, and UUIDs. Mask all of them with a single call using - [Mask JSON fields](#mask-json)
- Support for masking UUID - [Mask UUID](#mask-uuid)
- Minor bug fix in card masking.
- Extensive testing with the help of mocha test cases for all features covering more than 110 test cases.
- Improved Documentation
### Version: 1.1.10
- Support of maxMaskedCharacters in masking JSON fields: https://github.com/Sumukha1496/maskdata/issues/21
- This is applicable only if the type of value is a string. Details: [Mask JSON fields](#mask-fields-in-a-json)
### Version: 1.1.8
- Mocha test cases for most of the use cases.
https://github.com/Sumukha1496/maskdata/pull/23
- Handling null/Empty inputs --> Mask function will return the input itself.
### Version: 1.1.6
- Feature to mask all the characters in the String along with mask/visible spaces in the string.

# How to Use
```javascript
const MaskData = require('./maskdata');
```

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
This is the new functionality in version 1.2.0 to handle the masking of multiple types of data in the JSON object with a single mask function call. Use this function instead of the previous function maskJsonFields(). <br><br>To mask with the default options, just pass the required fields(cardFields[] and/or emailFields[] and/or passwordFields[] and/or phoneFields[] and/or stringFields[] and/or uuidFields[]) in the second argument to the function.

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
    uuidFields: [] // List of UUID fields to be masked
};
```
<b>NOTE: For defaultCardMaskOptions, defaultEmailMask2Options, defaultPasswordMaskOptions, defaultPhoneMaskOptions, defaultStringMaskOptions and defaultUuidMaskOptions refer the corresponding masking features. </b>

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
    uuidFields: []
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
  'uuid1': '123e4567-e89b-12d3-a456-426614174000'
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
    uuidFields: ['uuid1']
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
  uuid1: '********-****-****-****-************'
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
  }
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
  uuids: { uuid1: '123e****-****-****-****-**********00' }
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

## Mask fields in a JSON  
<b> NOTE: This is an old functionality. For more flexibility and single masking call to mask different types of data in the json object, start using the new maskJson2() function - [Mask JSON fields](#mask-json)</b>

This method masks the field value if present in the given object.
```javascript
const MaskData = require('./maskdata');

const maskJSONOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: "*",

  // It should be an array
  // Field names to mask. Can give multiple fields.
  fields: ['password', 'firstName'],
  
  // If the type of value is a string and if we want to limit the number of characters in the output, then we can use this. The default value is -1 means, by default this feature is disabled. It is enabled if we provide a positive integer value. This is not a mandatory field in the config and if not provided, it will take the default value -1 and disable the feature.
  maxMaskedCharactersStr: 4  // Default value is -1 (Disable feature)
};

const obj = {
  password: "IKnowNothing",
  firstName: "Jon",
  lastName: "Snoww"
};

const maskedObj = MaskData.maskJSONFields(obj, maskJSONOptions);

//Output: { password: '****', firstName: '***', lastName: 'Snoww' }

```


## Mask fields of a nested Object
<b>NOTE: USE [Mask JSON fields](#mask-json) for better functionalities.</b>

This method masks the field value if present in the given object.
The masked value type will always be a string. Won't mask if the value is ```null```.

If the field doesn't exist or if there is any syntax error, then it will ignore it without throwing any error.
```javascript
const MaskData = require('./maskdata');

const maskJSONOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: "*",

  // It should be an array
  // Field names to mask. Can give multiple fields.
  fields : [ 'level1.level2.level3.field3', 
  'level1.level2.field2', 
  'level1.field1', 
  'value1', 
  'level1.level2.level3.field4[0].Hello', 
  'level1.level2.level3.field4[2]']
};

const nestedObject = {
  level1: {
    field1: "field1",
    level2: {
      field2: "field2",
      level3: {
        field3: "field3",
        field4: [{ Hello: "world" }, { Hello: "Newworld" }, "Just a String"]
      }
    }
  },
  value1: "value"
};
const maskedObj = MaskData.maskJSONFields(nestedObject, defaultJSONMaskOptions2);

//Output: 
{
  "level1": {
    "field1": "******",
    "level2": {
      "field2": "******",
      "level3": {
        "field3": "******",
        "field4": [
          {
            "Hello": null
          },
          {
            "Hello": "Newworld"
          },
          "*************"
        ]
      }
    }
  },
  "value1": "*****"
}
```


### Example2: To mask all the keys of an object or to mask a field from all the elements of an array.

```javascript
Limitations: 
1. Only one * is allowed per field. Either ARRAY[*].FIELD or JSON.* 
2. It will not work for nested fields like ARRAY[*].FIELD1.FIELD2
3. It will not mask all array elements if given ARRAY[*] or ARRAY[*].
4. Will not mask null values.
5. If ARRAY[*].FIELD is an object, then it will mask that entire object including the key.

const nestedObject = {
  level1: {
    field1: "field1Value",
    level2: {
      field2: "field2Value",
      field3: [ { Hello: "Hello", Hi: "one" }, { Hello: "Hello again" } ],
      level3: {
        field4: "field4Value",
        field5: "field5Value"
      }
    }
  },
  value1: "value"
};

const maskAllFields = {
  fields : ['level1.level2.field3[*].Hello', 'level1.level2.level3.*']
};

const maskedObject = MaskData.maskJSONFields(nestedObject, maskAllFields);

// Output: 
{
  "level1": {
    "field1": "field1Value",
    "level2": {
      "field2": "field2Value",
      "field3": [
        {
          "Hello": "*****",
          "Hi": "one"
        },
        {
          "Hello": "***********"
        }
      ],
      "level3": {
        "field4": "***********",
        "field5": "***********"
      }
    }
  },
  "value1": "value"
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
