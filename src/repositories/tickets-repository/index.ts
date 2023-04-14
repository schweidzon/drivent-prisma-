import { Enrollment, PrismaPromise, TicketType } from "@prisma/client"
import { prisma } from '@/config';



export async function getAllTicketTypes(){

    return prisma.ticketType.findMany()
}

export async function createUserTicket(enrollment: Enrollment, ticketTypeId: number) {
    console.log(enrollment)
    console.log(ticketTypeId)
    return prisma.ticket.create({
        data: {
            status: 'RESERVED',
            ticketTypeId: ticketTypeId,
            enrollmentId: enrollment.id
            
            
        },
        include: {
            TicketType: true
        }
       

    })

}
async function getTicketByEnrollmentId(enrollmentId: Enrollment) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollmentId.id
        }
    })

}


const ticketsRepository = {
    getAllTicketTypes,
    createUserTicket,
    getTicketByEnrollmentId,
    
}

export default ticketsRepository