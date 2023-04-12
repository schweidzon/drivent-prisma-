import { Router } from 'express'
import { getAllTickets } from '@/controllers'
import { authenticateToken } from '@/middlewares'

const ticketRoutes = Router()

ticketRoutes.get("/types", authenticateToken, getAllTickets)

export { ticketRoutes }