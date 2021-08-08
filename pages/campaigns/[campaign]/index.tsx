import React from "react";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";

const Campaign: React.FC = () => {
  const { query } = useRouter();
  return (
    <Container>
      <h1>{query.campaign}</h1>
    </Container>
  );
};

export default Campaign;
