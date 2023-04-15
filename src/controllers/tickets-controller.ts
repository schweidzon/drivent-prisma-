import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { TicketType } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllTicketTypes(req: Request, res: Response) {
    try {
        const tickets: TicketType[] = await ticketsService.getAllTicketTypes()
        return res.status(httpStatus.OK).send(tickets)
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }

}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId

    try {
       
        const ticket = await ticketsService.getUserTicket(userId)
        return res.send(ticket)
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }

}

export async function createUserTicket(req: AuthenticatedRequest, res: Response) {

    const ticketTypeId = req.body.ticketTypeId as number

    try {
     
        const createdTicket = await ticketsService.createUserTicket( ticketTypeId, req.userId)

        return res.status(201).send(createdTicket)


    } catch (error) {
      
        if(error.name === 'RequestError') {
            return res.status(400).send(error)
        }
        if(error.name === 'NotFoundError') {
            return res.sendStatus(404)
        }
        return res.status(httpStatus.CONFLICT).send(error);
    }

}