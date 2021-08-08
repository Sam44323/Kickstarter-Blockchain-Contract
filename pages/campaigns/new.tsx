import React from "react";
import { Button, Form, Container } from "semantic-ui-react";

const NewCampaign: React.FC = () => {
  return (
    <Container fluid={true}>
      <h3>Create a new campaign</h3>
      <Form>
        <Form.Field>
          <label>Minimum Contribution (wei)</label>
          <input
            type="text"
            placeholder="0"
            style={{
              width: "40%",
            }}
          />
        </Form.Field>
        <Button type="submit" secondary icon="add" content="Create" />
      </Form>
    </Container>
  );
};

export default NewCampaign;
