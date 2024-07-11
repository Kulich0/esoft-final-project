import AbonementModel from '../models/abonementModel';

class AbonementService {
    constructor(private abonementModel: typeof AbonementModel) {}

    async getAllAbonements(offset: number, limit: number) {
        return this.abonementModel.getAll(offset, limit);
    }
}

export default AbonementService;
