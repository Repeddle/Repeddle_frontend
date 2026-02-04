interface PayFastOnsiteOptions {
  uuid: string;
  return_url?: string;
  cancel_url?: string;
}

interface Window {
  payfast_do_onsite_payment: (
    options: PayFastOnsiteOptions,
    callback: (result: boolean) => void,
  ) => void;
}
