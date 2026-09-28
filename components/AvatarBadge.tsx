"use client";

import { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import AvatarModal from "./AvatarModal";

export default function AvatarBadge() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="bg-primary border border-primary size-12 rounded-full overflow-hidden cursor-pointer inline-block ml-2 align-middle"
        onClick={(event) => {
          event.stopPropagation();
          setIsModalOpen(true);
        }}
      >
        <Avatar className="size-full">
          <AvatarImage
            src="/avatar.jpeg"
            loading="eager"
            className="object-cover! object-center!"
          />
        </Avatar>
      </div>
      <AvatarModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        avatarSrc="/avatar.jpeg"
      />
    </>
  );
}
