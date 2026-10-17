"use client";

import { useState } from "react";
import AvatarModal from "./AvatarModal";

const AVATAR_SRC = "/avatar-new.webp";

export default function AvatarBadge() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="evan mavis avatar, opens full photo"
        aria-haspopup="dialog"
        className="ml-2 inline-block size-12 shrink-0 cursor-pointer overflow-hidden rounded-full border border-primary bg-primary align-middle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Pre-sized local WebP needs no image optimization. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={AVATAR_SRC}
          alt=""
          width={48}
          height={48}
          className="size-full object-cover object-center"
        />
      </button>
      {isModalOpen && (
        <AvatarModal
          onClose={() => setIsModalOpen(false)}
          avatarSrc={AVATAR_SRC}
        />
      )}
    </>
  );
}
