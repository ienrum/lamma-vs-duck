'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { GLOBAL_ERROR_MESSAGES, Language, getCurrentLanguage } from '@/src/shared/constants/error-messages'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [language, setLanguage] = useState<Language>('ko')

  useEffect(() => {
    // 선택적: 에러 로깅 서비스에 오류 보고
    console.error('Global error occurred:', error)
    // 언어 설정 가져오기
    setLanguage(getCurrentLanguage())
  }, [error])

  const messages = GLOBAL_ERROR_MESSAGES[language]

  return (
    <html lang={language}>
      <body className="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{messages.title}</h1>
            <p className="mt-2 text-gray-600">
              {messages.description}
            </p>
          </div>

          <div className="flex flex-col space-y-4">
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
            <div className="mt-6 rounded-md bg-gray-100 p-4">
              <h3 className="font-medium text-gray-800">{messages.devModeTitle}</h3>
              <div className="mt-2 overflow-auto text-sm text-gray-600">
                <pre>{error.message}</pre>
                {error.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer font-medium">{messages.stackTrace}</summary>
                    <pre className="mt-2 whitespace-pre-wrap break-all">{error.stack}</pre>
                  </details>
                )}
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  )
} 