const MaskData = require('./index');

const defaultPasswordMaskOptions = {
  maxMaskedCharacters: 10,
  maskWith: ""
};

const password = "Password1$";
console.log(`Unmasked Password: ${password}`);
console.log(`Password after masking: ${MaskData.maskPassword(password, defaultPasswordMaskOptions)}`);
console.log("========================================");


const defaultPhoneMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

const phone = "+91123456789";

console.log(`Unmasked phone: ${phone}`);
console.log(`phone after masking: ${MaskData.maskPhone(phone, defaultPhoneMaskOptions)}`);
console.log("========================================");

const defaultEmailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharacters: 3,
  unmaskedEndCharacters: 1,
  maskAtTheRate: false,
  maxMaskedCharactersBeforeAtTheRate: 10,
  maxMaskedCharactersAfterAtTheRate: 10,
};

console.log("========================================");
const email = "my.testEmail@testMail.com";
console.log(`Unmasked email: ${email}`);
console.log(`Email after masking: ${MaskData.maskEmail(email, defaultEmailMaskOptions)}`);
console.log("========================================");

console.log("========================================");
const shortEmail = "my@test.com";
console.log(`Unmasked shortEmail: ${shortEmail}`);
console.log(`shortEmail after masking: ${MaskData.maskEmail(shortEmail, defaultEmailMaskOptions)}`);
console.log("========================================");

const defaultJSONMaskOptions = {
  fields: ['password', 'firstName']
};

const json = {
  password: "PasswordValue",
  firstName: "FIRST_NAME",
  lastName: "LAST_NAME"
};

console.log(`Unmasked object: `);
console.log(JSON.stringify(json));
console.log(`Object after masking:`);
console.log(JSON.stringify(MaskData.maskJSONFields(json, defaultJSONMaskOptions)));
console.log("========================================");
console.log(JSON.stringify(json));
console.log("========================================");

const defaultJSONMaskOptions2 = {
  fields : ['level1.level2.level3.field3', 'level1.level2.field2', 'level1.field1', 'value1', 'level1.level2.level3.field4[0].Hello', 'level1.level2.level3.field4[2]']
};

const maskAllFields = {
  fields : ['level1.level2.field3[*].Hello', 'level1.level2.level3.*']
};

const nestedAllObject = {
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

console.log(`Unmasked nested object: `);
console.log(JSON.stringify(nestedAllObject));
console.log(`Nested Object after masking all:`);
console.log(JSON.stringify(MaskData.maskJSONFields(nestedAllObject, maskAllFields)));
console.log("========================================");

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

console.log(`Unmasked nested object: `);
console.log(JSON.stringify(nestedObject));
console.log(`Nested Object after masking:`);
console.log(JSON.stringify(MaskData.maskJSONFields(nestedObject, defaultJSONMaskOptions2)));
console.log("========================================");


const defaultStringMaskOptions = {
  maskWith: "*",
  values: ['is', 'API']
};

let str = "This is a testingAPI String";
console.log(`Unmasked string: ${str}`);
console.log(`String after masking: ${MaskData.maskString(str, defaultStringMaskOptions)}`);
console.log("========================================");

str = "This is a testingAPI String";
defaultStringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(`String after masking only first occurances: ${MaskData.maskString(str, defaultStringMaskOptions)}`);
console.log("========================================");

const defaultCardMaskOptions = {
  maskWith: "X",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1
};

let cardNumber = "1234-5678-1234-5678";
console.log(`Unmasked cardNumber: ${cardNumber}`);
console.log(`cardNumber after masking: ${MaskData.maskCard(cardNumber, defaultCardMaskOptions)}`);
console.log("========================================");

const nestedJson = {
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

const field = 'level1.level2.level3.field4[0].Hello';

console.log("========================================");
console.log(`${field}: ${MaskData.getInnerProperty(nestedJson, field)}`);

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