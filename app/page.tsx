'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductHuntButton from '@/src/shared/ui/product-hunt-button';
import { ChevronRight, Users, Trophy, Clock, Sparkles, Star, Menu } from 'lucide-react';

export default function Page() {
  return (
    <div className="from-background to-background/80 min-h-screen overflow-hidden bg-gradient-to-b">
      <div className="pearl-container py-4 sm:py-6">
        <nav className="bg-background/50 mb-6 flex items-center justify-between rounded-full p-3 shadow-sm backdrop-blur-sm sm:mb-8 sm:p-4">
          <div className="text-foreground flex items-center gap-2 text-xl font-bold sm:text-2xl">
            <span className="text-primary">Lamma</span> vs <span className="text-secondary-foreground">Duck</span>
          </div>
        </nav>

        <div className="space-y-12 sm:space-y-16">
          <section className="from-primary/10 via-secondary/10 to-background relative overflow-hidden rounded-2xl bg-gradient-to-br p-6 sm:rounded-3xl sm:p-8 md:p-12">
            <div className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row">
              <div className="space-y-4 sm:space-y-6 md:w-1/2">
                <div className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-xs font-medium sm:px-4 sm:py-1.5 sm:text-sm">
                  NEW RELEASE 🎮
                </div>
                <h1 className="text-foreground text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl">
                  Fun <span className="text-primary">Lamma</span> and{' '}
                  <span className="text-secondary-foreground">Duck</span>
                  <span className="mt-2 block">Matching Game World</span>
                </h1>
                <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl">
                  Create the ultimate gaming experience with exciting puzzles
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link href="/home">
                    <Button
                      size="default"
                      className="pearl-hover rounded-full px-4 py-2 text-sm font-medium sm:px-8 sm:py-7 sm:text-lg"
                    >
                      Get Started <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-xs sm:text-sm">Already played by 1,000+ people</span>
                </div>
              </div>
              <div className="relative h-56 w-full sm:h-64 md:h-80 md:w-1/2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-48 w-48 rotate-3 transform overflow-hidden rounded-3xl shadow-xl transition-transform duration-300 hover:rotate-0 sm:h-56 sm:w-56 md:h-64 md:w-64">
                    <Image src="/bee.gif" alt="Game Preview" fill className="object-cover" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 h-36 w-36 -rotate-6 transform overflow-hidden rounded-3xl shadow-xl transition-transform duration-300 hover:rotate-0 sm:-bottom-10 sm:-left-10 sm:h-40 sm:w-40 md:h-48 md:w-48">
                    <Image src="/lamma.gif" alt="Game Character" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary/10 absolute -right-20 -bottom-20 h-48 w-48 rounded-full blur-3xl sm:h-64 sm:w-64"></div>
            <div className="bg-secondary/10 absolute -top-20 -left-20 h-48 w-48 rounded-full blur-3xl sm:h-64 sm:w-64"></div>
          </section>

          <section className="space-y-6 text-center sm:space-y-8">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Game Features</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
              Lamma vs Duck provides a new dimension of gaming experience beyond a simple matching game
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 md:mt-12 md:grid-cols-3 lg:gap-8">
              <Card className="from-background to-background/80 border-0 bg-gradient-to-br shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
                    <Sparkles className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Simple Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Move rows and columns with arrow keys - intuitive controls make it easy for anyone to play.
                  </p>
                </CardContent>
              </Card>

              <Card className="from-background to-background/80 border-0 bg-gradient-to-br shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
                    <Trophy className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Real-time Rankings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Compete with other players and check your rank on the leaderboard.
                  </p>
                </CardContent>
              </Card>

              <Card className="from-background to-background/80 border-0 bg-gradient-to-br shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:col-span-2 md:col-span-1">
                <CardHeader className="pb-2">
                  <div className="bg-primary/10 mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl sm:h-12 sm:w-12">
                    <Clock className="text-primary h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl">Challenge Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Complete challenges with time limits and score points.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="from-primary/5 to-secondary/5 rounded-2xl bg-gradient-to-r p-6 sm:rounded-3xl sm:p-8 md:p-12">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">Game Rules</h2>
              <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8 sm:text-base">
                        1
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Use arrow keys to move rows and columns
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8 sm:text-base">
                        2
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Tiles at the edges will automatically enter the board
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm sm:h-8 sm:w-8 sm:text-base">
                        3
                      </div>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        Match the same animals to score points!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background relative w-96 overflow-hidden rounded-xl p-2 shadow-lg sm:h-56 sm:p-4 md:h-128">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image src="/lamma.gif" alt="Game Play" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6 sm:space-y-8">
            <h2 className="text-center text-2xl font-bold sm:text-3xl md:text-4xl">Player Reviews</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3">
              {[
                {
                  name: 'James Kim',
                  comment: 'Simple yet addictive game. I lose track of time while playing!',
                  rating: 5,
                },
                {
                  name: 'Henry Lee',
                  comment: 'Cute graphics and intuitive controls make it easy for anyone to enjoy.',
                  rating: 4,
                },
                {
                  name: 'Sarah Park',
                  comment:
                    "It's more fun competing with friends on the leaderboard! Looking forward to new characters.",
                  rating: 5,
                },
              ].map((review, i) => (
                <Card key={i} className="from-background to-background/80 bg-gradient-to-br">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="mb-2 flex">
                      {Array(5)
                        .fill(0)
                        .map((_, idx) => (
                          <Star
                            key={idx}
                            fill={idx < review.rating ? 'currentColor' : 'none'}
                            className="h-4 w-4 text-yellow-500 sm:h-5 sm:w-5"
                          />
                        ))}
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm sm:mb-4 sm:text-base">
                      &quot;{review.comment}&quot;
                    </p>
                    <p className="text-sm font-medium sm:text-base">- {review.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4 py-8 text-center sm:space-y-6 sm:py-12">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Start Playing Now</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
              The ultimate matching game experience awaits you
            </p>
            <Link href="/home">
              <Button
                size="lg"
                className="pearl-hover mt-4 rounded-full px-6 py-5 text-base font-medium sm:mt-6 sm:px-10 sm:py-7 sm:text-lg"
              >
                Play For Free <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </Link>
          </section>
        </div>

        <div className="mt-12 flex justify-center sm:mt-16 md:mt-24">
          <ProductHuntButton />
        </div>

        <footer className="text-muted-foreground border-border/40 mt-8 border-t py-6 sm:mt-12 sm:py-8 md:mt-16">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-xs sm:text-sm">© 2024 Lamma vs Duck. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-primary text-xs sm:text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary text-xs sm:text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-primary text-xs sm:text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
