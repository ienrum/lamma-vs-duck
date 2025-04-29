import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductHuntButton from '@/src/shared/ui/product-hunt-button';

export default function Page() {
  return (
    <div className="bg-background min-h-screen">
      <div className="pearl-container py-12">
        <nav className="mb-16 flex items-center justify-between">
          <div className="text-foreground text-2xl font-semibold">Lamma vs Duck</div>
        </nav>

        <div className="space-y-24">
          <section className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-foreground text-6xl leading-tight font-medium">
                Discover the essence of
                <span className="block">matching game.</span>
              </h1>
              <p className="text-muted-foreground text-2xl">
                Let&apos;s shape your gaming experience into a masterpiece together.
              </p>
            </div>
            <Link href="/home">
              <Button className="pearl-hover rounded-full px-8 py-6">Get started →</Button>
            </Link>
          </section>

          <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Game Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Use arrow keys to move rows and columns</li>
                  <li>• Tiles at the edges will automatically enter</li>
                  <li>• Match the numbers to win!</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Compete with other players and see who can match the animals the fastest!
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/result/1">
                  <Button variant="outline" className="pearl-hover w-full p-4">
                    View rankings →
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </section>
        </div>
        <ProductHuntButton />

        <footer className="text-muted-foreground mt-24 py-8 text-sm">
          © 2024 Lamma vs Duck. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
