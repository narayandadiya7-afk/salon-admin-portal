/**
 * Constant.ts
 * This component is used as a common file where we can declare some common constants.
 * These constants can be accessed and utilized throughout the entire project.
 */

import { TFilterModel } from "../types/config";

// Application Constants
export const APP_NAME = "Webanix Scaffolding";
export const __prod__ = import.meta.env.NODE_ENV === "production";
export const EMPTY_CHILDREN = "Please provide component to display";
export const LOGO_URL = "/assets/images/wnix-logo.png";
export const APP_ICON = "/assets/images/wnix-mnml-logo.png";
export const LOGO_URL_2x = "/assets/images/logo@2x.png";
export const HEADER_HEIGHT = 90;
export const DEFAULT_LANG = "en";

// Screen Breakpoints
export const SCREEN_BREAKPOINT = {
  mobile: 0,
  tablet: 768,
  computer: 1024,
};

// File Formats
export const FormatType = {
  JPEG: "image/jpeg",
  BMP: "image/bmp",
  PNG: "image/png",
  GIF: "image/gif",
  PDF: "application/pdf",
  JSON: "application/json",
  MSWORD: "application/msword",
  EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

// Date Formats and Time
export const dateFormat = "dd-MMM-yyyy hh:mm:ss a";
export const dateOnlyFormat = "dd-MMM-yyyy";

// Other Constants
export const debounceTime = 1000;
export const RESPONSE_STATUS = {
  SUCCESS: "R_SUCCESS",
  NO_DATA_FOUND: "R_NO_DATA_FOUND",
};

// Theme Variables and Class Names
export const DEFAULT_THEME_VARIABLES = [
  "primaryColor",
  "secondaryColor",
  "plateteFirstColor",
  "plateteSecondColor",
  "plateteThirdColor",
  "plateteFourthColor",
];
export const PLATETE_CLASS_NAMES = [
  "ax-bg-platete-first",
  "ax-bg-platete-second",
  "ax-bg-platete-third",
  "ax-bg-platete-fourth",
];

// Image Preloading
export const PreloadImagesPath = [];

// Confirmation Messages
export const REMOVE_MESSAGE = "Are you sure to remove?";

// Keys to Restrict in Numeric Input
export const NumberRestrictKeys = ["e", "E", "+", "-", "."];

// default filter params
export const defaultFilterParams: TFilterModel = {
  pageSize: 10,
  currentPage: 1,
  filterRowsCount: 0,
  totalRows: 0,
  searchText: "",
  orderType: "",
  orderBy: "",
  fromDate: null,
  toDate: null,
};
