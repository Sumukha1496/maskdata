const MaskData = require('./index');

const defaultPasswordMaskOptions = {
  maxMaskedCharacters : 10,
  maskWith : ""
};

const password = "Password1$";
console.log(`Unmasked Password : ${password}`);
console.log(`Password after masking : ${MaskData.maskPassword(password, defaultPasswordMaskOptions)}`);
console.log("========================================");


const defaultPhoneMaskOptions = {
  maskWith : "*",
  unmaskedStartDigits : 4,
  unmaskedEndDigits : 1
};

const phone = "+91123456789";

console.log(`Unmasked phone : ${phone}`);
console.log(`phone after masking : ${MaskData.maskPhone(phone, defaultPhoneMaskOptions)}`);
console.log("========================================");

const defaultEmailMaskOptions = {
  maskWith : "*",
  unmaskedStartCharacters : 3,
  unmaskedEndCharacters : 1,
  maskAtTheRate : false,
  maxMaskedCharactersBeforeAtTheRate : 10,
  maxMaskedCharactersAfterAtTheRate : 10,
};

console.log("========================================");
const email = "my.testEmail@testMail.com";
console.log(`Unmasked email : ${email}`);
console.log(`Email after masking : ${MaskData.maskEmail(email, defaultEmailMaskOptions)}`);
console.log("========================================");

const defaultJSONMaskOptions = {
  fields : ['password', 'firstName']
};

const json = {
  password : "PasswordValue",
  firstName : "FIRST_NAME",
  lastName : "LAST_NAME"
};

console.log(`Unmasked object : `);
console.log(JSON.stringify(json));
console.log(`JSON Object after masking :`);
console.log(MaskData.maskJSONFields(json, defaultJSONMaskOptions));
console.log("========================================");

const defaultStringMaskOptions = {
  maskWith : "*",
  values : ['is', 'API']
};

let str = "This is a testingAPI String";
console.log(`Unmasked string : ${str}`);
console.log(`String after masking : ${MaskData.maskString(str, defaultStringMaskOptions)}`);
console.log("========================================");

str = "This is a testingAPI String";
defaultStringMaskOptions.maskOnlyFirstOccurance = true;
console.log(`Unmasked string : ${str}`);
console.log(`String after masking only first occurances: ${MaskData.maskString(str, defaultStringMaskOptions)}`);
console.log("========================================");
