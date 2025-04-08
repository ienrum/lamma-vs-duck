import { CrossPad } from "@/src/features/cross-pad/ui/CrossPad";
import DuckVsLammaBoard from "@/src/widgets/duck-vs-lamma/ui/duck-vs-lamma-board";

const LammaVsDuckPage = () => {
  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      <DuckVsLammaBoard />
      <CrossPad />
    </div>
  );
};

export default LammaVsDuckPage;
