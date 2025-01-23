import { useEffect } from 'react'
import { Icon, icons } from '@/components/icons/Icons'
import CardSettingSection from '@/components/features/settings/CardSettingSection'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useFormStore } from '@/store/FormStore'
import { useThemeStore } from '@/store/ThemeStore'

export default function GeneralSettings (): JSX.Element {
  const { darkMode, setDarkMode } = useThemeStore()
  const { setTimestamps } = useFormStore()

  useEffect(() => {
    setTimestamps({
      updatedAt: '2024-12-27T20:31:01.000000Z'
    })
  }, [])

  return (
    <>
      <CardSettingSection
        title='Modos de visualización'
        description='Cambia egún tus preferencias de iluminación y comodidad visual.'
      >
        <Tabs
          value={darkMode ? 'dark' : 'light'}
          onValueChange={(theme) => { setDarkMode(theme === 'dark') }}
          className='bg-card shadow-sm border'
          asChild
        >
          <TabsList>
            <TabsTrigger className='h-full' value="light"><Icon size={18} element={icons.ThemeMode.Light} /></TabsTrigger>
            <TabsTrigger className='h-full' value="dark"><Icon size={18} element={icons.ThemeMode.Dark} /></TabsTrigger>
          </TabsList>
        </Tabs>
      </CardSettingSection>
    </>
  )
}
