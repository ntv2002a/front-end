import React from 'react';
import { ChainInfo, Window as KeplrWindow } from "@keplr-wallet/types";
import { AccountData, OfflineSigner } from "@cosmjs/proto-signing"
import { Account, Coin, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import {Button } from 'react-bootstrap';

declare global {
    interface Window extends KeplrWindow { }
}

const chainId: string = 'enphoria-2';
const rpcUrl: string = 'https://rpc.euphoria.aura.network';

interface WalletConnectionProps {
    setSigningClient: React.Dispatch<React.SetStateAction<any>>,
    setAccount: React.Dispatch<React.SetStateAction<any>>,
    setBalance: React.Dispatch<React.SetStateAction<number>>
}

export function WalletConnection({setSigningClient, setAccount, setBalance} : WalletConnectionProps) {
    const connectKeplr = async () => {
        const { keplr } = window;

        if (!keplr) {
            alert('Your browser has not been installed Keplr Wallet extension!');
            return;
        }
        await keplr.experimentalSuggestChain(getTestnetChainInfo());

        const offlineSigner: OfflineSigner = window.getOfflineSigner!(chainId);
        const signingClient : StargateClient = await SigningStargateClient.connectWithSigner(
            rpcUrl,
            offlineSigner
        );
        const account: AccountData = (await offlineSigner.getAccounts())[0];
        const address: string = account.address;
        
        if (address != undefined) {
            const balanceAsCoin: Coin = await signingClient.getBalance(address, 'ueaura');
            const balance : number = parseFloat(balanceAsCoin.amount) * 1/1000000;

            setSigningClient(signingClient);
            setAccount(account);
            setBalance(balance);
        };
    }
    return (
        <div>
            <Button onClick={connectKeplr} size='lg' variant="outline-light">
              Connect Waller
            </Button>
        </div>
    );    
}

export const setNodeBalance = async (setBalance : React.Dispatch<React.SetStateAction<number>>): Promise<void> => {
  const { keplr } = window
  if (!keplr) {
   return;
   }
   await keplr.experimentalSuggestChain(getTestnetChainInfo())
  const offlineSigner: OfflineSigner =
    window.getOfflineSigner!(chainId);
   const signingClient : StargateClient = await SigningStargateClient.connectWithSigner(
    rpcUrl,
    offlineSigner,
   )
   const account: AccountData = (await offlineSigner.getAccounts())[0]
   const address: string = account.address;
   if (address != undefined){
   const balanceAsCoin: Coin = await signingClient.getBalance(address, 'ueaura');
   const balance:number = parseFloat(balanceAsCoin.amount) * 1/1000000;
   setBalance(balance);

  }
}

const getTestnetChainInfo = (): ChainInfo => ({
    "chainId": "euphoria-2",
    "chainName": "Aura Euphoria Testnet",
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