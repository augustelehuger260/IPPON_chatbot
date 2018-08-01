export interface IInsurancePlan {
    id?: number;
    name?: string;
    price?: number;
    tripCancellation?: number;
    emergencyTransportation?: number;
    bagageLost?: number;
    conciergeService?: boolean;
}

export class InsurancePlan implements IInsurancePlan {
    constructor(
        public id?: number,
        public name?: string,
        public price?: number,
        public tripCancellation?: number,
        public emergencyTransportation?: number,
        public bagageLost?: number,
        public conciergeService?: boolean
    ) {
        this.conciergeService = false;
    }
}
