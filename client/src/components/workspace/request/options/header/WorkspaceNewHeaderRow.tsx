import EditableText from "@/components/ui/EditableText";
import useRequestHeaderManager from "@/hooks/managers/useRequestHeaderManager";

export default function WorkspaceNewHeaderRow() {
  const { insertHeader, headers } = useRequestHeaderManager();
  return (
    <tr className="text-primary [&>td]:px-4 [&>td]:py-2 [&>td]:border [&>td]:bg-base [&>td]:border-border">
      <td></td>
      <td className="w-[30%]">
        <EditableText
          key={headers?.length}
          placeholder="Key"
          value={""}
          onBlur={(key) => {
            if (key) insertHeader({ key });
          }}
        />
      </td>
      <td>
        <EditableText
          key={headers?.length}
          placeholder="Value"
          value={""}
          onBlur={(value) => {
            if (value) insertHeader({ value });
          }}
        />
      </td>
    </tr>
  );
}
