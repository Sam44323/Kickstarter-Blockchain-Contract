import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Container, Button, Table } from "semantic-ui-react";
import CampaignGenerator from "../../../../ethereum/Campaign";
import { CustomRowInter } from "../../../../utils/interfaces";

const RowCellContent: React.FC<CustomRowInter> = ({
  id,
  approvalCount,
  complete,
  description,
  recipient,
  value,
}) => {
  const { Row, HeaderCell } = Table;
  return (
    <Row>
      <HeaderCell>{id}</HeaderCell>
      <HeaderCell>{description}</HeaderCell>
      <HeaderCell>{value}</HeaderCell>
      <HeaderCell>{recipient}</HeaderCell>
      <HeaderCell>{approvalCount}</HeaderCell>
      <HeaderCell>{complete ? "Yes" : "No"}</HeaderCell>
      <HeaderCell>Final</HeaderCell>
    </Row>
  );
};

const Request: React.FC<{ data: any }> = ({ data }) => {
  const { query, push } = useRouter();
  const { Row, Header, HeaderCell, Body } = Table;
  data = JSON.parse(data);
  return (
    <Container>
      <h3>Requests</h3>
      <Button
        primary
        content="Add Requests"
        onClick={() =>
          push(
            `/campaigns/${query.address}/requests/new?address=${query.address}`
          )
        }
      />
      <Table celled textAlign="center">
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {data.map((item, index) => (
            <RowCellContent {...item} key={index} />
          ))}
        </Body>
      </Table>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campaign = await CampaignGenerator(context.query.campaign);
  const requestCount = await campaign.methods.getRequestCount().call();
  const requests = await Promise.all(
    Array(requestCount).map((item, index) =>
      campaign.methods.requests(index).call()
    )
  );
  return {
    props: {
      data: JSON.stringify(requests),
    },
  };
};

export default Request;
