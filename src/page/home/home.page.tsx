import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TOPBAR_TITLE } from './constants/page';
const HomePage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{TOPBAR_TITLE}</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default HomePage;
