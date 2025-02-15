import Checkbox from "@/components/ui/Checkbox";
import EditableText from "@/components/ui/EditableText";
import { useWorkspace } from "@/context/workspace/WorkspaceProvider";

export default function WorkspaceHeaders() {
  const { state, dispatch } = useWorkspace();
  console.log("HEADERS => ", state.headers);

  return (
    <table className="w-full [&_th]:text-start">
      <thead>
        <tr className="text-primary/60 [&>th]:font-normal [&>th]:py-2 [&>th]:border [&>th]:border-border [&>th]:px-4 ">
          <th className="w-12"></th>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {state.headers?.map((header) => {
          return (
            <tr
              key={header.id}
              className="text-primary [&>td]:px-4 [&>td]:py-2 [&>td]:border [&>td]:bg-highlight/50 [&>td]:border-border"
            >
              <td>
                <Checkbox
                  onCheck={(value) => {
                    dispatch({
                      type: "update/headers",
                      payload: {
                        target: "enabled",
                        id: header.id,
                        newValue: !value,
                      },
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
                    dispatch({
                      type: "update/headers",
                      payload: {
                        target: "key",
                        id: header.id,
                        newValue: value,
                      },
                    });
                  }}
                />
              </td>
              <td className="">
                <EditableText
                  placeholder="Value"
                  className="w-0 min-w-full truncate"
                  value={header.value}
                  onBlur={(value) => {
                    dispatch({
                      type: "update/headers",
                      payload: {
                        target: "value",
                        id: header.id,
                        newValue: value,
                      },
                    });
                  }}
                />
              </td>
            </tr>
          );
        })}
        <tr className="text-primary [&>td]:px-4 [&>td]:py-2 [&>td]:border [&>td]:bg-base [&>td]:border-border">
          <td></td>
          <td className="w-[30%]">
            <EditableText
              placeholder="Key"
              key={state.headers?.length}
              value={""}
              onBlur={(value) => {
                if (value) {
                  dispatch({ type: "insert/headers", payload: { key: value } });
                }
              }}
            />
          </td>
          <td>
            <EditableText
              placeholder="Value"
              key={state.headers?.length}
              value={""}
              onBlur={(value) => {
                if (value) {
                  dispatch({
                    type: "insert/headers",
                    payload: { value: value },
                  });
                }
              }}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
