import { ComponentType } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { EllipsisVerticalIcon, InfoIcon, PencilIcon, Trash2Icon } from 'lucide-react'

interface ButtonProps extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>> {
  label: string
}

interface MenuItemProps {
  label?: string
  icon?: ComponentType
  type?: 'item' | 'separator'
  onClick?: () => void
}

interface OnActionsMenu {
  onDetails?: (props: { [key: string]: any }) => void
  onEdit?: (props: { [key: string]: any }) => void
  onDelete?: (props: { [key: string]: any }) => void
}

interface ActionMenuProps {
  title?: React.ReactNode
  defaultActions?: OnActionsMenu
  buttonProps?: ButtonProps
  menuItems?: MenuItemProps[]
}

export default function ActionMenu ({ title, buttonProps, defaultActions, menuItems }: ActionMenuProps) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" size='icon'>
          <EllipsisVerticalIcon /> {buttonProps?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-40' align="end">
        <DropdownMenuLabel>{title ?? 'Acciones'}</DropdownMenuLabel>

        {defaultActions?.onDetails && (
          <DropdownMenuItem onClick={defaultActions.onDetails}>
            <InfoIcon />Detalles
          </DropdownMenuItem>
        )}

        {defaultActions?.onEdit && (
          <DropdownMenuItem onClick={defaultActions.onEdit}>
            <PencilIcon /> Editar
          </DropdownMenuItem>
        )}

        {menuItems?.map(({ label, type = 'item', icon: Icon, onClick }, i) => {
          return type === 'separator' ? (
            <DropdownMenuSeparator key={`separator-${i}`} className='bg-border' style={{ height: '0.1px' }} />
          ) : (
            <DropdownMenuItem key={label} onClick={onClick}>
              {Icon && <Icon />}{label}
            </DropdownMenuItem>
          )
        })}

        {defaultActions?.onDelete && (
          <>
            <DropdownMenuSeparator className='bg-border' style={{ height: '0.1px' }} />
            <DropdownMenuItem asChild>
              <Button
                className='w-full hover:!text-destructive hover:!bg-destructive/10 justify-start relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0 focus-visible:ring-0'
                onClick={defaultActions.onDelete}
                variant='ghost'
                size='sm'
              >
                <Trash2Icon />Eliminar
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
