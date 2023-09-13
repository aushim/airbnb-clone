import ListingCard from "@/app/components/listings/ListingCard";
import Heading from "@/app/components/Heading";
import {
  SerializedListing,
  SerializedReservation,
  SerializedUser,
} from "@/app/types";

interface ListingSectionProps {
  reservations?: SerializedReservation[];
  listings?: SerializedListing[];
  title?: string;
  subtitle?: string;
  currentUser?: SerializedUser | null;
  onAction?: (_: string) => void;
  deletingId?: string;
  actionLabel?: string;
  emptyMessage?: string;
}

const ListingSection: React.FC<ListingSectionProps> = ({
  reservations,
  listings,
  title,
  subtitle,
  currentUser,
  onAction,
  deletingId,
  actionLabel,
  emptyMessage,
}) => {
  return (
    <>
      {title && (
        <div className="pb-8">
          <Heading
            title={title}
            subtitle={subtitle}
          />
        </div>
      )}
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onAction}
              disabled={deletingId === reservation.id}
              actionLabel={actionLabel}
              currentUser={currentUser}
            />
          ))
        ) : listings && listings.length > 0 ? (
          listings.map((listing) => {
            return (
              <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
              />
            );
          })
        ) : (
          <div className="font-light">{emptyMessage}</div>
        )}
      </div>
    </>
  );
};

export default ListingSection;
