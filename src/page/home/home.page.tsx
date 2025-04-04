
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/card';
import { TOPBAR_TITLE } from './constants/page';
import { Button } from '@/src/shared/ui/button';
import { CrossPad } from '@/src/features/cross-pad/ui/CrossPad';
import DuckVsLammaBoard from '@/src/widgets/duck-vs-lamma/ui/duck-vs-lamma-board';

const HomePage = () => {
  return (
    <div className='flex flex-col gap-4 p-4'>
      <Card >
        <CardHeader>
          <CardTitle>{TOPBAR_TITLE}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <Button color="primary">Click me</Button>
          <Button color="secondary">Click me</Button>
          <Button color="warning">Click me</Button>
          <Button color="error">Click me</Button>
        </CardContent>
      </Card>
      <div className='flex flex-col gap-4 justify-center items-center'>
        <DuckVsLammaBoard />
        <CrossPad />
      </div>
    </div>
  );
};

export default HomePage;
