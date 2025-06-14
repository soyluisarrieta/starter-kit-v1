import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'

const Chat: React.FC = () => {
  const [text, setText] = useState<string>('')
  const [buffer, setBuffer] = useState<string>('')
  const [loading, setLoading] = useState(false)

  // Función para obtener datos de un modelo de lenguaje (LLM) a través de streaming
  const fetchStreamedLLM = async () => {
    setLoading(true)
    setText('')
    setBuffer('')

    try {
      // Realizar la solicitud POST al endpoint del LLM
      const response = await fetch('/llm/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN')
        },
        credentials: 'include',
        body: JSON.stringify({ userPrompt: 'Hola' })
      })

      // Verificar si el cuerpo de la respuesta está vacío
      if (!response.body) {
        throw new Error('El body de la respuesta está vacío.')
      }

      // Leer el cuerpo de la respuesta en streaming
      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      // Leer el stream de datos en fragmentos
      while (true) {
        const { value, done } = await reader.read()
        if (done) break

        // Decodificar el fragmento de datos recibido
        const textChunk = decoder.decode(value, { stream: true })
        const lines = textChunk
          .split('\r\n')
          .filter(part => part)

        // Procesar cada línea del fragmento de datos
        lines.forEach(line => {
          try {
            const chunk = JSON.parse(line)
            setBuffer(prev => prev + chunk.text)
          } catch (e) {
            // Manejar errores de sintaxis en el JSON
            if (!(e instanceof SyntaxError)) {
              console.error('Error en la transmisión:', e)
            }
          }
        })
      }
    } catch (error) {
      // Manejar errores en la solicitud o en el procesamiento del stream
      console.error('Error en la transmisión:', error)
    } finally {
      setLoading(false)
    }
  }

  // Efecto para actualizar el estado del texto a partir del buffer
  useEffect(() => {
    if (buffer.length > 0) {
      const interval = setInterval(() => {
        setText(prev => prev + buffer[0])
        setBuffer(prev => prev.slice(1))
      }, 3)

      // Limpiar el intervalo cuando el componente se desmonte o el buffer se vacíe
      return () => clearInterval(interval)
    }
  }, [buffer])

  return (
    <div className='p-6'>
      <Button onClick={fetchStreamedLLM} disabled={loading}>
        {loading ? 'Saludando...' : 'Saludar a la IA'}
      </Button>
      <div style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
        {text}
      </div>
    </div>
  )
}

export default Chat
