import useRequestHeaderManager from "@/hooks/managers/useRequestHeaderManager";
import WorkspaceHeadersRow from "./WorkspaceHeadersRow";
import WorkspaceNewHeaderRow from "./WorkspaceNewHeaderRow";

export default function WorkspaceHeaders() {
  const { headers, changeHeader, deleteHeaderRow } = useRequestHeaderManager();
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
        {headers?.map((header) => {
          return (
            <WorkspaceHeadersRow
              key={header.id}
              onChange={changeHeader}
              onDelete={deleteHeaderRow}
              header={header}
            />
          );
        })}

        <WorkspaceNewHeaderRow />
      </tbody>
    </table>
  );
}
