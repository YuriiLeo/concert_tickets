import { TicketService } from "services/ticket.service";
import { Ticket } from "entities";

export class TicketController {
  ticketService: TicketService;

  constructor(ticketService: TicketService) {
    this.ticketService = ticketService;
  }

  getTicketByEventId({
    eventId,
  }: {
    eventId: string;
  }): Promise<Ticket[]> {
    return this.ticketService.getTickets(eventId);
  }
}
