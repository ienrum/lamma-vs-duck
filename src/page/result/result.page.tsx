import { getQueryClient } from "@/src/app/utils/get-query-client";
import { getRanking } from "@/src/widgets/leader-board/api/use-get-ranking";
import LeaderBoard from "@/src/widgets/leader-board/ui/leader-board";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const ResultPage = async () => {
  const queryClient = getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4">
      {/* <DeviationGraph /> */}
      <HydrationBoundary state={dehydratedState}>
        <LeaderBoard />
      </HydrationBoundary>
    </div>
  );
};

export default ResultPage;
