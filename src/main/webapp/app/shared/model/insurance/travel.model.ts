import { Moment } from 'moment';

export interface ITravel {
    id?: number;
    countryArrival?: string;
    departureDate?: Moment;
    returnDate?: Moment;
    travelerAge?: number;
    stateDeparture?: string;
    insuranceId?: number;
}

export class Travel implements ITravel {
    constructor(
        public id?: number,
        public countryArrival?: string,
        public departureDate?: Moment,
        public returnDate?: Moment,
        public travelerAge?: number,
        public stateDeparture?: string,
        public insuranceId?: number
    ) {}
}
