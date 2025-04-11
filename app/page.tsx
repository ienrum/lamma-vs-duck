import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">
            🦙 Lamma vs Duck 🦆
          </h1>
          <p className="text-xl text-gray-600">
            Match the animals and test your skills!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Game Rules</CardTitle>
              <CardDescription>
                Match the number of 🦙lamas and 🦆ducks on the board!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Use arrow keys to move rows and columns</li>
                <li>• Tiles at the edges will automatically enter</li>
                <li>• Match the numbers to win!</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/home" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start Game
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Leaderboard</CardTitle>
              <CardDescription>
                Check out the top players!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Compete with other players and see who can match the animals the fastest!
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/result" className="w-full">
                <Button variant="outline" className="w-full">
                  View Leaderboard
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Can you match the animals? Let&apos;s find out!</p>
        </div>
      </div>
    </div>
  );
}
