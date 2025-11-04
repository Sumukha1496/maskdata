## Mask Password with the default configuration
To mask with the default options, don't pass the configurations.
```javascript
const MaskData = require('./maskdata');

  /** Default Options
    maskWith: "*"
    maxMaskedCharacters: 16,
    unmaskedStartCharacters: 0,
    fixedOutputLength: undefined,
    unmaskedEndCharacters: 0
  **/

const password = "Password1$";

const maskedPassword = MaskData.maskPassword(password)

```

#### Example: Mask password OR secretKey with some meta info at the end

```javascript
const MaskData = require('./maskdata');

const maskPasswordOptions = {
  maskWith: "X",
  maxMaskedCharacters: 20, // To limit the output String length to 20.
  unmaskedStartCharacters: 4,
  unmaskedEndCharacters: 9, // As the last 9 characters of the secret key is meta info which can be printed for debugging or other purposes
  fixedOutputLength: undefined
};

const password = "TEST:U2VjcmV0S2V5MQ==:CLIENT-A";

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);
//Output: TESTXXXXXXX:CLIENT-A

maskPasswordOptions.unmaskedStartCharacters = 0;

const maskedPassword = MaskData.maskPassword(password, maskPasswordOptions);
//Output: XXXXXXXXXXX:CLIENT-A
```

