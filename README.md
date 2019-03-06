maskdata is a Node.js module to mask various kinds of data.

# Table of Contents
- [Features](#features)
- [Install maskdata](#install-maskdata)
- [How to Use](#use)
    - [Mask Phone Number](#maskPhone)
    - [Mask Password](#maskPassword)
    - [Mask Email](#maskEmail)
    - [Mask JSON fields](#maskJSON)
    - [Mask a value from the string](#maskString)
- [Report Bugs](#report)
- [LICENSE - "MIT"](#license---mit)

# Features
* Mask password data
* Mask Phone numbers
* Mask JSON Fields value
* Mask String
* Mask Email

# Install maskdata
> npm i maskdata

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
  maskWith : "*",
  // If the starting 'n' digits needs to be unmasked
  // Default value is 4
  unmaskedStartDigits : 4, //Should be positive Integer
  //If the ending 'n' digits needs to be unmasked
  // Default value is 1
  unmaskedEndDigits : 1 // Should be positive Integer
};

const phoneNumber = "+111234567890";

const maskedPhoneNumber = MaskData.maskPhone(phone, maskPhoneOptions);

```

## Mask Phone Number with the default configuration
```javascript
const MaskData = require('./maskdata');

/** Default Options
  maskWith : "*"
  unmaskedStartDigits : 4
  unmaskedEndDigits : 1 
**/
const phoneNumber = "+111234567890";

const maskedPhoneNumber = MaskData.simplePhoneMask(phone);

```

## Mask Password
```javascript
const MaskData = require('./maskdata');

const maskPasswordOptions = {
  // Character to mask the data
  // default value is '*'
  maskWith : "*",
  // To limit the *s in the response when the password length is more
  // Default value is 16
  maxMaskedCharacters : 16
};

const password = "Password1$";

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);

```

## Mask Password with the default configuration
```javascript
const MaskData = require('./maskdata');

  /** Default Options
    maskWith : "*"
    maxMaskedCharacters : 16
  **/

const password = "Password1$";

const maskedPassword = MaskData.simplePasswordMask(password);

```

## Mask Email Id
Mask the email id along with the required configurations
```javascript
const MaskData = require('./maskdata');

const maskEmailOptions = {
  // Character to mask the data. Default value is '*'
  maskWith : "*",
  // If the starting 'n' characters needs to be unmasked. Default value is 3
  unmaskedStartCharacters : 3, //Should be positive Integer
  // If the ending 'n' characters needs to be unmasked. Default value is 2
  unmaskedEndCharacters : 2, //Should be positive Integer
  //If '@' needs to be masked. Default value is false(Will not mask)
  maskAtTheRate : false, // Should be boolean
  // To limit the *s in the response(Max *s before '@'). Default value is 10
  maxMaskedCharactersBeforeAtTheRate : 10, //Should be positive Integer
  // To limit the *s in the response(Max *s after '@'). Default value is 10
  maxMaskedCharactersAfterAtTheRate : 10 //Should be positive Integer
};

const email = "my.test.email@testEmail.com";

const maskedEmail = MaskData.maskEmail(email, maskEmailOptions);

```

## Mask Email id with the default configuration
```javascript
const MaskData = require('./maskdata');

/** Default Options
    maskWith : "*"
    unmaskedStartCharacters : 3
    unmaskedEndCharacters : 2
    maskAtTheRate : false
    maxMaskedCharactersBeforeAtTheRate : 10
    maxMaskedCharactersAfterAtTheRate : 10
**/
const email = "my.test.email@testEmail.com";

const maskedEmail = MaskData.simpleEmailMask(email);

```

## Mask fields in a JSON 
This will mask the field value if present in the given object
```javascript
const MaskData = require('./maskdata');

const maskJSONOptions = {
  // Character to mask the data. Default value is '*'
  maskWith : "*",
  // Field names to mask. Can give multiple fields.
  fields : ['password', 'firstName'] // It should be an array
};

const obj = {
  password : "IKnowNothing",
  firstName : "Jon",
  lastName : "Snoww"
};

const JSONAfterMasking = MaskData.maskJSONFields(obj, maskJSONOptions);

```

## Mask the exact substring from throughout the string.
This will mask the field value if present in the given object
```javascript
const MaskData = require('./maskdata');

const maskStringOptions = {
  // Character to mask the data. Default value is '*'
  maskWith : "*",
  // Field names to mask. Can give multiple fields.
  values : ['is', 'test'], // It should be an array of strings
  // If to mask only the first occurance of each value in the given string
  maskOnlyFirstOccurance : false
};

const str = "This is a test String";

const strAfterMasking = MaskData.maskString(str, maskStringOptions);

```

# Report Bugs 
Please raise an issue in github : 

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
