import Image from "next/image";
import OrganizationController from "@/services/controller/organization";
import EventController from "@/services/controller/event";

export default async function Home() {
  const organizationController = new OrganizationController();
  const allOrganizations = await organizationController.getAllOrganizations();


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col items-center justify-center">
        {
          allOrganizations.map((organization) => (
            <div key={organization.id} className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-center">{organization.name}</h1>
              <p className="text-2xl font-bold text-center">{organization.description}</p>
            </div>
          ))
        }
      </div>
    </main>
  );
}
