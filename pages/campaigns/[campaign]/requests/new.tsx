import React from "react";
import { Container, Form, Input } from "semantic-ui-react";
import { NewRequestInput } from "../../../../utils/interfaces";

const FormInputContainer: React.FC<NewRequestInput> = (props) => {
  return (
    <Form.Input>
      <label>{props.label}</label>
      <Input />
    </Form.Input>
  );
};

const NewRequest: React.FC = () => {
  return (
    <Container>
      <h1>Create a New Request</h1>
      <Form>
        <Form.Input>
          <label>Description</label>
          <Input
            size="big"
            placeholder="Enter amount!"
            onChange={(e) => null}
          />
        </Form.Input>
      </Form>
    </Container>
  );
};

export default NewRequest;
