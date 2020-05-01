maskdata is a Node.js module to mask various kinds of data.

# Table of Contents
- [Features](#features)
- [Install maskdata](#install-maskdata)
- [Version 1.1.0 Features](#release-features)
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
    - [Mask a value from the string](#mask-the-exact-substring-from-throughout-the-string)
    - [Mask Card number](#mask-card-number)
- [Report Bugs](#report-bugs)
- [LICENSE - "MIT"](#license---mit)

# Features
* Mask password
* Mask Phone numbers
* Mask Email
* Mask desired fields in a JSON
* Mask the given substring from throughout a String
* Mask the card number

# Install maskdata
> npm i maskdata

# Release Features
### Version: 1.1.0
- Depricated **simplePasswordMask()** method -> To mask with default configs, simply dont pass the config argument to **maskPassword()** method.

- Depricated **simplePhoneMask()** method -> To mask with default configs, simply dont pass the config argument to **maskPhone()** method.

- Depricated **simpleEmailMask()** method -> To mask with default configs, simply dont pass the config argument to **maskEmail()** method.

- Depricated **maskEmail()** method due to its complications in using the configs and some bugs -> To mask email, start using **maskEmail2()** method with the configs mentioned for maskEmail2 method

All the above depricated methods will be removed in the next version

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
  maxMaskedCharacters: 16
};

const password = "Password1$";

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);

//Output: **********

```

## Mask Password with the default configuration
To mask with the default options, dont pass the configurations.
```javascript
const MaskData = require('./maskdata');

  /** Default Options
    maskWith: "*"
    maxMaskedCharacters: 16
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

## Mask Email Id
### **Depricated method**. Will be removed in next version. Start using maskEmail2 method
Mask the email id along with the required configurations
```javascript
// Depricated method
const MaskData = require('./maskdata');

const maskEmailOptions = {
  // Character to mask the data. Default value is '*'
  maskWith: "*",

  //Should be positive Integer
  // If the starting 'n' characters needs to be unmasked. Default value is 3
  unmaskedStartCharacters: 1, 

  //Should be positive Integer
  // If the ending 'n' characters needs to be unmasked. Default value is 2
  unmaskedEndCharacters: 2, 

  // Should be boolean
  //If '@' needs to be masked. Default value is false(Will not mask)
  maskAtTheRate: false, 

  //Should be positive Integer
  // To limit the *s in the response(Max *s before '@'). Default value is 10
  maxMaskedCharactersBeforeAtTheRate: 10, 

  //Should be positive Integer
  // To limit the *s in the response(Max *s after '@'). Default value is 10
  maxMaskedCharactersAfterAtTheRate: 10 
};

const email = "my.test.email@testEmail.com";

**Depricated method**
const maskedEmail = MaskData.maskEmail(email, maskEmailOptions);

//Output: m**********@**********om

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

console.log("Before replacing: " + JSON.stringify(input));
console.log("========================================");
let afterReplacing = MaskData.replaceValue(input, 'age', 99);
afterReplacing = MaskData.replaceValue(input, 'married', false);
console.log("After replacing: " + JSON.stringify(afterReplacing));
console.log("Type of age: "+ typeof(afterReplacing.age));
console.log("Type of married: "+ typeof(afterReplacing.married));

//Output: 

Before replacing: {"name":"John","age":33,"married":true}
========================================
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
{"level1":{"field1":"******","level2":{"field2":"******","level3":{"field3":"******","field4":[{"Hello":null},{"Hello":"Newworld"},"*************"]}}},"value1":"*****"}
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
{"level1":{"field1":"field1Value","level2":{"field2":"field2Value","field3":[{"Hello":"*****","Hi":"one"},{"Hello":"***********"}],"level3":{"field4":"***********","field5":"***********"}}},"value1":"value"}


```

## Mask the exact substring from throughout the string
This will mask the field value if present in the given object
```javascript
const MaskData = require('./maskdata');

const maskStringOptions = {
  // Character to mask the data. Default value is '*'
  maskWith: "*",

  // It should be an array of strings
  // Field names to mask. Can give multiple fields.
  values: ['is', 'test'], 

  // Should be boolean
  // If to mask only the first occurance of each value in the given string
  maskOnlyFirstOccurance: false
};

const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

//Output: Th** ** a **** String

```

## Mask card number
This will mask the card numbers
```javascript
const MaskData = require('./maskdata');

const maskCardOptions = {
  // Character to mask the data. Default value is 'X'
  maskWith: "X",

  // Should be positive Integer
  // If the starting 'n' numbers needs to be unmasked
  // Default value is 4
  unmaskedStartDigits: 4, 
  
  //Should be positive Integer
  //If the ending 'n' numbers needs to be unmasked
  // Default value is 1. 
  // Max possible value is 4
  unmaskedEndDigits: 1 
};

const cardNumber = "1234-5678-1234-5678";

const cardAfterMasking = MaskData.maskCard(cardNumber, maskCardOptions);

//Output: 1234-XXXX-XXXX-XXX8

```

# Report Bugs 
Please raise an issue in github: https://github.com/Sumukha1496/maskdata/issues

# Give a Star:
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
