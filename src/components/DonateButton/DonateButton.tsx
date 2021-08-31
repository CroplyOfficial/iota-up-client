import { v4 as uuidv4 } from "uuid";

interface IProps {
  recipientName: string;
  wallet: string;
  text: string;
  children?: React.ReactNode;
}

const DonateButton = (props: IProps) => {
  const { recipientName, wallet, text, children } = props;
  const identifier: string = uuidv4();

  return (
    <div
      onClick={(e: any) => {
        // @ts-ignore
        const iotaButton: any = document
          .getElementById(identifier)
          .shadowRoot.querySelector("ibtn-button-donation")
          .shadowRoot.querySelector("button");
        iotaButton.click();
      }}
    >
      {children}

      <div style={{ display: "none" }}>
        {/* @ts-ignore */}
        <iota-button
          id={identifier}
          address={wallet}
          currency="EUR"
          merchant={recipientName}
          label={text}
          type="donation"
        >
          {/* @ts-ignore */}
        </iota-button>
      </div>
    </div>
  );
};

export { DonateButton };
