import React from "react";
import { Menu } from "semantic-ui-react";

const MenuItem: React.FC<{ name: string; clickHandler: () => void }> = ({
  name,
  children,
  clickHandler,
}) => {
  return (
    <Menu.Item name={name} onClick={clickHandler}>
      {children}
    </Menu.Item>
  );
};

const Header: React.FC = () => {
  return (
    <Menu>
      <MenuItem name="crowdcoin" clickHandler={() => null}>
        CrowdCoin
      </MenuItem>
      <Menu.Menu position="right">
        <MenuItem name="campaigns" clickHandler={() => null}>
          Campaigns
        </MenuItem>
        <MenuItem name="add" clickHandler={() => null}>
          +
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
