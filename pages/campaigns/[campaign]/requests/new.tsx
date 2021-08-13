import React, { FormEvent } from "react";
import {
  Button,
  Container,
  Form,
  Input,
  Loader,
  Message,
} from "semantic-ui-react";
import { NewRequestInput, RequestForm } from "../../../../utils/interfaces";
import CampaignCreator from "../../../../ethereum/Campaign";
import { useRouter } from "next/router";
import web3 from "../../../../ethereum/web3";

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

const NewRequest: React.FC<{ methods: any }> = ({ methods }) => {
  const [requestForm, setRequestForm] = React.useState<RequestForm>({
    amount: "",
    description: "",
    recipient: "",
  });
  const [campaign, setCampaign] = React.useState<any>();
  const [error, setError] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { query, push } = useRouter();

  React.useEffect(() => {
    const getContract = async () => {
      const campaignData = await CampaignCreator(query.campaign);
      setCampaign(campaignData);
    };
    getContract();
  }, []);

  const valueChanger = (value: string, name: string) => {
    setRequestForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const disappearingError = () => {
    setTimeout(() => {
      setError(false);
    }, 7500);
  };

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { description, amount, recipient } = requestForm;
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(amount, "ether"),
          recipient
        )
        .send({
          from: accounts[0],
        });
      push("/");
    } catch (error) {
      setError(true);
      setLoading(false);
      disappearingError();
    }
  };
  return (
    <>
      {loading && <Loader active size="big" content="Processing" />}
      <Container>
        {error && (
          <Message
            negative
            header="Transaction Failed!"
            list={[
              "Either you sent value less than the minimum contribution",
              "Sent some wrong value",
              "Rejected the transaction for proceeding!",
            ]}
          />
        )}
        <h1>Create a New Request</h1>
        <Form onSubmit={(e) => formSubmitHandler(e)}>
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
            placeholder="1"
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
    </>
  );
};

export default NewRequest;
