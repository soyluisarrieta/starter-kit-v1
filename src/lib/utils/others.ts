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
