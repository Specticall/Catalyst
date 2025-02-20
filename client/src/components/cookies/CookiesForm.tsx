import Button from "../ui/Button";
import Input from "../ui/Input";
import LongCheckbox from "../ui/LongCheckbox";
import CookiesSameSiteDropdown from "./CookiesSameSiteDropdown";
import { Controller } from "react-hook-form";
import useCookieForm from "@/hooks/forms/useCookieForm";
import useCookieEditor from "@/stores/cookieEditorStore";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function CookiesForm() {
  const { selectedId, activeDomain, collectionId } = useCookieEditor();
  const { control, errors, handleSubmit, register, isLoading, isSubmitting } =
    useCookieForm({
      cookieId: selectedId,
      domain: activeDomain,
      collectionId,
    });

  return (
    <form className="p-8 relative" onSubmit={handleSubmit}>
      {!selectedId && !activeDomain && (
        <div className="absolute inset-0 z-[60] bg-base/75 backdrop-blur-[4px] flex items-center justify-center flex-col ">
          <div className="bg-base border border-border rounded-sm mb-4 p-3 ">
            <Icon
              icon="material-symbols:cookie-outline"
              className="text-4xl text-white "
            />
          </div>
          <p className="text-white text-2xl text-center">No Cookie Selected</p>
          <p className="text-secondary text-center">
            Select a cookie to configure or <span>create a new domain</span>
          </p>
        </div>
      )}
      <div className="flex items-center gap-3">
        <h3 className="text-white text-xl">Configure Cookie</h3>
        {typeof activeDomain !== "undefined" && (
          <div className="flex border-border rounded-full text-white border px-5 py-0.5 gap-2">
            <p className="text-parimary">{activeDomain}</p>
          </div>
        )}
      </div>
      <p className="text-secondary mt-1">Edit your cookie attributes</p>
      <Input
        {...register("name")}
        className="mt-6"
        placeholder="Cookie Name"
        label="Name"
        data-cookie-name-input
        errorMessage={errors.name?.message}
        isLoading={isLoading}
      />
      <Input
        {...register("value")}
        className="mt-6"
        placeholder="Cookie Value"
        label="Value"
        errorMessage={errors.value?.message}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-2 mt-6 gap-4">
        <Input
          {...register("path")}
          errorMessage={errors.path?.message}
          placeholder="/"
          label="Path"
          isLoading={isLoading}
        />
        <Input
          errorMessage={errors.maxAge?.message}
          {...register("maxAge")}
          type="number"
          placeholder="900"
          label="Max-Age"
          isLoading={isLoading}
        />
      </div>
      <p className="text-secondary mt-6">Options</p>
      <Controller
        control={control}
        name="httpOnly"
        render={({ field }) => (
          <LongCheckbox
            {...field}
            onCheck={field.onChange}
            className="mt-2"
            label="Http Only"
            isLoading={isLoading}
            hint="Ensures the cookie is only sent over HTTPS, protecting it from being
        intercepted over unencrypted connections."
          />
        )}
      />

      <Controller
        control={control}
        name="secure"
        render={({ field }) => (
          <LongCheckbox
            {...field}
            onCheck={field.onChange}
            className="mt-6"
            label="Secure"
            isLoading={isLoading}
            hint="Ensures the cookie is only sent over HTTPS, protecting it from being
        intercepted over unencrypted connections."
          />
        )}
      />

      <p className="text-secondary mb-2 mt-6">Same Site</p>
      <Controller
        control={control}
        name="sameSite"
        render={({ field: { onChange, value } }) => (
          <CookiesSameSiteDropdown onChange={onChange} value={value} />
        )}
      />
      <p className="text-secondary text-sm mt-3">
        Controls how cookies are sent with cross-site requests:
      </p>

      <div className="flex justify-end mt-10 ">
        <Button
          isLoading={isSubmitting}
          className="py-4 px-8"
          type="submit"
          disabled={isLoading}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
