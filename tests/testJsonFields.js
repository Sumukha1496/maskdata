'use strict';

const expect = require('chai').expect;

const maskData = require('../index');
const Constants = require('../lib/helpers/Constants');

const jsonInput = {
  credit: '1234-5678-8765-1234',
  debit: '0000-1111-2222-3333',
  primaryEmail: 'primary@Email.com',
  secondaryEmail: 'secondary@Email.com',
  password: 'dummyPassword',
  homePhone: '+1 1234567890',
  workPhone: '+1 9876543210',
  addressLine1: 'This is my addressline 1. This is my home',
  addressLine2: 'AddressLine 2',
  uuid1: '123e4567-e89b-12d3-a456-426614174000',
  randomString: 'This is a random string'
};

describe('JSON mask2', function () {
  describe('Mask with default options and no fields', function () {
    let testData = [
      {
        title: 'test json masking with default options and no fields',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputCredit: '1234-5678-8765-1234',
        outputDebit: '0000-1111-2222-3333',
        outputPrimaryEmail: 'primary@Email.com',
        outputSecondaryEmail: 'secondary@Email.com',
        outputPassword: 'dummyPassword',
        outputHomePhone: '+1 1234567890',
        outputWorkPhone: '+1 9876543210',
        outputAddressLine1: 'This is my addressline 1. This is my home',
        outputAddressLine2: 'AddressLine 2',
        outputUuid: '123e4567-e89b-12d3-a456-426614174000',
        outputRandomString: 'This is a random string'
      }
    ];

    testData.forEach(
      ({
        title,
        input,
        outputCredit,
        outputDebit,
        outputPrimaryEmail,
        outputSecondaryEmail,
        outputPassword,
        outputHomePhone,
        outputWorkPhone,
        outputAddressLine1,
        outputAddressLine2,
        outputUuid,
        outputRandomString
      }) => {
        it(`${title}`, function () {
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
          expect(masked['randomString']).to.equal(outputRandomString);
        });
      }
    );
  });

  describe('Mask all fields with no config', function () {
    let testData = [
      {
        title: 'test json masking with no config but all types of fields',
        input: JSON.parse(JSON.stringify(jsonInput))
      }
    ];

    testData.forEach(({ title, input }) => {
      it(`${title}`, function () {
        const masked = maskData.maskJSON2(input);
        expect(masked['credit']).to.equal(input['credit']);
        expect(masked['debit']).to.equal(input['debit']);
        expect(masked['primaryEmail']).to.equal(input['primaryEmail']);
        expect(masked['secondaryEmail']).to.equal(input['secondaryEmail']);
        expect(masked['password']).to.equal(input['password']);
        expect(masked['homePhone']).to.equal(input['homePhone']);
        expect(masked['workPhone']).to.equal(input['workPhone']);
        expect(masked['addressLine1']).to.equal(input['addressLine1']);
        expect(masked['addressLine2']).to.equal(input['addressLine2']);
        expect(masked['uuid1']).to.equal(input['uuid1']);
        expect(masked['randomString']).to.equal(input['randomString']);
      });
    });
  });

  describe('Mask all fields with default options', function () {
    let testData = [
      {
        title: 'test json masking with default options and all types of fields',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputCredit: '1234-****-****-***4',
        outputDebit: '0000-****-****-***3',
        outputPrimaryEmail: 'pri****@*******om',
        outputSecondaryEmail: 'sec******@*******om',
        outputPassword: '*************',
        outputHomePhone: '+1 1********0',
        outputWorkPhone: '+1 9********0',
        outputAddressLine1: 'This is my addressline 1. This is my home',
        outputAddressLine2: 'AddressLine 2',
        outputUuid: '********-****-****-****-************',
        outputRandonString: '***********************'
      }
    ];

    testData.forEach(
      ({
        title,
        input,
        outputCredit,
        outputDebit,
        outputPrimaryEmail,
        outputSecondaryEmail,
        outputPassword,
        outputHomePhone,
        outputWorkPhone,
        outputAddressLine1,
        outputAddressLine2,
        outputUuid,
        outputRandonString
      }) => {
        const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
        jsonMaskConfig['cardFields'] = ['credit', 'debit'];
        jsonMaskConfig['emailFields'] = ['primaryEmail', 'secondaryEmail'];
        jsonMaskConfig['passwordFields'] = ['password'];
        jsonMaskConfig['phoneFields'] = ['homePhone', 'workPhone'];
        jsonMaskConfig['stringFields'] = ['addressLine1', 'addressLine2'];
        jsonMaskConfig['uuidFields'] = ['uuid1'];
        jsonMaskConfig['genericStrings'] = [{ fields: ['randomString'] }];
        it(`${title}`, function () {
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
          expect(masked['randomString']).to.equal(outputRandonString);
        });
      }
    );
  });

  describe('Mask all nested fields with default options', function () {
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
        homePhone: '+1 1234567890',
        workPhone: '+1 9876543210'
      },
      address: {
        addressLine1: 'This is my addressline 1. This is my home',
        addressLine2: 'AddressLine 2'
      },
      uuids: {
        uuid1: '123e4567-e89b-12d3-a456-426614174000'
      },
      jwts: {
        token1:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        token2:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU',
        token3List: [
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdDEifQ.TvKsZHhAgnZeplD4YdkKAgjdhdtFSQn-xZJ7HiiS1ok',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdDIifQ.ekZkXoeOb4SE_YLlc0Iv8V3wm17xS1B7TzhtYHvIYl0',
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdDMifQ.CNiJIr7TZgsVGS0dbFFwdPtG6v1wwSor9jFoVeUkrJ0'
        ]
      },
      drivingLicense: {
        license1: 'XX1234 YY',
        motorLicenses: ['ABCD1234', 'EFGH5678']
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
        outputHomePhone: '+1 1********0',
        outputWorkPhone: '+1 9********0',
        outputAddressLine1: 'This is my addressline 1. This is my home',
        outputAddressLine2: 'AddressLine 2',
        outputUuid: '********-****-****-****-************',
        outputJwt1:
          '***********************************************************************************************************************************************************',
        outputJwt2:
          '*************************************************************************************************************************************'
      }
    ];

    testData.forEach(
      ({
        title,
        input,
        outputCredit,
        outputDebit,
        outputPrimaryEmail,
        outputSecondaryEmail,
        outputPassword,
        outputHomePhone,
        outputWorkPhone,
        outputAddressLine1,
        outputAddressLine2,
        outputUuid,
        outputJwt1,
        outputJwt2
      }) => {
        const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
        jsonMaskConfig['cardFields'] = [
          'cards.creditCards[0]',
          'cards.creditCards[1]',
          'cards.debitCards[0]',
          'cards.debitCards[1]'
        ];
        jsonMaskConfig['emailFields'] = ['emails.primaryEmail', 'emails.secondaryEmail'];
        jsonMaskConfig['passwordFields'] = ['password'];
        jsonMaskConfig['phoneFields'] = ['phones.homePhone', 'phones.workPhone'];
        jsonMaskConfig['stringFields'] = ['address.addressLine1', 'address.addressLine2'];
        jsonMaskConfig['uuidFields'] = ['uuids.uuid1'];
        jsonMaskConfig['jwtFields'] = ['jwts.token1', 'jwts.token2'];
        jsonMaskConfig['genericStrings'] = [
          { fields: ['drivingLicense.license1', 'drivingLicense.motorLicenses.*'] }
        ];
        it(`${title}`, function () {
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

          expect(masked['jwts']['token1']).to.equal(outputJwt1);
          expect(masked['jwts']['token2']).to.equal(outputJwt2);

          expect(masked['drivingLicense']['license1']).to.equal('*********');
          expect(masked['drivingLicense']['motorLicenses'][0]).to.equal('********');
          expect(masked['drivingLicense']['motorLicenses'][1]).to.equal('********');
        });
        it('Test masking improper JSON', function () {
          const notAJson = 'Not a JSON. Just a String';
          const masked = maskData.maskJSON2(notAJson, jsonMaskConfig);
          expect(masked).to.equal(notAJson);
        });
      }
    );
  });

  describe('Mask fields with custom options', function () {
    let input = JSON.parse(JSON.stringify(jsonInput));
    input['randomStrings'] = {};
    input['randomStrings']['row1'] = 'This is row 1 random string';
    input['randomStrings']['row2'] = ['Entry1', 'Entry2', 'Entry3'];
    input['randomStrings']['row3'] = {
      key1: 'Row3 Object 1',
      key2: 'Row3 Object 2',
      key3: ['Entry1', 'Entry2', 'Entry3']
    };
    let testData = [
      {
        title: 'Mask card fields with custom options',
        input: input,
        outputCredit: 'XXXX-XXXX-XXXX-1234',
        outputDebit: 'XXXX-XXXX-XXXX-3333'
      }
    ];

    testData.forEach(({ title, input, outputCredit, outputDebit }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const cardMaskOptions = JSON.parse(JSON.stringify(Constants.defaultCardMaskOptions));
      cardMaskOptions['maskWith'] = 'X';
      cardMaskOptions['unmaskedStartDigits'] = 0;
      cardMaskOptions['unmaskedEndDigits'] = 4;
      jsonMaskConfig['cardFields'] = ['credit', 'debit'];
      jsonMaskConfig['cardMaskOptions'] = cardMaskOptions;
      jsonMaskConfig['genericStrings'] = [
        {
          fields: ['randomString'],
          config: {
            maskWith: '?',
            unmaskedStartCharacters: 2,
            unmaskedEndCharacters: 3,
            maxMaskedCharacters: 8
          }
        },
        {
          fields: ['randomStrings.row1'],
          config: {
            maskWith: '*',
            unmaskedStartCharacters: 2,
            unmaskedEndCharacters: 3,
            maxMaskedCharacters: 8
          }
        },
        { fields: ['randomStrings.row2.*'], config: { maskWith: 'X', unmaskedEndCharacters: 1 } },
        { fields: ['randomStrings.row3.key1'] },
        {
          fields: ['randomStrings.row3.key3.*'],
          config: { maskWith: '@', unmaskedEndCharacters: 1 }
        },
        {
          fields: ['unknownField'],
          config: { maskWith: '@', unmaskedEndCharacters: 1 }
        },
        {
          config: { maskWith: '@', unmaskedEndCharacters: 1 }
        }
      ];
      it(`${title}`, function () {
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
        expect(masked['randomString']).to.equal('Th???ing');
        expect(masked['randomStrings']['row1']).to.equal('Th***ing');
        expect(masked['randomStrings']['row2'][0]).to.equal('XXXXX1');
        expect(masked['randomStrings']['row2'][1]).to.equal('XXXXX2');
        expect(masked['randomStrings']['row2'][2]).to.equal('XXXXX3');
        expect(masked['randomStrings']['row3']['key1']).to.equal('*************');
        expect(masked['randomStrings']['row3']['key2']).to.equal('Row3 Object 2');
        expect(masked['randomStrings']['row3']['key3'][0]).to.equal('@@@@@1');
        expect(masked['randomStrings']['row3']['key3'][1]).to.equal('@@@@@2');
        expect(masked['randomStrings']['row3']['key3'][2]).to.equal('@@@@@3');
        expect(masked['unknownField']).to.equal(undefined);
      });
    });
  });

  describe('Mask email fields with custom options', function () {
    let testData = [
      {
        title: 'Mask email fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputPrimaryEmail: 'prim...@........m',
        outputSecondaryEmail: 'seco.....@........m'
      }
    ];

    testData.forEach(({ title, input, outputPrimaryEmail, outputSecondaryEmail }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const emailMaskOptions = JSON.parse(JSON.stringify(Constants.defaultEmailMask2Options));
      // const defaultEmailMask2Options = {
      //   maskWith: "*",
      //   unmaskedStartCharactersBeforeAt: 3,
      //   unmaskedEndCharactersAfterAt: 2,
      //   maskAtTheRate: false
      // };
      emailMaskOptions['maskWith'] = '.';
      emailMaskOptions['unmaskedStartCharactersBeforeAt'] = 4;
      emailMaskOptions['unmaskedEndCharactersAfterAt'] = 1;
      jsonMaskConfig['emailFields'] = ['primaryEmail', 'secondaryEmail'];
      jsonMaskConfig['emailMaskOptions'] = emailMaskOptions;

      it(`${title}`, function () {
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
    });
  });

  describe('Mask password fields with custom options', function () {
    let testData = [
      {
        title: 'Mask password fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputPassword: 'd????d'
      }
    ];

    testData.forEach(({ title, input, outputPassword }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const passwordMaskOptions = JSON.parse(JSON.stringify(Constants.defaultPasswordMaskOptions));
      // const defaultPasswordMaskOptions = {
      //   maskWith: "*",
      //   maxMaskedCharacters: 16,
      //   unmaskedStartCharacters: 0,
      //   unmaskedEndCharacters: 0
      // };
      passwordMaskOptions['maskWith'] = '?';
      passwordMaskOptions['maxMaskedCharacters'] = 6;
      passwordMaskOptions['unmaskedStartCharacters'] = 1;
      passwordMaskOptions['unmaskedEndCharacters'] = 1;
      jsonMaskConfig['passwordFields'] = ['password'];
      jsonMaskConfig['passwordMaskOptions'] = passwordMaskOptions;
      it(`${title}`, function () {
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
    });
  });

  describe('Mask phone fields with custom options', function () {
    let testData = [
      {
        title: 'Mask phone fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputHomePhone: '+1 #######890',
        outputWorkPhone: '+1 #######210'
      }
    ];

    testData.forEach(({ title, input, outputHomePhone, outputWorkPhone }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const phoneMaskOptions = JSON.parse(JSON.stringify(Constants.defaultPhoneMaskOptions));
      // const defaultPhoneMaskOptions = {
      //   maskWith: "*",
      //   unmaskedStartDigits: 4,
      //   unmaskedEndDigits: 1
      // };
      phoneMaskOptions['maskWith'] = '#';
      phoneMaskOptions['unmaskedStartDigits'] = 3;
      phoneMaskOptions['unmaskedEndDigits'] = 3;
      jsonMaskConfig['phoneFields'] = ['homePhone', 'workPhone'];
      jsonMaskConfig['phoneMaskOptions'] = phoneMaskOptions;
      it(`${title}`, function () {
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
    });
  });

  describe('Mask String fields with custom options', function () {
    let testData = [
      {
        title: 'Mask String fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputAddressLine1: 'XXXX is my addressline 1. This is my home',
        outputAddressLine2: 'AddressLine 2'
      }
    ];

    testData.forEach(({ title, input, outputAddressLine1, outputAddressLine2 }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const stringMaskOptions = JSON.parse(JSON.stringify(Constants.defaultStringMaskOptions));
      // const defaultStringMaskOptions = {
      //   maskWith: "*",
      //   maskOnlyFirstOccurance: false,
      //   values: [],
      //   maskAll: false,
      //   maskSpace: true
      // };
      stringMaskOptions['maskWith'] = 'X';
      stringMaskOptions['maskOnlyFirstOccurance'] = true;
      stringMaskOptions['values'] = ['This'];
      jsonMaskConfig['stringFields'] = ['addressLine1', 'addressLine2'];
      jsonMaskConfig['stringMaskOptions'] = stringMaskOptions;
      it(`${title}`, function () {
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
    });
  });

  describe('Mask UUID fields with custom options', function () {
    let testData = [
      {
        title: 'Mask UUID fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputUuid: '123e4567-XXXX-XXXX-XXXX-426614174000'
      }
    ];

    testData.forEach(({ title, input, outputUuid }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const uuidMaskOptions = JSON.parse(JSON.stringify(Constants.defaultUuidMaskOptions));
      // const defaultUuidMaskOptions = {
      //   maskWith: "*",
      //   unmaskedStartCharacters: 0,
      //   unmaskedEndCharacters: 0
      // };
      uuidMaskOptions['maskWith'] = 'X';
      uuidMaskOptions['unmaskedStartCharacters'] = 8;
      uuidMaskOptions['unmaskedEndCharacters'] = 12;
      jsonMaskConfig['uuidFields'] = ['uuid1'];
      jsonMaskConfig['uuidMaskOptions'] = uuidMaskOptions;
      it(`${title}`, function () {
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
    });
  });

  describe('Mask UUID fields with invalid options', function () {
    let testData = [
      {
        title: 'Mask UUID fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        outputUuid: '123e4567-e89b-12d3-a456-426614174000'
      }
    ];

    testData.forEach(({ title, input, outputUuid }) => {
      const jsonMaskConfig = JSON.parse(JSON.stringify(Constants.defaultjsonMask2Configs));
      const uuidMaskOptions = JSON.parse(JSON.stringify(Constants.defaultUuidMaskOptions));
      // const defaultUuidMaskOptions = {
      //   maskWith: "*",
      //   unmaskedStartCharacters: 0,
      //   unmaskedEndCharacters: 0
      // };
      uuidMaskOptions['maskWith'] = 'X';
      uuidMaskOptions['unmaskedStartCharacters'] = 8;
      uuidMaskOptions['unmaskedEndCharacters'] = 12;
      jsonMaskConfig['uuidFields'] = ['uuid1.*.invalidField'];
      jsonMaskConfig['uuidMaskOptions'] = uuidMaskOptions;
      it(`${title}`, function () {
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
    });
  });

  describe('Test Json mask with .* and [*].', function () {
    const jsonInput = {
      cards: [
        {
          number: '1234-5678-8765-1234'
        },
        {
          number: '1111-2222-1111-2222'
        },
        {
          number: '0000-1111-2222-3333'
        },
        {
          name: 'No card number here'
        }
      ],
      emails: {
        primaryEmail: 'primary@Email.com',
        secondaryEmail: 'secondary@Email.com',
        moreEmails: [
          'email1@email.com',
          'email2@email.com',
          'email3@email.com',
          { childEmail: 'child@child.com', secondChild: { nestedkid: 'hello@hello.com' } }
        ]
      },
      array: ['element1', 'element22', 'element333'],
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJsb2wiLCJuYW1lIjoiVGVzdCIsImlhdCI6ImxvbCJ9.XNDxZcBWWEKYkCiu6XFGmAeuPF7iFnI7Sdv91gVZJMU'
    };

    let testData = [
      {
        title: 'Mask UUID fields with custom options',
        input: JSON.parse(JSON.stringify(jsonInput)),
        output: {
          cards: [
            {
              number: 'XXXX-XXXX-XXXX-XXXX'
            },
            {
              number: 'XXXX-XXXX-XXXX-XXXX'
            },
            {
              number: 'XXXX-XXXX-XXXX-XXXX'
            },
            {
              name: 'No card number here'
            }
          ],
          emails: {
            primaryEmail: '*******@*********',
            secondaryEmail: '*********@*********',
            moreEmails: [
              '******@*********',
              '******@*********',
              '******@*********',
              {
                childEmail: '*****@*********',
                secondChild: {
                  nestedkid: '*****@*********'
                }
              }
            ]
          },
          array: ['????????', '?????????', '??????????'],
          jwt: '************.**********.**********'
        }
      }
    ];

    const jsonMaskConfig = {
      cardMaskOptions: { maskWith: 'X', unmaskedStartDigits: 0, unmaskedEndDigits: 0 },

      emailMaskOptions: {
        maskWith: '*',
        unmaskedStartCharactersBeforeAt: 0,
        unmaskedEndCharactersAfterAt: 0,
        maskAtTheRate: false
      },

      stringMaskOptions: {
        maskWith: '?',
        maskOnlyFirstOccurance: false,
        values: [],
        maskAll: true,
        maskSpace: false
      },
      jwtMaskOptions: {
        maskWith: '*',
        maxMaskedCharacters: 32,
        maskDot: false,
        maskHeader: true,
        maskPayload: true,
        maskSignature: true
      },

      cardFields: ['cards[*].number'],
      emailFields: ['emails.*'],
      stringFields: ['array.*'],
      jwtFields: ['jwt']
    };

    testData.forEach(({ title, input, output }) => {
      it(`${title}`, function () {
        const masked = maskData.maskJSON2(input, jsonMaskConfig);
        expect(masked['cards'][0].number).to.equal(output['cards'][0].number);
        expect(masked['cards'][1].number).to.equal(output['cards'][1].number);
        expect(masked['cards'][2].number).to.equal(output['cards'][2].number);
        expect(masked['cards'][3].number).to.equal(undefined);

        expect(masked['emails'].primaryEmail).to.equal(output['emails'].primaryEmail);
        expect(masked['emails'].secondaryEmail).to.equal(output['emails'].secondaryEmail);
        expect(masked['emails'].moreEmails[0]).to.equal(output['emails'].moreEmails[0]);
        expect(masked['emails'].moreEmails[1]).to.equal(output['emails'].moreEmails[1]);
        expect(masked['emails'].moreEmails[2]).to.equal(output['emails'].moreEmails[2]);
        expect(masked['emails'].moreEmails[3].childEmail).to.equal(
          output['emails'].moreEmails[3].childEmail
        );
        expect(masked['emails'].moreEmails[3].secondChild.nestedkid).to.equal(
          output['emails'].moreEmails[3].secondChild.nestedkid
        );

        expect(masked['array'][0]).to.equal(output['array'][0]);
        expect(masked['array'][1]).to.equal(output['array'][1]);
        expect(masked['array'][2]).to.equal(output['array'][2]);

        expect(masked['jwt']).to.equal(output['jwt']);
      });
    });
  });
});
