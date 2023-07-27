export interface Price {
  PerformanceId: number;
  PackageId: number;
  ZoneId: number;
  PriceTypeId: number;
  Price: number;
  Enabled: boolean;
  IsEditable: boolean;
  LayerTypeId: null | number;
  IsEditableForWeb: boolean;
  EditableMinPrice: number;
  IsBase: boolean;
  ParentPackageId: number;
  PerformancePriceTypeId: number;
  MinPrice: number;
  IsBest: boolean;
  Offer: boolean;
  ModeOfSaleOfferId: number;
}
