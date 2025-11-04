maskdata is a Node.js module to mask various kinds of data. With the help of maskdata, you can mask email, phone number, card number, password, jwt tokens etc... Either mask them separately or mask all these types of data in a json together.
<br/><br/>Also, it provides utility functions to get a field, or replace a field from any complex/nested JSON.

# Table of Contents
- [Supported Features](#features)
- [Install maskdata](#install-maskdata)
- [Version 1.3.3 Features](#release-features)
- [Maskdata for Typescript](#maskdata-for-typescript)
- [How to Use](#how-to-use)
  - [Mask Card number](#mask-card-number)
  - [Mask Email](#mask-email-id)
    - [Mask Email id with the default configuration](#mask-email-id-with-the-default-configuration)
  - [Mask JSON fields](#mask-json)
    - [JSON mask examples with nested fields](#json-mask-examples)
    - [Mask multiple fields at once using .* and [*].](#mask-multiple-fields)
      - [Recursive masking / Mask all the fields with a name in the json](#recursive-masking)
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
* Mask Passwords
* Mask Phone numbers
* Mask given words/substrings in a String
* Mask generic Strings
* Mask UUIDs
* Mask JWT tokens
* Mask JSON - JSON can contain cards, emails, passwords, phones, strings, jwt tokens, UUIDs etc... Mask all of them with a single call using - [Mask JSON fields](#mask-json)
* Get nested field from JSON
* Set/Replace nested field values from JSON
* [Maskdata for typescript](#maskdata-for-typescript)

# Install maskdata
> npm i maskdata

# Release Features
### Version 1.3.3
- Improved documentation
### Version 1.3.2
- Recursive masking feature: [Details](#recursive-masking)
  - https://github.com/Sumukha1496/maskdata/issues/45
  - https://github.com/Sumukha1496/maskdata/issues/47
- Fixed output length masking: [Mask Password](#mask-password) and [Mask String](#generic-string-masking)
  - https://github.com/Sumukha1496/maskdata/issues/46
### Version 1.3.1
- Removal of maskJSONFields function: https://www.npmjs.com/package/maskdata/v/1.1.10#mask-fields-in-a-json 
- String mask version2 for generic string masking in response to the below issues: [Details](#generic-string-masking)
  - https://github.com/Sumukha1496/maskdata/issues/17
  - https://github.com/Sumukha1496/maskdata/issues/40
  - https://github.com/Sumukha1496/maskdata/issues/42 
- Supporting generic string masking(string mask V2) as part of maskJson2: [generic String masking in a JSON](#json-mask-examples)

<br/>

## Maskdata for Typescript
> Follow this document for more details: 
[Maskdata for typescript](documentation/MASKDATA_FOR_TYPESCRIPT.md)

<br/>

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

For more examples: 

- [Mask Email id](documentation/mask_email_id.md)
- [Mask Email id with the default configuration](documentation/mask_email_id_with_the_default_configuration.md)
- [Mask Password](documentation/mask_password.md)
- [Mask Password with the default configuration](documentation/mask_password_with_the_default_configuration.md)
- [Mask Phone Number](documentation/mask_phone_number.md)
- [Mask Phone Number with the default configuration](documentation/mask_phone_number_with_the_default_configuration.md)
- [Mask UUID](documentation/mask_uuid.md)
- [Mask JWT Token](documentation/mask_jwt_token.md)
- [Get Nested JSON Property](documentation/get_nested_json_property.md)
- [Replace the value of a JSON field](documentation/replace_the_value_of_a_json_field.md)