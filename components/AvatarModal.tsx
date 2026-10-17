"use client";

import { useRef } from "react";
import { useMountEffect } from "@/lib/use-mount-effect";

interface AvatarModalProps {
  onClose: () => void;
  avatarSrc: string;
}

export default function AvatarModal({ onClose, avatarSrc }: AvatarModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useMountEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  });

  return (
    <dialog
      ref={dialogRef}
      aria-label="full photo of evan mavis"
      className="animate-in fade-in zoom-in fixed m-auto overflow-visible rounded-full bg-transparent p-0 duration-300 backdrop:bg-black/50 backdrop:backdrop-blur-md"
      onCancel={onClose}
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="close full photo"
        className="block cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
      >
        {/* Pre-sized local WebP needs no image optimization. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarSrc}
          alt="evan mavis"
          width={600}
          height={600}
          className="size-[90vw] max-h-[600px] max-w-[600px] rounded-full border border-primary bg-primary object-cover object-center sm:size-[80vh]"
        />
      </button>
    </dialog>
  );
}
