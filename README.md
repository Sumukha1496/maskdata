maskdata is a Node.js module to mask various kinds of data. With the help of maskdata, you can mask email, phone number, card number, JSON fields, password etc.. 
<br/>Also, it provides utility methods to get a field, or replace a field from any complex/nested json.

# Table of Contents
- [Features](#features)
- [Install maskdata](#install-maskdata)
- [Version 1.1.6 Features](#release-features)
- [How to Use](#how-to-use)
    - [Mask Phone Number](#mask-phone-number)
    - [Mask Phone Number with the default configuration](#mask-phone-number-with-the-default-configuration)
    - [Mask Password](#mask-password)
    - [Mask Password with the default configuration](#mask-password-with-the-default-configuration)
    - [Mask Email](#mask-email-id)
    - [Mask Email id with the default configuration](#mask-email-id-with-the-default-configuration)
    - [Get Nested Json Property](#get-nested-json-property)
    - [Replace the value of a json field](#replace-the-value-of-a-json-field)
    - [Mask JSON fields](#mask-fields-in-a-json)
    - [Mask nested JSON fields](#mask-fields-of-a-nested-object)
    - [Mask words/characters in a string](#mask-the-characters-or-words-in-the-string)
    - [Mask Card number](#mask-card-number)
- [Report Bugs](#report-bugs)
- [Give a Star](#give-a-star)
- [LICENSE - "MIT"](#license---mit)

# Features
* Mask password
* Mask Phone numbers
* Mask Email
* Mask desired fields in a JSON
* Mask the given words/substrings from throughout a String
* Mask the card number
* Get nested field from JSON
* Set/Replace nested field values from JSON

# Install maskdata
> npm i maskdata

# Release Features
### Version: 1.1.6
- Feature to mask all the characters in the String along with mask/not mask spaces in the string.
- [Mask all characters in the String](#mask-all-characters-in-the-string)
### Version: 1.1.4
- Password masking bug fix: https://github.com/Sumukha1496/maskdata/issues/12

### Version: 1.1.3
- Unmasked start and end characters feature in password masking. It can be used in cases where the password/Secret key has some metadata info which needs to be printed or shown to users. 
Ticket: https://github.com/Sumukha1496/maskdata/issues/11. Both the fields are opional and can find more info here: [Mask Password](#mask-password)

#### Example: Mask password OR secretKey with some meta info at the end

```javascript
const MaskData = require('./maskdata');

const maskPasswordOptions = {
  maskWith: "X",
  maxMaskedCharacters: 20, // To limit the output String length to 20.
  unmaskedStartCharacters: 4,
  unmaskedEndCharacters: 9 // As last 9 characters of the secret key is a meta info which can be printed for debugging or other purpose
};

const password = "TEST:U2VjcmV0S2V5MQ==:CLIENT-A";

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);
//Output: TESTXXXXXXX:CLIENT-A

maskPasswordOptions.unmaskedStartCharacters = 0;

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);
//Output: XXXXXXXXXXX:CLIENT-A
```

# How to Use
```javascript
const MaskData = require('./maskdata');
```

## Mask Phone Number
```javascript
const MaskData = require('./maskdata');

const maskPhoneOptions = {
  // Character to mask the data
  // default value is '*'
  maskWith: "*",

  //Should be positive Integer
  // If the starting 'n' digits needs to be unmasked
  // Default value is 4
  unmaskedStartDigits: 5, 

  // Should be positive Integer
  //If the ending 'n' digits needs to be unmasked
  // Default value is 1
  unmaskedEndDigits: 1 
};

const phoneNumber = "+911234567890";

const maskedPhoneNumber = MaskData.maskPhone(phoneNumber, maskPhoneOptions);
//Output: +9112*******0

```

## Mask Phone Number with the default configuration
To mask with the default options, dont pass the configurations.
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
To mask with the default options, dont pass the configurations.
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


## Mask Email id
Use this method instead of maskEmail(). To mask with the default options, dont pass the configurations.
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
To mask with the default options, dont pass the configurations.
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


## Get Nested Json Property
This method returns the value of nested Json property if exists. Otherwise it returns ```undefined```
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


## Replace the value of a json field
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
This method masks the field value if present in the given object
```javascript
const MaskData = require('./maskdata');

const maskJSONOptions = {
  // Character to mask the data. Default value is '*'
  maskWith: "*",

  // It should be an array
  // Field names to mask. Can give multiple fields.
  fields: ['password', 'firstName'] 
};

const obj = {
  password: "IKnowNothing",
  firstName: "Jon",
  lastName: "Snoww"
};
const maskedObj = MaskData.maskJSONFields(obj, maskJSONOptions);

//Output: { password: '************', firstName: '***', lastName: 'Snoww' }

```


## Mask fields of a nested Object
This method masks the field value if present in the given object

The masked value type will always be string. Won't mask if the value is ```null```.

If the field doesn't exist or if there is any syntax error, then it will ignore without throwing any error.
```javascript
const MaskData = require('./maskdata');

const maskJSONOptions = {
  // Character to mask the data. Default value is '*'
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
Limititions: 
1. Only one * is allowed per field. Either ARRAY[*].FIELD or JSON.* 
2. It will not work for the nested fields like ARRAY[*].FIELD1.FIELD2
3. It will not mask all array elements if given ARRAY[*] or ARRAY[*].
4. Will not mask null values.
5. If ARRAY[*].FIELD is an object, then it will mask that entire object include key.

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
## Mask the characters or words in the string
This will mask the characters or words value if present in the given string.
```javascript
const MaskData = require('./maskdata');

const maskStringOptions = {
  // Character to mask the data. Default value is '*'
  maskWith: "*",

  /** 
   * It is the words/substrings to mask. 
   * Should be an array of strings.
   * Can give multiple words/substrings.
   * values[] can be used only when maskAll is false. If maskAll is true, then this is of no use.
  */
  values: ['is', 'test'], 

  /** 
   * If to mask only the first occurance of each word/substring in the given string
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
   * If maskSpace is true, the spaces in the string will be masked.
   * This feature is to know the words and each word length but to hide the content
   * Default value is true
  */
  maskSpace: true
};

const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

//Output: Th** ** a **** String

```

### Mask all characters in the String
```
const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

const stringMaskOptions = {
  maskWith: "*",
  values: [],
  maskAll: true,
  maskSpace: false   // Do not mask space
};

// Output: **** ** * **** *****
-------------------------------------------------------------------

const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

const stringMaskOptions = {
  maskWith: "*",
  values: [],
  maskAll: true,
  maskSpace: false   // Mask spaces also
};

// Output: ********************

```

## Mask card number
This will mask the digits in a card numbers.<br/>This will mask only the numerical data and not any non numeric delimeters, alphabets or any other types of data
```javascript
const MaskData = require('./maskdata');

const maskCardOptions = {
  // Character to mask the data. Default value is 'X'
  maskWith: "X",

  // Should be positive Integer
  // If the starting 'n' digits needs to be unmasked
  // Default value is 4
  unmaskedStartDigits: 4, 
  
  //Should be positive Integer
  //If the ending 'n' digits needs to be unmasked
  // Default value is 1. 
  unmaskedEndDigits: 1 
};

const cardNumber = "1234-5678-1234-5678";

const cardAfterMasking = MaskData.maskCard(cardNumber, maskCardOptions);

//Output: 1234-XXXX-XXXX-XXX8

```

# Report Bugs 
Please raise an issue in github: https://github.com/Sumukha1496/maskdata/issues

# Give a Star
You can give a start at: https://github.com/Sumukha1496/maskdata/stargazers 

# LICENSE - "MIT" 
Licenced under MIT Licence

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
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
