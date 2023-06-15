import { ReactNode } from "react";
import styles from "./Container.module.scss";

interface Props {
  children: ReactNode;
}

export default function Container({ children }: Props) {
  return <div className="mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

export function SessionContainer({ children }: Props) {
  return <div className="mx-auto max-w-[1512px] p-6 lg:p-8">{children}</div>;
}

export function PageContainer({ children }: Props) {
  return (
    <div className="relative h-[calc(100vh-10rem)] px-4 lg:px-8 overflow-scroll">
      {children}
    </div>
  );
}

export function StageContainer({ children }: Props) {
  return (
    <div className="relative h-[calc(100vh-10rem)] overflow-scroll">
      {children}
    </div>
  );
}
