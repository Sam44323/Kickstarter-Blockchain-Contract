import React, { FormEvent, useState } from "react";
import { Button, Form, Container, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/Factory";
import web3 from "../../ethereum/web3";

const NewCampaign: React.FC = () => {
  const [price, setPrice] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const disappearingError = () => {
    setTimeout(() => {
      setError(false);
    }, 3500);
  };

  const createNewCampaign = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const accounts = await web3.eth.getAccounts(); // getting the accounts
      await factory.methods.createCampaign(price).send({
        from: accounts[0],
      });
    } catch (err) {
      console.log(err);
      setError(true);
      disappearingError();
    }
  };

  return (
    <Container fluid={true}>
      {error && (
        <Message negative>
          <Message.Header>Transaction Failed!</Message.Header>
          <p>
            Either you sent value less than min contribution, or sent some wrong
            value!
          </p>
        </Message>
      )}
      <h3>Create a new campaign</h3>
      <Form>
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
        <Button
          type="submit"
          secondary
          icon="add"
          content="Create"
          onClick={createNewCampaign}
        />
      </Form>
    </Container>
  );
};

export default NewCampaign;
