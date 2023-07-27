import axios from "axios";

import { Ticket } from "entities";
import { ExternalApiService } from "external-api/services/external-api.service";
import { Zone, Price, Seat } from "external-api/entities";

export class TicketService {
  externalApi: ExternalApiService;

  constructor(externalApi: ExternalApiService) {
    this.externalApi = externalApi;
  }

  async getTickets(eventId: string): Promise<Ticket[]> {
    try {
      const [zonesData, pricesData, seatsData] =
        await Promise.all([
          this.externalApi.getZones(eventId),
          this.externalApi.getPrices(eventId),
          this.externalApi.getSeats(eventId),
        ]);

      return this.mapDataToTickets(
        zonesData,
        pricesData,
        seatsData
      );
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw new Error(
        "An error occurred while fetching tickets"
      );
    }
  }

  private mapDataToTickets(
    zonesData: Zone[],
    pricesData: Price[],
    seatsData: Seat[]
  ): Ticket[] {
    const tickets: Ticket[] = [];

    seatsData.forEach((seat) => {
      const matchingPrice = pricesData.find(
        (price) => price.ZoneId === seat.ZoneId
      );
      if (matchingPrice) {
        const matchingZone = zonesData.find(
          (zone) => zone.Id === seat.ZoneId
        );
        if (matchingZone) {
          const ticket: Ticket = {
            section: matchingZone.Description,
            row: seat.SeatRow,
            seatNumber: seat.SeatNumber,
            price: matchingPrice.Price,
          };
          tickets.push(ticket);
        }
      }
    });

    return tickets;
  }
}
