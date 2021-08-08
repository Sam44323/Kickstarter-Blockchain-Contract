import React from "react";
import { Button, Form, Container, Input } from "semantic-ui-react";

const NewCampaign: React.FC = () => {
  return (
    <Container fluid={true}>
      <h3>Create a new campaign</h3>
      <Form>
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input label="wei" size="big" placeholder="0" />
        </Form.Field>
        <Button type="submit" secondary icon="add" content="Create" />
      </Form>
    </Container>
  );
};

export default NewCampaign;
