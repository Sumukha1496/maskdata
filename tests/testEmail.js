'use strict';
const maskData = require('../index');
const BadOption = require('../lib/ExceptionsHandler/BadOption');
const expect = require('chai').expect;

describe('Masking email addresses', function() {

  describe('Mask with default options', function() {

    // default options are this - let tests fail when defaults change
    // const defaultCardMaskOptions = {
    //   maskWith: '*',
    //   unmaskedStartCharactersBeforeAt: 3,
    //   unmaskedEndCharactersAfterAt: 2
    //   maskAtTheRate: false
    // };

    let testData = [
      {
        title: 'test standard address',
        input: 'testuser@dummy.org',
        output: 'tes*****@*******rg'
      },
      {
        title: 'test user part shorter than chars before',
        input: 'we@dummy.org',
        output: 'we@*******rg'
      },
      {
        title: 'test user part equal to chars before',
        input: 'you@dummy.org',
        output: 'you@*******rg'
      },
      {
        title: 'test no user part and domain only',
        input: '@dummy.org',
        output: '@*******rg'
      },
      {
        title: 'test no domain part and user only',
        input: 'user@',
        output: 'use*@'
      },
      {
        title: 'test domain part shorter than chars after',
        input: 'user@x',
        output: 'use*@x'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`default mask - ${title}`, function() {
        const masked = maskData.maskEmail2(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    })
  });

  describe('Mask with custom options (char, before, after)', function() {

    const maskOptions = {
      maskWith: 'x',
      unmaskedStartCharactersBeforeAt: 4,
      unmaskedEndCharactersAfterAt: 6,    // full tld and part of sld
      maskAtTheRate: false
    };

    let testData = [
      {
        title: 'test default string',
        input: 'testuser@dummy.org',
        output: 'testxxxx@xxxmy.org'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`default mask - ${title}`, function() {
        const masked = maskData.maskEmail2(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    })
  });

  describe('Mask with custom options (maskAtTheRate)', function() {

    const maskOptions = {
      maskWith: '*',
      unmaskedStartCharactersBeforeAt: 4,
      unmaskedEndCharactersAfterAt: 6,    // full tld and part of sld
      maskAtTheRate: true
    };

    let testData = [
      {
        title: 'test default string',
        input: 'testuser@dummy.org',
        output: 'test********my.org'
      },
      {
        title: 'test user and domain part to short',
        input: 'we@a.de',
        output: 'we*a.de'   // before and after are shorter than visible, only @ replaced
      },
      {
        title: 'test user part to short',
        input: 'we@dummy.org',
        output: 'we****my.org'   // before and after are shorter than visible, only @ replaced
      },
      {
        title: 'test domain part to short',
        input: 'testuser@a.de',
        output: 'test*****a.de'   // before and after are shorter than visible, only @ replaced
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`custom mask - ${title}`, function() {
        const masked = maskData.maskEmail2(input, maskOptions);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });

    it('custom mask - negative start digits', function() {
      const negativeStartOptions = {
        maskWith: '*',
        unmaskedStartCharactersBeforeAt: -1,  // replaced with 0 internally
        unmaskedEndCharactersAfterAt: 1,
        maskAtTheRate: false
      };
      const input = 'test@dummy.de';
      const output = '****@*******e';
      const masked = maskData.maskEmail2(input, negativeStartOptions);
      expect(masked).to.equal(output, 'masked output does not match expected value');
    });

    it('custom mask - negative end digits', function() {
      const negativeEndOptions = {
        maskWith: '*',
        unmaskedStartCharactersBeforeAt: 1,  // replaced with 0 internally
        unmaskedEndCharactersAfterAt: -1,
        maskAtTheRate: false
      };
      const input = 'test@dummy.de';
      const output = 't***@********';
      const masked = maskData.maskEmail2(input, negativeEndOptions);
      expect(masked).to.equal(output, 'masked output does not match expected value');
    });
  });

  describe('test error cases for email addresses', function() {

    let testData = [
      {
        title: 'test no email address at all',
        input: 'user-dummy.org',
        output: 'use*@x'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`default mask - ${title}`, function() {
        try {
          const masked = maskData.maskEmail2(input);
          expect.fail('maskEmail2 should throw error');
        }
        catch(e) {
          expect(e).to.be.a('string').and.match(/Bad config.*Email must.*@/);
        }
      });
    })
  });

  describe('Mask with special input strings', function() {

    const maskOptions = {
      maskWith: "x",
      unmaskedStartCharactersBeforeAt: 1,
      unmaskedEndCharactersAfterAt: 1,
      maskAtTheRate: false
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
