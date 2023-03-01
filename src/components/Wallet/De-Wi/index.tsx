import { AccountData } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Deposit, Withdraw } from "../Transaction";

interface AppFunctionProps {
    signingClient: SigningStargateClient | null,
    account: AccountData | null,
    setNodeBalance: (setBalance: React.Dispatch<React.SetStateAction<number>>) => Promise<void>,
    setBalance: React.Dispatch<React.SetStateAction<number>>
}
export function De_WI({ signingClient, account, setNodeBalance, setBalance }: AppFunctionProps) {
    return (
        <div>
            <Deposit signingClient={signingClient} account={account} setNodeBalance={setNodeBalance} setBalance={setBalance} />
            <Withdraw account={account} setNodeBalance={setNodeBalance} setBalance={setBalance} />
        </div>
    );
}