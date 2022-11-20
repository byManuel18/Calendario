

export interface CalendarioConfig {
  dateInitialInterval?:{
    day: number,
    month: number,
    year: number,
  },
  dateEndInterval?:{
    day: number,
    month: number,
    year: number,
  },
  daysWeek: string[],
  selectedDate?:{
    day: number,
    month: number,
    year: number,
  }
}

export interface DayBuild {
  value: number,
  indexWeek: number,
  year: number,
  month: number,
}
