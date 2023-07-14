import Navbar from "@/components/Layout/Navbar";
import EventController from "@/server/controller/event";
import StageController from "@/server/controller/stage";
import Stage from "@/server/model/stage";
import {
  HomeIcon,
  ArchiveBoxArrowDownIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

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
  let stages: Stage[] = [];
  try {
    stages = await stageController.getAllStagesForEvent(params.event);
  } catch (e) {
    return notFound();
  }

  const pages = [
    {
      href: `/${params.organization}/${params.event}`,
      name: "Home",
      icon: <HomeIcon />,
    },
    {
      href: `/${params.organization}/${params.event}/archive`,
      name: "Archive",
      icon: <ArchiveBoxArrowDownIcon />,
    },
  ];

  //
  return (
    <div className="flex flex-col md:flex-row flex-grow overflow-hidden  ">
      <Navbar
        pages={pages}
        stages={stages.map((stage) => {
          return {
            href: `/${params.organization}/${stage.eventId}/stage/${stage.id}`,
            name: stage.name,
            icon: <ViewColumnsIcon />,
          };
        })}
      />
      <main className="flex lg:h-full w-full lg:w-[calc(100%-5rem)] h-[calc(100%-5rem)]   ml-auto bg-[#f5f5f5] overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
