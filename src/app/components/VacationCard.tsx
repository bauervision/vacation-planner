import Image from "next/image";
import { Vacation } from "../types/user";

export default function VacationCard({
  vacation,
  past,
}: {
  vacation: Vacation;
  past?: boolean;
}) {
  return (
    <div
      className={`border-4 rounded-lg shadow-lg drop-shadow-2xl  md:p-6 ${
        past
          ? "opacity-80 bg-primary border-accent "
          : "bg-accent border-primary "
      }`}
    >
      <Image
        src={vacation.image || "/default.jpg"}
        width={256}
        height={256}
        className="rounded mb-4 h-40 w-full object-cover drop-shadow-md"
        alt="vacation card"
      />
      <h3 className="text-primary text-xl font-bold">{vacation.location}</h3>
      <p>
        {new Date(vacation.startDate).toLocaleDateString()} –{" "}
        {new Date(vacation.endDate).toLocaleDateString()}
      </p>
      {vacation.cost && (
        <p className="mt-2 text-xl text-secondary font-bold">
          Cost: ${vacation.cost}
        </p>
      )}
      {vacation.notes && <p className="mt-2 text-sm">{vacation.notes}</p>}
    </div>
  );
}
