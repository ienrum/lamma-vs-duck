'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ERROR_MESSAGES, Language, getCurrentLanguage } from '@/src/shared/constants/error-messages'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [language, setLanguage] = useState<Language>('ko')

  useEffect(() => {
    // 로그 서비스에 오류를 기록할 수 있습니다
    console.error('Error occurred:', error)
    // 언어 설정 가져오기
    setLanguage(getCurrentLanguage())
  }, [error])

  const messages = ERROR_MESSAGES[language]

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <div className="max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">{messages.title}</h2>
          <p className="mt-2 text-gray-600">
            {messages.description}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          <Button
            onClick={reset}
            className="w-full bg-blue-600 py-2 text-white transition hover:bg-blue-700"
          >
            {messages.retryButton}
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="outline"
            className="w-full border border-gray-300 py-2 text-gray-700 transition hover:bg-gray-50"
          >
            {messages.homeButton}
          </Button>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mt-5 rounded-md bg-gray-50 p-3">
            <h3 className="text-sm font-medium text-gray-800">{messages.devModeTitle}</h3>
            <div className="mt-1 text-xs text-gray-600">
              <p>{error.message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 