import { ChainInfo, Key, Window as KeplrWindow } from "@keplr-wallet/types";
import { OfflineSigner } from "@cosmjs/proto-signing"
import { Coin, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { Button } from 'react-bootstrap';
import "./styles.css";

declare global {
  interface Window extends KeplrWindow { }
}

const chainId: string = 'euphoria-2';
const rpcUrl: string = 'https://rpc.euphoria.aura.network';

interface WalletConnectionProps {
  setSigningClient: React.Dispatch<React.SetStateAction<any>>,
  setBalance: React.Dispatch<React.SetStateAction<number>>,
  setUser : React.Dispatch<React.SetStateAction<Key | undefined>>
}

export function WalletConnection({ setSigningClient, setBalance, setUser }: WalletConnectionProps) {
  // setAccount
  const connectKeplr = async () => {
    const { keplr } = window

    if (!keplr) {
      alert('Keplr extension is not installed.');
      return;
    }
    await keplr.experimentalSuggestChain(getTestnetChainInfo())

    const offlineSigner: OfflineSigner = window.getOfflineSigner!(chainId);
    const signingClient: StargateClient = await SigningStargateClient.connectWithSigner(
      rpcUrl,
      offlineSigner
    )
    // const account: AccountData = (await offlineSigner.getAccounts())[0]
    const address = (await keplr.getKey(chainId)).bech32Address;
    
    

    if (address !== undefined) {
      const balanceAsCoin: Coin = await signingClient.getBalance(address, 'ueaura');
      const balance: number = parseFloat(balanceAsCoin.amount) * 1 / 1000000;

      setSigningClient(signingClient);
      setBalance(balance);
      setUser((await keplr.getKey(chainId)));
    }
  }

  return (
    <div>
      <Button className="Button-connect" onClick={connectKeplr} size='lg' variant="outline-light">
        Connect Wallet
      </Button>
    </div>
  );
}

export const setNodeBalance = async (setBalance: React.Dispatch<React.SetStateAction<number>>): Promise<void> => {
  const { keplr } = window
  if (!keplr) {
    return;
  }
  await keplr.experimentalSuggestChain(getTestnetChainInfo())
  const offlineSigner: OfflineSigner = window.getOfflineSigner!(chainId);
  const signingClient: StargateClient = await SigningStargateClient.connectWithSigner(
    rpcUrl,
    offlineSigner,
  )
  const address = (await keplr.getKey(chainId)).bech32Address;
  if (address !== undefined) {
    const balanceAsCoin: Coin = await signingClient.getBalance(address, 'ueaura');
    const balance: number = parseFloat(balanceAsCoin.amount) * 1 / 1000000;
    setBalance(balance);

  }
}

const getTestnetChainInfo = (): ChainInfo => ({
  "chainId": "euphoria-2",
  "chainName": "Aura Euphoria testnet",
  "rpc": "https://rpc.euphoria.aura.network",
  "rest": "https://lcd.euphoria.aura.network",
  "bip44": {
    "coinType": 118
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "aura",
    "bech32PrefixAccPub": "aurapub",
    "bech32PrefixValAddr": "auravaloper",
    "bech32PrefixValPub": "auravaloperpub",
    "bech32PrefixConsAddr": "auravalcons",
    "bech32PrefixConsPub": "auravalconspub"
  },
  "currencies": [
    {
      "coinDenom": "EAURA",
      "coinMinimalDenom": "ueaura",
      "coinDecimals": 6
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "EAURA",
      "coinMinimalDenom": "ueaura",
      "coinDecimals": 6,
      "gasPriceStep": {
        "low": 0.001,
        "average": 0.0025,
        "high": 0.004
      }
    }
  ],
  "stakeCurrency": {
    "coinDenom": "EAURA",
    "coinMinimalDenom": "ueaura",
    "coinDecimals": 6
  },
  "coinType": 118,
  "features": [
    "ibc-transfer"
  ],
  "walletUrlForStaking": "https://euphoria.aurascan.io/validators",
  "beta": true
});