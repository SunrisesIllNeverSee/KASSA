import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SeatCard from "@/components/dashboard/SeatCard";
import { mySeats } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        <h1 className="font-display text-2xl font-bold text-obsidian mb-1">
          My Seats
        </h1>
        <p className="text-sm text-driftwood mb-8">
          Your founding seat portfolio
        </p>

        {mySeats.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {mySeats.map((seat) => (
              <SeatCard key={seat.id} seat={seat} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-sm text-driftwood">
              You haven&apos;t claimed any seats yet.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
