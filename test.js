const MaskData = require('./index');

const passwordMaskOptions = {
  maxMaskedCharacters: 10,
  maskWith: "X",
  unmaskedStartCharacters: 7,
  unmaskedEndCharacters: 3
};

const password = "Password1$";
console.log(`Unmasked Password: ${password}` + " Length: " + password.length);
const maskedP = MaskData.maskPassword(password, passwordMaskOptions);
console.log("Password after masking:" + maskedP + " Length: " + maskedP.length);
console.log("========================================");
const maskedPD = MaskData.maskPassword(password);
console.log("Password after masking with default options:" + maskedPD + " Length: " + maskedPD.length);
console.log("========================================");


const phoneMaskOptions = {
  maskWith: "*",
  unmaskedStartDigits: 5,
  unmaskedEndDigits: 1
};

const phone = "+91123456789";

console.log(`Unmasked phone: ${phone}`);
console.log(`phone after masking: ${MaskData.maskPhone(phone, phoneMaskOptions)}`);
console.log("========================================");
console.log(`phone after masking with default options: ${MaskData.maskPhone(phone)}`);
console.log("========================================");

const emailMask2Options = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 0,
  unmaskedEndCharactersAfterAt: 99,
  maskAtTheRate: false
};

console.log("========================================");
const email = "my.testEmail@testMail.com";
console.log(`Unmasked email: ${email}`);
console.log(`Email after masking: ${MaskData.maskEmail2(email, emailMask2Options)}`);
console.log("========================================");
console.log(`Email after masking with default options: ${MaskData.maskEmail2(email)}`);
console.log("========================================");

console.log("========================================");
const shortEmail = "a@b.c";
console.log(`Unmasked shortEmail: ${shortEmail}`);
console.log(`shortEmail after masking: ${MaskData.maskEmail2(shortEmail, emailMask2Options)}`);
console.log("========================================");

const jsonMaskOptions = {
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
console.log(JSON.stringify(MaskData.maskJSONFields(json, jsonMaskOptions)));
console.log("========================================");
console.log(JSON.stringify(json));
console.log("========================================");

const jsonMaskOptions2 = {
  fields : ['level1.level2.level3.field3', 'level1.level2.field2', 'level1.field1', 'value1', 'level1.level2.level3.field4[0].Hello', 'level1.level2.level3.field4[2]']
};

const maskAllFieldsOptions = {
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
console.log(JSON.stringify(MaskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)));
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
console.log(JSON.stringify(MaskData.maskJSONFields(nestedObject, jsonMaskOptions2)));
console.log("========================================");


const stringMaskOptions = {
  maskWith: "*",
  values: ['is', 'API']
};

const fullStringMaskOptions = {
  maskWith: "*",
  values: ['is', 'API'],
  maskAll: true
};

const fullStringMaskOptionsWithoutSpace = {
  maskWith: "*",
  values: ['is', 'API'],
  maskAll: true,
  maskSpace: false
};

let str = "This is a testingAPI String";
console.log(`Unmasked string: ${str}`);
console.log(`String after masking: ${MaskData.maskString(str, stringMaskOptions)}`);
console.log("========================================");

str = "This is a testingAPI String";
stringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(`String after masking entire string: ${MaskData.maskString(str, fullStringMaskOptions)}`);
console.log("========================================");

str = "This is a testingAPI String";
stringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(`String after masking only first occurances: ${MaskData.maskString(str, stringMaskOptions)}`);
console.log("========================================");

str = "This is a testingAPI String";
stringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string: ${str}`);
console.log(`String after masking entire string without spaces: ${MaskData.maskString(str, fullStringMaskOptionsWithoutSpace)}`);
console.log("========================================");

const cardMaskOptions = {
  maskWith: "X",
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 5
};

let cardNumber = "1234-5678-1234-5678";
console.log(`Unmasked cardNumber: ${cardNumber}`);
console.log(`cardNumber after masking: ${MaskData.maskCard(cardNumber, cardMaskOptions)}`);
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

const maskCardOptions = {
  maskWith: "*",
  unmaskedStartDigits: 4, 
  unmaskedEndDigits: 4
};

const obj = { cardNumber: "123456789123" ,abc: "abceew" ,efg: "121212" } ;
const result = MaskData.replaceValue(obj, 'cardNumber', MaskData.maskCard(obj['cardNumber'], maskCardOptions));
console.log(result);