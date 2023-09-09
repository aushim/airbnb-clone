export const dynamic = "force-dynamic";

import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import ListingSection from "@/app/components/listings/ListingSection";
import getListings, { IListingsParams } from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface HomeProps {
  searchParams: IListingsParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24">
        <ListingSection
          listings={listings}
          currentUser={currentUser}
        />
      </div>
    </Container>
  );
};

export default Home;
