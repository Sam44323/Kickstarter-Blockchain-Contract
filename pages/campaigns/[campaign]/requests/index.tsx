import React from "react";
import { useRouter } from "next/router";
import { Container } from "semantic-ui-react";

const Request: React.FC = () => {
  const { query } = useRouter();
  return <Container>{query.campaign}</Container>;
};

export default Request;
