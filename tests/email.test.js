const expect = require('unexpected');
const MaskData = require('../index');

describe('Masking email', function() {
  describe('with default options', function() {

    const defaultEmailMaskOptions = {
      maskWith: "*",
      unmaskedStartCharacters: 3,
      unmaskedEndCharacters: 1,
      maskAtTheRate: false,
      maxMaskedCharactersBeforeAtTheRate: 10,
      maxMaskedCharactersAfterAtTheRate: 10,
    };

    const tests = [
      {
          input:  'my.testEmail@testMail.com', 
          output: 'my.*********@***********m'
      },
      {
          input:  'my@test.com', 
          output: 'my@*******m'
      },
      {
          input:  'a@b.cd', 
          output: '*@*.**'
      }
    ];

    tests.forEach(function(test) {
      // TODO: If they are defaults, why do they need to be arguments?
      const maskedEmail = MaskData.maskEmail(test.input, defaultEmailMaskOptions);

      describe(test.input, function() {
        it('should be sufficiently masked', function() {
          expect(maskedEmail, 'to be', test.output);
        });
  
        it('should be equal in length', function() {
          expect(maskedEmail.length, 'to be', test.output.length);
        });
      });
    });
  });
});
