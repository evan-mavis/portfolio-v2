"use client";

import { createPortal } from "react-dom";

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatarSrc: string;
}

export default function AvatarModal({
  isOpen,
  onClose,
  avatarSrc,
}: AvatarModalProps) {
  if (!isOpen) {
    return null;
  }

  const close = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  return createPortal(
    <>
      <div
        className="animate-in fade-in fixed inset-0 z-[9998] bg-black/50 backdrop-blur-md duration-300"
        onClick={close}
      />

      <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
        <figure
          className="animate-in fade-in zoom-in pointer-events-auto duration-300 ease-out"
          onClick={close}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt="evan mavis"
            loading="eager"
            className="h-[90vw] max-h-[600px] w-[90vw] max-w-[600px] rounded-2xl border border-primary bg-primary object-contain sm:size-[80vh]"
          />
          <figcaption className="mt-2 text-center text-sm text-white/80">
            katz deli - nyc
          </figcaption>
        </figure>
      </div>
    </>,
    document.body,
  );
}
