import React, { useState } from "react";
import { Button, Form, Container, Input } from "semantic-ui-react";

const NewCampaign: React.FC = () => {
  const [price, setPrice] = useState<string>("");

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
        <Button type="submit" secondary icon="add" content="Create" />
      </Form>
    </Container>
  );
};

export default NewCampaign;
