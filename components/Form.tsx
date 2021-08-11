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
        <label>Contribute to this campaign!</label>
        <Input
          label="ether"
          size="big"
          placeholder="Enter amount!"
          labelPosition="right"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </Form.Field>
      <Button type="Contribute" primary content="Create" />
    </Form>
  );
};

export default FormComp;
