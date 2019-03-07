maskdata is a Node.js module to mask various kinds of data.

# Table of Contents
- [Features](#features)
- [Install maskdata](#install-maskdata)
- [How to Use](#how-to-use)
    - [Mask Phone Number](#mask-phone-number)
    - [Mask Phone Number with the default configuration](#mask-phone-number-with-the-default-configuration)
    - [Mask Password](#mask-password)
    - [Mask Password with the default configuration](#mask-password-with-the-default-configuration)
    - [Mask Email](#mask-email-id)
    - [Mask Email id with the default configuration](#mask-email-id-with-the-default-configuration)
    - [Mask JSON fields](#mask-fields-in-a-json)
    - [Mask a value from the string](#mask-the-exact-substring-from-throughout-the-sstring)
- [Report Bugs](#report-bugs)
- [LICENSE - "MIT"](#license---mit)

# Features
* Mask password data with the desired configuration
    * Simple password mask(Mask using default configurations)
    * Mask password data with the desired configuration
* Mask Phone numbers
    * Simple phone number mask(Mask using default configurations)
    * Mask phone number data with the desired configuration
* Mask Email
    * Simple Email mask(Mask using default configurations)
    * Mask Email data with the desired configuration
* Mask desired fields in a JSON
* Mask the given substring from throughout a String

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
  unmaskedStartDigits : 5, //Should be positive Integer
  //If the ending 'n' digits needs to be unmasked
  // Default value is 1
  unmaskedEndDigits : 1 // Should be positive Integer
};

const phoneNumber = "+911234567890";

const maskedPhoneNumber = MaskData.maskPhone(phoneNumber, maskPhoneOptions);
//Output : +9112*******0

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

const maskedPhoneNumber = MaskData.simplePhoneMask(phoneNumber);

//Output : +911********0

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

//Output : **********

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
  unmaskedStartCharacters : 1, //Should be positive Integer
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

//Output : m**********@**********om

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

//Output : my.********@**********om

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
const maskedObj = MaskData.maskJSONFields(obj, maskJSONOptions);

//Output : { password: '************', firstName: '***', lastName: 'Snoww' }

```

## Mask the exact substring from throughout the string
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

//Output : Th** ** a **** String

```

# Report Bugs 
Please raise an issue in github : https://github.com/Sumukha1496/maskdata/issues

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
