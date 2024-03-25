import { Slide, ToastContainer } from 'react-toastify'

import '@/lib/react-toastify/react-toastify.css'

export default function MasterLayout ({ children }: ComponentProps): JSX.Element {
  return (
    <>
      {children}
      <ToastContainer
        className="
          w-auto font-bold transform-none right-40 left-40
          [&_.Toastify\_\_toast--info]:bg-blue-600 [&_.Toastify\_\_toast--info]:text-white [&_.Toastify\_\_toast--info_.Toastify\_\_toast-icon>svg]:fill-white [&_.Toastify\_\_toast--info_.Toastify\_\_progress-bar]:bg-blue-900
          [&_.Toastify\_\_toast--success]:bg-green-500 [&_.Toastify\_\_toast--success]:text-green-900 [&_.Toastify\_\_toast--success_.Toastify\_\_toast-icon>svg]:fill-green-900 [&_.Toastify\_\_toast--success_.Toastify\_\_progress-bar]:bg-green-800
          [&_.Toastify\_\_toast--warning]:bg-amber-300 [&_.Toastify\_\_toast--warning]:text-amber-800 [&_.Toastify\_\_toast--warning_.Toastify\_\_toast-icon>svg]:fill-amber-800 [&_.Toastify\_\_toast--warning_.Toastify\_\_progress-bar]:bg-amber-600
          [&_.Toastify\_\_toast--error]:bg-destructive [&_.Toastify\_\_toast--error]:text-white [&_.Toastify\_\_toast--error_.Toastify\_\_toast-icon>svg]:fill-white [&_.Toastify\_\_toast--error_.Toastify\_\_progress-bar]:bg-red-800
        "
        position='bottom-center'
        transition={Slide}
        closeOnClick
        stacked
        progressClassName='bg-primary-foreground opacity-100'
        toastClassName='bg-primary text-primary-foreground rounded p-4'
        />
    </>
  )
}
