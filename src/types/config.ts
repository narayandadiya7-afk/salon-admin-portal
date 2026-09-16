// config.ts file will have all the configuration or app level types

import { IconProp } from "@fortawesome/fontawesome-svg-core";

/**
 * User Information
 */
export type TUser = {
  id?: number;
  userName?: string;
  displayName?: string;
  mobileNo?: string;
  emailId?: string;
  roleName?: string;
  roleId?: number | null;
  password?: string;
  confirmPassword?: string;
  createdOn?: string | Date;
  roles?: TRole[];
  userType?: string;
  isTempPassword?: boolean;
  uniqueUserTypeId?: string;
  defModuleUniqueId?: string;
  defLanguageUniqueId?: string;
  privileges?: Array<TPrivilege>;
};

/**
 * Preference Information
 */
export type TPrivilege = {
  id: number;
  name: string;
  groupId: number;
  menuId: number;
  privilegeUniqueId: string;
  menuUniqueId: string;
};

export type TMenuItem = {
  id: number;
  name: string;
  dispName: string;
  parentId: number;
  parentUniqueId: string;
  entityUrl: string;
  menuIcon?: string;
  isActive: number;
  enableForOthers?: number;
  iconName: IconProp;
  displayOrder: number;
  privileges: TPrivilege[];
  menuUniqueId: string;
  orgId: number;
  requestDateTime: string;
  requestSource: number;
  isDeleted: number;
  children?: TMenuItem[];
};

/**

/**
 * TSignUp Information
 */
export type TSignUp = {
  emailId: string;
  password: string;
  confirmpassword: string;
  otp: string;
  mobileNo: string;
};

/**
 * TUserForm Information
 */
export type TUserForm = {
  id?: number;
  userId?: number;
  name?: string;
  displayName?: string;
  designation?: string;
  address?: string;
  pinCode?: string;
  mobileNo?: string;
  emailId?: string;
  statusMessage?: string;
  profilePicture?: string;
  workspaceName?: string;
  workspaceDisplayName?: string;
};

/**
 * TUserForm Information
 */
export type TLoginForm = {
  emailId: string;
  password: string;
};

/**
 * TForotPassword Information
 */
export type TForotPassword = {
  emailId: string;
};

/**
 * Role Information
 */
export type TRole = {
  id: number;
  name: string;
  roleUniqueId?: string;
  description?: string;
};

/**
 * Preference Information
 */
export type TPreference = {
  id: number;
  roleid: number;
  preference: string;
  access: number;
};

/**
 * TResetpassword form fields
 * TResetpassword Props
 */
export type TResetpassword = {
  emailString: string;
  password: string;
  confirmpassword: string;
};

/**
 * Menu
 */
export type TMenu = {
  id: string | number;
  icon: string;
  iconComponent?: File;
  name: string;
  children?: Array<TMenu>;
  className?: string;
  level?: number;
  href?: string;
  preference?: string;
  open?: boolean;
};

/**
 * MenuConfig Information
 */

// type of CheckPrevilege
export type TCheckPrevilege = {
  id: number;
  menuid: number;
  privilegeId: number;
  privilegeName: string;
  roleId: number;
  privilegeUniqueId: string;
};

/**
 * Screen diemension
 */
export type TScreen = {
  width: number;
  height: number;
};

export type TConfigParam = {
  id: number;
  name: string;
  description: string;
  groupId: number | null;
  groupName: string;
  groupUniqueId: string;
  createdOn?: string | Date;
  organizationId?: 0;
  paramUniqueId: string;
};

// type of ConfigGroupListModel
export type TConfigGroup = {
  id: number;
  name: string;
  description: string;
  groupUniqueId: string;
};

// Response Model Type

export type TResponseModel = {
  filterModel?: TFilterModel;
  dataResponse: TDataResponse;
  data: unknown;
};

export type TFilterModel = {
  id?: number;
  totalRows: number;
  pageSize: number;
  currentPage: number;
  searchText: string;
  filterRowsCount: number;
  orderType: string;
  orderBy?: string;
  fromDate?: Date | string | null;
  toDate?: Date | string | null;
};

export type TDataResponse = {
  returnCode: number;
  responseDateTime: string;
  description: string;
};

export type TOptionType = {
  label: string;
  value: string | number;
};

export type TContext = {
  onUpdate?: () => void;
  userName?: string;
  email?: string;
  orgid?: string;
  isUserLogged?: boolean;
  privilegeList?: Array<TPrivilege>;
  isTempPassword?: boolean;
  defLanguageUniqueId?: string;
  user?: TUser;
  menuHierarchy?: TMenuItem[];
};
