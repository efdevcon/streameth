import Stage from "@/services/model/stage";

export default function StageLayout({ stage }: { stage: Stage }) {
  return <>{stage.name}{stage.streamSettings.streamId}</>;
}
