import { Router } from 'express'
import { getAllTicketTypes, getUserTicket, createUserTicket } from '@/controllers'
import { authenticateToken } from '@/middlewares'

const ticketRoutes = Router()

ticketRoutes.get("/types", authenticateToken, getAllTicketTypes)
ticketRoutes.post("/", authenticateToken,  createUserTicket)
ticketRoutes.get("/", authenticateToken, getUserTicket )

export { ticketRoutes }