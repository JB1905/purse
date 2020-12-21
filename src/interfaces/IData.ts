export interface IData {
  readonly category: string;
  readonly coords: Coords;
  readonly date: Date;
  readonly id: string;
  readonly images: any[];
  readonly title: string;
  readonly type?: any;
  readonly value: string;
}

interface Date {
  readonly nanoseconds: number;
  readonly seconds: number;
}

interface Coords {
  readonly lat: number;
  readonly lon: number;
}
