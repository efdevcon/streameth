"use client";
import React, { useEffect } from "react";
import Session from "@/services/model/session";
import Scroll, { Element } from "react-scroll";
import Link from "next/link";

import SessionSnack from "@/components/sessions/SessionSnack";

interface Props {
  sessions: Session[];
  currentSession?: Session;
  isLive: boolean;
}

const scroll = Scroll.scroller;

function NoSessionComponent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-gray-600 dark:text-gray-300">
        No upcoming sessions! Check the archive:
      </p>
      <Link href="/archive">
        <a className="text-blue-500 hover:text-blue-600">Archive Page</a>
      </Link>
    </div>
  );
}

export default function SessionList({
  sessions,
  currentSession,
  isLive,
}: Props) {
  useEffect(() => {
    if (currentSession) {
      scroll.scrollTo(currentSession.id, {
        duration: 1500,
        smooth: true,
        offset: 0,
        containerId: "sessionList",
      });
    }
  }, [currentSession]);

  return (
    <ul id="sessionList" className="relative space-y-2 mt-1 overflow-y-scroll">
      {sessions.map((i) => {
        return (
          <Element key={i.id} name={i.id}>
            <li id={i.id} className="mb-3 text-lg">
              <SessionSnack session={i} isLive={isLive} />
            </li>
          </Element>
        );
      })}
      {sessions.length === 0 && <NoSessionComponent />}
    </ul>
  );
}
