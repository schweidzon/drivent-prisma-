import { AuthenticatedRequest } from "@/middlewares";
import { PaymentInfo } from "@/protocols";
import paymentService from "@/services/payment-service";
import ticketsService from "@/services/tickets-service";
import { Payment } from "@prisma/client";
import { NextFunction, Response } from "express";
import { ApplicationError } from '@/protocols';


export async function payTicket(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const userId = req.userId
    const paymentInfo = req.body as PaymentInfo
    
    try {
        const payment = await paymentService.payTicket(userId, paymentInfo)
        
        
        return res.send(payment)
    } catch (error ) {
        const err = error as ApplicationError
        console.log(err)
      
        if(err.name === 'NotFoundError') {
            return res.status(404).send(err)
        } 
        if(err.name === 'UnauthorizedError') {
            return res.send(401).send(err)
        }
    }
    
}

