'use strict';

const expect = require('chai').expect;

const maskData = require('../index');
const Constants = require('../lib/helpers/Constants');

const jsonInput = {
  'credit': '1234-5678-8765-1234', 
  'debit': '0000-1111-2222-3333', 
  'primaryEmail': 'primary@Email.com', 
  'secondaryEmail': 'secondary@Email.com',
  'password': 'dummyPassword',
  'homePhone': "+1 1234567890",
  'workPhone': "+1 9876543210",
  'addressLine1': "This is my addressline 1. This is my home",
  'addressLine2': "AddressLine 2",
  'uuid1': '123e4567-e89b-12d3-a456-426614174000'
};

describe('JSON mask1', function() {
  describe('Mask json with default options', function() {
    let testData = {
      title: "Mask json with default options",
      input: {
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
      }
    }

    it(`${testData.title}`, function() {
      const jsonMaskConfig = {
        fields : ['level1.level2.field3[*].Hello', 'level1.level2.level3.*', 'value1']
      };
      const masked = maskData.maskJSONFields(testData.input, jsonMaskConfig);
      expect(masked['level1']['level2']['field3'][0]['Hello']).to.equal("*****");
      expect(masked['level1']['level2']['field3'][1]['Hello']).to.equal("***********");
      expect(masked['level1']['level2']['level3']['field4']).to.equal("***********");
      expect(masked['level1']['level2']['level3']['field5']).to.equal("***********");
      expect(masked['value1']).to.equal("*****");
    });

    it('Mask json with maxMaskedCharactersStr', function() {
      const jsonMaskConfig = {
        fields : ['key1'],
        maxMaskedCharactersStr: 10
      };
      const masked = maskData.maskJSONFields({key1: "value1WithTooManyCharacters"}, jsonMaskConfig);
      expect(masked['key1']).to.equal("**********");
    });
  });

  describe('Mask json without passing configs', function() {
    let testData = {
      title: "Mask json with default options",
      input: {
        level1: {
          field1: "field1Value",
          level2: {
            field2: "field2Value",
            field3: [ { Hello: "Hello", Hi: "one" }, { Hello: "Hello again" }, { NoHello: "No Hello"} ],
            level3: {
              field4: "field4Value",
              field5: "field5Value"
            }
          }
        },
        value1: "value"
      }
    }

    it(`${testData.title}`, function() {
      const jsonMaskConfig = {
        fields : ['level1.level2.field3[*].Hello', 'level1.level2.level3.*', 'value1', 'unknownField']
      };
      const masked = maskData.maskJSONFields(testData.input);
      expect(masked['level1']['level2']['field3'][0]['Hello']).to.equal(testData.input['level1']['level2']['field3'][0]['Hello']);
      expect(masked['level1']['level2']['field3'][1]['Hello']).to.equal(testData.input['level1']['level2']['field3'][1]['Hello']);
      expect(masked['level1']['level2']['level3']['field4']).to.equal(testData.input['level1']['level2']['level3']['field4']);
      expect(masked['level1']['level2']['level3']['field5']).to.equal(testData.input['level1']['level2']['level3']['field5']);
      expect(masked['value1']).to.equal(testData.input['value1']);
    });
  });

});

describe('JSON mask2', function() {

  describe('Mask with default options and no fields', function() {
    let testData = [
      {
        title: 'test json masking with default options and no fields',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputCredit: '1234-5678-8765-1234', 
        outputDebit: '0000-1111-2222-3333', 
        outputPrimaryEmail: 'primary@Email.com', 
        outputSecondaryEmail: 'secondary@Email.com',
        outputPassword: 'dummyPassword',
        outputHomePhone: "+1 1234567890",
        outputWorkPhone: "+1 9876543210",
        outputAddressLine1: "This is my addressline 1. This is my home",
        outputAddressLine2: "AddressLine 2",
        outputUuid: "123e4567-e89b-12d3-a456-426614174000"
      },
    ]

    testData.forEach(({title, input, outputCredit, outputDebit, outputPrimaryEmail, outputSecondaryEmail, 
      outputPassword, outputHomePhone, outputWorkPhone, outputAddressLine1, outputAddressLine2, outputUuid}) => {
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, Constants.defaultjsonMask2Configs);
        expect(masked['credit']).to.equal(outputCredit);
        expect(masked['debit']).to.equal(outputDebit);
        expect(masked['primaryEmail']).to.equal(outputPrimaryEmail);
        expect(masked['secondaryEmail']).to.equal(outputSecondaryEmail);
        expect(masked['password']).to.equal(outputPassword);
        expect(masked['homePhone']).to.equal(outputHomePhone);
        expect(masked['workPhone']).to.equal(outputWorkPhone);
        expect(masked['addressLine1']).to.equal(outputAddressLine1);
        expect(masked['addressLine2']).to.equal(outputAddressLine2);
        expect(masked['uuid1']).to.equal(outputUuid);
      });
    })
  });

  describe('Mask all fields with default options', function() {
    let testData = [
      {
        title: 'test json masking with default options and all types of fields',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputCredit: '1234-****-****-***4', 
        outputDebit: '0000-****-****-***3', 
        outputPrimaryEmail: 'pri****@*******om', 
        outputSecondaryEmail: 'sec******@*******om',
        outputPassword: '*************',
        outputHomePhone: "+1 1********0",
        outputWorkPhone: "+1 9********0",
        outputAddressLine1: "This is my addressline 1. This is my home",
        outputAddressLine2: "AddressLine 2",
        outputUuid: "********-****-****-****-************"
      },
    ]

    testData.forEach(({title, input, outputCredit, outputDebit, outputPrimaryEmail, outputSecondaryEmail, 
      outputPassword, outputHomePhone, outputWorkPhone, outputAddressLine1, outputAddressLine2, outputUuid}) => {
        
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      jsonMaskConfig['cardFields'] = ['credit', 'debit'];
      jsonMaskConfig['emailFields'] = ['primaryEmail', 'secondaryEmail'];
      jsonMaskConfig['passwordFields'] = ['password'];
      jsonMaskConfig['phoneFields'] = ['homePhone', 'workPhone'];
      jsonMaskConfig['stringFields'] = ['addressLine1', 'addressLine2'];
      jsonMaskConfig['uuidFields'] = ['uuid1'];
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(outputCredit);
        expect(masked['debit']).to.equal(outputDebit);
        expect(masked['primaryEmail']).to.equal(outputPrimaryEmail);
        expect(masked['secondaryEmail']).to.equal(outputSecondaryEmail);
        expect(masked['password']).to.equal(outputPassword);
        expect(masked['homePhone']).to.equal(outputHomePhone);
        expect(masked['workPhone']).to.equal(outputWorkPhone);
        expect(masked['addressLine1']).to.equal(outputAddressLine1);
        expect(masked['addressLine2']).to.equal(outputAddressLine2);
        expect(masked['uuid1']).to.equal(outputUuid);
      });
    })
  });

  describe('Mask all nested fields with default options', function() {
    const jsonInput2 = {
      cards: {
        creditCards: ['1234-5678-8765-1234', '1111-2222-1111-2222'],
        debitCards: ['0000-1111-2222-3333', '2222-1111-3333-4444']
      },
      emails: {
        primaryEmail: 'primary@Email.com', 
        secondaryEmail: 'secondary@Email.com'
      },
      password: 'dummyPasswordANDdummyPassword',
      phones: {
        homePhone: "+1 1234567890",
        workPhone: "+1 9876543210",
      },
      address: {
        addressLine1: "This is my addressline 1. This is my home",
        addressLine2: "AddressLine 2"
      },
      uuids: {
        uuid1: '123e4567-e89b-12d3-a456-426614174000'
      }
    };

    let testData = [
      {
        title: 'test json masking with default options and all types of fields',
        input: jsonInput2,
        outputCredit: '1234-****-****-***4', 
        outputDebit: '0000-****-****-***3', 
        outputPrimaryEmail: 'pri****@*******om', 
        outputSecondaryEmail: 'sec******@*******om',
        outputPassword: '****************',
        outputHomePhone: "+1 1********0",
        outputWorkPhone: "+1 9********0",
        outputAddressLine1: "This is my addressline 1. This is my home",
        outputAddressLine2: "AddressLine 2",
        outputUuid: "********-****-****-****-************"
      },
    ]

    testData.forEach(({title, input, outputCredit, outputDebit, outputPrimaryEmail, outputSecondaryEmail, 
      outputPassword, outputHomePhone, outputWorkPhone, outputAddressLine1, outputAddressLine2, outputUuid}) => {
        
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      jsonMaskConfig['cardFields'] = ['cards.creditCards[0]', 'cards.creditCards[1]', 'cards.debitCards[0]', 'cards.debitCards[1]'];
      jsonMaskConfig['emailFields'] = ['emails.primaryEmail', 'emails.secondaryEmail'];
      jsonMaskConfig['passwordFields'] = ['password'];
      jsonMaskConfig['phoneFields'] = ['phones.homePhone', 'phones.workPhone'];
      jsonMaskConfig['stringFields'] = ['address.addressLine1', 'address.addressLine2'];
      jsonMaskConfig['uuidFields'] = ['uuids.uuid1'];
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['cards']['creditCards'][0]).to.equal(outputCredit);
        expect(masked['cards']['creditCards'][1]).to.equal('1111-****-****-***2');
        expect(masked['cards']['debitCards'][0]).to.equal(outputDebit);
        expect(masked['cards']['debitCards'][1]).to.equal('2222-****-****-***4');

        expect(masked['emails']['primaryEmail']).to.equal(outputPrimaryEmail);
        expect(masked['emails']['secondaryEmail']).to.equal(outputSecondaryEmail);

        expect(masked['password']).to.equal(outputPassword);

        expect(masked['phones']['homePhone']).to.equal(outputHomePhone);
        expect(masked['phones']['workPhone']).to.equal(outputWorkPhone);

        expect(masked['address']['addressLine1']).to.equal(outputAddressLine1);
        expect(masked['address']['addressLine2']).to.equal(outputAddressLine2);

        expect(masked['uuids']['uuid1']).to.equal(outputUuid);
      });
      it('Test masking improper JSON', function() {
        const notAJson = "Not a JSON. Just a String";
        const masked = maskData.maskJSON2(notAJson, jsonMaskConfig);
        expect(masked).to.equal(notAJson);
      });
    })
  });

  describe('Mask card fields with custom options', function() {
    let testData = [
      {
        title: 'Mask card fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputCredit: 'XXXX-XXXX-XXXX-1234', 
        outputDebit: 'XXXX-XXXX-XXXX-3333'
      }
    ]

    testData.forEach(({title, input, outputCredit, outputDebit}) => {
        
        const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
        const cardMaskOptions = JSON.parse(JSON.stringify(Constants.defaultCardMaskOptions));
        // const defaultCardMaskOptions = {
        //   maskWith: "*",
        //   unmaskedStartDigits: 4,
        //   unmaskedEndDigits: 1
        // };
        cardMaskOptions['maskWith'] = "X"
        cardMaskOptions['unmaskedStartDigits'] = 0
        cardMaskOptions['unmaskedEndDigits'] = 4
        jsonMaskConfig['cardFields'] = ['credit', 'debit'];
        jsonMaskConfig['cardMaskOptions'] = cardMaskOptions;
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(outputCredit);
        expect(masked['debit']).to.equal(outputDebit);
        expect(masked['primaryEmail']).to.equal(input['primaryEmail']);
        expect(masked['secondaryEmail']).to.equal(input['secondaryEmail']);
        expect(masked['password']).to.equal(input['password']);
        expect(masked['homePhone']).to.equal(input['homePhone']);
        expect(masked['workPhone']).to.equal(input['workPhone']);
        expect(masked['addressLine1']).to.equal(input['addressLine1']);
        expect(masked['addressLine2']).to.equal(input['addressLine2']);
      });
    })
  });

  describe('Mask email fields with custom options', function() {
    let testData = [
      {
        title: 'Mask email fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputPrimaryEmail: 'prim...@........m', 
        outputSecondaryEmail: 'seco.....@........m'
      },
    ]

    testData.forEach(({title, input, outputPrimaryEmail, outputSecondaryEmail}) => {

      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const emailMaskOptions = JSON.parse(JSON.stringify(Constants.defaultEmailMask2Options));
      // const defaultEmailMask2Options = {
      //   maskWith: "*",
      //   unmaskedStartCharactersBeforeAt: 3,
      //   unmaskedEndCharactersAfterAt: 2,
      //   maskAtTheRate: false
      // };
      emailMaskOptions['maskWith'] = "."
      emailMaskOptions['unmaskedStartCharactersBeforeAt'] = 4
      emailMaskOptions['unmaskedEndCharactersAfterAt'] = 1
      jsonMaskConfig['emailFields'] = ['primaryEmail', 'secondaryEmail'];
      jsonMaskConfig['emailMaskOptions'] = emailMaskOptions;

      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(input['credit']);
        expect(masked['debit']).to.equal(input['debit']);
        expect(masked['primaryEmail']).to.equal(outputPrimaryEmail);
        expect(masked['secondaryEmail']).to.equal(outputSecondaryEmail);
        expect(masked['password']).to.equal(input['password']);
        expect(masked['homePhone']).to.equal(input['homePhone']);
        expect(masked['workPhone']).to.equal(input['workPhone']);
        expect(masked['addressLine1']).to.equal(input['addressLine1']);
        expect(masked['addressLine2']).to.equal(input['addressLine2']);
      });
    })
  });

  describe('Mask password fields with custom options', function() {
    let testData = [
      {
        title: 'Mask password fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputPassword: 'd????d'
      },
    ]

    testData.forEach(({title, input, outputPassword}) => {
        
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const passwordMaskOptions = JSON.parse(JSON.stringify(Constants.defaultPasswordMaskOptions));
      // const defaultPasswordMaskOptions = {
      //   maskWith: "*",
      //   maxMaskedCharacters: 16,
      //   unmaskedStartCharacters: 0,
      //   unmaskedEndCharacters: 0
      // };
      passwordMaskOptions['maskWith'] = "?"
      passwordMaskOptions['maxMaskedCharacters'] = 6
      passwordMaskOptions['unmaskedStartCharacters'] = 1
      passwordMaskOptions['unmaskedEndCharacters'] = 1
      jsonMaskConfig['passwordFields'] = ['password'];
      jsonMaskConfig['passwordMaskOptions'] = passwordMaskOptions;
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(input['credit']);
        expect(masked['debit']).to.equal(input['debit']);
        expect(masked['primaryEmail']).to.equal(input['primaryEmail']);
        expect(masked['secondaryEmail']).to.equal(input['secondaryEmail']);
        expect(masked['password']).to.equal(outputPassword);
        expect(masked['homePhone']).to.equal(input['homePhone']);
        expect(masked['workPhone']).to.equal(input['workPhone']);
        expect(masked['addressLine1']).to.equal(input['addressLine1']);
        expect(masked['addressLine2']).to.equal(input['addressLine2']);
      });
    })
  });

  describe('Mask phone fields with custom options', function() {
    let testData = [
      {
        title: 'Mask phone fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputHomePhone: '+1 #######890',
        outputWorkPhone: '+1 #######210'
      },
    ]

    testData.forEach(({title, input, outputHomePhone, outputWorkPhone}) => {
        
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const phoneMaskOptions = JSON.parse(JSON.stringify(Constants.defaultPhoneMaskOptions));
      // const defaultPhoneMaskOptions = {
      //   maskWith: "*",
      //   unmaskedStartDigits: 4,
      //   unmaskedEndDigits: 1
      // };
      phoneMaskOptions['maskWith'] = "#"
      phoneMaskOptions['unmaskedStartDigits'] = 3
      phoneMaskOptions['unmaskedEndDigits'] = 3
      jsonMaskConfig['phoneFields'] = ['homePhone', 'workPhone'];
      jsonMaskConfig['phoneMaskOptions'] = phoneMaskOptions;
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(input['credit']);
        expect(masked['debit']).to.equal(input['debit']);
        expect(masked['primaryEmail']).to.equal(input['primaryEmail']);
        expect(masked['secondaryEmail']).to.equal(input['secondaryEmail']);
        expect(masked['password']).to.equal(input['password']);
        expect(masked['homePhone']).to.equal(outputHomePhone);
        expect(masked['workPhone']).to.equal(outputWorkPhone);
        expect(masked['addressLine1']).to.equal(input['addressLine1']);
        expect(masked['addressLine2']).to.equal(input['addressLine2']);
      });
    })
  });

  describe('Mask String fields with custom options', function() {
    let testData = [
      {
        title: 'Mask String fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputAddressLine1: 'XXXX is my addressline 1. This is my home',
        outputAddressLine2: 'AddressLine 2'
      },
    ]

    testData.forEach(({title, input, outputAddressLine1, outputAddressLine2}) => {
        
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const stringMaskOptions = JSON.parse(JSON.stringify(Constants.defaultStringMaskOptions));
      // const defaultStringMaskOptions = {
      //   maskWith: "*",
      //   maskOnlyFirstOccurance: false,
      //   values: [],
      //   maskAll: false,
      //   maskSpace: true
      // };
      stringMaskOptions['maskWith'] = "X"
      stringMaskOptions['maskOnlyFirstOccurance'] = true
      stringMaskOptions['values'] = ['This']
      jsonMaskConfig['stringFields'] = ['addressLine1', 'addressLine2'];
      jsonMaskConfig['stringMaskOptions'] = stringMaskOptions;
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(input['credit']);
        expect(masked['debit']).to.equal(input['debit']);
        expect(masked['primaryEmail']).to.equal(input['primaryEmail']);
        expect(masked['secondaryEmail']).to.equal(input['secondaryEmail']);
        expect(masked['password']).to.equal(input['password']);
        expect(masked['homePhone']).to.equal(input['homePhone']);
        expect(masked['workPhone']).to.equal(input['workPhone']);
        expect(masked['addressLine1']).to.equal(outputAddressLine1);
        expect(masked['addressLine2']).to.equal(outputAddressLine2);
      });
    })
  });

  describe('Mask UUID fields with custom options', function() {
    let testData = [
      {
        title: 'Mask UUID fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputUuid: "123e4567-XXXX-XXXX-XXXX-426614174000"
      },
    ]

    testData.forEach(({title, input, outputUuid}) => {
        
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const uuidMaskOptions = JSON.parse(JSON.stringify(Constants.defaultUuidMaskOptions));
      // const defaultUuidMaskOptions = {
      //   maskWith: "*",
      //   unmaskedStartCharacters: 0,
      //   unmaskedEndCharacters: 0
      // };
      uuidMaskOptions['maskWith'] = "X"
      uuidMaskOptions['unmaskedStartCharacters'] = 8
      uuidMaskOptions['unmaskedEndCharacters'] = 12
      jsonMaskConfig['uuidFields'] = ['uuid1'];
      jsonMaskConfig['uuidMaskOptions'] = uuidMaskOptions;
      it(`${title}`, function() {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['credit']).to.equal(input['credit']);
        expect(masked['debit']).to.equal(input['debit']);
        expect(masked['primaryEmail']).to.equal(input['primaryEmail']);
        expect(masked['secondaryEmail']).to.equal(input['secondaryEmail']);
        expect(masked['password']).to.equal(input['password']);
        expect(masked['homePhone']).to.equal(input['homePhone']);
        expect(masked['workPhone']).to.equal(input['workPhone']);
        expect(masked['addressLine1']).to.equal(input['addressLine1']);
        expect(masked['addressLine2']).to.equal(input['addressLine2']);
        expect(masked['uuid1']).to.equal(outputUuid);
      });
    })
  });
  
});