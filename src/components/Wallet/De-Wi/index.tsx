import { AccountData } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { GlobalContext } from "../../../App";
import { Deposit, Withdraw } from "../Transaction";
import { useContext } from 'react'

interface AppFunctionProps {
    signingClient: SigningStargateClient | null,
    address: string | undefined,
    setNodeBalance: (setBalance: React.Dispatch<React.SetStateAction<number>>) => Promise<void>,
    setBalance: React.Dispatch<React.SetStateAction<number>>
}
export function De_WI({ signingClient, address, setNodeBalance, setBalance }: AppFunctionProps) {
    const globalContext = useContext(GlobalContext);
    if (globalContext != null) {
        return (
            <div>
                <Deposit signingClient={globalContext.signingClient} address={globalContext.user?.bech32Address} setNodeBalance={setNodeBalance} setBalance={globalContext.setAsset} />
                <Withdraw />
            </div>
        );
    }
    else {
        return (
            <div>
                <h1>ERROR!</h1>
            </div>
        )
    }
}