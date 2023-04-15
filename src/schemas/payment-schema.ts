import { PaymentInfo } from '@/protocols';
import Joi from 'joi';


export const paymentSchema = Joi.object<PaymentInfo>({
    ticketId: Joi.number().required(),
    cardData: {
        issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string().required(),
        cvv: Joi.number().required()
    }
});
