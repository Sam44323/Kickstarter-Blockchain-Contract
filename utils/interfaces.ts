export interface NewRequestInput {
  value: any;
  changeHandler: (e: any) => void;
  label: string;
  placeholder: string;
}

export interface RequestForm {
  description: string;
  amount: string;
  recipient: string;
}
