import Button from "../ui/Button";
import Input from "../ui/Input";
import LongCheckbox from "../ui/LongCheckbox";
import CookiesSameSiteDropdown from "./CookiesSameSiteDropdown";
import { Controller } from "react-hook-form";
import useCookieForm from "@/hooks/forms/useCookieForm";

type Props = {
  selectedId?: number;
  activeDomain?: string;
  collectionId: string;
};

export default function CookiesForm({
  selectedId,
  activeDomain,
  collectionId,
}: Props) {
  const { control, errors, handleSubmit, register, isLoading, isSubmitting } =
    useCookieForm({
      cookieId: selectedId,
      domain: activeDomain,
      collectionId,
    });

  return (
    <form className="p-8" onSubmit={handleSubmit}>
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
      />
      <Input
        {...register("value")}
        className="mt-6"
        placeholder="Cookie Value"
        label="Value"
        errorMessage={errors.value?.message}
      />
      <div className="grid grid-cols-2 mt-6 gap-4">
        <Input
          {...register("path")}
          errorMessage={errors.path?.message}
          placeholder="/"
          label="Path"
        />
        <Input
          errorMessage={errors.maxAge?.message}
          {...register("maxAge")}
          type="number"
          placeholder="900"
          label="Max-Age"
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
          />
        )}
      />
      <p className="text-secondary text-sm mt-3">
        Prevents client-side scripts (JavaScript) from accessing the cookie,
        enhancing security against XSS attacks.
      </p>
      <Controller
        control={control}
        name="secure"
        render={({ field }) => (
          <LongCheckbox
            {...field}
            onCheck={field.onChange}
            className="mt-6"
            label="Secure"
          />
        )}
      />

      <p className="text-secondary text-sm mt-3">
        Ensures the cookie is only sent over HTTPS, protecting it from being
        intercepted over unencrypted connections.
      </p>
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
        <Button isLoading={isSubmitting} className="py-4 px-8" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
}
