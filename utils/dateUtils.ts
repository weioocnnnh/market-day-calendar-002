/**
 * Utility functions for date manipulation without external heavy libraries
 * to keep the project lightweight and self-contained for this specific task.
 */

// Anchor date: February 2, 2026
const ANCHOR_YEAR = 2026;
const ANCHOR_MONTH = 1; // 0-indexed: February is 1
const ANCHOR_DAY = 2;

const ANCHOR_DATE = new Date(ANCHOR_YEAR, ANCHOR_MONTH, ANCHOR_DAY);

/**
 * Checks if a given date is a "Market Day" (街天).
 * Logic: Every 3 days starting from anchor date (Period = 3).
 */
export const isMarketDay = (date: Date): boolean => {
  // Normalize dates to start of day to avoid time discrepancies
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const anchor = new Date(ANCHOR_DATE.getFullYear(), ANCHOR_DATE.getMonth(), ANCHOR_DATE.getDate());
  
  const diffTime = d.getTime() - anchor.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  // Modulo 3 ensures the cycle. 
  // We handle negative days (past) correctly with custom modulo if needed, 
  // but JS % operator returns negative for negative operands.
  // ((a % n) + n) % n ensures positive result for cyclic checks.
  return ((diffDays % 3) + 3) % 3 === 0;
};

export const getMonthDays = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
  
  // Adjust startDayOfWeek to make Monday (1) the first column if desired?
  // The provided design shows Monday first.
  // JS getDay(): 0=Sun, 1=Mon, ..., 6=Sat
  // We want Mon=0, ..., Sun=6
  const normalizedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  const days: { date: Date; isCurrentMonth: boolean }[] = [];

  // Previous month padding
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = normalizedStartDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // Next month padding to fill the grid (6 rows * 7 cols = 42 usually, or dynamic)
  // Let's ensure we fill at least 35 or 42 cells to keep grid stable
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false,
    });
  }

  return days;
};

export const formatYearMonth = (date: Date): string => {
  return `${date.getFullYear()}年  ${date.getMonth() + 1}月`;
};

export const isSameDate = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};
