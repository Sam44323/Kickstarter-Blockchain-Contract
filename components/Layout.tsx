import React from "react";
import Header from "./Header";
import { Container } from "semantic-ui-react";

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
