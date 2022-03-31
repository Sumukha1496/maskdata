'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Masking strings', function() {

  // common strings without output - used as base for all tests below
  let testData = [
    {
      title: 'test default string',
      input: 'This is a testingAPI String',
      output: ''
    },
    {
      title: 'test string without space',
      input: 'thisisastring',
      output: ''
    },
    {
      title: 'test string with newline',
      input: 'this is a\nstring with newline',
      output: ''
    }
  ]

  describe('Mask with default options', function() {

    // default options are this - let tests fail when defaults change
    // const defaultStringMaskOptions = {
    //   maskWith: "*",
    //   maskOnlyFirstOccurance: false,
    //   values: [],
    //   maskAll: false,
    //   maskSpace: true
    // };

    // no values -> no masking
    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = localTestData[0].input;
    localTestData[1].output = localTestData[1].input;
    localTestData[2].output = localTestData[2].input;

    localTestData.forEach(({title, input, output}) => {
      it(`default mask - ${title}`, function() {
        const masked = maskData.maskString(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    })
  });

  describe('Mask with custom options - maskWith, maskSpace', function() {

    // only maskWith and maskSpace set
    const maskOptions = {
      maskWith: "?",
      maskOnlyFirstOccurance: false,
      values: [],
      maskAll: false,
      maskSpace: true
    };

    // no values -> no masking
    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = localTestData[0].input;
    localTestData[1].output = localTestData[1].input;
    localTestData[2].output = localTestData[2].input;

    localTestData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskString(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with custom options - maskWith, maskAll, no spaces', function() {

    // only maskWith, maskAll set
    const maskOptions = {
      maskWith: "?",
      maskOnlyFirstOccurance: false,
      values: [],
      maskAll: true,
      maskSpace: false
    };

    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = '???? ?? ? ?????????? ??????';
    localTestData[1].output = '?'.repeat(localTestData[1].input.length);   // no space here
    localTestData[2].output = '???? ?? ???????? ???? ???????';

    localTestData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskString(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with custom options - maskWith multiple chars, maskAll, maskSpace', function() {

    // only maskWith, maskAll set
    const maskChar = "??";   // mask every char in input string with two chars in output
    const maskOptions = {
      maskWith: maskChar,
      maskOnlyFirstOccurance: false,
      values: [],
      maskAll: true,
      maskSpace: true
    };

    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = maskChar.repeat(localTestData[0].input.length);
    localTestData[1].output = maskChar.repeat(localTestData[1].input.length);
    localTestData[2].output = maskChar.repeat(localTestData[2].input.length);

    localTestData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskString(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with custom options - values and maskAll set, no spaces', function() {

    const maskOptions = {
      maskWith: "x",
      maskOnlyFirstOccurance: false,
      values: ['is', 'ing'],
      maskAll: true,
      maskSpace: false
    };

    // expected: values ignored and all masked, space remains
    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = 'xxxx xx x xxxxxxxxxx xxxxxx';
    localTestData[1].output = 'x'.repeat(localTestData[1].input.length);   // no spaces here
    localTestData[2].output = 'xxxx xx xxxxxxxx xxxx xxxxxxx';

    localTestData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskString(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with custom options - values and all occurrences', function() {

    const maskOptions = {
      maskWith: "*",
      maskOnlyFirstOccurance: false,
      values: ['is', 'ing'],
      maskAll: false,
      maskSpace: true
    };

    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = 'Th** ** a test***API Str***';
    localTestData[1].output = 'th****astr***';
    localTestData[2].output = 'th** ** a\nstr*** with newline';

    localTestData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskString(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with custom options - values and first occureances', function() {

    const maskOptions = {
      maskWith: "*",
      maskOnlyFirstOccurance: true,
      values: ['is', 'ing'],
      maskAll: false,
      maskSpace: true
    };

    const localTestData = JSON.parse(JSON.stringify(testData));
    localTestData[0].output = 'Th** is a test***API String';
    localTestData[1].output = 'th**isastr***';
    localTestData[2].output = 'th** is a\nstr*** with newline';

    localTestData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskString(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with special input strings', function() {

    const maskOptions = {
      maskWith: "x",
      maskOnlyFirstOccurance: true,
      values: [],
      maskAll: true,
      maskSpace: true
    };

    describe('Mask with special input - input will generate an output', function() {

      // first set with input generating an masked output
      let testData = [
        {
          title: 'test with string length zero',
          input: '',
          output: ''
        },
        {
          title: 'test input null',
          input: null,
          output: null
        },
        {
          title: 'test input as number',
          input: 12,
          output: 'xx'      // TODO - ok to convert number into string? Or should it fail?
        },
      ]

      testData.forEach(({title, input, output}) => {
        it(`special input - ${title}`, function() {
          const masked = maskData.maskString(input, maskOptions);
          expect(masked).to.equal(output, 'masked output does not match expected value');
        });
      });
    });

    describe('Mask with special input - input shall throw error', function() {

      // set with input generating an error / exception
      let testData = [
        {
          title: 'test input as array',
          input: ['12', 'ab'],
          output: 'xx'      // mask method seems to join all strings in the array into on big string and masks it?
        },
        {
          title: 'test input as object',
          input: {a: 'b', x: 'y'},
          output: '12'  // json stringified and masked?
        }
      ]

      testData.forEach(({title, input, output}) => {
        it(`special input - ${title}`, function() {
          const masked = maskData.maskString(input, maskOptions);
          expect(masked).to.equal(output, 'masked output does not match expected value');
        });
      });
    });
  });
});
