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
console.log(maskedPassword);
```
<br/>

## Available mask configs/option
### 1. PasswordMaskOptions
Used in [Password Masking](#mask-password)
```javascript
{
    maskWith?: string;
    maxMaskedCharacters?: number;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
}
```

### 2. CardMaskOptions
Used in [Card masking](./README.md#mask-card-number)
```javascript
{
    maskWith?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
}
```

### 3. EmailMask2Options
Used in [Email masking](./README.md#mask-email-id)
```javascript
{
    maskWith?: string;
    unmaskedStartCharactersBeforeAt?: number;
    unmaskedEndCharactersAfterAt?: number;
    maskAtTheRate?: boolean;
}
```

### 4. PhoneMaskOptions
Used in [Phone Number Masking](#mask-phone-number)
```javascript
{
    maskWith?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
}
```
### 5. StringMaskOptions
Used in [String masking](./README.md#mask-the-characters-or-words-in-the-string)
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
Used in [UUID Masking](#mask-uuid)
```javascript
{
    maskWith?: string;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
} 
```

### 7. JsonMask2Configs
Used in [JSON fields masking](#mask-json)
```javascript
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
}
```

<br/>

## Available functions to import along with their configs
```javascript
import { maskPassword, PasswordMaskOptions, maskJSON2, JsonMask2Configs, maskPhone, PhoneMaskOptions, maskEmail2, EmailMask2Options, maskCard, CardMaskOptions, maskString, StringMaskOptions, maskUuid, UuidMaskOptions, getInnerProperty, replaceValue } from 'maskdata';
```
