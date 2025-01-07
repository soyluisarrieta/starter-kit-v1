import { Icon, type IconProps, icons } from '@/components/icons/Icons'
import { Card, CardContent } from '@/components/ui/card'
import Wrapper from '@/components/ui/wrapper'
import { Link } from 'react-router'

interface Props {
  icon: IconProps['element']
  title: string
  description: string
  url?: string
}

export default function CardIconWidget ({ icon, title, description, url }: Props): JSX.Element {
  return (
    <Wrapper component={url ? Link : undefined} to={url ?? '#' + title}>
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
            <Icon element={icons.Caret} className='-scale-x-100 transition-transform translate-x-1 group-hover:translate-x-1.5 opacity-30 group-hover:opacity-90' size='18' />
          </div>}
        </CardContent>
      </Card>
    </Wrapper>
  )
}
