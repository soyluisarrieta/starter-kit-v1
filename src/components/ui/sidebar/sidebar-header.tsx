import { cn } from '@/lib/utils'
import { Link } from 'react-router'

interface SidebarHeaderProps {
  isSidebarOpen: boolean
  lgScreen: boolean
}

export const SidebarHeader = ({ isSidebarOpen, lgScreen }: SidebarHeaderProps): JSX.Element => (
  <Link to='/'>
    <div className='w-fit h-12 flex items-center cursor-pointer transition-transform active:scale-95 hover:opacity-85'>
      <div className={cn('h-full flex justify-center items-center flex-shrink-0 ml-0.5')}>
        <svg className='h-full cursor-pointer' fill='none' viewBox='0 0 32 32'>
          <path
            clipRule='evenodd'
            d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
            fill='currentColor'
            fillRule='evenodd'
          />
        </svg>
      </div>
      <div className={cn('transition-all duration-200 overflow-hidden font-semibold text-xl select-none', !isSidebarOpen && lgScreen && 'opacity-0')}>
        ACME
      </div>
    </div>
  </Link>
)
