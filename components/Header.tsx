import React from "react";
import { Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

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
  const { push } = useRouter();
  return (
    <Menu
      style={{
        marginTop: "10px",
      }}
    >
      <MenuItem name="crowdcoin" clickHandler={() => push("/")}>
        CrowdCoin
      </MenuItem>
      <Menu.Menu position="right">
        <MenuItem name="campaigns" clickHandler={() => null}>
          Campaigns
        </MenuItem>
        <MenuItem name="add" clickHandler={() => push("/campaigns/new")}>
          +
        </MenuItem>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
