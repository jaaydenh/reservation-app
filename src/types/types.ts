export type TimeSlot = {
  status: string;
  start_time: string;
};

export type Day = {
  date: string;
  status: string;
  slots: TimeSlot[];
};

export type Provider = {
  id: number;
  name: string;
  availability_timezone: string;
  days: Day[];
};

export type Interval = {
  from: string;
  to: string;
};

export type Rule = { day: string; intervals: Interval[] };