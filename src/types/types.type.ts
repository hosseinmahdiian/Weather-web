import type React from "react";

export type ChildrenType = {
  children: React.ReactNode;
};

export type DateInfo = {
  weekday: string;
  monthName: string;
  day: string;
  year: string;
  time: string;
};

export type DateType = {
  fa: DateInfo;
  en: DateInfo;
};