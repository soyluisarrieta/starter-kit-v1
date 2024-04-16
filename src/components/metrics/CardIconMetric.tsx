import { Icon, type IconProps, icons } from '@/components/icons/Icons'
import { Card, CardContent } from '@/components/ui/card'
import { Fragment } from 'react/jsx-runtime'
import { Link } from 'wouter'

interface Props {
  icon: IconProps['element']
  title: string
  description: string
  url?: string
}

export default function CardIconMetric ({ icon, title, description, url }: Props): JSX.Element {
  const Wrapper = url ? Link : Fragment
  return (
    <Wrapper to={url ?? '#' + title} asChild>
      <Card className='cursor-pointer group hover:brightness-110 border-none rounded-xl'>
        <CardContent className='p-6 flex items-center gap-4'>
          <div className='size-14 border border-muted rounded-full p-3'>
            <Icon element={icon} size='100%' />
          </div>
          <div className='flex-1'>
            <h4 className='text-xl'>{title}</h4>
            <small className='text-muted-foreground'>{description}</small>
          </div>
          <div>
            <Icon element={icons.Caret} className='-scale-x-100 transition-transform translate-x-1.5 group-hover:translate-x-2 opacity-30 group-hover:opacity-90' size='18' />
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  )
}
