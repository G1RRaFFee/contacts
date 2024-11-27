import { TrayIcon, TrayIconOptions } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { defaultWindowIcon } from "@tauri-apps/api/app";
import { BirthdayReminderService } from "@/service/reminder/reminder.service";
// import { NotificationService } from "@/service/notification/notification.service";

export async function initializeTray(birthdayService: BirthdayReminderService) {
  const menu = await Menu.new({
    items: [
      {
        id: "quit",
        text: "Quit",
      },
    ],
  });
  const options: TrayIconOptions = {
    icon: await defaultWindowIcon(),
    menu,
    menuOnLeftClick: true,
  };

  await TrayIcon.new(options);
  console.log("Трей активирован");
  setInterval(() => birthdayService.checkReminders(), 5000); // 1 day interval
  console.log("Интервал установлен");
}
