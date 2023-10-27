const MaskData = require('../index');

const passwordMaskOptions = {
  maxMaskedCharacters: 10,
  maskWith: 'X',
  unmaskedStartCharacters: 7,
  unmaskedEndCharacters: 3
};

const password = 'Password1$';
console.log(`Unmasked Password: ${password}` + ' Length: ' + password.length);
const maskedP = MaskData.maskPassword(password, passwordMaskOptions);
console.log('Password after masking:' + maskedP + ' Length: ' + maskedP.length);
console.log('========================================');
const maskedPD = MaskData.maskPassword(password);
console.log(
  'Password after masking with default options:' + maskedPD + ' Length: ' + maskedPD.length
);
console.log('========================================');

const phoneMaskOptions = {
  maskWith: '*',
  unmaskedStartDigits: 5,
  unmaskedEndDigits: 1
};

const phone = '+91123456789';

console.log(`Unmasked phone: ${phone}`);
console.log(`phone after masking: ${MaskData.maskPhone(phone, phoneMaskOptions)}`);
console.log('========================================');
console.log(`phone after masking with default options: ${MaskData.maskPhone(phone)}`);
console.log('========================================');

const emailMask2Options = {
  maskWith: '*',
  unmaskedStartCharactersBeforeAt: 0,
  unmaskedEndCharactersAfterAt: 99,
  maskAtTheRate: false
};

console.log('========================================');
const email = 'my.testEmail@testMail.com';
console.log(`Unmasked email: ${email}`);
console.log(`Email after masking: ${MaskData.maskEmail2(email, emailMask2Options)}`);
console.log('========================================');
console.log(`Email after masking with default options: ${MaskData.maskEmail2(email)}`);
console.log('========================================');

console.log('========================================');
const shortEmail = 'a@b.c';
console.log(`Unmasked shortEmail: ${shortEmail}`);
console.log(`shortEmail after masking: ${MaskData.maskEmail2(shortEmail, emailMask2Options)}`);
console.log('========================================');

const jsonMaskOptions = {
  fields: ['password', 'firstName'],
  maxMaskedCharactersStr: 3
};
const json = {
  password: 'PasswordValue',
  firstName: 'FIRST_NAME',
  lastName: 'LAST_NAME'
};
console.log(`Unmasked object: `);
console.log(JSON.stringify(json));
console.log(`Object after masking:`);
console.log(JSON.stringify(MaskData.maskJSONFields(json, jsonMaskOptions)));
console.log('========================================');
console.log(JSON.stringify(json));
console.log('========================================');
const jsonMaskOptions2 = {
  fields: [
    'level1.level2.level3.field3',
    'level1.level2.field2',
    'level1.field1',
    'value1',
    'level1.level2.level3.field4[0].Hello',
    'level1.level2.level3.field4[2]'
  ]
};
const maskAllFieldsOptions = {
  fields: ['level1.level2.field3[*].Hello', 'level1.level2.level3.*']
};
const nestedAllObject = {
  level1: {
    field1: 'field1Value',
    level2: {
      field2: 'field2Value',
      field3: [{ Hello: 'HelloValue', Hi: 'one' }, { Hello: 'Hello again' }],
      level3: {
        field4: 'field4Value',
        field5: 'field5Value'
      }
    }
  },
  value1: 'value'
};
console.log(`Unmasked nested object: `);
console.log(JSON.stringify(nestedAllObject));
console.log(`Nested Object after masking all:`);
console.log(JSON.stringify(MaskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)));
console.log('========================================');
const nestedObject = {
  level1: {
    field1: 'field1',
    level2: {
      field2: 'field2',
      level3: {
        field3: 'field3',
        field4: [{ Hello: 'world' }, { Hello: 'Newworld' }, 'Just a String']
      }
    }
  },
  value1: 'value'
};
console.log(`Unmasked nested object: `);
console.log(JSON.stringify(nestedObject));
console.log(`Nested Object after masking:`);
console.log(JSON.stringify(MaskData.maskJSONFields(nestedObject, jsonMaskOptions2)));
console.log('========================================');

const stringMaskOptions = {
  maskWith: '*',
  values: ['is', 'API']
};

const fullStringMaskOptions = {
  maskWith: '*',
  values: ['is', 'API'],
  maskAll: true
};

const fullStringMaskOptionsWithoutSpace = {
  maskWith: '*',
  values: ['is', 'API'],
  maskAll: true,
  maskSpace: false
};

let str = 'This is a testingAPI String';
console.log(`Unmasked string: ${str}`);
console.log(`String after masking: ${MaskData.maskString(str, stringMaskOptions)}`);
console.log('========================================');

str = 'This is a testingAPI String';
stringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(
  `String after masking entire string: ${MaskData.maskString(str, fullStringMaskOptions)}`
);
console.log('========================================');

str = 'This is a testingAPI String';
stringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(
  `String after masking only first occurances: ${MaskData.maskString(str, stringMaskOptions)}`
);
console.log('========================================');

str = 'This is a testingAPI String';
stringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(
  `String after masking entire string without spaces: ${MaskData.maskString(
    str,
    fullStringMaskOptionsWithoutSpace
  )}`
);
console.log('========================================');

const cardMaskOptions = {
  maskWith: 'X',
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 5
};

let cardNumber = '1234-5678-1234-5678';
console.log(`Unmasked cardNumber: ${cardNumber}`);
console.log(`cardNumber after masking: ${MaskData.maskCard(cardNumber, cardMaskOptions)}`);
console.log('========================================');

const nestedJson = {
  level1: {
    field1: 'field1',
    level2: {
      field2: 'field2',
      level3: {
        field3: 'field3',
        field4: [{ Hello: 'world' }, { Hello: 'Newworld' }, 'Just a String']
      }
    }
  },
  value1: 'value'
};
const field = 'level1.level2.level3.field4[0].Hello';
console.log('========================================');
console.log(`${field}: ${MaskData.getInnerProperty(nestedJson, field)}`);
const input = {
  name: 'John',
  age: 33,
  married: true
};
console.log('Before replacing: ' + JSON.stringify(input));
console.log('========================================');
let afterReplacing = MaskData.replaceValue(input, 'age', 99);
afterReplacing = MaskData.replaceValue(input, 'married', false);
console.log('After replacing: ' + JSON.stringify(afterReplacing));
console.log('Type of age: ' + typeof afterReplacing.age);
console.log('Type of married: ' + typeof afterReplacing.married);

const maskCardOptions = {
  maskWith: '*',
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 4
};

const obj = { cardNumber: '123456789123', abc: 'abceew', efg: '121212' };
const result = MaskData.replaceValue(
  obj,
  'cardNumber',
  MaskData.maskCard(obj['cardNumber'], maskCardOptions)
);
console.log(result);

const jsonInput = {
  credit: '1234-5678-8765-1234',
  debit: '0000-1111-2222-3333',
  primaryEmail: 'primary@Email.com',
  secondaryEmail: 'secondary@Email.com',
  password: 'dummyPassword',
  homePhone: '+1 1234567890',
  workPhone: '+1 9876543210',
  addressLine1: 'This is my addressline 1. This is my home',
  addressLine2: 'AddressLine 2',
  uuid1: '123e4567-e89b-12d3-a456-426614174000'
};

const jsonMaskConfig = {
  cardFields: ['credit', 'debit'],
  emailFields: ['primaryEmail', 'secondaryEmail'],
  passwordFields: ['password'],
  phoneFields: ['homePhone', 'workPhone'],
  stringMaskOptions: {
    maskWith: '*',
    maskOnlyFirstOccurance: false,
    values: ['This']
  },
  stringFields: ['addressLine1', 'addressLine2'],
  uuidFields: ['uuid1']
};

const maskedJsonOutput = MaskData.maskJSON2(jsonInput, jsonMaskConfig);
console.log(maskedJsonOutput);

const jsonInput2 = {
  cards: {
    creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
    debitCards: ['0000-1111-2222-3333', '2222-1111-3333-4444']
  },
  emails: {
    primaryEmail: 'primary@Email.com',
    secondaryEmail: 'secondary@Email.com'
  },
  passwords: [['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword']],
  phones: {
    homePhone: '+1 1234567890',
    workPhone: '+1 9876543210'
  },
  address: {
    addressLine1: 'This is my addressline 1. This is my home',
    addressLine2: 'AddressLine 2'
  },
  string1: [
    {
      id: '1111',
      name: 'Test',
      primaryEmail: 'primary@Email.com',
      items: [
        {
          id: '11111',
          passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
          creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
          phone: '+1 1234567890',
          uuid1: '123e4567-e89b-12d3-a456-426614174000',
          primaryEmail: 'primary@Email.com',
          name: '11111',
          child: [
            {
              child1: 'child1111111',
              phone: '+1 1234567890',
              passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
              primaryEmail: 'primary@Email.com',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222']
            },
            {
              child1: 'child2222222',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222']
            }
          ]
        },
        {
          id: '11112',
          phone: '+1 1234567890',
          name: '11112',
          uuid1: '123e4567-e89b-12d3-a456-426614174000',
          primaryEmail: 'primary@Email.com',
          creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
          child: [
            {
              child1: 'child1111111',
              passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
              primaryEmail: 'primary@Email.com',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
              uuid1: '123e4567-e89b-12d3-a456-426614174000',
              phone: '+1 1234567890'
            },
            {
              child1: 'child2222222',
              primaryEmail: 'a@b.c',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
              phone: '+1 1234567890',
              uuid1: '123e4567-e89b-12d3-a456-426614174000'
            }
          ]
        }
      ]
    },
    {
      id: '2222',
      name: 'Test',
      items: [
        {
          id: '22221',
          phone: '+1 1234567890',
          passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
          name: '22221',
          uuid1: '123e4567-e89b-12d3-a456-426614174000',
          creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
          child: [
            {
              child1: 'child1111111',
              phone: '+1 1234567890',
              uuid1: '123e4567-e89b-12d3-a456-426614174000',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222']
            },
            {
              child1: 'child2222222',
              uuid1: '123e4567-e89b-12d3-a456-426614174000',
              passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
              phone: '+1 1234567890',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222']
            }
          ]
        },
        {
          id: '22222',
          name: '22222',
          phone: '+1 1234567890',
          primaryEmail: 'primary@Email.com',
          uuid1: '123e4567-e89b-12d3-a456-426614174000',
          creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
          child: [
            {
              child1: 'child1111111',
              phone: '+1 1234567890',
              passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
              primaryEmail: 'primary@Email.com',
              uuid1: '123e4567-e89b-12d3-a456-426614174000',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222']
            },
            {
              child1: 'child2222222',
              phone: '+1 1234567890',
              passwords: ['dummyPasswordANDdummyPassword', 'dummyPasswordANDdummyPassword'],
              uuid1: '123e4567-e89b-12d3-a456-426614174000',
              creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222']
            }
          ]
        }
      ]
    }
  ],
  uuids: {
    uuid1: '123e4567-e89b-12d3-a456-426614174000'
  }
};

const jsonMaskConfig2 = {
  cardMaskOptions: { maskWith: 'X', unmaskedStartDigits: 2, unmaskedEndDigits: 4 },
  cardFields: [
    'string1[*].items[*].creditCards.*',
    'string1[*].items[*].child[*].creditCards.*',
    'cards.creditCards[0]',
    'cards.creditCards[1]',
    'cards.debitCards[0]',
    'cards.debitCards[1]'
  ],

  // Email
  emailMaskOptions: {
    maskWith: '*',
    unmaskedStartCharactersBeforeAt: 2,
    unmaskedEndCharactersAfterAt: 2,
    maskAtTheRate: false
  },
  emailFields: [
    'string1[*].items[*].primaryEmail',
    'string1[*].items[*].child[*].primaryEmail',
    'string1[*].primaryEmail',
    'emails.primaryEmail',
    'emails.secondaryEmail'
  ],

  // Password
  passwordMaskOptions: {
    maskWith: '*',
    maxMaskedCharacters: 10,
    unmaskedStartCharacters: 0,
    unmaskedEndCharacters: 0
  },
  passwordFields: [
    'passwords[0][0]]',
    'passwords[0][1]',
    'string1[*].items[*].passwords.*',
    'string1[*].items[*].child[*].passwords.*[1]'
  ],

  // Phone
  phoneMaskOptions: { maskWith: '*', unmaskedStartDigits: 2, unmaskedEndDigits: 1 },
  phoneFields: [
    'string1[*].items[*].phone',
    'string1[*].items[*].child[*].phone',
    'phones.homePhone',
    'phones.workPhone'
  ],

  // String
  stringMaskOptions: {
    maskWith: '*',
    maskOnlyFirstOccurance: false,
    values: [],
    maskAll: true,
    maskSpace: false
  },
  stringFields: [
    'string1[*].items[*].id',
    'string1[*].items[*].child[*].child1',
    'address.addressLine1',
    'address.addressLine2'
  ],

  // UUID
  uuidMaskOptions: { maskWith: '*', unmaskedStartCharacters: 4, unmaskedEndCharacters: 2 },
  uuidFields: ['uuids.uuid1', 'string1[*].items[*].uuid1', 'string1[*].items[*].child[*].uuid1']
};

const maskedJsonOutput2 = MaskData.maskJSON2(jsonInput2, jsonMaskConfig2);
console.log(JSON.stringify(maskedJsonOutput2));

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 512,
  maskDot: true,
  maskHeader: true,
  maskPayload: true,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU';
console.log(jwt);
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);
console.log(maskedJwt);

const jsonInput3 = {
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
      name: 'No card number here'
    }
  ],
  emails: {
    primaryEmail: 'primary@Email.com',
    secondaryEmail: 'secondary@Email.com',
    moreEmails: [
      'email1@email.com',
      'email2@email.com',
      'email3@email.com',
      { childEmail: 'child@child.com', secondChild: { nestedkid: 'hello@hello.com' } }
    ]
  },
  array: ['element1', 'element22', 'element333'],
  jwts: [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU'
  ]
};

const jsonMaskConfig3 = {
  cardMaskOptions: { maskWith: 'X', unmaskedStartDigits: 0, unmaskedEndDigits: 0 },

  emailMaskOptions: {
    maskWith: '*',
    unmaskedStartCharactersBeforeAt: 0,
    unmaskedEndCharactersAfterAt: 0,
    maskAtTheRate: false
  },

  stringMaskOptions: {
    maskWith: '?',
    maskOnlyFirstOccurance: false,
    values: [],
    maskAll: true,
    maskSpace: false
  },
  jwtMaskOptions: {
    maskWith: '*',
    maxMaskedCharacters: 32,
    maskDot: false,
    maskHeader: true,
    maskPayload: true,
    maskSignature: true
  },

  cardFields: ['cards[*].number'],
  emailFields: ['emails.*'],
  stringFields: ['array.*'],
  jwtFields: ['jwts.*']
};

const maskedOutput = MaskData.maskJSON2(jsonInput3, jsonMaskConfig3);

console.log(maskedOutput);
console.log(maskedOutput['emails'].moreEmails[3].secondChild.nestedkid);
