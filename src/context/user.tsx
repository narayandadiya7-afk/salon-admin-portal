import React, { useEffect, useState } from "react";
import { TContext, TMenuItem, TPrivilege, TUser } from "../types/config";
// import { eResultCode } from "../utils/enum";
// import ApiUtils from "../utils/api";
// import AuthUtil from "../utils/auth";
// import { AppContext } from "./app";
// import { ApiGetUserInfo, GetMenuHierarchyList } from "../utils/api.constant";
import Utils from "../utils";
// import useFetch from "../hooks/useFetch";

type TProps = {
  children: React.ReactNode;
};

// type TState = {
//   value: {
//     onUpdate: () => void;
//     isUserLogged: boolean;

//   };
// };

const UserContext = React.createContext<{
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
}>({});

export default function UserProvider(props: TProps) {
  // const { post } = useFetch();

  // Function to update the user context state
  const onUpdate = (detail: TContext = {}) => {
    setState((prevState: TContext) => ({
      ...prevState,
      ...detail,
      isUserLogged: !Utils.isNullOrUndefined(prevState.user?.id),
    }));
  };
  // const defLanguageUniqueId = typeof localStorage !== 'undefined' ? localStorage.getItem('rcml-lang') : null;
  useEffect(() => {
    init();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const user: TUser = await initializeUser();
  //     onUpdate({
  //       user: user,
  //     });
  //   };

  //   fetchData(); // Call the async function
  // }, [onUpdate]);

  const [state, setState] = useState<TContext>({
    onUpdate: onUpdate,
    isUserLogged: false,
  });

  // Initialization function called on component mount
  async function init() {
    // TEMPROARY PREVENTED *************
    // if (AuthUtil.isTokenExist()) {
    // TEMPROARY PREVENTED *************
    // const user: TUser = await initializeUser();
    const user: TUser = {
      id: 3,
      displayName: "WEBANIX",
      userName: "WEBANIX",
      emailId: "admin@webanix.com",
      mobileNo: "9879879870",
      privileges: [
        {
          id: 16,
          name: "View Dashboard",
          groupId: 1,
          menuId: 0,
          privilegeUniqueId: "VIEWDASHBOARD",
          menuUniqueId: "DASHBOARD_1",
        },
        {
          id: 47,
          name: "Delete Process",
          groupId: 1,
          menuId: 6,
          privilegeUniqueId: "DELETEPROCESS",
          menuUniqueId: "PROCESS_6",
        },
        {
          id: 46,
          name: "Edit Process",
          groupId: 1,
          menuId: 6,
          privilegeUniqueId: "EDITPROCESS",
          menuUniqueId: "PROCESS_6",
        },
        {
          id: 45,
          name: "Add Process",
          groupId: 1,
          menuId: 6,
          privilegeUniqueId: "ADDPROCESS",
          menuUniqueId: "PROCESS_6",
        },
        {
          id: 53,
          name: "Delete Audit Template",
          groupId: 1,
          menuId: 3,
          privilegeUniqueId: "DELETEAUDITTEMPLATE",
          menuUniqueId: "AUDITTEMPLATE_3",
        },
        {
          id: 51,
          name: "Add Audit Template",
          groupId: 1,
          menuId: 3,
          privilegeUniqueId: "ADDAUDITTEMPLATE",
          menuUniqueId: "AUDITTEMPLATE_3",
        },
        {
          id: 52,
          name: "Edit Audit Template",
          groupId: 1,
          menuId: 3,
          privilegeUniqueId: "EDITAUDITTEMPLATE",
          menuUniqueId: "AUDITTEMPLATE_3",
        },
        {
          id: 177,
          name: "Add Config Group",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "ADDCONFIGGROUP",
          menuUniqueId: "CONFIGGROUP_20",
        },
        {
          id: 179,
          name: "Delete Config Group",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "DELETECONFIGGROUP",
          menuUniqueId: "CONFIGGROUP_20",
        },
        {
          id: 178,
          name: "Edit Config Group",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "EDITCONFIGGROUP",
          menuUniqueId: "CONFIGGROUP_20",
        },
        {
          id: 152,
          name: "Add Config Param",
          groupId: 1,
          menuId: 19,
          privilegeUniqueId: "ADDCONFIGPARAM",
          menuUniqueId: "CONFIGPARAM_19",
        },
        {
          id: 151,
          name: "Edit Config Param",
          groupId: 1,
          menuId: 19,
          privilegeUniqueId: "EDITCONFIGPARAM",
          menuUniqueId: "CONFIGPARAM_19",
        },
        {
          id: 37,
          name: "Edit SBU",
          groupId: 1,
          menuId: 12,
          privilegeUniqueId: "EDITSBU",
          menuUniqueId: "SBU_12",
        },
        {
          id: 36,
          name: "Add SBU",
          groupId: 1,
          menuId: 12,
          privilegeUniqueId: "ADDSBU",
          menuUniqueId: "SBU_12",
        },
        {
          id: 38,
          name: "Delete SBU",
          groupId: 1,
          menuId: 12,
          privilegeUniqueId: "DELETESBU",
          menuUniqueId: "SBU_12",
        },
        {
          id: 41,
          name: "Delete Country",
          groupId: 1,
          menuId: 17,
          privilegeUniqueId: "DELETECOUNTRY",
          menuUniqueId: "COUNTRY_17",
        },
        {
          id: 40,
          name: "Edit Country",
          groupId: 1,
          menuId: 17,
          privilegeUniqueId: "EDITCOUNTRY",
          menuUniqueId: "COUNTRY_17",
        },
        {
          id: 139,
          name: "View Country",
          groupId: 1,
          menuId: 11,
          privilegeUniqueId: "VIEWCOUNTRY",
          menuUniqueId: "COUNTRY_11",
        },
        {
          id: 39,
          name: "Add Country",
          groupId: 1,
          menuId: 17,
          privilegeUniqueId: "ADDCOUNTRY",
          menuUniqueId: "COUNTRY_17",
        },
        {
          id: 17,
          name: "View Auditor",
          groupId: 1,
          menuId: 18,
          privilegeUniqueId: "VIEWAUDITOR",
          menuUniqueId: "AUDITOR_18",
        },
        {
          id: 18,
          name: "Add Auditor",
          groupId: 1,
          menuId: 18,
          privilegeUniqueId: "ADDAUDITOR",
          menuUniqueId: "AUDITOR_18",
        },
        {
          id: 19,
          name: "Edit Auditor",
          groupId: 1,
          menuId: 18,
          privilegeUniqueId: "EDITAUDITOR",
          menuUniqueId: "AUDITOR_18",
        },
        {
          id: 20,
          name: "Delete Auditor",
          groupId: 1,
          menuId: 18,
          privilegeUniqueId: "DELETEAUDITOR",
          menuUniqueId: "AUDITOR_18",
        },
        {
          id: 156,
          name: "Delete Supervisor",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "DELETESUPERVISOR",
          menuUniqueId: "SUPERVISOR_20",
        },
        {
          id: 153,
          name: "View Supervisor",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "VIEWSUPERVISOR",
          menuUniqueId: "SUPERVISOR_20",
        },
        {
          id: 154,
          name: "Add Supervisor",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "ADDSUPERVISOR",
          menuUniqueId: "SUPERVISOR_20",
        },
        {
          id: 155,
          name: "Edit Supervisor",
          groupId: 1,
          menuId: 20,
          privilegeUniqueId: "EDITSUPERVISOR",
          menuUniqueId: "SUPERVISOR_20",
        },
        {
          id: 49,
          name: "Edit Role",
          groupId: 1,
          menuId: 10,
          privilegeUniqueId: "EDITROLE",
          menuUniqueId: "ROLEMANAGEMENT_10",
        },
        {
          id: 48,
          name: "Add Role",
          groupId: 1,
          menuId: 10,
          privilegeUniqueId: "ADDROLE",
          menuUniqueId: "ROLEMANAGEMENT_10",
        },
        {
          id: 50,
          name: "Delete Role",
          groupId: 1,
          menuId: 10,
          privilegeUniqueId: "DELETEROLE",
          menuUniqueId: "ROLEMANAGEMENT_10",
        },
        {
          id: 35,
          name: "Delete Customers",
          groupId: 1,
          menuId: 17,
          privilegeUniqueId: "DELETECUSTOMERS",
          menuUniqueId: "CUSTOMERS_17",
        },
        {
          id: 33,
          name: "Add Customers",
          groupId: 1,
          menuId: 17,
          privilegeUniqueId: "ADDCUSTOMERS",
          menuUniqueId: "CUSTOMERS_17",
        },
        {
          id: 34,
          name: "Edit Customers",
          groupId: 1,
          menuId: 17,
          privilegeUniqueId: "EDITCUSTOMERS",
          menuUniqueId: "CUSTOMERS_17",
        },
        {
          id: 31,
          name: "Edit Plant",
          groupId: 1,
          menuId: 16,
          privilegeUniqueId: "EDITPLANT",
          menuUniqueId: "PLANT_16",
        },
        {
          id: 30,
          name: "Add Plant",
          groupId: 1,
          menuId: 16,
          privilegeUniqueId: "ADDPLANT",
          menuUniqueId: "PLANT_16",
        },
        {
          id: 32,
          name: "Delete Plant",
          groupId: 1,
          menuId: 16,
          privilegeUniqueId: "DELETEPLANT",
          menuUniqueId: "PLANT_16",
        },
        {
          id: 25,
          name: "Edit Lines",
          groupId: 1,
          menuId: 14,
          privilegeUniqueId: "EDITLINES",
          menuUniqueId: "LINES_14",
        },
        {
          id: 26,
          name: "Delete Lines",
          groupId: 1,
          menuId: 14,
          privilegeUniqueId: "DELETELINES",
          menuUniqueId: "LINES_14",
        },
        {
          id: 24,
          name: "Add Lines",
          groupId: 1,
          menuId: 14,
          privilegeUniqueId: "ADDLINES",
          menuUniqueId: "LINES_14",
        },
        {
          id: 29,
          name: "Delete Audit",
          groupId: 1,
          menuId: 15,
          privilegeUniqueId: "DELETEAUDITS",
          menuUniqueId: "AUDITS_15",
        },
        {
          id: 28,
          name: "Edit Audit",
          groupId: 1,
          menuId: 15,
          privilegeUniqueId: "EDITAUDITS",
          menuUniqueId: "AUDITS_15",
        },
        {
          id: 180,
          name: "Submit audit report",
          groupId: 1,
          menuId: 15,
          privilegeUniqueId: "SUBMIT",
          menuUniqueId: "AUDITS_15",
        },
        {
          id: 181,
          name: "Edit audit report",
          groupId: 1,
          menuId: 15,
          privilegeUniqueId: "EDIT",
          menuUniqueId: "AUDITS_15",
        },
        {
          id: 182,
          name: "Review audit report",
          groupId: 1,
          menuId: 15,
          privilegeUniqueId: "REVIEW",
          menuUniqueId: "AUDITS_15",
        },
        {
          id: 183,
          name: "Approve audit report",
          groupId: 1,
          menuId: 15,
          privilegeUniqueId: "APPROVE",
          menuUniqueId: "AUDITS_15",
        },
      ],
      roles: [
        {
          id: 1,
          name: "Super Admin",
          roleUniqueId: "SUPERADMIN",
        },
      ],
      isTempPassword: false,
      uniqueUserTypeId: "PRESSUREBAR",
      defLanguageUniqueId: "en",
    };
    const menuHierarchy = [
      {
        id: 1,
        name: "Dashboard",
        dispName: "Dashboard",
        parentId: 0,
        parentUniqueId: "0",
        entityUrl: "/admin/dashboard",
        menuIcon: "",
        isActive: 0,
        enableForOthers: 0,
        iconName: "home",
        displayOrder: 1,
        privileges: [
          {
            id: 16,
            name: "View Dashboard",
            groupId: 1,
            menuId: 0,
            privilegeUniqueId: "VIEWDASHBOARD",
            menuUniqueId: "DASHBOARD_1",
          },
        ],
        menuUniqueId: "DASHBOARD_1",
        orgId: 0,
        requestDateTime: "0001-01-01T00:00:00",
        requestSource: 0,
        isDeleted: 0,
      },
      {
        id: 2,
        name: "Configuration",
        dispName: "Configuration",
        parentId: 0,
        parentUniqueId: "0",
        entityUrl: "/",
        menuIcon: "",
        isActive: 0,
        children: [
          {
            id: 59,
            name: "Config Group",
            dispName: "Config Group",
            parentId: 0,
            parentUniqueId: "CONFIGURATION_2",
            entityUrl: "/admin/config-group",
            isActive: 0,
            enableForOthers: 0,
            iconName: "object-group",
            displayOrder: 3,
            privileges: [
              {
                id: 178,
                name: "Edit Config Group",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "EDITCONFIGGROUP",
                menuUniqueId: "CONFIGGROUP_20",
              },
              {
                id: 177,
                name: "Add Config Group",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "ADDCONFIGGROUP",
                menuUniqueId: "CONFIGGROUP_20",
              },
              {
                id: 179,
                name: "Delete Config Group",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "DELETECONFIGGROUP",
                menuUniqueId: "CONFIGGROUP_20",
              },
            ],
            menuUniqueId: "CONFIGGROUP_20",
            orgId: 0,
            requestDateTime: "0001-01-01T00:00:00",
            requestSource: 0,
            isDeleted: 0,
          },
          {
            id: 55,
            name: "Config Param",
            dispName: "Config Param",
            parentId: 0,
            parentUniqueId: "CONFIGURATION_2",
            entityUrl: "/admin/config-param",
            isActive: 0,
            enableForOthers: 0,
            iconName: "list-alt",
            displayOrder: 4,
            privileges: [
              {
                id: 152,
                name: "Add Config Param",
                groupId: 1,
                menuId: 19,
                privilegeUniqueId: "ADDCONFIGPARAM",
                menuUniqueId: "CONFIGPARAM_19",
              },
              {
                id: 151,
                name: "Edit Config Param",
                groupId: 1,
                menuId: 19,
                privilegeUniqueId: "EDITCONFIGPARAM",
                menuUniqueId: "CONFIGPARAM_19",
              },
            ],
            menuUniqueId: "CONFIGPARAM_19",
            orgId: 0,
            requestDateTime: "0001-01-01T00:00:00",
            requestSource: 0,
            isDeleted: 0,
          },
        ],
        enableForOthers: 0,
        iconName: "cog",
        displayOrder: 2,
        privileges: [],
        menuUniqueId: "CONFIGURATION_2",
        orgId: 0,
        requestDateTime: "0001-01-01T00:00:00",
        requestSource: 0,
        isDeleted: 0,
      },
      {
        id: 8,
        name: "IT Operations",
        dispName: "IT Operations",
        parentId: 0,
        parentUniqueId: "0",
        entityUrl: "/",
        menuIcon: "",
        isActive: 0,
        children: [
          {
            id: 11,
            name: "Users",
            dispName: "Users",
            parentId: 0,
            parentUniqueId: "SYSTEMADMINISTRATION_8",
            entityUrl: "/admin/users",
            menuIcon: "",
            isActive: 0,
            privileges: [
              {
                id: 156,
                name: "Delete Supervisor",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "DELETESUPERVISOR",
                menuUniqueId: "SUPERVISOR_20",
              },
              {
                id: 153,
                name: "View Supervisor",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "VIEWSUPERVISOR",
                menuUniqueId: "SUPERVISOR_20",
              },
              {
                id: 154,
                name: "Add Supervisor",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "ADDSUPERVISOR",
                menuUniqueId: "SUPERVISOR_20",
              },
              {
                id: 155,
                name: "Edit Supervisor",
                groupId: 1,
                menuId: 20,
                privilegeUniqueId: "EDITSUPERVISOR",
                menuUniqueId: "SUPERVISOR_20",
              },
            ],
            enableForOthers: 0,
            iconName: "user-group",
            displayOrder: 3,
            menuUniqueId: "USERS_9",
            orgId: 0,
            requestDateTime: "0001-01-01T00:00:00",
            requestSource: 0,
            isDeleted: 0,
          },
          {
            id: 13,
            name: "Role Management",
            dispName: "Role Management",
            parentId: 0,
            parentUniqueId: "SYSTEMADMINISTRATION_8",
            entityUrl: "/admin/roles",
            menuIcon: "",
            isActive: 0,
            enableForOthers: 0,
            iconName: "user-secret",
            displayOrder: 4,
            privileges: [
              {
                id: 49,
                name: "Edit Role",
                groupId: 1,
                menuId: 10,
                privilegeUniqueId: "EDITROLE",
                menuUniqueId: "ROLEMANAGEMENT_10",
              },
              {
                id: 48,
                name: "Add Role",
                groupId: 1,
                menuId: 10,
                privilegeUniqueId: "ADDROLE",
                menuUniqueId: "ROLEMANAGEMENT_10",
              },
              {
                id: 50,
                name: "Delete Role",
                groupId: 1,
                menuId: 10,
                privilegeUniqueId: "DELETEROLE",
                menuUniqueId: "ROLEMANAGEMENT_10",
              },
            ],
            menuUniqueId: "ROLEMANAGEMENT_10",
            orgId: 0,
            requestDateTime: "0001-01-01T00:00:00",
            requestSource: 0,
            isDeleted: 0,
          },
        ],
        enableForOthers: 0,
        iconName: "user-tie",
        displayOrder: 3,
        privileges: [],
        menuUniqueId: "SYSTEMADMINISTRATION_8",
        orgId: 0,
        requestDateTime: "0001-01-01T00:00:00",
        requestSource: 0,
        isDeleted: 0,
      },
    ];
    // TEMPROARY PREVENTED *************
    // const menuHierarchy: any = await getMenuHierarchyList(user); // Fetch menu data
    onUpdate({
      user: user,
      menuHierarchy: menuHierarchy as TMenuItem[],
    });
    // }
  }

  // Function to fetch user information from the server
  // const initializeUser = async () => {
  //   try {
  //     const requestPayload = {
  //       data: {},
  //     };
  //     const response = await post("ApiGetUserInfo", requestPayload);
  //     const { data, dataResponse } = response;
  //     const { returnCode, description } = dataResponse;
  //     if (returnCode === eResultCode.SUCCESS) {
  //       const value = data[0];
  //       return value;
  //     } else {
  //       console.error(`Error while initializing user: ${description}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Function to fetch menu hierarchy list from the server
  // const getMenuHierarchyList = async (user: TUser) => {
  //   try {
  //     const requestPayload = {
  //       data: {
  //         renderMenuRoleWise: true,
  //       },
  //     };
  //     const response = await post("GetMenuHierarchyList", requestPayload);
  //     const { data, dataResponse } = response;
  //     const { returnCode, description } = dataResponse;
  //     if (returnCode === eResultCode.SUCCESS) {
  //       // console.log("data", data)
  //       return data;
  //     } else {
  //       console.error(`Error while fetching menu hierarchy: ${description}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Render the UserContext.Provider with the context value and children
  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
}

// Export the UserContext and UserProvider for use in other components
export { UserContext, UserProvider };
