## Mask JWT Token
This function returns the masked JWT tokens. A JWT token consists of 3 parts separated by 2 dots. i.e, `{header}.{payload}.{signature}`. Based on the usecase, we will have to mask/keep a part/s of jwt token. With maskdata you can mask JWT tokens with all possible combinations. 
If the input is null, undefined, non-string, string with length < 5, doesn't contain 2 dots(invalid JWT format), the function will return the input as it is without masking.

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: '*',

  // Max masked characters in the output(EXCLUDING the unmasked characters). Default value is 512
  maxMaskedCharacters: 512,

  // Config to mask OR keep the dots(.). Default value is true, i.e, mask dots
  maskDot: true,

  // Config to mask OR keep the first part of the JWT. i.e, the header part. Default value is true, i.e, mask the header part
  maskHeader: true,

  // Config to mask OR keep the second part of the JWT. i.e, the payload part. Default value is true, i.e, mask the payload part
  maskPayload: true,

  // Config to mask OR keep the third part of the JWT. i.e, the signature part. Default value is true, i.e, mask the signature part
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
*********************************************************************************************************

```

#### Example: Mask only the signature part

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 512,
  maskDot: false,
  maskHeader: false,
  maskPayload: false,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.*******************************************

```

#### Example: Mask header and the signature part

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 512,
  maskDot: false,
  maskHeader: true,
  maskPayload: false,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
************************************.eyJpYXQiOjE1MTYyMzkwMjJ9.*******************************************

```

#### Example: Mask all parts except dots and limit the max masked characters in the output to lower value, say 16

```javascript

const MaskData = require('./maskdata');

const jwtMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 16,
  maskDot: false,
  maskHeader: true,
  maskPayload: true,
  maskSignature: true
};

const jwt =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTYyMzkwMjJ9.tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ';

/** In this example,
 * Header = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 * Payload = eyJpYXQiOjE1MTYyMzkwMjJ9
 * Signature = tbDepxpstvGdW8TC3G8zg4B6rUYAOvfzdceoH48wgRQ
 */ 
const maskedJwt = MaskData.maskJwt(jwt, jwtMaskOptions);

// Output:
******.*****.*****

```
