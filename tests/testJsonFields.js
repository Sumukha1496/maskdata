'use strict';
const maskData = require('../index');
const expect = require('chai').expect;

describe('Masking JSON fields', function() {

  describe('Mask with default options', function() {

    // default options are this - let tests fail when defaults change
    // const defaultJsonMaskOptions = {
    //   maskWith: "*",
    //   fields: [],
    //   maxMaskedCharactersStr: -1
    // };

    it('Test simple non-nested object', function() {
      const jsonMaskOptions = {
        fields: ['password', 'firstName'],
        maxMaskedCharactersStr: 3
      };
      const data = {
        password: "PasswordValue",
        firstName: "FIRST_NAME",
        lastName: "LAST_NAME"
      };
      const expected = {
        password: "*".repeat(jsonMaskOptions.maxMaskedCharactersStr),
        firstName: "*".repeat(jsonMaskOptions.maxMaskedCharactersStr),
        lastName: "LAST_NAME"
      }
      expect(maskData.maskJSONFields(data, jsonMaskOptions)).to.deep.equal(expected);
    });

    it('Test nested object with one asterisk(*) where all subfields are replaced', function() {
      const maskAllFieldsOptions = {
        fields : [
          'level1.level2.field3[*].Hello',
          'level1.level2.level3.*']
      };
      const nestedAllObject = {
        level1: {
          field1: "field1Value",
          level2: {
            field2: "field2Value",
            field3: [
              { Hello: "HelloValue", Hi: "one" },
              { Hello: "Hello again" }
            ],
            level3: {
              field4: "field4Value",
              field5: "field5Value"
            }
          }
        },
        value1: "value"
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.level1.level2.field3[0].Hello = '*'.repeat(nestedAllObject.level1.level2.field3[0].Hello.length);
      expected.level1.level2.field3[1].Hello = '*'.repeat(nestedAllObject.level1.level2.field3[1].Hello.length);
      expected.level1.level2.level3.field4 = '*'.repeat(nestedAllObject.level1.level2.level3.field4.length);
      expected.level1.level2.level3.field5 = '*'.repeat(nestedAllObject.level1.level2.level3.field5.length);

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });

    it('Test nested object with out asterisk but fixed array index', function() {
      const jsonMaskOptions2 = {
        fields : [
          'level1.level2.level3.field3',
          'level1.level2.field2',
          'level1.field1',
          'value1',
          'level1.level2.level3.field4[0].Hello',
          'level1.level2.level3.field4[2]'
        ]
      };
      const nestedObject = {
        level1: {
          field1: "field1",
          level2: {
            field2: "field2",
            level3: {
              field3: "field3",
              field4: [{ Hello: "world" }, { Hello: "Newworld" }, "Just a String"]
            }
          }
        },
        value1: "value"
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedObject));
      expected.level1.level2.level3.field3 = '*'.repeat(nestedObject.level1.level2.level3.field3.length);
      expected.level1.level2.field2 = '*'.repeat(nestedObject.level1.level2.field2.length);
      expected.level1.field1 = '*'.repeat(nestedObject.level1.field1.length);
      expected.value1 = '*'.repeat(nestedObject.value1.length);
      expected.level1.level2.level3.field4[0].Hello = '*'.repeat(nestedObject.level1.level2.level3.field4[0].Hello.length);
      expected.level1.level2.level3.field4[2] = '*'.repeat(nestedObject.level1.level2.level3.field4[2].length);

      expect(maskData.maskJSONFields(nestedObject, jsonMaskOptions2)).to.deep.equal(expected);
    });

    it('Test nested object with multiple array placeholder "[*]."', function() {
      const maskAllFieldsOptions = {
        fields : [
          'level1.field2[*].level3array.field3[*].Hello'
        ]
      };
      const nestedAllObject = {
        level1: {
          field1: "field1Value",
          field2: [
            {
              level3array: {
                field3: [
                  { Hello: "Hello" },
                  { Hi: "Ho" }
                ]
              }
            },
            {
              level3array: {
                field3: "3 a string not list"
              }
            },
            {
              level3array: {
                field3: {
                  field4: "3 an object not list"
                }
              }
            }
          ],
          level2: {
            field3: "field3Value",
            field4: "field4Value",
            field5: [
              { Hello: "Hello again" }
            ],
            level3: {
              level4: {
                field6: "field5Value",
                field7: "field5Value",
                field8: [
                  {Hello: "HelloValue", Hi: "one"},
                  {Hello: "Hello again"},
                  {Hi: "Hi again"}
                ],
                level5: {
                  Hello: "Hello",
                  Hi: "Ho"
                }
              },
              level4b: {
                level5: "a value"
              },
              field9: "another value"
            }
          }
        },
        value1: "value"
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.level1.field2[0].level3array.field3[0].Hello = '*'.repeat(nestedAllObject.level1.field2[0].level3array.field3[0].Hello.length);

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });

    it('Test nested object with multiple object placeholder ".*"', function() {
      const maskAllFieldsOptions = {
        fields : [
          'level1.level2.*.field9',
          'level1.level2.*.level4.*.Hello'
        ]
      };
      const nestedAllObject = {
        level1: {
          field1: 'field1Value',
          field2: [
            {
              level3array: {
                field3: [
                  { Hello: 'Hello' },
                  { Hi: 'Ho' }
                ]
              }
            },
            {
              level3array: {
                field3: '3 a string not list'
              }
            },
            {
              level3array: {
                field3: {
                  field4: '3 an object not list'
                }
              }
            }
          ],
          level2: {
            field3: 'field3Value',
            field4: 'field4Value',
            field5: [
              { Hello: 'Hello again' }
            ],
            level3: {
              level4: {
                field6: 'field5Value',
                field7: 'field5Value',
                field8: [
                  {Hello: 'HelloValue', Hi: 'one'},
                  {Hello: 'Hello again'},
                  {Hi: 'Hi again'}
                ],
                level5: {
                  Hello: 'Hello',
                  Hi: 'Ho'
                }
              },
              level4b: {
                level5: 'a value'
              },
              field9: 'another value'
            }
          }
        },
        value1: 'value'
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.level1.level2.level3.level4.level5.Hello = '*'.repeat(nestedAllObject.level1.level2.level3.level4.level5.Hello.length);
      expected.level1.level2.level3.field9 = '*'.repeat(nestedAllObject.level1.level2.level3.field9.length);

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });

    it('Test nested object with array and object placeholder "[*].xxxx.*.yyyy', function() {
      const maskAllFieldsOptions = {
        fields : [
          'level1.field2[*].level3array.*.field4',
        ]
      };
      const nestedAllObject = {
        level1: {
          field1: 'field1Value',
          field2: [
            {
              level3array: {
                field3: [
                  { Hello: 'Hello' },
                  { Hi: 'Ho' }
                ]
              }
            },
            {
              level3array: {
                field3: '3 a string not list'
              }
            },
            {
              level3array: {
                field3: {
                  field4: '3 an object not list'
                }
              }
            }
          ],
          level2: {
            field3: 'field3Value',
            field4: 'field4Value',
            field5: [
              { Hello: 'Hello again' }
            ],
            level3: {
              level4: {
                field6: 'field5Value',
                field7: 'field5Value',
                field8: [
                  {Hello: 'HelloValue', Hi: 'one'},
                  {Hello: 'Hello again'},
                  {Hi: 'Hi again'}
                ],
                level5: {
                  Hello: 'Hello',
                  Hi: 'Ho'
                }
              },
              level4b: {
                level5: 'a value'
              },
              field9: 'another value'
            }
          }
        },
        value1: 'value'
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.level1.field2[2].level3array.field3.field4 = '*'.repeat(nestedAllObject.level1.field2[2].level3array.field3.field4.length);

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });

    it('Test nested object and mask all fields within an object', function() {
      const maskAllFieldsOptions = {
        fields: [
          'level1.*',
        ]
      };
      const nestedAllObject = {
        level1: {
          field1: 'field1Value',
          field2: [
            {
              level3array: {
                field3: 'field3Value',
              }
            },
          ],
          level2: {
            field4: 'field4Value'
          }
        },
        value1: 'value'
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.level1.field1 = '*'.repeat(nestedAllObject.level1.field1.length);
      expected.level1.field2 = '*'.repeat(nestedAllObject.level1.field2.toString().length);
      expected.level1.level2 = '*'.repeat(nestedAllObject.level1.level2.toString().length);

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });

    it('Test nested object and mask all fields within an array', function() {
      const maskAllFieldsOptions = {
        fields: [
          'list1[*]',
        ]
      };
      const nestedAllObject = {
        list1: [
          { field1: 'field1Value' },
          { field1: [
              { field3: 'field3Value' }
            ]
          },
          { level2: {
              field4: 'field4Value'
            }
          }
        ],
        value1: 'value'
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.list1.forEach((i, idx) => {
        expected.list1[idx] = '*'.repeat(i.toString().length);
      });

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });

    it('Test nested object and mask entire object or array', function() {
      const maskAllFieldsOptions = {
        fields: [
          'level1',
          'field5',
        ]
      };
      const nestedAllObject = {
        level1: {
          field1: 'field1Value',
          field2: [
            {
              level3array: {
                field3: 'field3Value',
              }
            },
          ],
          level2: {
            field4: 'field4Value'
          }
        },
        field5: [
          { field6: 'field6value' }
        ],
        value1: 'value'
      };
      // clone input object and set fields expected to be masked manually afterwards
      // length os masked chars is equal to their input length
      const expected = JSON.parse(JSON.stringify(nestedAllObject));
      expected.level1 = '*'.repeat(nestedAllObject.level1.toString().length);
      expected.field5 = '*'.repeat(nestedAllObject.field5.toString().length);

      expect(maskData.maskJSONFields(nestedAllObject, maskAllFieldsOptions)).to.deep.equal(expected);
    });
  });


  describe('Mask with custom options (char, maxMaskedCharactersStr)', function() {

    const maskOptions = {
      maskWith: 'x',
      maxMaskedCharactersStr: 4,
      fields: [ 'field1' ]
    };

    let testData = [
      {
        title: 'test default string',
        input: { field1: 'testuser@dummy.org' },
        output: { field1: 'xxxx' }
      },
      {
        title: 'test short string',
        input: { field1: 't' },
        output: { field1: 'x' }
      },
      {
        title: 'test string same length as maxMaskedCharactersStr',
        input: { field1: 't'.repeat(maskOptions.maxMaskedCharactersStr) },
        output: { field1: 'x'.repeat(maskOptions.maxMaskedCharactersStr) }
      },
      {
        title: 'test non-existant field pattern',
        input: { abc: 'test string' },
        output: { abc: 'test string' }
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`default mask - ${title}`, function() {
        const masked = maskData.maskJSONFields(input, maskOptions);
        expect(masked).to.deep.equal(output, 'masked output does not match expected value');
      });
    })

    it('custom mask - negative max chars digits', function() {
      const negativeStartOptions = {
        maskWith: '*',
        maxMaskedCharactersStr: -1,  // uses full string length then without max length
        fields: [ 'field1' ]
      };
      const input = { field1: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor ' +
          'invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo ' +
          'dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. ' +
          'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore ' +
          'et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ' +
          'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit ' +
          'amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam ' +
          'erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, ' +
          'no sea takimata sanctus est Lorem ipsum dolor sit amet.   \n' +
          '\n' +
          'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore ' +
          'eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum ' +
          'zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,' };
      const output = { field1: '*'.repeat(input.field1.length) };
      const masked = maskData.maskJSONFields(input, negativeStartOptions);
      expect(masked).to.deep.equal(output, 'masked output does not match expected value');
    });
  });


  describe('Mask with special inputs - input will generate same output', function() {

    const maskOptions = {
      maskWith: "x",
      fields: [ 'field1' ]
    };

    // first set with input generating an masked output
    let testData = [
      {
        title: 'test with string length zero',
        input: '',
        output: ''
      },
      {
        title: 'test with string input',
        input: 'test hello',
        output: 'test hello'
      },
      {
        title: 'test with number',
        input: -1,
        output: -1
      },
      {
        title: 'test input null',
        input: null,
        output: null
      },
      {
        title: 'test input array',
        input: [
          'string 1',
          'string 2'
        ],
        output: [
          'string 1',
          'string 2'
        ]
      }
    ]

    testData.forEach(({title, input, output}) => {
      it(`special input - ${title}`, function() {
        const masked = maskData.maskJSONFields(input, maskOptions);
        expect(masked).to.deep.equal(output, 'masked output does not match expected value');
      });
    });
  });
});
