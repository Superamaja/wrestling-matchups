/**
 * Utility functions for formatting dates and times consistently across the application
 */

/**
 * Format a date string to a short format (e.g., "May 17")
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export function formatShortDate(dateString: string): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Format a date string to a medium format with weekday (e.g., "Saturday, May 17")
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export function formatMediumDate(dateString: string): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date to full format with year (e.g., "Saturday, May 17, 2025")
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export function formatFullDate(dateString: string): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a short weekday (e.g., "Sat")
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Formatted weekday string
 */
export function formatShortWeekday(dateString: string): string {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
  });
}

/**
 * Format a combined date and time (e.g., "May 17 • 18:00")
 * @param dateString ISO date string (YYYY-MM-DD)
 * @param timeString Time string (HH:MM)
 * @returns Formatted date and time string
 */
export function formatMatchTime(
  dateString: string,
  timeString: string
): string {
  if (!dateString || !timeString) return "";

  const formattedDate = formatShortDate(dateString);
  return `${formattedDate} • ${timeString}`;
}

/**
 * Check if a date is today
 * @param dateString ISO date string (YYYY-MM-DD)
 * @returns Boolean indicating if the date is today
 */
export function isToday(dateString: string): boolean {
  if (!dateString) return false;

  const date = new Date(dateString);
  const today = new Date();

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
