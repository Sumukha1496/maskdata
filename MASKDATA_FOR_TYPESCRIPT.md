## Mask data for Typescript
The type definitions are bundled with the package. So, no need to install additional dependency. The type definitions are present here: https://github.com/Sumukha1496/maskdata/blob/master/index.d.ts 

Only difference in using this package is with the import statements. 

### Example: Mask password functionality

```javascript
import { maskPassword, PasswordMaskOptions } from 'maskdata';

const password: string = 'myPassword123';
const options: PasswordMaskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 10,
  unmaskedStartCharacters: 2,
  unmaskedEndCharacters: 2
};

const maskedPassword = maskPassword(password, options);
```
<br/>

## Available mask configs/option
### 1. PasswordMaskOptions
Usage: [Password Masking](./README.md#mask-password)
```javascript
{
    maskWith?: string;
    maxMaskedCharacters?: number;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
}
```

### 2. CardMaskOptions
Usage: [Card masking](./README.md#mask-card-number)
```javascript
{
    maskWith?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
}
```

### 3. EmailMask2Options
Usage: [Email masking](./README.md#mask-email-id)
```javascript
{
    maskWith?: string;
    unmaskedStartCharactersBeforeAt?: number;
    unmaskedEndCharactersAfterAt?: number;
    maskAtTheRate?: boolean;
}
```

### 4. PhoneMaskOptions
Usage: [Phone Number Masking](./README.md#mask-phone-number)
```javascript
{
    maskWith?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
}
```
### 5. StringMaskOptions
Usage: [String masking](./README.md#mask-the-characters-or-words-in-the-string)
```javascript
{
    maskWith?: string;
    maskOnlyFirstOccurance?: boolean;
    values?: string[];
    maskAll?: boolean;
    maskSpace?: boolean;
}
```

### 6. UuidMaskOptions
Usage: [UUID Masking](./README.md#mask-uuid)
```javascript
{
    maskWith?: string;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
} 
```

### 7. StringMaskV2Options
Usage: [Generic String Masking](./README.md#generic-string-masking)
```javascript
{
    maskWith?: string;
    maxMaskedCharacters?: number;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
} 
```

### 8. JsonMask2Configs
Usage: [JSON fields masking](./README.md#mask-json)
```typescript
interface GenericStringMaskOptions {
    config?: StringMaskV2Options;
    fields: string[];
}

{
    cardMaskOptions?: CardMaskOptions;
    cardFields?: string[];
    emailMaskOptions?: EmailMask2Options;
    emailFields?: string[];
    passwordMaskOptions?: PasswordMaskOptions;
    passwordFields?: string[];
    phoneMaskOptions?: PhoneMaskOptions;
    phoneFields?: string[];
    stringMaskOptions?: StringMaskOptions;
    stringFields?: string[];
    uuidMaskOptions?: UuidMaskOptions;
    uuidFields?: string[];
    jwtMaskOptions?: JwtMaskOptions;
    jwtFields?: string[];
    genericStrings?: GenericStringMaskOptions[]
}
```
### 9. Mask JWT
Usage: [JWT masking](./README.md#mask-jwt-token)
```javascript
{
    maskWith?: string;
    maxMaskedCharacters?: number;
    maskDot?: boolean;
    maskHeader?: boolean;
    maskPayload?: boolean;
    maskSignature?: boolean;
  }
```
<br/>

## Available imports
```javascript
import { maskPassword, PasswordMaskOptions, maskJSON2, JsonMask2Configs, maskPhone, PhoneMaskOptions, maskEmail2, EmailMask2Options, maskCard, CardMaskOptions, maskString, StringMaskOptions, maskUuid, UuidMaskOptions, maskJwt, JwtMaskOptions, maskStringV2, GenericStringMaskOptions, StringMaskV2Options, getInnerProperty, replaceValue } from 'maskdata';
```
