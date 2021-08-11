import React from "react";
import { useRouter } from "next/router";

const Request: React.FC = () => {
  const { query } = useRouter();
  return <>{query.address}</>;
};

export default Request;
