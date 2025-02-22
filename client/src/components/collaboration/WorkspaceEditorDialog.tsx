import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../ui/Input";
import Button from "../ui/Button";
import useWorkspaceMutation from "@/hooks/mutation/useWorkspaceMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDialog } from "../ui/Dialog";

const formSchema = z.object({
  name: z.string().nonempty("This field can't be empty"),
});
export default function WorkspaceEditorDialog() {
  const dialog = useDialog();
  const { createWorkspaceMutation } = useWorkspaceMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
    createWorkspaceMutation.mutate(data.name, {
      onSuccess: () => dialog.close(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-base border-border w-full max-w-[40rem] border rounded-md"
    >
      <div className="flex items-center gap-4 border-b border-border px-8 py-6">
        <div className="h-full text-white border rounded-md border-border p-4">
          <Icon icon={"bi:grid-1x2-fill"} className="text-3xl" />
        </div>
        <div>
          <h2 className="text-white text-2xl">Create a new workspace</h2>
          <p className="text-secondary">Customize your new workspace</p>
        </div>
      </div>
      <div className="p-8">
        <Input
          {...register("name")}
          errorMessage={errors.name?.message}
          label="Workspace Name"
          placeholder="Your workspace name"
          className=""
        />
        <p className="text-secondary mt-2">
          Your workspace name will be visible to teams member that you invite
        </p>
        {/* <WorkspaceMemberEditor /> */}
      </div>
      <div className="border-t border-border px-8 py-4 flex items-center justify-end">
        <Button
          className="px-10 py-4"
          isLoading={createWorkspaceMutation.isPending}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
