// `app` directory
import StageLayout from "@/app/[organization]/[event]/stage/[stage]/components/StageLayout";
import StageController from "@/services/controller/stage";
import { notFound } from "next/navigation";
interface Params {
  params: {
    event: string;
    stage: string;
  };
}

export async function generateStaticParams() {
  const stageController = new StageController();
  const stages = (await stageController.getAllStages()).map((stage) => {
    return {
      params: {
        event: stage.eventId,
        stage: stage.id,
      },
    };
  });
  return stages;
}

export default async function Post({ params }: Params) {
  const stageController = new StageController();
  try {
    const stage = await stageController.getStage(params.stage, params.event);
    return <StageLayout stage={stage} />;
  } catch (e) {
    return notFound();
  }
}
