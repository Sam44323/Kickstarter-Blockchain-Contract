import React, { FormEvent, useState } from "react";
import { Button, Form, Container, Input } from "semantic-ui-react";
import factory from "../../ethereum/Factory";
import web3 from "../../ethereum/web3";

const NewCampaign: React.FC = () => {
  const [price, setPrice] = useState<string>("");

  const createNewCampaign = async (e: FormEvent) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts()[0]; // getting the accounts
    await factory.methods.createCampaign().send({
      from: accounts[0],
    });
  };

  return (
    <Container fluid={true}>
      <h3>Create a new campaign</h3>
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label="wei"
            size="big"
            placeholder="0"
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
