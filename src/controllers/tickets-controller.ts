import ticketsService from "@/services/tickets-service";
import { TicketType } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getAllTickets(req: Request, res: Response) {
    try {
        const tickets: TicketType[]= await ticketsService.getAllTickets()
        return res.status(httpStatus.OK).send(tickets)
    } catch (error) {
        return res.status(httpStatus.NOT_FOUND).send({});
    }
   
}