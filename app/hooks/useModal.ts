"use client";

import React, { useCallback, useEffect } from "react";

type UseModalProps = {
  refToCloseModalOnClick: React.RefObject<HTMLElement>;
  onClose: () => void;
  isOpen: boolean;
  blockingScrollingPage?: boolean;
};

export default function useModal({
  refToCloseModalOnClick,
  onClose,
  isOpen,
  blockingScrollingPage = false,
}: UseModalProps) {
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (event.target === refToCloseModalOnClick.current) {
        onClose();
      }
    },
    [onClose, refToCloseModalOnClick]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);

      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [isOpen, handleKeydown]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isOpen, handleClick]);

  useEffect(() => {
    function blockingScrollOnPage() {
      const bodyClasses = document.querySelector("body")?.classList!;
      const customClass = "blocking-scroll";

      if (isOpen) {
        bodyClasses.add(customClass);
      } else {
        bodyClasses.remove(customClass);
      }
    }

    if (blockingScrollingPage) {
      blockingScrollOnPage();
    }
  }, [isOpen, blockingScrollingPage]);
}
