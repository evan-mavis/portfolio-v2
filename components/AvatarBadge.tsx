"use client";

import { useState } from "react";
import AvatarModal from "./AvatarModal";

const FRONT_AVATAR_SRC = "/avatar-new.webp";
const BACK_AVATAR_SRC = "/avatar-mandalorian.webp";

const FACE_CLASS =
  "avatar-flip-face absolute inset-0 overflow-hidden rounded-full border border-primary bg-primary";

export default function AvatarBadge() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(event);
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        aria-label="evan mavis avatar, opens full photo"
        className="avatar-flip relative ml-2 inline-block size-12 cursor-pointer rounded-full align-middle"
        onClick={openModal}
        onKeyDown={handleKeyDown}
      >
        <span className="avatar-flip-inner relative block size-full">
          <span className={FACE_CLASS}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FRONT_AVATAR_SRC}
              alt=""
              loading="eager"
              className="size-full object-cover object-center"
            />
          </span>
          <span className={`avatar-flip-back ${FACE_CLASS}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BACK_AVATAR_SRC}
              alt=""
              loading="eager"
              className="size-full object-cover object-center"
            />
          </span>
        </span>
      </div>
      <AvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        avatarSrc={FRONT_AVATAR_SRC}
      />
    </>
  );
}
