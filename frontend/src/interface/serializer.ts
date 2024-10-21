import IData from "@/interface/data";

export default interface ISerializer {
  toFormat(data: IData): string;
  fromFormat(data: string): IData;
}
