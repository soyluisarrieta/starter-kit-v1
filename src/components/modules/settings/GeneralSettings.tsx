import { Icon, icons } from '@/components/icons/Icons'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useThemeStore } from '@/store/ThemeStore'

export default function GeneralSettings (): JSX.Element {
  const { darkMode, setDarkMode } = useThemeStore()
  return (
    <>
      <div className="border-b py-4 flex justify-between gap-10">
        <div className='flex-1'>
          <h3 className="font-semibold text-lg">Modos de visualización</h3>
          <p className='text-muted-foreground text-sm'>Cambia egún tus preferencias de iluminación y comodidad visual.</p>
        </div>
        <div>
          <Tabs
            defaultValue={darkMode ? 'dark' : 'light'}
            onValueChange={(theme) => { setDarkMode(theme === 'dark') }}
            className='bg-card shadow-sm border'
            asChild
          >
            <TabsList>
              <TabsTrigger className='h-full' value="light"><Icon size={18} element={icons.ThemeMode.Light} /></TabsTrigger>
              <TabsTrigger className='h-full' value="dark"><Icon size={18} element={icons.ThemeMode.Dark} /></TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </>
  )
}
