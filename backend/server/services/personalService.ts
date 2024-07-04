import bcrypt from 'bcrypt';
import PersonalModel from '../models/personalModel';
import RolesModel from '../models/rolesModel';
import TokenPersonalService from '../services/tokenPersonalService';
import PersonalDto from '../userdto/persdto';
import { JwtPayload } from 'jsonwebtoken'; 
require('dotenv').config();

interface CustomJwtPayload extends JwtPayload {
    personalId: number;
}
interface PersonalData {
    persname: string;
    email: string;
    password: string;
    role_id: number
}

class PersonalService {
    constructor(private personalModel: typeof PersonalModel, 
        private rolesModel: typeof RolesModel) {}

    async PersonalRegistration(personalData: { persname: string; email: string; password: string }) {
        const candidate = await this.personalModel.findByEmail(personalData.email);

        if (candidate) {
            throw new Error(`Работник с такой почтой ${personalData.email} уже существует`);
        }

        const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
        const hashPassword = await bcrypt.hash(personalData.password, saltRounds);
        
        const newPersonalData = {
            persname: personalData.persname,
            email: personalData.email,
            password: hashPassword,
            role_id: Number(process.env.DEFAULT_ROLE_ID)
        };
        await this.personalModel.create(newPersonalData);
        
        const pers = await this.personalModel.findByEmail(personalData.email);
        const role = await this.rolesModel.findById(pers.roleId);

        if (!pers) {
            throw new Error('Ошибка при создании работника');
        }

        const personal_tokens = TokenPersonalService.generateTokens({ 
            personalId: pers.id, 
            persname: pers.persname,
            role: role.name
            });
        await TokenPersonalService.saveToken(pers.id, personal_tokens.refreshToken);

        return {
            ...personal_tokens,
            pers: new PersonalDto(pers)
        };
    }

    async createRole(personalData: PersonalData) {
        const candidate = await this.personalModel.findByEmail(personalData.email);

        if (candidate) {
            throw new Error(`Работник с такой почтой ${personalData.email} уже существует`,);
        } else {
            const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
            const hashPassword = await bcrypt.hash(personalData.password, saltRounds);
            
            const newPersonalData = {
                persname: personalData.persname,
                email: personalData.email,
                password: hashPassword,
                roleId: personalData.role_id ? personalData.role_id : Number(process.env.DEFAULT_ROLE_ID),
            };

            this.personalModel.createRole(newPersonalData);
        }
    }


    async PersonalLogin(personalData: { email: string; password: string }) {
        const pers = await this.personalModel.findByEmail(personalData.email);

        if (pers && await bcrypt.compare(personalData.password, pers.password)) {
            const personal_tokens = TokenPersonalService.generateTokens({ personalId: pers.id });
            await TokenPersonalService.saveToken(pers.id, personal_tokens.refreshToken);

            return {
                ...personal_tokens,
                pers: new PersonalDto(pers)
            };
        } else {
            throw new Error('Неверный пароль или email');
        }
    }

    async PersonalLogout(refreshToken: string) {
        return TokenPersonalService.removeToken(refreshToken);
    }

    async getAllPersonal(offset: number, limit: number) {
        return this.personalModel.getAll(offset, limit);
    }

    async getPersonalById(personalId: number) {
        return this.personalModel.getById(personalId);
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new Error('Refresh token отсутствует');
        }

        const personalData = TokenPersonalService.validateRefreshToken(refreshToken) as CustomJwtPayload || null ;

        if (!personalData) {
            throw new Error('Невалидный refresh token');
        }

        const tokenDbPers = await TokenPersonalService.findToken(personalData.personalId);

        if (!tokenDbPers) {
            throw new Error('Refresh token не найден в базе данных');
        }

        const pers = await this.personalModel.getById(personalData.personalId);
        if (!pers) {
            throw new Error('Работник не найден');
        }

        const personal_tokens = TokenPersonalService.generateTokens({ personalId: pers.id });
        await TokenPersonalService.saveToken(pers.id, personal_tokens.refreshToken);

        return {
            ...personal_tokens,
            pers: new PersonalDto(pers)
        };
    }

    async updatePersonal(id: number, personalData: { persname?: string; email?: string; password?: string }) {
        let hashPassword = '';
        if (personalData.password) {
            hashPassword = await bcrypt.hash(personalData.password, Number(process.env.BCRYPT_SALT_ROUNDS));
        }

        const newPersonalData = {
            ...(personalData.persname && { name: personalData.persname }),
            ...(personalData.email && { email: personalData.email }),
            ...(personalData.password && { password: hashPassword })
        };

        return this.personalModel.update(id, newPersonalData);
    }
}

export default PersonalService;
