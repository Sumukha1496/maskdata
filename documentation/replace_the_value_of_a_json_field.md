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

### Recursive Masking
If you want to mask all the fields with a name irrespective of its level in the json, use the `*{field_name}`. 

Example: 
```javascript

const inputJson = {
  car: "Mazda",
  addressLine1: "Mask me!",
  deeper: {
    addressLine1: "Mask me!",
    evenDeeper: { addressLine1: "Mask me!" },
  },
};

const fieldsToMask = ["*addressLine1"];  // Specify the field with a '*' at the beginning and NO dot(.) anywhere else in that field.

const jsonMaskConfig = {
  genericStrings: [
    {
      config: {
        maskWith: "*",
        maxMaskedCharacters: 6
      },
      fields: fieldsToMask
    },
  ],
};

const maskedOutput = maskData.maskJSON2(inputJson, jsonMaskConfig);

// Output: 
{
  car: 'Mazda',
  addressLine1: '******',
  deeper: { addressLine1: '******', evenDeeper: { addressLine1: '******' } }
}
```

Example 2: 
Using Recursive masking to mask card numbers in a json using mask card config. Recursive masking can be used to mask all types of data mentioned [here](#mask-json)

```javascript

const inputJson = {
  cards: [
    {
      number: "1234-5678-0123-0000"
    },
    {
      number: "1111-2222-3333-4444"
    },
    {
      number: "2222-4444-6666-8888"
    },
    {
      number: "1111-3333-5555-7777"
    },
    {
      number: "0000-0000-0000-0000"
    }
  ]
};

const cardfieldsToMask = ["*number"];  // Specify the field with a '*' at the beginning and NO dot(.) anywhere else in that field.
    
const jsonMaskConfig = {
  cardMaskOptions: {
        maskWith: "*",
        unmaskedStartDigits: 4,
        unmaskedEndDigits: 1
    },
  cardFields: cardfieldsToMask, 
};

const maskedOutput = maskData.maskJSON2(jsonInput, jsonMaskConfig);

// Output: 
{
  cards: [
    { number: '1234-****-****-***0' },
    { number: '1111-****-****-***4' },
    { number: '2222-****-****-***8' },
    { number: '1111-****-****-***7' },
    { number: '0000-****-****-***0' }
  ]
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
