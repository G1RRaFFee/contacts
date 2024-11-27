import { NotificationService } from "@/service/notification/notification.service";
import { defaultConfig } from "./reminder.config";

interface Contact {
  id: string;
  name: string;
  birthdate: string;
}
// FIXME: "Поделить на базовый сервис и базовый reminderService"
export class BirthdayReminderService {
  private contacts: Contact[] = [];
  private reminderConfig = defaultConfig;

  constructor(private notificationService: NotificationService) {}

  setContacts(contacts: Contact[]) {
    this.contacts = contacts;
  }

  checkReminders() {
    console.log("1");
    const today = new Date();

    this.contacts.forEach((contact) => {
      const birthDate = new Date("2000.11.07");
      console.log("День рождения контакта: ", birthDate);
      const daysUntilBirthday = this.calculateDaysUntil(today, birthDate);
      console.log("Кол-во дней до др: ", daysUntilBirthday);
      this.reminderConfig.reminderIntervals.forEach((interval) => {
        if (daysUntilBirthday === interval) {
          console.log("Уведомление: ");
          this.notificationService.sendNotification(
            `Reminder: ${contact.name}'s birthday in ${interval} day(s)!`,
            `Don't forget to wish ${contact.name} a happy birthday!`
          );
        }
      });
    });
  }

  private calculateDaysUntil(today: Date, birthDate: Date): number {
    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

    return Math.ceil(
      (nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
