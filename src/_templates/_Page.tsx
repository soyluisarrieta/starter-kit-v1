import PageLayout from '@/components/layouts/PageLayout'

export default function _Page ({ children }: ComponentProps) {
  return (
    <PageLayout
      title="Título de la página"
      description="Descripción breve del contenido de la página"
    >
      <main className="w-full flex-1 flex flex-col">
        {children}
      </main>
    </PageLayout>
  )
}
