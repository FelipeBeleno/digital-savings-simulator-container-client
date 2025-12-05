'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Zap, ShoppingBag, Lightbulb } from 'lucide-react'

const Navbar = () => {
  const pathname = usePathname()

  const links = [
    {
      label: 'Productos',
      href: '/products',
      icon: ShoppingBag,
    },
    {
      label: 'Onboarding',
      href: '/onboarding',
      icon: Lightbulb,
    },
    {
      label: 'Simulador',
      href: '/simulator',
      icon: Zap,
    },
  ]

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-6xl mx-auto px-8 py-4'>
        <div className='flex items-center justify-between gap-8'>
          <Link href='/products' className='font-bold text-2xl text-gray-900'>
            💰 Savings
          </Link>

          <div className='flex items-center gap-1'>
            {links.map((link) => {
              const isActive = pathname === link.href
              const Icon = link.icon

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className='h-5 w-5' />
                  <span className='hidden sm:inline'>{link.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
