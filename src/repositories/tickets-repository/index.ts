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
async function getTicketByEnrollmentId(enrollment: Enrollment) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId: enrollment.id
        },
        select: {
            id: true,
            status: true,
            ticketTypeId: true,
            enrollmentId: true,
            TicketType: true,
            createdAt: true,
            updatedAt: true
        }
    })

}



async function getTicketId(ticketId: number) {
    
    return prisma.ticket.findFirst({
        where: {
            id: ticketId
        }
    })
}

async function getTicketTypeById(ticketId: number) {
    return prisma.ticketType.findFirst({
        where: {
            id:ticketId
        }
    })
}

async function payTicket(id: number) {
    
    
    return prisma.ticket.update({
        where: {
            id
        },
        data: {
            status: "PAID"
        }
    })
}


const ticketsRepository = {
    getAllTicketTypes,
    createUserTicket,
    getTicketByEnrollmentId,
    getTicketId,
    getTicketTypeById,
    payTicket
    
}

export default ticketsRepository