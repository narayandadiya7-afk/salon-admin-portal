/**
 * Enum.ts
 * This component is used to define common variables that will be utilized throughout the project.
 */

// Enums for Table Type
export enum eTableType {
  ROW = 1,
  COLUMN = 2,
}

// Constants for Input Lengths
export const INPUT_LENGTH = {
  PASSWORD_LENGTH: 20,
  EMAIL_LENGTH: 40,
  BASIC_LENGTH: 30,
  DISPLAY_LENGTH: 15,
  ADDRESS_LENGTH: 80,
  PINCODE_LENGTH: 10,
};
// Enums for Result Codes
export enum eResultCode {
  SUCCESS = 0,
  DB_ERROR = 1,
  NO_DATA_FOUND = 2,
  AUTHENTICATION_FAILED = 3,
  UNAUTHORIZED = 4,
  UNKNOWN = 5,
  INVALID_LOGIN_ID = 6,
  INVALID_PASSWORD = 7,
  SERVICE_ERROR = 8,
  INVALID_REQUEST = 9,
  NOT_FOUND = 10,
  NETWORK_ERRORSERVEERROR = 11,
  CREATED = 12,
  INTERNAL_SERVEERROR = 13,
  UNUSED = 14,
  MULTIPLE_RECORDS = 15,
  BAD_REQUEST = 16,
  R_DUPLICATE = 25,
}

// Enums for Fetch Policy
export enum eFetchPolicy {
  CACHE_FIRST = "cache-first",
  NETWORK_ONLY = "network-only",
  CACHE_ONLY = "cache-only",
  NO_CACHE = "no-cache",
  STANDBY = "standby",
  CACHE_AND_NETWORK = "cache-and-network",
}
// Enums for HTTP Status Codes
export enum eHTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

// Enums for Login Modes
export enum eLoginMode {
  PASSWORD = 1,
  OTP = 2,
}
// Enums for User Types
export enum eUserTypeId {
  ADMIN = "ADMIN",
}

// Enums for File Types
export enum eFileType {
  JPEG = ".jpeg",
  PNG = ".png",
  PDF = ".pdf",
  JPG = ".jpg",
}
// Enums for Content Types
export enum eContentType {
  IMAGE = "image/jpeg",
  PDF = "application/pdf",
  OCTETSTREAM = "application/octet-stream",
}
// Enums for Privileges
export enum ePrivileges {
  ADD_PRODUCT = "ADDPRODUCT",
  ADD_ROLE = "ADDROLE",
  EDIT_ROLE = "EDITROLE",
  DELETE_ROLE = "DELETEROLE",
}

export enum eLANGUAGE {
  ENGLISH = "en",
  FRENCH = "fr",
  HINDI = "hi",
}
