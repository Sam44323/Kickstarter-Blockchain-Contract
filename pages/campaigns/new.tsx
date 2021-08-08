import React, { FormEvent, useState } from "react";
import {
  Button,
  Form,
  Container,
  Input,
  Message,
  Loader,
} from "semantic-ui-react";
import factory from "../../ethereum/Factory";
import web3 from "../../ethereum/web3";
import Router from "next/router";

const NewCampaign: React.FC = () => {
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const disappearingError = () => {
    setTimeout(() => {
      setError(false);
    }, 7500);
  };

  const createNewCampaign = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts(); // getting the accounts
      await factory.methods.createCampaign(price).send({
        from: accounts[0],
      });
      Router.push("/");
    } catch (err) {
      setLoading(false);
      setError(true);
      disappearingError();
    }
  };

  return (
    <Container fluid={true}>
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
      {loading && <Loader active size="big" content="Processing" />}
      <h3>Create a new campaign</h3>
      <Form onSubmit={createNewCampaign}>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            size="big"
            placeholder="Enter amount!"
            labelPosition="right"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </Form.Field>
        <Button type="submit" secondary icon="add" content="Create" />
      </Form>
    </Container>
  );
};

export default NewCampaign;
