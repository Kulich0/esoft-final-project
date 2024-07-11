import UserAbonementModel from '../models/userAbonModel';

class UserAbonementService {
    constructor(private userAbonementModel: typeof UserAbonementModel) {}

    async createUserAbonement(abonsData: any) {
        return this.userAbonementModel.create(abonsData);
    }
    
    async getUserAbonementsById(userId: number) {
        return this.userAbonementModel.getById(userId);
    }
}

export default UserAbonementService;
