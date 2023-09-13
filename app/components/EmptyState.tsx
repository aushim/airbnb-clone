"use client";

import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";

import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  showReset,
}) => {
  const router = useRouter();
  const t = useTranslations("EmptyState");

  if (!title) {
    title = t("defaultTitle");
  }

  if (!subtitle) {
    subtitle = t("defaultSubtitle");
  }

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 pt-4">
        {showReset && (
          <Button
            outline
            label={t("resetButtonLabel")}
            onClick={() => router.push("/")}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
