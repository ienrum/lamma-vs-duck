'use client'

import { Suspense } from "react";
import dynamic from "next/dynamic";

const DynamicLeaderBoard = dynamic(() => import("@/src/widgets/leader-board/ui/leader-board"), {
  ssr: false,
});

const LeaderBoardFallback = () => (
  <div className="w-full h-[60vh] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
    <p className="text-gray-500 font-medium">로딩 중...</p>
  </div>
);

const ResultPage = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4">
      {/* <DeviationGraph /> */}
      <Suspense fallback={<LeaderBoardFallback />}>
        <DynamicLeaderBoard />
      </Suspense>
    </div>
  );
};

export default ResultPage;
