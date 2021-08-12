import React from "react";
import { useRouter } from "next/router";
import { Container, Button } from "semantic-ui-react";

const Request: React.FC = () => {
  const { query } = useRouter();
  return (
    <Container>
      <h3>Requests</h3>
      <Button primary content="Add Requests" />
    </Container>
  );
};

export default Request;
