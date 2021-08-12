import React, { FormEvent } from "react";
import { Button, Container, Form, Input } from "semantic-ui-react";
import { NewRequestInput, RequestForm } from "../../../../utils/interfaces";

const FormInputContainer: React.FC<NewRequestInput> = (props) => {
  return (
    <>
      <h3>{props.label}</h3>
      <Form.Input>
        <Input
          size="big"
          placeholder={props.placeholder}
          onChange={(e) => props.changeHandler(e.target.value, props.propName)}
          value={props.value}
        />
      </Form.Input>
    </>
  );
};

const NewRequest: React.FC = () => {
  const [requestForm, setRequestForm] = React.useState<RequestForm>({
    amount: "",
    description: "",
    recipient: "",
  });

  const valueChanger = (value: string, name: string) => {
    setRequestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log(requestForm);
    setRequestForm({
      amount: "",
      description: "",
      recipient: "",
    });
  };

  return (
    <Container>
      <h1>Create a New Request</h1>
      <Form onSubmit={formSubmitHandler}>
        <FormInputContainer
          label="Description"
          changeHandler={valueChanger}
          placeholder="Buy some batteries"
          value={requestForm.description}
          propName="description"
        />
        <FormInputContainer
          label="Amount in ether"
          changeHandler={valueChanger}
          placeholder="100"
          value={requestForm.amount}
          propName="amount"
        />
        <FormInputContainer
          label="Recipient"
          changeHandler={valueChanger}
          placeholder="0x465858"
          value={requestForm.recipient}
          propName="recipient"
        />
        <Button type="submit" primary icon="add" content="Create" />
      </Form>
    </Container>
  );
};

export default NewRequest;
