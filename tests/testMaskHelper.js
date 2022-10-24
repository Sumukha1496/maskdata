'use strict';

const expect = require('chai').expect;

const maskHelper = require('../lib/helpers/MaskHelper');
const Constants = require('../lib/helpers/Constants');

describe('Test helper functions', function() {

  describe('Test mapWithDefaultValues function', function() {
    it('Test mapWithDefaultValues function', function() {
        const options = maskHelper.mapWithDefaultValues({}, Constants.defaultCardMaskOptions);
        // const defaultCardMaskOptions = {
        //     maskWith: "*",
        //     unmaskedStartDigits: 4,
        //     unmaskedEndDigits: 1
        // };
        expect(options['maskWith']).to.equal("*");
        expect(options['unmaskedStartDigits']).to.equal(4);
        expect(options['unmaskedEndDigits']).to.equal(1);
    });
  });

  describe('Test getValidatedJsonMask2Configs function', function() {
    it('Test getValidatedJsonMask2Configs function with empty configs', function() {
        const options = maskHelper.getValidatedJsonMask2Configs({}, Constants.defaultjsonMask2Configs);
        // const defaultjsonMask2Configs = {
        //     cardMaskOptions: defaultCardMaskOptions,
        //     cardFields: [],
        //     emailMaskOptions: defaultEmailMask2Options,
        //     emailFields: [],
        //     passwordMaskOptions: defaultPasswordMaskOptions,
        //     passwordFields: [],
        //     phoneMaskOptions: defaultPhoneMaskOptions,
        //     phoneFields: [],
        //     stringMaskOptions:  defaultStringMaskOptions,
        //     stringFields: [],
        //     uuidMaskOptions: defaultUuidMaskOptions,
        //     uuidFields: []
        // };
        expect(options['cardMaskOptions']['maskWith']).to.equal("*");
        expect(options['emailMaskOptions']['maskWith']).to.equal("*");
        expect(options['passwordMaskOptions']['maskWith']).to.equal("*");
        expect(options['phoneMaskOptions']['maskWith']).to.equal("*");
        expect(options['stringMaskOptions']['maskWith']).to.equal("*");
        expect(options['uuidMaskOptions']['maskWith']).to.equal("*");

        expect(options['cardMaskOptions']['unmaskedStartDigits']).to.equal(4);
        expect(options['emailMaskOptions']['unmaskedStartCharactersBeforeAt']).to.equal(3);
        expect(options['passwordMaskOptions']['maxMaskedCharacters']).to.equal(16);
        expect(options['phoneMaskOptions']['unmaskedStartDigits']).to.equal(4);
        expect(options['stringMaskOptions']['maskAll']).to.equal(false);
        expect(options['uuidMaskOptions']['unmaskedStartCharacters']).to.equal(0);
    });

    it('Test getValidatedJsonMask2Configs function with only the fields list', function() {
        const options = maskHelper.getValidatedJsonMask2Configs({cardFields: ["card1"]}, Constants.defaultjsonMask2Configs);
        // const defaultjsonMask2Configs = {
        //     cardMaskOptions: defaultCardMaskOptions,
        //     cardFields: [],
        //     emailMaskOptions: defaultEmailMask2Options,
        //     emailFields: [],
        //     passwordMaskOptions: defaultPasswordMaskOptions,
        //     passwordFields: [],
        //     phoneMaskOptions: defaultPhoneMaskOptions,
        //     phoneFields: [],
        //     stringMaskOptions:  defaultStringMaskOptions,
        //     stringFields: [],
        //     uuidMaskOptions: defaultUuidMaskOptions,
        //     uuidFields: []
        // };
        expect(options['cardMaskOptions']['maskWith']).to.equal("*");
        expect(options['emailMaskOptions']['maskWith']).to.equal("*");
        expect(options['passwordMaskOptions']['maskWith']).to.equal("*");
        expect(options['phoneMaskOptions']['maskWith']).to.equal("*");
        expect(options['stringMaskOptions']['maskWith']).to.equal("*");
        expect(options['uuidMaskOptions']['maskWith']).to.equal("*");

        expect(options['cardMaskOptions']['unmaskedStartDigits']).to.equal(4);
        expect(options['cardFields'][0]).to.equal("card1");
        expect(options['emailMaskOptions']['unmaskedStartCharactersBeforeAt']).to.equal(3);
        expect(options['passwordMaskOptions']['maxMaskedCharacters']).to.equal(16);
        expect(options['phoneMaskOptions']['unmaskedStartDigits']).to.equal(4);
        expect(options['stringMaskOptions']['maskAll']).to.equal(false);
        expect(options['uuidMaskOptions']['unmaskedStartCharacters']).to.equal(0);
    });
  });

  describe('Test getValidatedJsonMask2Configs function', function() {
    it('Test getValidatedJsonMask2Configs function with empty configs', function() {
        const options = maskHelper.getValidatedJsonMask2Configs({}, Constants.defaultjsonMask2Configs);
        // const defaultjsonMask2Configs = {
        //     cardMaskOptions: defaultCardMaskOptions,
        //     cardFields: [],
        //     emailMaskOptions: defaultEmailMask2Options,
        //     emailFields: [],
        //     passwordMaskOptions: defaultPasswordMaskOptions,
        //     passwordFields: [],
        //     phoneMaskOptions: defaultPhoneMaskOptions,
        //     phoneFields: [],
        //     stringMaskOptions:  defaultStringMaskOptions,
        //     stringFields: [],
        //     uuidMaskOptions: defaultUuidMaskOptions,
        //     uuidFields: []
        // };
        expect(options['cardMaskOptions']['maskWith']).to.equal("*");
        expect(options['emailMaskOptions']['maskWith']).to.equal("*");
        expect(options['passwordMaskOptions']['maskWith']).to.equal("*");
        expect(options['phoneMaskOptions']['maskWith']).to.equal("*");
        expect(options['stringMaskOptions']['maskWith']).to.equal("*");
        expect(options['uuidMaskOptions']['maskWith']).to.equal("*");

        expect(options['cardMaskOptions']['unmaskedStartDigits']).to.equal(4);
        expect(options['emailMaskOptions']['unmaskedStartCharactersBeforeAt']).to.equal(3);
        expect(options['passwordMaskOptions']['maxMaskedCharacters']).to.equal(16);
        expect(options['phoneMaskOptions']['unmaskedStartDigits']).to.equal(4);
        expect(options['stringMaskOptions']['maskAll']).to.equal(false);
        expect(options['uuidMaskOptions']['unmaskedStartCharacters']).to.equal(0);

    });
  });

});