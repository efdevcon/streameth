import Navbar from "@/components/Layout/Navbar";
import EventController from "@/services/controller/event";
import StageController from "@/services/controller/stage";

export async function generateStaticParams() {
  const eventController = new EventController();
  const allEvents = await eventController.getAllEvents();
  const paths = allEvents.map((event) => {
    return {
      params: {
        organization: event.organizationId,
        event: event.id,
      },
    };
  });
  return paths;
}

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    organization: string;
    event: string;
  };
}) => {
  const stageController = new StageController();
  const stages = await stageController.getAllStagesForEvent(params.event);
  const pages = stages.map((stage) => {
    return {
      href: `/${params.organization}/${stage.eventId}/stage/${stage.id}`,
      name: stage.name,
    };
  });

  return (
    <div className="min-h-screen flex flex-col h-screen w-screen">
      <Navbar pages={pages} />
      <main className="flex-1 flex overflow-y-hidden md:overflow-y-scroll lg:overflow-hidden w-full bg-base opacity">{children}</main>
    </div>
  );
};

export default Layout;
