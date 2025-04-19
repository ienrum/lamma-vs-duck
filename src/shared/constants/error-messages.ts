// 언어 타입 정의
export type Language = 'ko' | 'en';

// 현재 언어 설정 - 필요에 따라 변경 가능
export const getCurrentLanguage = (): Language => {
  // 브라우저 환경이 아닐 경우 기본값 반환
  if (typeof window === 'undefined') return 'en';

  // localStorage에서 언어 설정 가져오기
  // 또는 브라우저 언어 설정 사용
  const savedLang = localStorage.getItem('language') as Language;
  const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en';

  return savedLang || browserLang || 'en';
};

// 일반 오류 페이지 메시지
export const ERROR_MESSAGES = {
  ko: {
    title: '이런! 문제가 발생했어요',
    description: '페이지를 로드하는 중에 오류가 발생했습니다.',
    retryButton: '다시 시도하기',
    homeButton: '홈으로 돌아가기',
    devModeTitle: '오류 세부 정보 (개발 모드)',
  },
  en: {
    title: 'Oops! Something went wrong',
    description: 'An error occurred while loading this page.',
    retryButton: 'Try Again',
    homeButton: 'Go to Home',
    devModeTitle: 'Error Details (Development Mode)',
  }
};

// 전역 오류 페이지 메시지
export const GLOBAL_ERROR_MESSAGES = {
  ko: {
    title: '앗! 문제가 발생했어요',
    description: '예상치 못한 오류가 발생했습니다. 불편을 드려 죄송합니다.',
    retryButton: '다시 시도하기',
    homeButton: '홈으로 돌아가기',
    devModeTitle: '오류 세부 정보 (개발 모드)',
    stackTrace: '스택 트레이스',
  },
  en: {
    title: 'Oops! We hit a snag',
    description: 'An unexpected error has occurred. We apologize for the inconvenience.',
    retryButton: 'Try Again',
    homeButton: 'Go to Home',
    devModeTitle: 'Error Details (Development Mode)',
    stackTrace: 'Stack Trace',
  }
};
