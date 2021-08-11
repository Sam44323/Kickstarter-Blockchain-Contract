import React, { FormEvent } from "react";
import { Form, Input, Button } from "semantic-ui-react";

const FormComp: React.FC = () => {
  const [price, setPrice] = React.useState<string>("");

  const contributionHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={contributionHandler}>
      <Form.Field>
        <h1>Contribute to this campaign!</h1>
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
  );
};

export default FormComp;
