import { VALID_FILE_EXT } from '@/constants'

export function buildBreadcrumb (pathname: string): Array<{ href: string | undefined, label: string }> {
  const formattedPathname = pathname.split('/').filter(Boolean)

  let accumulatedHref = ''
  const breadcrumbItemsFormatted = formattedPathname.map((item, index) => {
    accumulatedHref += `/${item}`
    return {
      href: index === formattedPathname.length - 1 ? undefined : accumulatedHref,
      label: item.charAt(0).toUpperCase() + item.slice(1)
    }
  })

  return breadcrumbItemsFormatted
}

export function isValidFileType (fileName: (string | undefined), fileType: string): boolean {
  const fileExt = fileName?.split('.').pop() ?? ''
  return VALID_FILE_EXT[fileType].includes(fileExt)
}
