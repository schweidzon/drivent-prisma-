import { getPaymentInfo, payTicket } from '@/controllers'
import { authenticateToken, validateBody } from '@/middlewares'
import { paymentSchema } from '@/schemas/payment-schema'
import { Router } from 'express'


const paymentRoutes = Router()

paymentRoutes.post("/process", validateBody(paymentSchema),  authenticateToken ,payTicket)
paymentRoutes.get("/" , authenticateToken ,getPaymentInfo)


export { paymentRoutes }