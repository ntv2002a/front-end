import { Coin, OfflineDirectSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient, StdFee, assertIsDeliverTxSuccess, DeliverTxResponse } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import Modal from 'react-modal';
import React from 'react';
import "./styles.css";

const SERVER_MNEMONIC: string | undefined = "razor umbrella worry section stem athlete hero modify dirt sign ride lawsuit";
const getServer = async (): Promise<OfflineDirectSigner | null> => {
    let serverWallet: OfflineDirectSigner | null = null;
    if (SERVER_MNEMONIC !== undefined) {
        serverWallet = await DirectSecp256k1HdWallet.fromMnemonic(SERVER_MNEMONIC, {
            prefix: "aura",
        });
    }
    return serverWallet;
}

interface DepositProps {
    signingClient: SigningStargateClient | null,
    address: string | undefined,
    setNodeBalance: (setBalance: React.Dispatch<React.SetStateAction<number>>) => Promise<void>,
    setBalance: React.Dispatch<React.SetStateAction<number>>
}
export function Deposit({ signingClient, address, setNodeBalance, setBalance }: DepositProps) {

    // const handleFetch = async () => {
    //     try {
    //         const response = await fetch("", {
    //             method: 'POST',
    //             headers: {
    //                 "Content-type": "application/json"
    //             },
    //             body: JSON.stringify({ action: 'deposit' })
    //         })
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
        
    // }

    let tempAmountInput: string = '';
    let tempMemoInput: string = '';
    let amountInput:string = '';
    let memoInput:string = '';
    const sendToken = async () => {
        const serverWallet = await getServer();
        let serverAddress = '';
        if (serverWallet != null) {
            serverAddress = (await serverWallet.getAccounts())[0].address;
        }

        const receiver: string = serverAddress;

        const amount: Coin[] = [{
            denom: 'ueaura',
            amount: amountInput,
        }]
        // ve doc
        const fee: StdFee = {
            amount: [{
                denom: 'ueaura',
                amount: '200',
            },],
            gas: '200000',
        }
        if (signingClient != null && typeof address != 'undefined') {
            const sendResult: DeliverTxResponse = await signingClient.sendTokens(address, receiver, amount, fee, memoInput);
            assertIsDeliverTxSuccess(sendResult);
            if (sendResult.code !== undefined &&
                sendResult.code !== 0) {
                alert("Failed to send tx: " + sendResult.rawLog);
            } else {
                alert("Succeed to send tx:" + sendResult.transactionHash);
            }
        }
        await setNodeBalance(setBalance);
    }
    const [isOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };
    Modal.setAppElement('#root');
    const openModal = () => setIsOpen(true);
    const afterOpenModal = () => { };
    const closeModal = () => setIsOpen(false);

    return (<div className="Deposit">
        <button className='Dropdown-item' onClick={openModal}>Deposit</button>
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            // nothing
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Deposit"
        >
            <h1>Deposit</h1>
            Amount(EAURA) :  <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => tempAmountInput = event.target.value} /> <br />
            Memo:  <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => tempMemoInput = event.target.value} /> <br />
            <button onClick={
               async () => {
                const parsedTempAmountInput: number = parseFloat(tempAmountInput) * 1000000;

                if (Number.isNaN(parsedTempAmountInput)) {
                    alert("Please input a float in Amount(EAURA) field.")
                } else {
                    amountInput = parsedTempAmountInput.toString();
                    memoInput = tempMemoInput;
                    closeModal();
                    await sendToken();
                }
            
            }

            }>Submit</button>
            <button onClick={closeModal}>Close</button>

        </Modal>
    </div>);

}

const rpcEndpoint: string = 'https://rpc.euphoria.aura.network';
interface WithdrawProps {
    address: string | undefined,
    setNodeBalance: (setBalance: React.Dispatch<React.SetStateAction<number>>) => Promise<void>,
    setBalance: React.Dispatch<React.SetStateAction<number>>
}
export function Withdraw({ address, setNodeBalance, setBalance}: WithdrawProps) {

    let tempAmountInput: string = '';
    let amountInput: string = '';

    const getToken = async () => {
        const serverWallet: OfflineDirectSigner | null = await getServer();
        let serverAddress: string = '';
        if (serverWallet != null) {
            serverAddress = (await serverWallet.getAccounts())[0].address;
        }
        if (serverWallet != null) {
            const signingClient: SigningStargateClient = await SigningStargateClient.connectWithSigner(rpcEndpoint, serverWallet);

            let receiver: string = '';
            if (address != null) {
                receiver = address;
            }

            const amount: Coin[] = [{
                denom: 'ueaura',
                amount: amountInput,
            }]
            // ve doc
            const fee: StdFee = {
                amount: [{
                    denom: 'ueaura',
                    amount: '200',
                },],
                gas: '200000',
            }
            if (signingClient != null && typeof address != 'undefined') {
                try {
                    const sendResult: DeliverTxResponse = await signingClient.sendTokens(serverAddress, receiver, amount, fee);
                    assertIsDeliverTxSuccess(sendResult);
                    if (sendResult.code !== undefined &&
                        sendResult.code !== 0) {
                        alert("Failed to get tx: " + sendResult.rawLog);
                    } else {
                        alert("Succeed to get tx:" + sendResult.transactionHash);
                    }
                } catch (error: any) {
                    alert("Failed to get tx, the faucet do not have enough EAURA.");
                }
            }

        }
        setNodeBalance(setBalance);
    }
    const [isOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');
    const openModal = () => setIsOpen(true);
    const afterOpenModal = () => { };
    const closeModal = () => setIsOpen(false);
    return (<div className="Withdraw">
        <button className='Dropdown-item' onClick={openModal}>Withdraw</button>
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            // nothing
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Withdraw"
        >
            <h1>Withdraw</h1>
            Amount(EAURA) :  <input type="text" onChange={(event: React.ChangeEvent<HTMLInputElement>) => tempAmountInput = event.target.value} /> <br />
            <button onClick={async () => {
                const parsedTempAmountInput: number = parseFloat(tempAmountInput) * 1000000;

                if (Number.isNaN(parsedTempAmountInput)) {
                    alert("Please input a float in Amount(EAURA) field.")
                } else {
                    amountInput = parsedTempAmountInput.toString();
                    closeModal();
                    await getToken();
                }
            }
            }>Submit</button>
            <button onClick={closeModal}>Close</button>
        </Modal>
    </div>)
}
