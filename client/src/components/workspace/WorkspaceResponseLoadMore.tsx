type Props = {
  shouldRenderWhen?: boolean;
  onClick: () => void;
};

export default function WorkspaceResponseLoadMore({
  shouldRenderWhen,
  onClick,
}: Props) {
  return (
    shouldRenderWhen && (
      <div className="absolute inset-0 top-[80%] bg-gradient-to-t from-base to-transparent flex items-center justify-center">
        <div
          className="absolute bottom-4 flex items-center flex-col "
          onClick={onClick}
        >
          <p className=" text-white text-md bg-base border border-border px-6 py-2 rounded-md shadow-xl hover:opacity-75 transition duration-100 cursor-pointer">
            Load More
          </p>
          <p className="text-secondary mt-3  whitespace-normal">
            Note: Loading too many formatted lines may cause performance issues.
          </p>
        </div>
      </div>
    )
  );
}
