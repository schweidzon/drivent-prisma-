import { PaymentInfo } from '@/protocols';
import Joi from 'joi';


export const paymentSchema = Joi.object<PaymentInfo>({
    ticketId: Joi.number().required(),
    cardData: {
        issuer: Joi.string().required(),
        number: Joi.number().required(),
        name: Joi.string().required(),
        expirationDate: Joi.string()
            .regex(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)
            .required(),

        cvv: Joi.number().required()
    }
});
