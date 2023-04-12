import { PrismaPromise, TicketType } from "@prisma/client"
import { prisma } from '@/config';


export async function getAllTickets(){

    return prisma.ticketType.findMany()
}

const ticketsRepository = {
    getAllTickets
}

export default ticketsRepository