import React from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Container, Button, Table, Loader, Message } from "semantic-ui-react";
import CampaignGenerator from "../../../../ethereum/Campaign";
import { CustomRowInter } from "../../../../utils/interfaces";
import web3 from "../../../../ethereum/web3";

const RowCellContent: React.FC<CustomRowInter> = ({
  id,
  approvalCount,
  approveRequest,
  description,
  recipient,
  value,
  approversCount,
}) => {
  const { Row, Cell } = Table;
  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        <Button color="green" basic onClick={() => approveRequest(+id - 1)}>
          Approve
        </Button>
      </Cell>
      <Cell>
        <Button color="teal" basic>
          Finalize
        </Button>
      </Cell>
    </Row>
  );
};

const Request: React.FC<{ data: any; approversCount: any }> = ({
  data,
  approversCount,
}) => {
  const { query, push } = useRouter();
  const [campaign, setCampaign] = React.useState<any>();
  const { Row, Header, HeaderCell, Body } = Table;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  data = JSON.parse(data);
  const disappearingError = () => {
    setTimeout(() => {
      setError(false);
    }, 7500);
  };

  const approveRequestHandler = async (reqId: number) => {
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approveRequest(reqId).send({
        from: accounts[0],
      });
      window.location.reload();
    } catch (error) {
      setLoading(false);
      setError(true);
      disappearingError();
    }
  };

  React.useEffect(() => {
    const getCampaign = async () => {
      const campaign = await CampaignGenerator(query.address);
      setCampaign(campaign);
    };
    getCampaign();
  }, []);

  return (
    <Container>
      {loading && <Loader active size="big" content="Processing" />}
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
      {error && (
        <Message
          negative
          header="Transaction Failed!"
          list={[
            "Either you sent value less than the minimum contribution",
            "Sent some wrong value",
            "Rejected the transaction for proceeding!",
          ]}
        />
      )}
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
          {data.map((item: CustomRowInter, index: any) => (
            <RowCellContent
              {...item}
              key={index}
              id={index + 1}
              approversCount={approversCount}
              approveRequest={approveRequestHandler}
            />
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
  const approversCount = await campaign.methods.approversCount().call();
  return {
    props: {
      data: JSON.stringify(requests),
      approversCount,
    },
  };
};

export default Request;
