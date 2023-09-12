"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
  const t = useTranslations("RegisterModal");
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        toast.success(t("successMessage"));
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch(() => {
        toast.error(t("errorMessage"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title={t("title")}
        subtitle={t("subtitle")}
      />
      <Button
        outline
        label={t("googleSignupLabel")}
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label={t("githubSignupLabel")}
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 flex-shrink text-sm text-gray-400">
          {t("emailSignupLabel")}
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <Input
        id="name"
        label={t("nameInputLabel")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label={t("emailInputLabel")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label={t("passwordInputLabel")}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>{t("existingUserLabel")}</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            {t("loginLabel")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={t("modalLabel")}
      actionLabel={t("buttonLabel")}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
