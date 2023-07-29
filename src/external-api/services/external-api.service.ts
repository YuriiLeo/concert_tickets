import axios from "axios";

import { Price, Seat, Zone } from "../entities";

const BASE_URL = "https://my.laphil.com/en/rest-proxy/TXN";

export class ExternalApiService {
  async getZones(eventId: string): Promise<Zone[]> {
    const url = `${BASE_URL}/PriceTypes/Details?modeOfSaleId=26&sourceId=30885&packageId=${eventId}`;

    const { data } = await axios.get<{ Zones: Zone[] }[]>(
      url
    );

    return data[0].Zones;
  }

  async getPrices(eventId: string): Promise<Price[]> {
    const url = `${BASE_URL}/Packages/${eventId}/Prices?expandPerformancePriceType=&includeOnlyBasePrice=&modeOfSaleId=26&priceTypeId=&sourceId=30885`;

    const { data } = await axios.get<Price[]>(url);

    return data;
  }

  async getSeats(eventId: string): Promise<Seat[]> {
    const url = `${BASE_URL}/Packages/${eventId}/Seats?constituentId=0&modeOfSaleId=26&packageId=${eventId}`;

    const { data } = await axios.get<Seat[]>(url);

    return data;
  }

  async getFilteredSeats(eventId: string): Promise<Seat[]> {
    const seatsData = await this.getSeats(eventId);
    const filteredSeats = seatsData
      .sort((seat1, seat2) => seat2.ZoneId - seat1.ZoneId)
      .filter((seat) => seat.AllocationId !== 0);

    return filteredSeats;
  }
}
