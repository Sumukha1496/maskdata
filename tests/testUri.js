'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Masking URI', function () {
  describe('Mask URI with default options', function () {
    // default options are this - let tests fail when defaults change
    // const defaultUriMaskOptions = {
    //   maskWith: '*',
    //   maskProtocol: false,
    //   maskUsername: true,
    //   maskPassword: true,
    //   maskHost: false,
    //   maskPort: false,
    //   maskPath: false,
    //   maskQuery: true,
    //   maskFragment: false
    // };

    let testData = [
      {
        title: 'Full URI with all parts',
        input: 'http://admin:secret@example.com:8080/api/v1?token=abc123#section',
        output: 'http://*****:******@example.com:8080/api/v1?************#section'
      },
      {
        title: 'URI with user and password only',
        input: 'https://user:pass@host.com',
        output: 'https://****:****@host.com'
      },
      {
        title: 'URI with user only (no password)',
        input: 'ftp://admin@files.example.com/data',
        output: 'ftp://*****@files.example.com/data'
      },
      {
        title: 'Simple URI without credentials',
        input: 'https://example.com',
        output: 'https://example.com'
      },
      {
        title: 'URI with port and query',
        input: 'http://localhost:3000?debug=true',
        output: 'http://localhost:3000?**********'
      },
      {
        title: 'URI with path only',
        input: 'https://api.example.com/v2/users',
        output: 'https://api.example.com/v2/users'
      }
    ];

    testData.forEach(({ title, input, output }) => {
      it(`default mask - ${title}`, function () {
        const masked = maskData.maskUri(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask URI with custom options - mask individual parts', function () {
    const baseOptions = {
      maskWith: '*',
      maskProtocol: false,
      maskUsername: false,
      maskPassword: false,
      maskHost: false,
      maskPort: false,
      maskPath: false,
      maskQuery: false,
      maskFragment: false
    };

    const fullUri = 'http://admin:secret@example.com:8080/api/v1?token=abc#top';

    let testData = [
      {
        title: 'Mask only protocol',
        output: '****://admin:secret@example.com:8080/api/v1?token=abc#top',
        configKey: 'maskProtocol',
        configValue: true
      },
      {
        title: 'Mask only username',
        output: 'http://*****:secret@example.com:8080/api/v1?token=abc#top',
        configKey: 'maskUsername',
        configValue: true
      },
      {
        title: 'Mask only password',
        output: 'http://admin:******@example.com:8080/api/v1?token=abc#top',
        configKey: 'maskPassword',
        configValue: true
      },
      {
        title: 'Mask only host',
        output: 'http://admin:secret@***********:8080/api/v1?token=abc#top',
        configKey: 'maskHost',
        configValue: true
      },
      {
        title: 'Mask only port',
        output: 'http://admin:secret@example.com:****/api/v1?token=abc#top',
        configKey: 'maskPort',
        configValue: true
      },
      {
        title: 'Mask only path',
        output: 'http://admin:secret@example.com:8080/******?token=abc#top',
        configKey: 'maskPath',
        configValue: true
      },
      {
        title: 'Mask only query',
        output: 'http://admin:secret@example.com:8080/api/v1?*********#top',
        configKey: 'maskQuery',
        configValue: true
      },
      {
        title: 'Mask only fragment',
        output: 'http://admin:secret@example.com:8080/api/v1?token=abc#***',
        configKey: 'maskFragment',
        configValue: true
      }
    ];

    testData.forEach(({ title, output, configKey, configValue }) => {
      const config = JSON.parse(JSON.stringify(baseOptions));
      config[configKey] = configValue;
      it(`custom mask - ${title}`, function () {
        const masked = maskData.maskUri(fullUri, config);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Mask URI with custom maskWith character', function () {
    it('should use custom mask character', function () {
      const options = {
        maskWith: '#',
        maskUsername: true,
        maskPassword: true
      };
      const masked = maskData.maskUri('https://user:pass@host.com', options);
      expect(masked).to.equal('https://####:####@host.com');
    });
  });

  describe('Mask all URI parts', function () {
    it('should mask every part of the URI', function () {
      const options = {
        maskWith: '*',
        maskProtocol: true,
        maskUsername: true,
        maskPassword: true,
        maskHost: true,
        maskPort: true,
        maskPath: true,
        maskQuery: true,
        maskFragment: true
      };
      const masked = maskData.maskUri(
        'http://admin:secret@example.com:8080/api/v1?token=abc#top',
        options
      );
      expect(masked).to.equal(
        '****://*****:******@***********:****/******?*********#***'
      );
    });
  });

  describe('Edge cases', function () {
    let testData = [
      {
        title: 'No protocol separator - return as is',
        input: 'not-a-uri',
        output: 'not-a-uri'
      },
      {
        title: 'Empty string',
        input: '',
        output: ''
      },
      {
        title: 'Protocol only',
        input: 'http://',
        output: 'http://'
      },
      {
        title: 'URI with empty password',
        input: 'http://user:@host.com',
        output: 'http://****:@host.com'
      }
    ];

    testData.forEach(({ title, input, output }) => {
      it(`edge case - ${title}`, function () {
        const masked = maskData.maskUri(input);
        expect(masked).to.equal(output, 'masked output does not match expected value');
      });
    });
  });

  describe('Non-string inputs - input will not be masked', function () {
    let testData = [
      {
        title: 'test input as number',
        input: 12
      },
      {
        title: 'test input as array',
        input: ['http://example.com']
      },
      {
        title: 'test input as object',
        input: { uri: 'http://example.com' }
      },
      {
        title: 'test input as boolean',
        input: false
      },
      {
        title: 'undefined uri',
        input: undefined
      },
      {
        title: 'null uri',
        input: null
      }
    ];

    testData.forEach(({ title, input }) => {
      it(`non string input - ${title}`, function () {
        const masked = maskData.maskUri(input);
        expect(masked).to.equal(input, 'Improper input');
      });
    });
  });
});
