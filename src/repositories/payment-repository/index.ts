import { prisma } from '@/config';
import { PaymentInput } from '@/protocols';
import { Payment } from '@prisma/client';

async function payTicket(payment: PaymentInput) {
    return prisma.payment.create({
        data:payment 
    })
}

const paymentRepository = {
    payTicket
}

export default paymentRepository