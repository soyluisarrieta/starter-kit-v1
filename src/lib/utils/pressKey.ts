export function pressKey (key: string) {
  const escapeEvent = new KeyboardEvent('keydown', { key })
  document.dispatchEvent(escapeEvent)
}
