import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircleIcon, ChevronLeftIcon, LucideIcon } from 'lucide-react'
import { create } from 'zustand'
import { useEffect } from 'react'

import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { JSX } from 'react'

interface FormState {
  step: number
  selections: Record<string, string>
  setStep: (step: number) => void
  setSelection: (stepId: string, value: any) => void
  reset: () => void
}

const useFormStore = create<FormState>((set) => ({
  step: 0,
  selections: {},
  setStep: (step) => set({ step }),
  setSelection: (stepId, value) => set((state) => ({
    selections: { ...state.selections, [stepId]: value },
    step: state.step + 1
  })),
  reset: () => set({ step: 0, selections: {} })
}))

type FormItems = {
  id: string | number
  title: string
  icon?: LucideIcon
  image?: string
}

type FormCustom = {
  custom: JSX.Element
  button?: {
    label?: string
    onClick?: () => void
  }
}

type FormStep = {
  id: string
  title: string
  description?: string
  items?: FormItems[] | FormCustom
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
  const stepId = currentStep.id

  useEffect(() => {
    if (currentStep.items && !(currentStep.items instanceof Array) && selections[stepId]) {
      const stepSelections = selections[stepId] as unknown as Record<string, string>

      Object.keys(stepSelections).forEach((key) => {
        const field = document.querySelector(`#${stepId} form [name="${key}"]`) as HTMLInputElement
        if (field) {
          field.value = stepSelections[key]
        }
      })
    }
  }, [stepId, currentStep.items, selections])

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep.items && !(currentStep.items instanceof Array)) {
      const { button } = currentStep.items as FormCustom
      const form = document.querySelector(`#${stepId} form`) as HTMLFormElement

      if (form && form.checkValidity()) {
        const formData = new FormData(form)
        const formValues = Object.fromEntries(formData)
        setSelection(stepId, formValues)
        button?.onClick?.()
      } else {
        form?.reportValidity()
      }
    }
  }

  if (currentStep.items instanceof Array) {
    return (
      <div id={stepId} className="flex flex-wrap justify-center gap-2">
        {currentStep.items.map((item) => (
          <OptionCard
            key={item.id}
            title={item.title}
            icon={item.icon}
            image={item.image}
            selected={selections[stepId] === item.id}
            onClick={() => setSelection(stepId, item.id)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className='flex flex-wrap justify-center gap-2'>
      <div id={stepId}>
        {currentStep.items?.custom}
      </div>
      <Button onClick={handleOnSubmit}>
        {currentStep.items?.button?.label || 'Siguiente'}
      </Button>
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
            Paso {step + 1} de {steps.length + 1}
          </span>
        </div>

        <Progress className='h-2' value={progress} />
      </div>

      {step !== steps.length ? (
        <AnimatePresence mode="wait" initial={false}>
          <div>
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
          </div>
        </AnimatePresence>
      ) : (
        <div className="text-center py-2">
          <CheckCircleIcon className="inline-block mb-4 h-16 w-16 text-foreground" strokeWidth={1.3} />
          <h2 className="text-2xl font-semibold">¡Completado!</h2>
          <p className="text-muted-foreground mb-10">Si todo está listo, confirmalo pulsando el botón.</p>
          <Button onClick={() => onSubmit(selections)}>
            Finalizar
          </Button>
        </div>
      )}
    </div>
  )
}
