import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretRight,
  faHome,
  faCog,
  faUserTie,
  faObjectGroup,
  faListAlt,
  faUserGroup,
  faUserSecret,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

// Helper function to extract privilegeUniqueIds from an array of privilege objects
const getPrivilegeUniqueIds = (privileges: any[]) => {
  return privileges.map((privilege) => privilege.privilegeUniqueId);
};

const PrivilegeMapper: React.FC<{
  menuHierarchy: any[];
  preSelectedPrivileges: any[]; // Now an array of objects
  onPrivilegesChange: (checkedPrivileges: any[]) => void;
}> = ({ menuHierarchy, preSelectedPrivileges, onPrivilegesChange }) => {
  // Convert preSelectedPrivileges (array of objects) to an array of privilegeUniqueIds (strings)
  const [checkedKeys, setCheckedKeys] = useState<string[]>(
    getPrivilegeUniqueIds(preSelectedPrivileges)
  );

  // Map of FontAwesome icons for dynamic rendering based on menu items
  const iconMap: { [key: string]: any } = {
    home: faHome,
    cog: faCog,
    "user-tie": faUserTie,
    "object-group": faObjectGroup,
    "list-alt": faListAlt,
    "user-group": faUserGroup,
    "user-secret": faUserSecret,
    user: faUser,
  };

  // Recursively transform the menuHierarchy into TreeNode structure
  const generateTreeNodes = (data: any[]) => {
    return data.map((menuItem) => {
      const { children = [], privileges = [] } = menuItem;
      const icon = iconMap[menuItem.iconName] || null;

      // If there are privileges, generate checkboxes for them
      const privilegeNodes = privileges.map((privilege: any) => ({
        title: <>{privilege.name}</>,
        key: privilege.privilegeUniqueId,
        isLeaf: true,
        privilege, // Add the privilege object to node for easier access
      }));

      // If the item has children, generate nested nodes
      const childNodes = generateTreeNodes(children) as any;

      return {
        title: (
          <>
            {/* {icon && <FontAwesomeIcon icon={icon} style={{ marginRight: 8 }} />} */}
            <span style={{ fontWeight: 600 }}>{menuItem.dispName}</span>
          </>
        ),
        key: menuItem.menuUniqueId,
        children: [...privilegeNodes, ...childNodes],
      };
    });
  };

  // Convert the menuHierarchy into AntD Tree nodes
  const treeData = generateTreeNodes(menuHierarchy);

  // Handle checking/unchecking of tree nodes
  const handleCheck = (checkedKeysValue: any, info: any) => {
    setCheckedKeys(checkedKeysValue);

    // Extract privileges from checked nodes
    const checkedPrivileges = info.checkedNodes
      .filter((node: any) => node.privilege) // Only include nodes with privileges
      .map((node: any) => node.privilege); // Map to privilege object

    // Send checked privileges back to the parent component
    onPrivilegesChange(checkedPrivileges);
  };

  useEffect(() => {
    // Set the initial checked keys when the component mounts
    setCheckedKeys(getPrivilegeUniqueIds(preSelectedPrivileges));
  }, [preSelectedPrivileges]);

  return (
    <div style={{ height: "65vh", overflowY: "auto" }}>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
        defaultExpandAll
        switcherIcon={({ expanded }) =>
          expanded ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <FontAwesomeIcon icon={faCaretRight} />
          )
        }
        treeData={treeData}
      />
    </div>
  );
};

export default PrivilegeMapper;
