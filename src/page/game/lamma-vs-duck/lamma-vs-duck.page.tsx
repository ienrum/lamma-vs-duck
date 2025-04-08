import { CrossPad } from "@/src/features/cross-pad/ui/CrossPad";
import DuckVsLammaBoard from "@/src/widgets/duck-vs-lamma/ui/duck-vs-lamma-board";
import BackwardButton from "@/src/widgets/duck-vs-lamma/ui/backward-button";

const LammaVsDuckPage = () => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      <DuckVsLammaBoard />
      <div className="flex gap-4 py-8">
        <CrossPad />
        <BackwardButton />
      </div>
    </div>
  );
};

export default LammaVsDuckPage;
