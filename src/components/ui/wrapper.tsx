import React, { type ReactNode, type ComponentType } from 'react'

type Element = keyof JSX.IntrinsicElements

interface WrapperProps {
  element?: string
  component?: ComponentType<any> | Array<ComponentType<any>>
  children?: ReactNode
  [key: string]: any
}

interface NestProps {
  components?: Array<ComponentType<any>>
  props?: any
  children: ReactNode
  [key: string]: any
}

const nestComponents = ({ components, props = {}, children }: NestProps): JSX.Element => {
  if (!components || components.length === 0) {
    return <>{children}</>
  }

  const Component = components[0]
  const remainingComponents = components.slice(1)

  return <Component {...props}>{nestComponents({ components: remainingComponents, props, children })}</Component>
}

function renderComponentOrFragment ({ component, props, children }: WrapperProps): JSX.Element {
  if (component != null) {
    if (Array.isArray(component)) {
      return nestComponents({ components: component, props, children })
    } else {
      return React.createElement(component, props, children)
    }
  } else {
    return <>{children}</>
  }
}

function renderSingleElement ({ element, props, children }: WrapperProps): JSX.Element {
  if (!element) {
    return <>{children}</>
  } else {
    const elementArray = element.split(' ')
    return React.createElement(elementArray[0] as Element, props, children)
  }
}

function Wrapper (props: WrapperProps): JSX.Element {
  const { element, component, children, ...restProps } = props

  if (component != null) {
    return renderComponentOrFragment({ component, props: restProps, children })
  } else {
    return renderSingleElement({ element, props: restProps, children })
  }
}

export default Wrapper
