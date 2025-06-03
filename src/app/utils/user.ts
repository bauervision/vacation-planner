import { Vacation } from "../types/user";

/**
 * Returns the next vacation from a list (must have startDate as ISO string).
 * Only considers vacations in the future (>= today).
 */
export function getNextVacation(vacations: Vacation[]): Vacation | null {
  const now = new Date();

  // Filter for only future vacations (startDate >= today)
  const upcoming = vacations
    .filter((vac) => new Date(vac.startDate) >= now)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

  return upcoming.length > 0 ? upcoming[0] : null;
}
