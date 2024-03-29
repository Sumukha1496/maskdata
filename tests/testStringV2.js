'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Masking String V2', function () {
  describe('Mask with default options', function () {
    // default options are this - let tests fail when defaults change
    // const defaultStringMaskV2Options = {
    //   maskWith: "*",
    //   maxMaskedCharacters: 256,
    //   unmaskedStartCharacters: 0,
    //   unmaskedEndCharacters: 0
    // };

    let testData = [
      {
        title: 'test default string',
        input:
          '1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-123456',
        output:
          '****************************************************************************************************************************************************************************************************************************************************************' // equal maxMaskedChars
      },
      {
        title: 'test string shorter than maxMasked',
        input: '123-4',
        output: '*****'
      },
      {
        title: 'test longer than maxMasked',
        input:
          'x1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-1234-5678-123456',
        output:
          '****************************************************************************************************************************************************************************************************************************************************************' // equal maxMaskedChars
      }
    ];

    testData.forEach(({ title, input, output }) => {
      it(`default mask - ${title}`, function () {
        const masked = maskData.maskStringV2(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with custom options - maskWith, maxMaskedChars', function () {
    const maskOptions = {
      maskWith: 'x',
      maxMaskedCharacters: 6,
      unmaskedStartCharacters: 1, // use different numbers for start / end to check correct masking
      unmaskedEndCharacters: 2
    };

    let testData = [
      {
        title: 'test default string',
        input: '1234-5678-1234-5678',
        output: '1xxx78'
      },
      {
        title: 'test string length equal to start + end',
        input: '12-345',
        output: '1xxx45'
      },
      {
        title: 'test shorter string than start + end',
        input: '12',
        output: '12'
      }
    ];

    testData.forEach(({ title, input, output }) => {
      it(`custom mask - ${title}`, function () {
        const masked = maskData.maskStringV2(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });

    it('custom mask - test with negative unmaskedStartDigits', function () {
      const negativeStartOption = {
        maskWith: 'x',
        maxMaskedCharacters: 6,
        unmaskedStartCharacters: -2, // internal set to 0
        unmaskedEndCharacters: 2
      };
      const input = '1234-5678-1234-5678';
      const output = 'xxxx78';
      const masked = maskData.maskStringV2(input, negativeStartOption);
      expect(masked).to.equal(output, 'masked output does not match expected value');
    });

    it('custom mask - test with maxMasked shorter than start + end: No masking done', function () {
      const shortMaxCharsOption = {
        maskWith: 'x',
        maxMaskedCharacters: 6,
        unmaskedStartCharacters: 4, // 4+4=8 > 6
        unmaskedEndCharacters: 4
      };
      const input = '1234-5678-1234-5678';
      const output = '123478';
      const masked = maskData.maskStringV2(input, shortMaxCharsOption);
      expect(masked).to.equal(
        output,
        'No masking done because maxMasked(max output characters) shorter than start + end'
      );
    });

    it('custom mask - test with maxMasked equal to start + end: No masking done', function () {
      const shortMaxCharsOption = {
        maskWith: 'x',
        maxMaskedCharacters: 8,
        unmaskedStartCharacters: 4, // 4+4=8
        unmaskedEndCharacters: 4
      };
      const input = '1234-abcd-efgh-5678';
      const output = '12345678';
      const masked = maskData.maskStringV2(input, shortMaxCharsOption);
      expect(masked).to.equal(
        output,
        'No masking done because maxMasked(max output characters) equal to start + end'
      );
    });
  });

  describe('Mask with special input strings', function () {
    const maskOptions = {
      maskWith: 'x',
      maxMaskedCharacters: 6,
      unmaskedStartCharacters: 2,
      unmaskedEndCharacters: 2
    };

    describe('Mask with special input - input will generate an output', function () {
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
          output: '12'
        }
      ];

      testData.forEach(({ title, input, output }) => {
        it(`special input - ${title}`, function () {
          const masked = maskData.maskStringV2(input, maskOptions);
          expect(masked).to.equal(output, 'masked output does not match expected value');
        });
      });
    });

    describe("Mask with object type input - input won't be masked", function () {
      let testData = [
        {
          title: 'test input as array',
          input: ['12']
        },
        {
          title: 'test input as object',
          input: { a: 'b', x: 'y' }
        }
      ];

      testData.forEach(({ title, input }) => {
        it(`special input - ${title}`, function () {
          const masked = maskData.maskStringV2(input, maskOptions);
          expect(masked).to.equal(input, "input won't be masked");
        });
      });
    });
  });
});
