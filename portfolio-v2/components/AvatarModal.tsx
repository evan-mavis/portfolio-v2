"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarImage } from "./ui/avatar";

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
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[9998]"
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.1, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className="pointer-events-auto"
              onClick={onClose}
            >
              <Avatar className="size-[80vh] max-w-[600px] max-h-[600px] bg-primary border border-primary rounded-full overflow-hidden">
                <AvatarImage
                  src={avatarSrc}
                  loading="eager"
                  className="object-cover! object-center!"
                />
              </Avatar>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
