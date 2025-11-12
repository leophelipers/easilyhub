/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeEnglish({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0 text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">Cookie Policy</h2>
          <p className="text-sm mb-6 text-left">
            This website uses cookies to improve your browsing experience,
            respecting your privacy in accordance with the GDPR. We will not use
            your data for any purpose without your explicit consent. Please see
            our Privacy Policy for more details. Manage your preferences or
            click "Accept" to allow the use of cookies{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Cookie Policy</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Decline
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Accept</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Content overlay */}
      <div className="relative z-10 p-4">
        {/* Add any additional content that should appear over the iframe here */}
      </div>
    </main>
  )
}
