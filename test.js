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

const defaultJSONMaskOptions2 = {
  fields : ['level1.level2.level3.field3', 'level1.level2.field2', 'level1.field1', 'value1', 'level1.level2.level3.field4[0].Hello', 'level1.level2.level3.field4[2]']
};

const nestedObject = {
  level1: {
    field1: "field1",
    level2: {
      field2: "field2",
      level3: {
        field3: "field3",
        field4: [{ Hello: null }, { Hello: "Newworld" }, "Just a String"]
      }
    }
  },
  value1: "value"
};

console.log(`Unmasked nested object: `);
console.log(JSON.stringify(json));
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