import Metamask from "./WalletIcons/metamaskWallet.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";

export interface connector{
  title:string;
  icon:string;
  connectorId:string;
  priority:number;
  provider: 'metamask' | 'walletConnect'
}

export const connectors:connector[] = [
   {
     title: "Metamask",
     provider:"metamask",
     icon: Metamask,
     connectorId: "injected",
     priority: 1,
   },
   {
     title: "WalletConnect",
     provider:"walletConnect",
     icon: WalletConnect,
     connectorId: "walletconnect",
     priority: 2,
   },
];