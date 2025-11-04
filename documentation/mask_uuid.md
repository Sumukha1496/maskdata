## Mask UUID
This will mask the alphanumeric characters in a UUID.<br/>This will not mask the hyphen present in the UUID. Masking is done, only when the input is a valid UUID with only a-f, A-F, and 0-9 and has 36 characters (32 alphanumerics + 4 hyphens, and should work with the <b>regex:</b> 
> /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/g;). 

If the input is not a valid UUID, it will return the input itself without masking.
```javascript
const MaskData = require('./maskdata');

const maskUuidOptions = {
  // Character to mask the data. The default value is '*'
  maskWith: "*",

  // Should be a positive Integer <= 32
  // If the starting 'n' alphanumeric characters need to be visible/unmasked
  // Default value is 0
  unmaskedStartCharacters: 0, 
  
  //Should be a positive Integer <= 32
  //If the ending 'n' alphanumeric characters need to be visible/unmasked
  // Default value is 0 
  unmaskedEndCharacters: 0
};

const uuidInput = "123e4567-e89b-12d3-a456-426614174000";

const uuidAfterMasking = MaskData.maskUuid(uuidInput, maskUuidOptions);

// Output: ********-****-****-****-************

```
