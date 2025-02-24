import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../ui/Input";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/utils/API";
import { QUERY_KEYS } from "@/utils/queryKeys";
import { SuccessReponse, User } from "@/utils/types";
import Button from "../ui/Button";
import Skeleton from "react-loading-skeleton";
import { cn } from "@/utils/lib";
import useUserInviteMutation from "@/hooks/mutation/collaboration/useUserInviteMutation";
import useClickOutside from "@/hooks/useClickOutside";

export default function UserSearch() {
  const userInviteMutation = useUserInviteMutation();
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const container = useClickOutside<HTMLDivElement>(() => {
    setFocused(false);
  });
  const debouncedQuery = useDebounce(search, 300);
  const userSearchQuery = useQuery({
    queryFn: async () => {
      const urlQuery = debouncedQuery ? `?searchQuery=${debouncedQuery}` : "";
      const res = await API.post<SuccessReponse<User[]>>(
        `/users/search${urlQuery}`
      );
      return res.data.data;
    },
    queryKey: [QUERY_KEYS.USER_SEARCH, debouncedQuery],
  });

  return (
    <div className="relative" ref={container}>
      <div className="relative">
        <Input
          placeholder="Add members by name or by email"
          inputClassName="pl-13"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          value={search}
        />
        <Icon
          icon="mingcute:search-line"
          className="absolute left-4 top-1/2 -translate-y-[50%] text-2xl text-secondary"
        />
      </div>
      <ul
        className={cn(
          "absolute top-15 bg-base left-0 right-0 border border-border p-1.5 flex flex-col opacity-0 invisible gap-0.5 rounded-sm max-h-[15rem] transition duration-100 scale-[97.5%] shadow-lg shadow-black/10",
          focused && search && "opacity-100 visible scale-100"
        )}
      >
        {!(userSearchQuery.isPending || userSearchQuery.isLoading) &&
          userSearchQuery.data?.length === 0 && (
            <div className="flex flex-col items-center py-6">
              <Icon
                icon="iconoir:file-not-found"
                className="text-secondary text-[3rem] mb-4"
              />
              <p className="text-white text-lg">No Users Found</p>
              <p className="text-secondary">
                Try searching with a different keyword
              </p>
            </div>
          )}
        {(userSearchQuery.isPending || userSearchQuery.isLoading) &&
          new Array(4).fill("x").map((_, i) => {
            return <Skeleton key={i} className="h-8 w-full rounded-sm" />;
          })}
        {userSearchQuery.data?.map((user) => {
          return (
            <li className={cn("flex gap-4 items-center px-4 py-2 rounded-sm")}>
              <img
                referrerPolicy="no-referrer"
                src={user.profilePicture}
                alt="pfp"
                className="h-8 aspect-square rounded-full"
              />
              <p className="text-white">{user.username}</p>
              <p className="text-secondary truncate max-w-[17rem]">
                {user.email}
              </p>

              <Button
                isLoading={
                  userInviteMutation.isPending &&
                  userInviteMutation.variables.recepientId === user.id
                }
                className="ml-auto py-2 border-none px-2 hover:bg-secondary/5"
                variant={"hollow"}
                onClick={(e) => {
                  e.preventDefault();
                  userInviteMutation.mutate({
                    recepientId: user.id,
                    query: debouncedQuery,
                  });
                }}
              >
                + Add
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
