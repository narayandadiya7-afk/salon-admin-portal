/**
 * Validation
 */

import Utils from ".";

/**
 * validation
 */
export class Validation {
  static isExisty = (value: any) => value !== null && value !== undefined;
  static isEmpty = (value: any) => {
    if (Validation.isExisty(value)) {
      if (value.constructor.name === "Array") {
        return value.length === 0;
      } else if (value.constructor.name === "String") {
        return value.trim() === "";
      }
      return false;
    }
    return true;
  };
  static getDecimalCount = (value: any) =>
    (value.toString().split(".")[1] || "").length;
  static matchRegexp = (value: any, regexp: any) => {
    return regexp.test(value);
  };
  static isDuplicate = (value: any, listValue: any) =>
    value &&
    listValue &&
    listValue.filter((v: any) => {
      if (v && value && v === value) return true;
      // check for duplicates of objects
      return false;
    }).lenght > 0;
  static IsMandatory = (value: any) => !Validation.isEmpty(value);
  static IsMandatoryWholeNumber = (value: any) =>
    !Validation.isEmpty(value) && value > 0;
  static MinLength = (value: any, minLength: number) =>
    Validation.isEmpty(value) || value.toString().length >= minLength;
  static MaxLength = (value: any, maxLength: number) =>
    Validation.isEmpty(value) || value.toString().length <= maxLength;
  static MinLengthArray = (value: any, minLength: number) =>
    Validation.isEmpty(value) || value.length >= minLength;

  static CheckLengthArray = (value: any, minLength: number) => {
    if (value.length >= minLength) {
      return false;
    } else {
      return true;
    }
  };
  static MaxLengthArray = (value: any, maxLength: number) =>
    Validation.isEmpty(value) || value.length <= maxLength;
  static MinValue = (value: any, minValue: number) =>
    Validation.isEmpty(value) ||
    (Validation.matchRegexp(value, Regex.DECIMAL) &&
      Utils.getFloatValue(value) >= Utils.getFloatValue(minValue));
  static MaxValue = (value: any, maxValue: number) =>
    Validation.isEmpty(value) ||
    (Validation.matchRegexp(value, Regex.DECIMAL) &&
      Utils.getFloatValue(value) <= Utils.getFloatValue(maxValue));
  static Alphanumeric = (value: any) =>
    Validation.isEmpty(value) ||
    Validation.matchRegexp(value, Regex.ALPHANUMERIC);
  static Alphabet = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.ALPHABHET);
  static Numeric = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.NUMERIC);
  static Decimal = (value: any, count: number) =>
    Validation.isEmpty(value) ||
    (Validation.matchRegexp(value, Regex.DECIMAL) &&
      Validation.getDecimalCount(value) <= count);
  static Email = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.EMAIL);
  static Pan = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.PAN);
  static Pincode = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.PINCODE);
  static Landline = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.LANDLINE);
  static MobileNo = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.MOBILENO);
  static GSTIN = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.GSTIN);
  static OTP = (value: any) =>
    Validation.isEmpty(value) || Validation.matchRegexp(value, Regex.OTP);
}

const Regex = {
  ALPHANUMERIC: /^[a-zA-Z0-9()_\-/,.& /+]*$/,
  ALPHABHET: /^[a-zA-Z-,. ]*$/,
  NUMERIC: /^[-+]?[0-9]+$/,
  DECIMAL: /^[-+]?\d+(\.\d+)?$/,
  PINCODE: /^\d{6}$/,
  LANDLINE: /^[-+]?[0-9]+$/,
  MOBILENO: /^[6789]\d{9}$/,
  PAN: /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/,
  GSTIN:
    /^([0-9]{1}[1-9]{1}|[1-2]{1}[0-9]{1}|[3]{1}[0-7]{1})([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/,
  TIN: /^(?:\d{3}-\d{2}-\d{4})$/,
  EMAIL: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
  YEAR: /^(18[0-9]\d|19[0-9]\d|20[0-9]\d|2099)$/,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  OTP: /^([0-9]){6}$/,
};

const Validation_Messages: any = {
  Required: "This field is required",
  Email_Min: "Email must be at least 6 characters",
  Email_valid: "Enter valid email",
  Password_Min: "Password must be at least 8 characters",
  Password_Max: "Password should not exceed 20 characters.",
  Password_Matches:
    "At least one uppercase, lowercase, number, & special char(@$!%*?&).",
  Mobile_Number_Min: "Mobile number should be of 10 digit",
  Mobile_Number_Matches: "Enter a valid mobile number",
  Confirm_Password_Matches: "Passwords must match",
  Otp_min: "Required six digit",
  Otp_matches: "Enter only numbers",
  STRINGTRIM: "Should start with characters",
  PINCODE: "Enter valid pincode",
};

const INPUT_LENGTH = {
  PASSWORD_LENGTH: 20,
  EMAIL_LENGTH: 40,
  BASIC_LENGTH: 30,
  DISPLAY_LENGTH: 15,
  ADDRESS_LENGTH: 500,
  PINCODE_LENGTH: 10,
  MOBILE_LENGTH: 10,
  OTP_LENGTH: 6,
  NAME_LENGTH: 30,
};

export { Regex, Validation_Messages, INPUT_LENGTH };
