import { prisma } from '@/config';
import { PaymentInput } from '@/protocols';


async function payTicket(payment: PaymentInput) {
    return prisma.payment.create({
        data: payment
    })
}

async function getPaymentInfoById(id: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId: id
        }
    })
}

const paymentRepository = {
    payTicket,
    getPaymentInfoById
}

export default paymentRepository