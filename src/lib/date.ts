import {
  format,
  parseISO,
  addDays,
  addWeeks,
  addMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isBefore,
  isAfter,
  isSameDay,
  differenceInDays,
} from 'date-fns';
import { ja } from 'date-fns/locale';

export const formatDate = (dateStr: string, fmt: string = 'yyyy-MM-dd'): string =>
  format(parseISO(dateStr), fmt, { locale: ja });

export const formatDateJa = (dateStr: string): string =>
  format(parseISO(dateStr), 'M月d日(E)', { locale: ja });

export const toISODateString = (date: Date): string =>
  format(date, 'yyyy-MM-dd');

export const todayString = (): string => toISODateString(new Date());

export const daysFromNow = (dateStr: string): number =>
  differenceInDays(parseISO(dateStr), new Date());

export const getDaysInMonth = (year: number, month: number): string[] =>
  eachDayOfInterval({
    start: startOfMonth(new Date(year, month - 1)),
    end: endOfMonth(new Date(year, month - 1)),
  }).map(toISODateString);

export {
  parseISO,
  addDays,
  addWeeks,
  addMonths,
  isToday,
  isBefore,
  isAfter,
  isSameDay,
};
