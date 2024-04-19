export function mergeObjects<T extends Record<string, any>> (target: T, ...sources: Array<Partial<T>>): T {
  const output = { ...target }

  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      const sourceKey = key as keyof T
      if (Object.prototype.hasOwnProperty.call(source, sourceKey)) {
        if (output[sourceKey] !== undefined && typeof output[sourceKey] === 'object' && typeof source[sourceKey] === 'object') {
          if (source[sourceKey] !== undefined) {
            output[sourceKey] = mergeObjects(output[sourceKey], source[sourceKey] as Partial<T[keyof T]>)
          }
        } else if (source[sourceKey] !== undefined) {
          output[sourceKey] = source[sourceKey] as T[keyof T]
        }
      }
    })
  })

  return output
}
