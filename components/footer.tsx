import Link from "next/link"
import { ScanIcon } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">

          <Link href="/" className="flex items-center justify-center md:justify-start space-x-2">
            <ScanIcon className="h-6 w-6 text-primary" />
            <span className="font-semibold">Web CamScanner</span>
          </Link>
          <p className="mt-2 text-center md:text-left text-base text-gray-400">
            &copy; 2024 Web CamScanner. All rights reserved. <a
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
    </footer>
  )
}

