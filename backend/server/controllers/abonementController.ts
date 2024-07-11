import { Request, Response, NextFunction } from 'express';
import AbonementService from "../services/abonementService";

class AbonementController {
    private abonementService: AbonementService;

    constructor(abonementService: AbonementService) {
        this.abonementService = abonementService;
    }

    async getAllAbonements(req: Request, res: Response, next: NextFunction) {
        try {
            const abonement = await this.abonementService.getAllAbonements(req.query.offset as unknown as number, req.query.limit as unknown as number);
            res.status(200).json(abonement);
        } catch (e) {
            next(e);
        }
    }
}

export default AbonementController;