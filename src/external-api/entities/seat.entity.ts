export interface Seat {
  Id: number;
  SectionId: number;
  SeatRow: string;
  SeatNumber: string;
  ZoneId: number;
  AllocationId: number;
  SeatTypeId: number;
  LogicalSeatRow: number;
  LogicalSeatNumber: number;
  XPosition: number;
  YPosition: number;
  IsSeat: boolean;
  SeatStatusId: number;
  AisleIndicator: string;
  HasStairs: boolean;
  ScreenId: number;
  DisplayLetter: string;
  HoldCodeId: number;
}
