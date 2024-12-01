import Link from "next/link"
import { ScanIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2 space-x-6">
            <Link href="https://github.com/mochrks" className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.801 8.205 11.387.6.111.82-.26.82-.577 0-.285-.011-1.236-.017-2.236-3.338.724-4.043-1.607-4.043-1.607-.546-1.384-1.333-1.754-1.333-1.754-1.089-.743.083-.728.083-.728 1.205.085 1.838 1.237 1.838 1.237 1.068 1.831 2.8 1.303 3.48.995.107-.774.418-1.303.76-1.603-2.665-.303-5.467-1.332-5.467-5.93 0-1.312.469-2.384 1.236-3.22-.124-.303-.536-1.529.117-3.176 0 0 1.007-.322 3.299 1.229.956-.266 1.986-.398 3.006-.402 1.02.004 2.05.136 3.006.402 2.292-1.551 3.299-1.229 3.299-1.229.653 1.647.242 2.873.118 3.176.769.836 1.236 1.908 1.236 3.22 0 4.609-2.805 5.623-5.474 5.918.43.371.815 1.102.815 2.222 0 1.604-.014 2.898-.014 3.287 0 .318.218.692.825.576C20.565 22.1 24 17.604 24 12.297c0-6.627-5.373-12-12-12z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2">
              <ScanIcon className="h-6 w-6 text-primary" />
              <span className="font-semibold">NextGen CamScanner</span>
            </Link>
            <p className="mt-2 text-center md:text-left text-base text-gray-400">
              &copy; 2024 NextGen CamScanner. All rights reserved. <a
                href="https://github.com/mochrks"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                @mochrks
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

