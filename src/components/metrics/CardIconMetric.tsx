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
      <Card className='cursor-pointer group bg-transparent hover:bg-card hover:brightness-125 border-none rounded-xl'>
        <CardContent className='p-5 flex items-center gap-4'>
          <div className='xl:size-14 size-12 border border-muted rounded-full p-3'>
            <Icon element={icon} size='100%' />
          </div>
          <div className='flex-1 flex flex-col'>
            <h3 className='text-xl xl:text-2xl font-semibold'>{title}</h3>
            <small className='text-muted-foreground'>{description}</small>
          </div>
          {url && <div className=''>
            <Icon element={icons.Caret} className='-scale-x-100 transition-transform translate-x-1.5 group-hover:translate-x-2 opacity-30 group-hover:opacity-90' size='18' />
          </div>}
        </CardContent>
      </Card>
    </Wrapper>
  )
}
