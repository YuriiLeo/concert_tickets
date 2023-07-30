import { TicketService } from "services/ticket.service";
import { Ticket } from "entities";

export class TicketController {
  ticketService: TicketService;

  constructor(ticketService: TicketService) {
    this.ticketService = ticketService;
  }

  async getTicketByEventId(
    eventId: string,
    page: number,
    pageSize: number
  ): Promise<{
    totalTickets: number;
    tickets: Ticket[];
  }> {
    return this.ticketService.getTickets(
      eventId,
      page,
      pageSize
    );
  }
}
