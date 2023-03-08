import { Address, Cell, Contract, ContractProvider, Sender, TupleReader } from 'ton';

export default class BasicContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    async sendDeploy(contract: ContractProvider, sender: Sender) {
        let args: any = {
            value: '0.01', // send how much value
            body: new Cell(),
        };

        await contract.internal(sender, args);
    }

    async get(contract: ContractProvider, methodId: string, args?: any[]): Promise<TupleReader> {
        if (!args) args = [];

        const result = await contract.get(methodId, args);
        return result.stack;
    }
}
