
import { Card, CardHeader, CardTitle, CardContent } from '@/src/shared/ui/card';
import { TOPBAR_TITLE } from './constants/page';
import { Button } from '@/src/shared/ui/button';
import DuckVsLammaCrossPad from '@/src/widgets/GmaePad/DuckVsLammaCrossPad';

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
          <Button color="error">Click me</Button></CardContent>
      </Card>
      <DuckVsLammaCrossPad />
    </div>
  );
};

export default HomePage;
