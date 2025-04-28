'use client';

import { TwitterShareButton, TwitterIcon } from 'next-share';
import { Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ShareButtonsProps {
  className?: string;
  gameTitle: string;
  score: string;
}

export const ShareButtons = ({ className, gameTitle, score }: ShareButtonsProps) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const xShareText = `I scored ${score} in ${gameTitle}! 🎮`;
  const threadsShareText = `I scored ${score} in ${gameTitle}! 🎮 \n ${currentUrl}`;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <TwitterShareButton url={currentUrl} title={xShareText}>
        <div className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-white transition-colors hover:bg-gray-800">
          <TwitterIcon size={20} round />
          <span className="text-sm font-medium">Share on X</span>
        </div>
      </TwitterShareButton>

      <a
        href={`https://threads.net/intent/post?text=${encodeURIComponent(threadsShareText)}&url=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[#2d2d2d] px-4 py-2 text-white transition-colors hover:bg-[#3d3d3d]"
      >
        <Share2 className="h-5 w-5" />
        <span className="text-sm font-medium">Share on Threads</span>
      </a>
    </div>
  );
};
