import Checkbox from "@/components/ui/Checkbox";
import EditableText from "@/components/ui/EditableText";
import { Request } from "@/utils/types";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  header: Request["headers"][number];
  onChange: (params: {
    key: string;
    value: string | boolean;
    id: string;
  }) => void;
  onDelete: (id: string) => void;
};

function WorkspaceHeadersRow({ header, onDelete, onChange }: Props) {
  return (
    <tr className="relative text-primary [&>td]:px-4 [&>td]:py-2 [&>td]:border [&>td]:bg-highlight/50 [&>td]:border-border group cursor-pointer h-full">
      <td>
        <div className="group-hover:opacity-100 group-hover:visible invisible opacity-0 absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 bg-gradient-to-l pl-6 from-50%  from-base to-transparent hover:[&>*]:text-red-400">
          <Icon
            icon="iconamoon:trash-light"
            className="text-xl transition duration-50"
            onClick={() => onDelete(header.id)}
          />
        </div>
        <Checkbox
          onCheck={(value) => {
            onChange({
              id: header.id,
              key: "enabled",
              value: value,
            });
          }}
          value={header.enabled}
        />
      </td>
      <td className="w-[30%] min-w-[15rem]">
        <EditableText
          placeholder="Key"
          value={header.key}
          onBlur={(value) => {
            onChange({ id: header.id, key: "key", value });
          }}
        />
      </td>
      <td className="">
        <EditableText
          placeholder="Value"
          className="w-0 min-w-full truncate"
          value={header.value}
          onBlur={(value) => {
            onChange({ id: header.id, key: "value", value });
          }}
        />
      </td>
    </tr>
  );
}

export default WorkspaceHeadersRow;
