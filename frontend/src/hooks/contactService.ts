import { Storage } from "@/storage/storage";
import { JsonSelializer } from "@/serializer/JsonSerializer";
import { ContactService } from "@/service/contact/contact.service";

export const useContactService = () => {
  const jsonSerializer = new JsonSelializer();
  const storage = new Storage(jsonSerializer);

  return new ContactService(storage);
};
