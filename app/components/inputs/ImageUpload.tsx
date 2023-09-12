"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { SerializedPhoto } from "@/app/types";

import ImageRemoveButton from "@/app/components/inputs/ImageRemoveButton";

declare global {
  var cloudinary: any;
}

export type ImageUploadResult = Pick<SerializedPhoto, "url" | "etag">;

interface ImageUploadProps {
  onChange: (_: ImageUploadResult[]) => void;
  value: ImageUploadResult[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value = [] }) => {
  const t = useTranslations("ImageUpload");
  const onRemove = useCallback(
    (url: string) => {
      onChange(value.filter((item) => item.url !== url));
    },
    [onChange, value],
  );

  const handleUpload = useCallback(
    (result: any) => {
      if (result?.info?.etag && result?.info?.secure_url) {
        const currentEtags = value.map((item) => item.etag);
        if (!currentEtags.includes(result.info.etag)) {
          onChange([
            ...value,
            {
              url: result.info.secure_url,
              etag: result.info.etag,
            },
          ]);
        }
      }
    },
    [onChange, value],
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="tzgn5jje"
      options={{
        sources: ["local"],
      }}
    >
      {({ open }) => {
        return (
          <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-neutral-300 p-2 text-neutral-600">
            {value?.length > 0 && (
              <div className="relative flex w-full flex-row flex-wrap gap-1 pb-4 pl-2">
                {value.map((item, index) => (
                  <div
                    key={index}
                    className="border-1 relative h-20 w-[24%] rounded-xl border-neutral-400 shadow-md"
                  >
                    <Image
                      alt="Upload"
                      fill
                      style={{ objectFit: "cover" }}
                      src={item.url}
                    />
                    <ImageRemoveButton
                      url={item.url}
                      onRemove={onRemove}
                    />
                  </div>
                ))}
              </div>
            )}
            <div
              onClick={() => open?.()}
              className="flex w-full cursor-pointer flex-col items-center justify-center gap-3 hover:opacity-70"
            >
              <TbPhotoPlus size={50} />
              <div className="text-lg font-semibold">
                {t("uploadPrompt", { count: value?.length || 0 })}
              </div>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
