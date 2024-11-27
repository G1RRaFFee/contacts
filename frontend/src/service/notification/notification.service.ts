import { sendNotification } from "@tauri-apps/plugin-notification";

export class NotificationService {
  sendNotification(title: string, body: string) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        sendNotification({ title, body });
      }
    });
  }
}
