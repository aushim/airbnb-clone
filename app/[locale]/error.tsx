"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title={t("title")}
      subtitle={t("subtitle")}
    />
  );
};

export default ErrorState;
