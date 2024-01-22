'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Masking JWT tokens', function () {
  describe('Mask JWT token with default options', function () {
    // default options are this - let tests fail when defaults change
    // const defaultJwtMaskOptions = {
    //   maskWith: '*',
    //   maxMaskedCharacters: 512,
    //   maskDot: true,
    //   maskHeader: true,
    //   maskPayload: true,
    //   maskSignature: true
    // };

    let testData = [
      {
        title: 'Random JWT token',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          '*********************************************************************************************************'
      },
      {
        title: 'invalid but valid syntax JWT',
        input: 'a.b.c',
        output: '*****'
      },
      {
        title: 'longer than 512 chars',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQtbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          '********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************'
      },
      {
        title: 'Invalid JWT. Do not mask',
        input: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9',
        output: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9'
      },
      {
        title: 'Invalid JWT2. Do not mask',
        input: '..eyJpYXQiOjE1MTYyMzkwMjJ9',
        output: '..eyJpYXQiOjE1MTYyMzkwMjJ9'
      },
      {
        title: 'empty jwt. Do not mask',
        input: '',
        output: ''
      },
      {
        title: 'length less than 5 chars jwt. Do not mask',
        input: 'a.b.',
        output: 'a.b.'
      }
    ];

    testData.forEach(({ title, input, output }) => {
      it(`default mask - ${title}`, function () {
        const masked = maskData.maskJwt(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
        expect(masked.length).to.equal(
          input.length >= 512 ? 512 : input.length,
          'masked output length does not match expected value'
        );
      });
    });
  });

  describe('Mask JWT with custom options', function () {
    const jwtMaskOptions = {
      maskWith: '*',
      maxMaskedCharacters: 512,
      maskDot: false,
      maskHeader: false,
      maskPayload: false,
      maskSignature: false
    };

    let testData = [
      {
        title: 'Mask only dots',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9*eyJpYXQiOjE1MTYyMzkwMjJ9*tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        configKey: 'maskDot',
        configValue: true
      },
      {
        title: 'Mask only header',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          '************************************.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        configKey: 'maskHeader',
        configValue: true
      },
      {
        title: 'Mask only payload',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.************************.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        configKey: 'maskPayload',
        configValue: true
      },
      {
        title: 'Mask only signature',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.*******************************************',
        configKey: 'maskSignature',
        configValue: true
      }
    ];

    testData.forEach(({ title, input, output, configKey, configValue }) => {
      const config = JSON.parse(JSON.stringify(jwtMaskOptions));
      config[configKey] = configValue;
      it(`default mask - ${title}`, function () {
        const masked = maskData.maskJwt(input, config);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Unmask part of the JWT', function () {
    const jwtMaskOptions = {
      maskWith: '*',
      maxMaskedCharacters: 512,
      maskDot: false,
      maskHeader: true,
      maskPayload: true,
      maskSignature: true
    };

    let testData = [
      {
        title: 'Mask header and body',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          '************************************.************************.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        configKey: 'maskSignature',
        configValue: false
      },
      {
        title: 'Mask header and signature',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          '************************************.eyJpYXQiOjE1MTYyMzkwMjJ9.*******************************************',
        configKey: 'maskPayload',
        configValue: false
      },
      {
        title: 'Mask body and signature',
        input:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ',
        output:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.************************.*******************************************',
        configKey: 'maskHeader',
        configValue: false
      }
    ];

    testData.forEach(({ title, input, output, configKey, configValue }) => {
      const config = JSON.parse(JSON.stringify(jwtMaskOptions));
      config[configKey] = configValue;
      it(`custom mask2 - ${title}`, function () {
        const masked = maskData.maskJwt(input, config);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Test maxMaskedCharacters', function () {
    const jwtMaskOptions = {
      maskWith: '*',
      maxMaskedCharacters: 512,
      maskDot: true,
      maskHeader: true,
      maskPayload: true,
      maskSignature: true
    };

    let testData = [
      {
        title: 'Mask with maxMaskedCharacters=1',
        input: 'abcd.efgh.hijk',
        output: '***',
        maxMaskedCharacters: 1,
        maskDot: true
      },
      {
        title: 'Mask with maxMaskedCharacters=1',
        input: 'abcd.efgh.hijk',
        output: '*..',
        maxMaskedCharacters: 1,
        maskDot: false
      }
    ];

    testData.forEach(({ title, input, output, maxMaskedCharacters, maskDot }) => {
      const config = JSON.parse(JSON.stringify(jwtMaskOptions));
      config['maxMaskedCharacters'] = maxMaskedCharacters;
      config['maskDot'] = maskDot;
      it(`custom mask2 - ${title}`, function () {
        const masked = maskData.maskJwt(input, config);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask with non string inputs - input will not be masked', function () {
    const jwtMaskOptions = {
      maskWith: '*',
      maxMaskedCharacters: 512,
      maskDot: false,
      maskHeader: true,
      maskPayload: true,
      maskSignature: true
    };
    let testData = [
      {
        title: 'test input as number',
        input: 12
      },
      {
        title: 'test input as array',
        input: ['12']
      },
      {
        title: 'test input as object',
        input: { a: 'b', x: 'y' }
      },
      {
        title: 'test input as boolean',
        input: false
      },
      {
        title: 'undefined jwt. Do not mask',
        input: undefined
      },
      {
        title: 'null jwt. Do not mask',
        input: null
      }
    ];

    testData.forEach(({ title, input }) => {
      it(`non string input - ${title}`, function () {
        const masked = maskData.maskJwt(input, jwtMaskOptions);
        expect(masked).to.equal(input, 'Improper input');
      });
    });
  });
});
