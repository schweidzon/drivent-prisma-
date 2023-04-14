import { conflictError, notFoundError, requestError } from "@/errors"
import ticketsRepository from "@/repositories/tickets-repository"
import { Enrollment, TicketType } from "@prisma/client"
import enrollmentsService from "../enrollments-service"

async function getAllTicketTypes() {
    const tickets: TicketType[] = await ticketsRepository.getAllTicketTypes()
    return tickets
}

async function createUserTicket(ticketTypeId: number, userId: number) {

    if(!ticketTypeId) throw requestError(400, "User must choose a ticket type")

    const enrollment = await enrollmentsService.getEnrollmentById(userId)

    if(!enrollment) throw notFoundError()
    
    const checkUserTicket = await ticketsRepository.getTicketByEnrollmentId(enrollment)
    
    if(checkUserTicket) throw conflictError("User already have a ticket")
    
    const ticket = await ticketsRepository.createUserTicket(enrollment, ticketTypeId)
    
    return ticket
}
  
async function getUserTicket(userId: number) {
    const checkEnrollment = await enrollmentsService.getEnrollmentById(userId)
    if(!checkEnrollment) throw notFoundError()
    const ticket = await ticketsRepository.getTicketByEnrollmentId(checkEnrollment)
    if(!ticket) throw notFoundError()
    return ticket
}


const ticketsService = {
    getAllTicketTypes,
    createUserTicket,
    getUserTicket
}

export default ticketsService