// `app` directory
import StageLayout from "@/app/[organization]/[event]/[stage]/components/StageLayout";
import StageController from "@/services/controller/stage";
import EventController from "@/services/controller/event";
import { notFound } from "next/navigation";
interface Params {
  params: {
    organization: string;
    event: string;
    stage: string;
  };
}

// export async function generateStaticParams() {
//   const eventController = new EventController();
//   const stageController = new StageController();
//   const allEvents = await eventController.getAllEvents();
//   const paths = allEvents.map(async (event) => {
//     const stages = await stageController.getStagesForEvent(event);
//     return stages.map((stage) => {
//       return {
//         params: {
//           organization: event.organizationId,
//           event: event.id,
//           stage: stage.id,
//         },
//       };
//     });
//   });
//   return paths;
// }

export default async function Post({ params }: Params) {
  const stageController = new StageController();
  const eventController = new EventController();
  try {
    const event = await eventController.getEvent(
      params.organization,
      params.event
    );
    // const stage = [await stageController.getStage(params.stage, event);]
    // return <StageLayout stage={stage} />;
    return <></>
  } catch (e) {
    return notFound();
  }
}
