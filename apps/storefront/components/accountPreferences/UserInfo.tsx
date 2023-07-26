import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { User, useUserAccountUpdateMutation, useUserAvatarUpdateMutation } from "@/saleor/api";
import styles from "./UserInfo.module.css";
import { messages } from "../translations";
import { useUser } from "@/lib/useUser";

interface UserInfoChangeFormData {
  firstName: string;
  lastName: string;
}

export function UserInfo() {
  const t = useIntl();
  const [updateUserAccount] = useUserAccountUpdateMutation();
  const { user, refetch } = useUser();

  const [successMessage, setSuccessMessage] = React.useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserInfoChangeFormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });
  const imgInputAnchor = React.createRef<HTMLInputElement>();
  const clickImgInput = () => imgInputAnchor.current?.click();

  const [updateUserAvatar] = useUserAvatarUpdateMutation({
    onCompleted: (data) => {
      if (!data.userAvatarUpdate?.errors.length) {
        setSuccessMessage("Successfully updated user avatar");
        refetch();
      } else {
        setSuccessMessage("Failed to update user avatar");
      }
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const onImageUpload = async (file: File) => {
    updateUserAvatar({ variables: { image: file } });
  };

  //   console.log("user::: ", user);
  const onUserInfoPreferenceSubmit = handleSubmit(async (formData) => {
    const result = await updateUserAccount({
      variables: {
        input: { firstName: formData.firstName, lastName: formData.lastName },
      },
    });
    const mutationErrors = result?.data?.accountUpdate?.errors || [];
    if (mutationErrors.length > 0) {
      mutationErrors.forEach((e) =>
        setError(e.field as keyof UserInfoChangeFormData, {
          message: e.message || "",
        })
      );
      return;
    }
    setSuccessMessage("Successfully updated user info");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  });

  return (
    <div className="mt-2 mb-2">
      <h2 className="checkout-section-header-active mb-2 text-base hidden md:block">General</h2>
      <form method="post" onSubmit={onUserInfoPreferenceSubmit}>
        <div className="pb-6 pt-3 text-center md:text-left">
          <div className={`${styles["avatar"]} m-auto md:ml-4 mb-1 items-center`}>
            {user?.avatar?.url ? (
              <img src={user?.avatar?.url} alt="avatar" className="rounded-full w-full h-full" />
            ) : (
              <div className={`${styles["avatar"]} bg-gray-300`}>
                <div className={styles["avatar-default"]}>{getUserInitials(user as User)}</div>
              </div>
            )}
          </div>
          <div>
            <button
              className="text-sm text-blue-500 hover:text-blue-400"
              type="button"
              onClick={clickImgInput}
            >
              Change Profile Photo
            </button>
            <input
              className="hidden"
              id="fileUpload"
              type="file"
              ref={imgInputAnchor}
              onChange={(event: any) => onImageUpload(event.target.files[0])}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
          <div className="grid grid-cols-12">
            <div className="col-span-full">
              <label htmlFor="firstName" className="block pl-1 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                className="px-4 py-2 rounded-md text-sm outline-none w-full"
                type="text"
                id="firstName"
                spellCheck={false}
                {...register("firstName", {
                  required: true,
                })}
              />
              {!!errors.firstName && (
                <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-full">
              <label htmlFor="lastName" className="block pl-1 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                className="px-4 py-2 rounded-md text-sm outline-none w-full"
                type="text"
                id="lastName"
                spellCheck={false}
                {...register("lastName", {
                  required: true,
                })}
              />
              {!!errors.lastName && (
                <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>
        {!!successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
        <div className="mt-4">
          <button
            className="w-full text-base md:w-40 bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-md transition duration-100"
            onClick={() => onUserInfoPreferenceSubmit()}
            type="submit"
          >
            {t.formatMessage(messages.saveButton)}
          </button>
        </div>
      </form>
    </div>
  );
}

function getUserInitials(user?: User) {
  const hasName = user?.firstName && user?.lastName;
  const hasEmail = !!user?.email;
  if (hasName) {
    return `${user.firstName[0] + user.lastName[0]}`.toUpperCase();
  }

  if (hasEmail) {
    return user.email.slice(0, 2).toUpperCase();
  }

  return undefined;
}

export default UserInfo;
