import { httpStatus } from "@/utils/httpStatus";
import useRequestManager from "@/hooks/managers/useRequestManager";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { cn } from "@/utils/lib";

function getResponseDetails(data?: AxiosError | AxiosResponse) {
  if (!data) return undefined;

  let sizeKB = 0;
  if (!isAxiosError(data)) {
    const contentLength = data?.headers["content-length"];
    sizeKB = (
      contentLength ? (Number(contentLength) * 0.001).toFixed(2) : 0
    ) as number;
  }

  return {
    size: sizeKB,
    statusCode: data.status,
    statusMessage: httpStatus[data?.status as keyof typeof httpStatus],
  };
}

export default function WorkspaceResponseStats() {
  const { responseData, responseError } = useRequestManager();
  const data = getResponseDetails(responseData || responseError);
  const isSuccess = data?.statusCode?.toString().startsWith("2");
  return (
    <ul
      className={cn(
        "px-4 flex gap-4 py-3",
        isSuccess ? "[&_span]:text-highlight-green" : "[&_span]:text-red-400"
      )}
    >
      <li className="text-primary">
        Status <span className="[&&]:text-secondary">:</span>{" "}
        <span className="">
          {data?.statusCode} {"  "}•{"  "}
          <span
            className={cn(
              "px-2 py-0.5 rounded-sm",
              isSuccess
                ? "text-[#78FFA5] border-[#78FFA5]/10 border bg-[#213123]"
                : "text-[#FF78A3] border-[#FF78A3]/10 border bg-[#381C38]"
            )}
          >
            {data?.statusMessage}
          </span>
        </span>
      </li>
      {data && (
        <li className="text-primary">
          Size <span className="[&&]:text-secondary">:</span>{" "}
          {data.size ? (
            <span className="">{data.size}KB</span>
          ) : (
            <span className=""> - </span>
          )}
        </li>
      )}
    </ul>
  );
}
