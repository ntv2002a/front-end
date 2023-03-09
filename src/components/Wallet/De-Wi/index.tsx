import { AccountData } from "@cosmjs/proto-signing";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Deposit, Withdraw } from "../Transaction";

interface AppFunctionProps {
    signingClient: SigningStargateClient | null,
    address: string | undefined,
    setNodeBalance: (setBalance: React.Dispatch<React.SetStateAction<number>>) => Promise<void>,
    setBalance: React.Dispatch<React.SetStateAction<number>>
}
export function De_WI({ signingClient, address, setNodeBalance, setBalance }: AppFunctionProps) {
    return (
        <div>
            <Deposit signingClient={signingClient} address={address} setNodeBalance={setNodeBalance} setBalance={setBalance} />
            <Withdraw address={address} setNodeBalance={setNodeBalance} setBalance={setBalance} />
        </div>
    );
}