'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Masking card numbers', function() {

  describe('Mask with default options', function() {

    // default options are this - let tests fail when defaults change
    // const defaultCardMaskOptions = {
    //   maskWith: '*',
    //   unmaskedStartDigits: 4,
    //   unmaskedEndDigits: 1
    // };

    let testData = [
      {
        title: 'test default string',
        input: '1234-5678-1234-5678',
        output: '1234-****-****-***8'
      },
      {
        title: 'test string length equal than start + end',
        input: '123-4',
        output: '123-4'
      },
      {
        title: 'test shorter string than start + end',
        input: '1234',
        output: '1234'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`default mask - ${title}`, function() {
        const masked = maskData.maskCard(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    })
  });

  describe('Mask with custom options', function() {

    const maskOptions = {
      maskWith: 'x',
      unmaskedStartDigits: 2,  // use different numbers for start / end to check correct masking
      unmaskedEndDigits: 3
    };

    let testData = [
      {
        title: 'test default string',
        input: '1234-5678-1234-5678',
        output: '12xx-xxxx-xxxx-x678'
      },
      {
        title: 'test string length equal than start + end',
        input: '12-345',
        output: '12-345'
      },
      {
        title: 'test shorter string than start + end',
        input: '1234',
        output: '1234'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskCard(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });

    it('test with negative unmaskedStartDigits', function() {
      const negativeStartOption = {
        maskWith: 'x',
        unmaskedStartDigits: -2,    // internal set to 0
        unmaskedEndDigits: 3
      }
      const input = '1234-5678-1234-5678'
      const output = 'xxxx-xxxx-xxxx-x678'
      const masked = maskData.maskCard(input, negativeStartOption);
      expect(masked).to.equal(output, 'masked output does not match expected value');
    });

    it('test with negative unmaskedEndDigits', function() {
      const negativeEndOption = {
        maskWith: 'x',
        unmaskedStartDigits: 2,
        unmaskedEndDigits: -3  // internal set to 0
      }
      const input = '1234-5678-1234-5678'
      const output = '12xx-xxxx-xxxx-xxxx'
      const masked = maskData.maskCard(input, negativeEndOption);
      expect(masked).to.equal(output, 'masked output does not match expected value');
    });
  });

  describe('Mask with special input strings', function() {

    const maskOptions = {
      maskWith: "x",
      unmaskedStartDigits: 2,
      unmaskedEndDigits: 3
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
        }
      ]

      testData.forEach(({title, input, output}) => {
        it(`special input - ${title}`, function() {
          const masked = maskData.maskPassword(input, maskOptions);
          expect(masked).to.equal(output, 'masked output does not match expected value');
        });
      });
    });

    describe('Mask with special input - input shall throw error', function() {

      // set with input generating an error / exception
      let testData = [
        {
          title: 'test input as number',
          input: 12,
          output: '12'
        },
        {
          title: 'test input as array',
          input: ['12'],
          output: '12'
        },
        {
          title: 'test input as object',
          input: {a: 'b', x: 'y'},
          output: '12'
        }
      ]

      testData.forEach(({title, input, output}) => {
        it(`special input - ${title}`, function() {
          const masked = maskData.maskPassword(input, maskOptions);
          expect(masked).to.equal(output, 'masked output does not match expected value');
        });
      });
    });
  });
});
