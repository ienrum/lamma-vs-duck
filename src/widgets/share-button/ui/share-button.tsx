'use client';

import { Share2 } from 'lucide-react';
import domtoimage from 'dom-to-image';

interface ShareButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export const ShareButton = ({ targetRef }: ShareButtonProps) => {
  const handleShare = async () => {
    if (!targetRef.current) return;

    try {
      // 캡처 전에 요소의 크기와 위치를 확인
      const element = targetRef.current;
      const rect = element.getBoundingClientRect();

      const dataUrl = await domtoimage.toPng(element, {
        quality: 1,
        height: rect.height,
        width: rect.width,
        style: {
          transform: 'scale(1)', // 스케일 조정
          margin: '0',
          padding: '0',
        },
        cacheBust: true, // 캐시 무시
      });

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      if (navigator.share) {
        await navigator.share({
          files: [new File([blob], 'deviation-graph.png', { type: 'image/png' })],
          title: '내 성과 공유하기',
        });
      } else {
        // 공유 API를 지원하지 않는 경우 다운로드
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'deviation-graph.png';
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('공유 실패:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="absolute top-4 right-4 rounded-full bg-white p-2 shadow-md hover:bg-gray-50"
      aria-label="공유하기"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
};
