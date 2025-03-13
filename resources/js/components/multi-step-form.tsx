import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircleIcon, ChevronLeftIcon, LucideIcon } from 'lucide-react'
import { create } from 'zustand'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

interface FormState {
  step: number
  selections: Record<string, string>
  setStep: (step: number) => void
  setSelection: (step: number, value: string | number) => void
  reset: () => void
}

const useFormStore = create<FormState>((set) => ({
  step: 0,
  selections: {},
  setStep: (step) => set({ step }),
  setSelection: (step, value) => set((state) => ({
    selections: { ...state.selections, [step]: value },
    step: state.step + 1
  })),
  reset: () => set({ step: 0, selections: {} })
}))

type FormStep = {
  title: string
  description?: string
  items: {
    id: string | number
    title: string
    icon?: LucideIcon
    image?: string
  }[]
}

const OptionCard = ({
  title,
  icon: Icon,
  image,
  selected,
  onClick
}: {
  title: string
  icon?: LucideIcon
  image?: string
  selected?: boolean
  onClick?: () => void
}) => (
  <Card
    onClick={onClick}
    className={cn(
      'min-w-36 cursor-pointer p-4 transition-all hover:ring-2 gap-4',
      selected && 'ring-2 ring-primary bg-foreground text-background'
    )}
  >
    {image && <img src={image} alt={title} className="size-44 object-cover rounded" />}
    {Icon && <Icon className="mb-10 h-12 w-12" />}
    <h3 className="font-semibold">{title}</h3>
  </Card>
)

const StepForm = ({ steps }: { steps: FormStep[] }) => {
  const { step, selections, setSelection } = useFormStore()
  const currentStep = steps[step]

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {currentStep?.items.map((item) => (
        <OptionCard
          key={item.id}
          title={item.title}
          icon={item.icon}
          image={item.image}
          selected={selections[step] === item.id}
          onClick={() => setSelection(step, item.id)}
        />
      ))}
    </div>
  )
}

export const MultiStepForm = ({
  steps,
  onSubmit
}: {
  steps: FormStep[]
  onSubmit: (data: Record<string, string>) => void
}) => {
  const { step, setStep, selections } = useFormStore()
  const progress = (step / steps.length) * 100

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeftIcon className="mr-2" /> Volver
          </Button>
          <span className="text-sm">
            Paso {step + 1} de {steps.length}
          </span>
        </div>

        <Progress className='h-2' value={progress} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.15 }}
            className='my-7'
          >
            <h1 className="text-2xl font-semibold text-center">
              {steps[step]?.title}
            </h1>
            {steps[step]?.description && (
              <p className="text-muted-foreground text-center">{steps[step].description}</p>
            )}
          </motion.div>
          <StepForm steps={steps} />
        </AnimatePresence>
      </div>

      {step === steps.length && (
        <div className="text-center py-2">
          <CheckCircleIcon className="inline-block mb-4 h-16 w-16 text-foreground" strokeWidth={1.3} />
          <h2 className="text-2xl font-semibold">¡Completado!</h2>
          <p className="text-muted-foreground mb-10">Si estás listo, pulsa el botón para continuar.</p>
          <Button className="w-full" onClick={() => onSubmit(selections)}>
            Finalizar
          </Button>
        </div>
      )}
    </div>
  )
}
