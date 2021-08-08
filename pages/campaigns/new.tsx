import React, { FormEvent, useState } from "react";
import { Button, Form, Container, Input } from "semantic-ui-react";

const NewCampaign: React.FC = () => {
  const [price, setPrice] = useState<string>("");

  const createNewCampaign = (e: FormEvent) => {
    e.preventDefault();
    if (price.length === 0) {
      alert("set a value!");
      return;
    }
    alert("Submitted!");
    setPrice("");
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
