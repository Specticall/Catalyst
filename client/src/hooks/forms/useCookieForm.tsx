import { SubmitHandler, useForm } from "react-hook-form";
import useCookieDetailQuery from "../queries/useCookieDetailQuery";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCookieMutation from "../queries/useCookieMutation";

const cookieSchema = z.object({
  name: z.string().nonempty("This field can't be empty"),
  value: z.string().nonempty("This field can't be empty"),
  path: z.string().nonempty("This field can't be empty"),
  maxAge: z.string().optional(),
  httpOnly: z.boolean(),
  secure: z.boolean(),
  sameSite: z.enum(["Lax", "Strict", "None"]),
});

type CookieFormValues = z.infer<typeof cookieSchema>;

export default function useCookieForm({
  cookieId,
  domain,
  collectionId,
}: {
  cookieId?: number;
  domain?: string;
  collectionId: string;
}) {
  const { data, isPending } = useCookieDetailQuery({ cookieId });
  const { updateMutation, createMutation } = useCookieMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(cookieSchema),
    values: {
      name: data?.name || "",
      value: data?.value || "",
      path: data?.path || "/",
      maxAge: String(data?.maxAge) || undefined,
      httpOnly: data?.httpOnly || false,
      secure: data?.secure || false,
      sameSite: data?.sameSite || "None",
    },
  });
  const onSubmit: SubmitHandler<CookieFormValues> = (value) => {
    const newValue = {
      ...value,
      maxAge: Number(value.maxAge),
      domain: domain || "",
      collectionId: collectionId,
    };

    // Update if id is provided
    if (cookieId) {
      return updateMutation.mutate({
        ...newValue,
        id: cookieId,
      });
    }

    // Create if id is not provided
    createMutation.mutate(newValue);
    reset();
  };

  return {
    register,
    errors,
    control,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting: updateMutation.isPending || createMutation.isPending,
    // Only display loading state if a cookie is selected
    isLoading: isPending && cookieId,
  };
}
