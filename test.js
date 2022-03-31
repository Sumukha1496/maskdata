const MaskData = require('./index');

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
