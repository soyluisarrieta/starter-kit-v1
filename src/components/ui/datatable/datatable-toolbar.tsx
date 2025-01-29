import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table } from '@tanstack/react-table'
import { ArrowDownUpIcon, Columns3Icon, LayoutGridIcon, ListFilterIcon, ListIcon, PlusIcon, SearchIcon, Settings2Icon, TablePropertiesIcon, XCircleIcon } from 'lucide-react'
import { useScreenSize } from '@/hooks/useScreenSize'
import { cn } from '@/lib/utils'
import PopoverWithTooltip from '@/components/ui/popover-with-tooltip'
import { useState } from 'react'

interface TableToolbarProps<TData> {
  table: Table<TData>
  disableSearch?: boolean
  onAdd?: () => void
}

const DESIGN_MODES = { TABLE: 't', GALLERY: 'g', LIST: 'l' }

export const TableToolbar = <TData,>({ table, disableSearch, onAdd }: TableToolbarProps<TData>) => {
  const [selectedDesignMode, setSelectedDesignMode] = useState(DESIGN_MODES.TABLE)
  const { lgScreen } = useScreenSize()
  const isFiltered = table.getState().globalFilter || table.getState().columnFilters.length > 0

  return (
    <div className="flex justify-between items-center py-2 gap-2">
      {/* Buscador */}
      {!disableSearch && (
        <div className='relative flex-1 w-full lg:max-w-sm'>
          <SearchIcon className='size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none' />
          <Input
            className="w-full px-9"
            placeholder="Buscar..."
            value={(table.getState().globalFilter ?? '')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
          />
          {isFiltered && (
            <Button
              className="h-8 px-2 lg:px-2 absolute right-0 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
              variant="link"
              size='icon'
              title='Reiniciar búsqueda'
              onClick={() => {
                table.setGlobalFilter('')
                table.resetColumnFilters()
              }}
            >
              <XCircleIcon />
            </Button>
          )}
        </div>
      )}

      <div className='w-full flex flex-1 justify-end items-center gap-1'>
        {lgScreen ? (
          <>
            {/* Modos de visualización */}
            <ToggleGroup
              type="single"
              value={selectedDesignMode}
              onValueChange={(designMode) => {setSelectedDesignMode(designMode ? designMode : selectedDesignMode)}}
            >
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem asChild value={DESIGN_MODES.LIST} className='text-muted-foreground hover:text-foreground'>
                    <ListIcon strokeWidth={1.7} />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Lista</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem asChild value={DESIGN_MODES.TABLE} className='text-muted-foreground hover:text-foreground'>
                    <TablePropertiesIcon strokeWidth={1.7} />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tabla</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <ToggleGroupItem asChild value={DESIGN_MODES.GALLERY} className='text-muted-foreground hover:text-foreground'>
                    <LayoutGridIcon strokeWidth={1.7} />
                  </ToggleGroupItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Galería</p>
                </TooltipContent>
              </Tooltip>
            </ToggleGroup>

            <Separator orientation='vertical' className='h-7 mx-1' />

            <div>
              {/* Filtros avanzados */}
              <PopoverWithTooltip
                label='Filtros'
                trigger={
                  <Button className='h-9 text-sm text-muted-foreground hover:text-foreground' size='icon-sm' variant='ghost'>
                    <ListFilterIcon />
                  </Button>
                }
              >
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Filtrar</h4>
                    <p className="text-sm text-muted-foreground">
                            Descripción del filtro
                    </p>
                  </div>
                </div>
              </PopoverWithTooltip>

              {/* Ordenar */}
              <PopoverWithTooltip
                label='Ordenar'
                trigger={
                  <Button className='h-9 text-sm text-muted-foreground hover:text-foreground' size='icon-sm' variant='ghost'>
                    <ArrowDownUpIcon />
                  </Button>
                }
              >
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Ordenar</h4>
                    <p className="text-sm text-muted-foreground">
                            Descripción del filtro ordenar
                    </p>
                  </div>
                </div>
              </PopoverWithTooltip>

              {/* Ocultar columnas */}
              <DropdownMenu>
                <Tooltip>
                  <DropdownMenuTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button className='h-9 text-sm text-muted-foreground hover:text-foreground' size='icon-sm' variant='ghost'>
                        <Columns3Icon />
                      </Button>
                    </TooltipTrigger>
                  </DropdownMenuTrigger>
                  <TooltipContent className="bg-secondary font-semibold text-foreground">
                    <p>Ocultar</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Ocultar</DropdownMenuLabel>
                  {table
                    .getAllColumns()
                    .filter(
                      (column) => column.getCanHide()
                    )
                    .map((column) => {
                      return (
                        <DropdownMenuItem
                          key={column.id}
                          className={cn('capitalize text-popover-foreground', !column.getIsVisible() && 'line-through opacity-80')}
                          onClick={() => column.toggleVisibility()}
                          onSelect={event => event.preventDefault()}
                        >
                          {column.id}
                        </DropdownMenuItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Separator orientation='vertical' className='h-7 mx-1' />
          </>
        ) : (
          // Modo mobile
          <Button size='icon-sm' variant='ghost'>
            <Settings2Icon />
          </Button>
        )}

        {/* Botón de agregar */}
        {onAdd && (
          <Button
            className='h-auto gap-1'
            onClick={onAdd}
          >
            <PlusIcon /> Nuevo
          </Button>
        )}
      </div>
    </div>
  )
}
