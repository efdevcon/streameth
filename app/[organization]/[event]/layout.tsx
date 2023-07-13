import Navbar from "@/components/Layout/Navbar";
import EventController from "@/server/controller/event";
import StageController from "@/server/controller/stage";
import {
  HomeIcon,
  ArchiveBoxArrowDownIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
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
  const pages = [
    {
      href: `/${params.organization}/${params.event}`,
      name: "Home",
      icon: <HomeIcon className="bg-primary h-8 w-8" />,
    },
    {
      href: `/${params.organization}/${params.event}/archive`,
      name: "Archive",
      icon: <ArchiveBoxArrowDownIcon />,
    },
    ...stages.map((stage) => {
      return {
        href: `/${params.organization}/${stage.eventId}/stage/${stage.id}`,
        name: stage.name,
        icon: <ViewColumnsIcon />,
      };
    }),
  ];
  return (
    <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
      <Navbar pages={pages} />
      <main className="flex h-full w-full  md:w-[calc(100%-5rem)] ml-auto bg-[#f5f5f5] overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
