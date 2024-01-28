declare module 'maskdata' {
  export interface CardMaskOptions {
    maskWith?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
  }

  export interface EmailMask2Options {
    maskWith?: string;
    unmaskedStartCharactersBeforeAt?: number;
    unmaskedEndCharactersAfterAt?: number;
    maskAtTheRate?: boolean;
  }

  export interface JsonMaskOptions {
    maskWith?: string;
    fields?: string[];
    maxMaskedCharactersStr?: number;
  }

  export interface PasswordMaskOptions {
    maskWith?: string;
    maxMaskedCharacters?: number;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
  }

  export interface StringMaskV2Options {
    maskWith?: string;
    maxMaskedCharacters?: number;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
  }

  export interface GenericStringMaskOptions {
    config?: StringMaskV2Options;
    fields: string[];
  }

  export interface PhoneMaskOptions {
    maskWith?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
  }

  export interface StringMaskOptions {
    maskWith?: string;
    maskOnlyFirstOccurance?: boolean;
    values?: string[];
    maskAll?: boolean;
    maskSpace?: boolean;
  }

  export interface UuidMaskOptions {
    maskWith?: string;
    unmaskedStartCharacters?: number;
    unmaskedEndCharacters?: number;
  }

  export interface JwtMaskOptions {
    maskWith?: string;
    maxMaskedCharacters?: number;
    maskDot?: boolean;
    maskHeader?: boolean;
    maskPayload?: boolean;
    maskSignature?: boolean;
  }

  export interface JsonMask2Configs {
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
    genericStrings?: GenericStringMaskOptions[];
  }

  export function maskPassword(password?: string, options?: PasswordMaskOptions): string;
  export function maskJSON2<T extends object>(json?: T, options?: JsonMask2Configs): T;
  export function maskPhone(phone?: string, options?: PhoneMaskOptions): string;
  export function maskEmail2(email?: string, options?: EmailMask2Options): string;
  export function maskCard(cardNumber?: string, options?: CardMaskOptions): string;
  export function maskString(str?: string, options?: StringMaskOptions): string;
  export function maskStringV2(str?: string, options?: StringMaskV2Options): string;
  export function maskUuid(uuid?: string, options?: UuidMaskOptions): string;
  export function maskJwt(jwt?: string, options?: JwtMaskOptions): string;
  export function getInnerProperty(object: object, field: string): any;
  export function replaceValue(object: object, field: string, value: any): object;
}
