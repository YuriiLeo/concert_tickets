interface ZoneGroup {
  Id: number;
  Description: string;
  AliasDescription: null | string;
  Inactive: boolean;
  Rank: number;
}

export interface Zone {
  Id: number;
  Description: string;
  ShortDescription: string;
  Rank: number;
  ZoneMapId: number;
  ZoneTime: string;
  Abbreviation: string;
  ZoneLegend: string;
  ZoneGroup: ZoneGroup;
}
