import EmptyState from "@/app/components/EmptyState";
import PropertiesClient from "@/app/properties/PropertiesClient";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Could not find any properties"
        subtitle="Looks like you're not logged in"
      />
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you have no properties listed on Airbnb"
      />
    );
  }

  return (
    <PropertiesClient
      listings={listings}
      currentUser={currentUser}
    />
  );
};

export default PropertiesPage;
