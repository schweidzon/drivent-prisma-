import { notFoundError, unauthorizedError } from "@/errors"
import { PaymentInfo, PaymentInput } from "@/protocols"
import enrollmentRepository from "@/repositories/enrollment-repository"
import paymentRepository from "@/repositories/payment-repository"
import ticketsRepository from "@/repositories/tickets-repository"
import { Payment } from "@prisma/client"

async function payTicket(userId: number, paymentInfo: PaymentInfo) {

    const ticket = await ticketsRepository.getTicketId(paymentInfo.ticketId)

    if(!ticket) throw notFoundError()
   
    const checkIfTicketBelongs = await enrollmentRepository.getById(ticket.enrollmentId)

    if(userId !== checkIfTicketBelongs.userId) throw unauthorizedError()
 
    
    const ticketType = await ticketsRepository.getTicketTypeById(ticket.ticketTypeId)

    let value

    if(ticketType.name === "online") {
        value = 100
    } else {
        value = 250
        if(ticketType.includesHotel === true) {
            value+=350
        }
    }

    const cardLastDigits = (paymentInfo.cardData.number).toString()
   
    const payment : PaymentInput= {
        ticketId: ticket.id,
        value,
        cardIssuer: paymentInfo.cardData.issuer,
        cardLastDigits: cardLastDigits.slice(-4),
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    const pay = await paymentRepository.payTicket(payment)
   
    return pay
}

const paymentService= {
    payTicket
}

export default paymentService