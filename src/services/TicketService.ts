import axios from "axios";
import { Ticket } from "../models/Ticket";

const BASE_URL = "https://my.laphil.com/en/rest-proxy/TXN";
export class TicketService {
  static async getTickets(
    eventId: string
  ): Promise<Ticket[]> {
    try {
      const zonesUrl = `${BASE_URL}/PriceTypes/Details?modeOfSaleId=26&sourceId=30885&packageId=${eventId}`;
      const pricesUrl = `${BASE_URL}/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`;
      const seatsUrl = `${BASE_URL}/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`;

      const [zonesResponse, pricesResponse, seatsResponse] =
        await Promise.all([
          axios.get(zonesUrl),
          axios.get(pricesUrl),
          axios.get(seatsUrl),
        ]);

      const zonesData = zonesResponse.data[0].Zones;

      const pricesData = pricesResponse.data;

      const seatsData = seatsResponse.data;

      const tickets: Ticket[] = [];

      seatsData.forEach((seat: any) => {
        const matchingPrice = pricesData.find(
          (price: any) => price.ZoneId === seat.ZoneId
        );
        if (matchingPrice) {
          const matchingZone = zonesData.find(
            (zone: any) => zone.Id === seat.ZoneId
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
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw new Error(
        "An error occurred while fetching tickets"
      );
    }
  }
}
