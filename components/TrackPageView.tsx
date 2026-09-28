"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

interface TrackPageViewProps {
  event: string;
}

export default function TrackPageView({ event }: TrackPageViewProps) {
  useEffect(() => {
    track(event);
  }, [event]);

  return null;
}
