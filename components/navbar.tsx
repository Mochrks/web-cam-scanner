"use client"

import Link from "next/link"
import { ScanIcon, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ScanIcon className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Web CamScanner</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>

            <Link
              href="https://github.com/mochrks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.801 8.205 11.387.6.111.82-.26.82-.577 0-.285-.011-1.236-.017-2.236-3.338.724-4.043-1.607-4.043-1.607-.546-1.384-1.333-1.754-1.333-1.754-1.089-.743.083-.728.083-.728 1.205.085 1.838 1.237 1.838 1.237 1.068 1.831 2.8 1.303 3.48.995.107-.774.418-1.303.76-1.603-2.665-.303-5.467-1.332-5.467-5.93 0-1.312.469-2.384 1.236-3.22-.124-.303-.536-1.529.117-3.176 0 0 1.007-.322 3.299 1.229.956-.266 1.986-.398 3.006-.402 1.02.004 2.05.136 3.006.402 2.292-1.551 3.299-1.229 3.299-1.229.653 1.647.242 2.873.118 3.176.769.836 1.236 1.908 1.236 3.22 0 4.609-2.805 5.623-5.474 5.918.43.371.815 1.102.815 2.222 0 1.604-.014 2.898-.014 3.287 0 .318.218.692.825.576C20.565 22.1 24 17.604 24 12.297c0-6.627-5.373-12-12-12z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}