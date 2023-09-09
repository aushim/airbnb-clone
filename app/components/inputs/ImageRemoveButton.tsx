"use client";

import { useCallback } from "react";
import { AiFillCloseCircle, AiOutlineCloseCircle } from "react-icons/ai";

interface ImageRemoveButtonProps {
  url: string;
  onRemove?: (_: string) => void;
}

const ImageRemoveButton: React.FC<ImageRemoveButtonProps> = ({
  url,
  onRemove,
}) => {
  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onRemove?.(url);
    },
    [onRemove, url],
  );

  return (
    <>
      <AiOutlineCloseCircle
        size={18}
        className="absolute right-1 top-1 cursor-pointer fill-white"
      />
      <AiFillCloseCircle
        onClick={handleRemove}
        size={18}
        className="absolute right-1 top-1 cursor-pointer fill-rose-600 hover:fill-rose-800"
      />
    </>
  );
};

export default ImageRemoveButton;
