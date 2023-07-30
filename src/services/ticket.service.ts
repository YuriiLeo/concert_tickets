import axios from "axios";

import { Ticket } from "entities";
import { ExternalApiService } from "external-api/services/external-api.service";
import { Zone, Price, Seat } from "external-api/entities";

const CACHE_DURATION_MS = 60000;

type CachedTicketsData = {
  timestamp: number;
  totalTickets: number;
  tickets: Ticket[];
};

export class TicketService {
  externalApi: ExternalApiService;
  cachedData: {
    [key: string]: CachedTicketsData;
  } = {};

  constructor(externalApi: ExternalApiService) {
    this.externalApi = externalApi;
  }

  async getTickets(
    eventId: string,
    page: number = 1,
    pageSize: number = 50
  ): Promise<{
    totalTickets: number;
    tickets: Ticket[];
  }> {
    const cacheKey = `${eventId}_${page}_${pageSize}`;
    const cachedData = this.cachedData[cacheKey];

    if (
      cachedData &&
      Date.now() - cachedData.timestamp < CACHE_DURATION_MS
    ) {
      return {
        totalTickets: cachedData.totalTickets,
        tickets: cachedData.tickets,
      };
    }
    try {
      const [zonesData, pricesData, seatsData] =
        await Promise.all([
          this.externalApi.getZones(eventId),
          this.externalApi.getPrices(eventId),
          this.externalApi.getFilteredSeats(eventId),
        ]);

      const tickets = this.mapDataToTickets(
        zonesData,
        pricesData,
        seatsData
      );

      const totalTickets = tickets.length;

      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;

      const paginatedTickets = tickets.slice(
        startIdx,
        endIdx
      );

      this.cachedData[cacheKey] = {
        timestamp: Date.now(),
        totalTickets,
        tickets: paginatedTickets,
      };

      return {
        totalTickets,
        tickets: paginatedTickets,
      };
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
      if (seat.AllocationId === 29) {
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
      }
    });

    return tickets;
  }
}
