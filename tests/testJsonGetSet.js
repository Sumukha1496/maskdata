'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Test getValue', function() {
  describe('Test get JSON field values', function() {

    let testData = [
      {
        title: 'test getting a string field from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToGet: 'stringField',
        output: 'StringValue'
      },
      {
        title: 'test getting a boolean field from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToGet: 'booleanField',
        output: true
      },
      {
        title: 'test getting a number field from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToGet: 'numberField',
        output: 1000
      }
    ]

    testData.forEach(({title, input, fieldToGet, output}) => {
      it(`default mask - ${title}`, function() {
        const jsonFieldValue = maskData.getInnerProperty(input, fieldToGet);
        expect(jsonFieldValue).to.equal(output, 'Expected json property found');
      });
    })
  });
});

describe('Test replaceValue', function() {
  describe('Test replace json field Value', function() {

    let testData = [
      {
        title: 'test replacing a string field value from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToReplace: 'stringField',
        output: 'NewStringValue'
      },
      {
        title: 'test replacing a boolean field value from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToReplace: 'booleanField',
        output: false
      },
      {
        title: 'test replacing a number field value from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToReplace: 'numberField',
        output: 1111
      },
      {
        title: 'test replacing a object field value from json',
        input: {'stringField': "StringValue", "booleanField": true, "numberField": 1000, "objectField" : [1, 2, 3, 4]},
        fieldToReplace: 'objectField',
        output: false
      }
    ]

    testData.forEach(({title, input, fieldToReplace, output}) => {
      it(`default mask - ${title}`, function() {
        const jsonAfterReplacing = maskData.replaceValue(input, fieldToReplace, output);
        expect(jsonAfterReplacing[fieldToReplace]).to.equal(output, 'Expected json property found');
      });
    })
  });
});
