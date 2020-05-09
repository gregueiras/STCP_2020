export interface TomTomAPI {
  summary: Summary;
  results: ResultsEntity[];
}
export interface Summary {
  query: string;
  queryType: string;
  queryTime: number;
  numResults: number;
  offset: number;
  totalResults: number;
  fuzzyLevel: number;
  geoBias: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
}
export interface GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo {
  lat: number;
  lon: number;
}
export interface ResultsEntity {
  type: string;
  id: string;
  score: number;
  dist: number;
  info: string;
  poi?: Poi;
  address: Address;
  position: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
  mapcodes?: MapcodesEntity[] | null;
  viewport: Viewport;
  entryPoints?: EntryPointsEntity[] | null;
  addressRanges: AddressRanges;
  dataSources: DataSources;
}
export interface Poi {
  name: string;
  phone: string;
  url: string;
  brands?: BrandsEntity[] | null;
  categorySet?: CategorySetEntity[] | null;
  categories?: string[] | null;
  openingHours: OpeningHours;
  classifications?: ClassificationsEntity[] | null;
  timeZone: TimeZone;
}
export interface BrandsEntity {
  name: string;
}
export interface CategorySetEntity {
  id: number;
}
export interface OpeningHours {
  mode: string;
  timeRanges?: TimeRangesEntity[] | null;
}
export interface TimeRangesEntity {
  startTime: StartTimeOrEndTime;
  endTime: StartTimeOrEndTime;
}
export interface StartTimeOrEndTime {
  date: string;
  hour: number;
  minute: number;
}
export interface ClassificationsEntity {
  code: string;
  names?: NamesEntity[] | null;
}
export interface NamesEntity {
  nameLocale: string;
  name: string;
}
export interface TimeZone {
  ianaId: string;
}
export interface Address {
  streetNumber: string;
  streetName: string;
  municipalitySubdivision: string;
  municipality: string;
  countrySecondarySubdivision: string;
  countryTertiarySubdivision: string;
  countrySubdivision: string;
  postalCode: string;
  extendedPostalCode: string;
  countryCode: string;
  country: string;
  countryCodeISO3: string;
  freeformAddress: string;
  countrySubdivisionName: string;
  localName: string;
}
export interface MapcodesEntity {
  type: string;
  fullMapcode: string;
  territory?: string | null;
  code?: string | null;
}
export interface Viewport {
  topLeftPoint: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
  btmRightPoint: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
}
export interface EntryPointsEntity {
  type: string;
  functions?: string[] | null;
  position: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
}
export interface AddressRanges {
  rangeLeft: string;
  rangeRight: string;
  from: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
  to: GeoBiasOrTopLeftPointOrBtmRightPointOrPositionOrFromOrTo;
}
export interface DataSources {
  chargingAvailability: ChargingAvailabilityOrGeometry;
  geometry: ChargingAvailabilityOrGeometry;
}
export interface ChargingAvailabilityOrGeometry {
  id: string;
}
