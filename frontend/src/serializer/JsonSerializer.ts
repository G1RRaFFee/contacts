import ISerializer from "@/interface/serializer";
import IData from "@/interface/data";

export class JsonSelializer implements ISerializer {
  public toFormat(data: IData): string {
    return JSON.stringify(data);
  }

  public fromFormat(data: string): IData {
    return JSON.parse(data);
  }
}
