import React from "react";
import { Container, Form, Input } from "semantic-ui-react";
import { NewRequestInput } from "../../../../utils/interfaces";

const FormInputContainer: React.FC<NewRequestInput> = (props) => {
  return (
    <>
      <h3>{props.label}</h3>
      <Form.Input>
        <Input
          size="big"
          placeholder={props.placeholder}
          onChange={props.changeHandler}
          value={props.value}
        />
      </Form.Input>
    </>
  );
};

const NewRequest: React.FC = () => {
  return (
    <Container>
      <h1>Create a New Request</h1>
      <Form>
        <FormInputContainer
          label="Description"
          changeHandler={() => null}
          placeholder="Buy some batteries"
          value=""
        />
        <FormInputContainer
          label="Amount in ether"
          changeHandler={() => null}
          placeholder="100"
          value=""
        />
        <FormInputContainer
          label="Recipient"
          changeHandler={() => null}
          placeholder="0x465858"
          value=""
        />
      </Form>
    </Container>
  );
};

export default NewRequest;
