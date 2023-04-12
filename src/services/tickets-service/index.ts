import ticketsRepository from "@/repositories/tickets-repository"
import { exclude } from "@/utils/prisma-utils"
import { TicketType } from "@prisma/client"

async function getAllTickets() {
    const tickets: TicketType[] = await ticketsRepository.getAllTickets()
    return tickets
}



const ticketsService = {
    getAllTickets
}

export default ticketsService