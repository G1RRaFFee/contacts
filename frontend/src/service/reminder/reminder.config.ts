export interface ReminderConfig {
  reminderIntervals: number[];
}

export const defaultConfig: ReminderConfig = {
  reminderIntervals: [7, 3, 0],
};
