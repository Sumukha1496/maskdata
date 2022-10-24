'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Mask UUID', function() {

  describe('Mask UUID with default options', function() {

    // const defaultUuidMaskOptions = {
    //     maskWith: "*",
    //     unmaskedStartCharacters: 0,
    //     unmaskedEndCharacters: 0
    // };

    let testData = [
      {
        title: 'UUID with lower case alphabets',
        input: '123e4567-e89b-12d3-a456-426614174000',
        output: '********-****-****-****-************'
      },
      {
        title: 'UUID with upper case alphabets',
        input: '123E4567-E89B-12D3-A456-426614174000',
        output: '********-****-****-****-************'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(title, function() {
        const masked = maskData.maskUuid(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    })
  });

  describe('Mask UUID with custom options', function() {

    const customUuidMaskOptions = {
        maskWith: "X",
        unmaskedStartCharacters: 5,
        unmaskedEndCharacters: 13
    };

    let testData = [
      {
        title: 'UUID with lower case alphabets',
        input: '123e4567-e89b-12d3-a456-426614174000',
        output: '123e4XXX-XXXX-XXXX-XXX6-426614174000'
      },
      {
        title: 'UUID with upper case alphabets',
        input: '123E4567-E89B-12D3-A456-426614174000',
        output: '123E4XXX-XXXX-XXXX-XXX6-426614174000'
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(title, function() {
        const masked = maskData.maskUuid(input, customUuidMaskOptions);
        expect(masked).to.equal(output);
      });
    });

    const customUuidMaskOptions2 = { unmaskedStartCharacters: 8, unmaskedEndCharacters: 12};
    it('Edge case1: unmask only the parts of UUID', function() {
        const masked = maskData.maskUuid('123e4567-e89b-12d3-a456-426614174000', customUuidMaskOptions2);
        expect(masked).to.equal('123e4567-****-****-****-426614174000');
    });

    const customUuidMaskOptions3 = { unmaskedStartCharacters: 32, unmaskedEndCharacters: 0};
    it('Edge case2: unmaskedStartCharacters = 32', function() {
        const masked = maskData.maskUuid('123e4567-e89b-12d3-a456-426614174000', customUuidMaskOptions3);
        expect(masked).to.equal('123e4567-e89b-12d3-a456-426614174000');
    });

    const customUuidMaskOptions4 = { unmaskedStartCharacters: 0, unmaskedEndCharacters: 32};
    it('Edge case3: unmaskedEndCharacters = 32', function() {
        const masked = maskData.maskUuid('123e4567-e89b-12d3-a456-426614174000', customUuidMaskOptions4);
        expect(masked).to.equal('123e4567-e89b-12d3-a456-426614174000');
    });

    const customUuidMaskOptions5 = { unmaskedStartCharacters: 33, unmaskedEndCharacters: 5};
    it('Edge case4: unmaskedStartCharacters > 32', function() {
        const masked = maskData.maskUuid('123e4567-e89b-12d3-a456-426614174000', customUuidMaskOptions5);
        expect(masked).to.equal('123e4567-e89b-12d3-a456-426614174000');
    });

    const customUuidMaskOptions6 = { unmaskedStartCharacters: 1, unmaskedEndCharacters: 33};
    it('Edge case5: unmaskedEndCharacters > 32', function() {
        const masked = maskData.maskUuid('123e4567-e89b-12d3-a456-426614174000', customUuidMaskOptions6);
        expect(masked).to.equal('123e4567-e89b-12d3-a456-426614174000');
    });

    it('Edge case6: incorrect UUID', function() {
        const masked = maskData.maskUuid('123567-e89b-12d3-a456-4264174000');
        expect(masked).to.equal('123567-e89b-12d3-a456-4264174000', 'No masking done');
    });

    it('Edge case7: incorrect UUID2', function() {
        const masked = maskData.maskUuid('123e4567-mnop-12d3-a456-426614174000');
        expect(masked).to.equal('123e4567-mnop-12d3-a456-426614174000');
    });
  });
});