import { Container } from "inversify";
import { JsonContactRepository } from "@/infrastructure/Repositories/ContactRepository/JsonContactRepository";
import { ContactService } from "@/core/service/ContactService/Contact.service";
import { ContactController } from "@/infrastructure/Controllers/Contact/ContactController";

const container = new Container();

container
  .bind<JsonContactRepository>("ContactRepository")
  .to(JsonContactRepository);
container.bind<ContactService>(ContactService).toSelf();
container.bind<ContactController>(ContactController).toSelf();

export { container };
