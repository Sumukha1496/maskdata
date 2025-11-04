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