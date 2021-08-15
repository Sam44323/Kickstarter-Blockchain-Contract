export interface NewRequestInput {
  value: any;
  changeHandler: (value: string, name: string) => void;
  label: string;
  placeholder: string;
  propName: string;
}

export interface RequestForm {
  description: string;
  amount: string;
  recipient: string;
}

export interface CustomRowInter {
  id: string;
  approvalCount: string;
  complete: boolean;
  description: string;
  recipient: string;
  value: string;
  approversCount: number;
}
