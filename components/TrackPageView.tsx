"use client";

import { track } from "@vercel/analytics";
import { useMountEffect } from "@/lib/use-mount-effect";

interface TrackPageViewProps {
  event: string;
}

export default function TrackPageView({ event }: TrackPageViewProps) {
  useMountEffect(() => {
    track(event);
  });

  return null;
}
