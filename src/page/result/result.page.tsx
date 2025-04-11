import LeaderBoard from "@/src/widgets/leader-board/ui/leader-board";
// import DeviationGraph from "@/src/widgets/deviation-graph/ui/standard-deviation-graph";

const ResultPage = async () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full p-4">
      {/* <DeviationGraph /> */}
      <LeaderBoard />
    </div>
  );
};

export default ResultPage;
