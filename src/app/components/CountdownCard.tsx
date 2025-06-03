import { Vacation } from "../types/user";

export default function CountdownCard({ vacation }: { vacation: Vacation }) {
  const daysToGo = Math.ceil(
    (new Date(vacation.startDate).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );
  return (
    <div className="rounded-lg shadow-lg p-8 bg-primary text-white text-center">
      <h2 className="text-3xl font-bold mb-2">Next Vacation!</h2>
      <h3 className="text-2xl mb-2">{vacation.location}</h3>
      <p className="text-5xl font-mono mb-2">{daysToGo}</p>
      <p className="text-xl">days to go</p>
      <p>
        ({new Date(vacation.startDate).toLocaleDateString()} –{" "}
        {new Date(vacation.endDate).toLocaleDateString()})
      </p>
    </div>
  );
}
