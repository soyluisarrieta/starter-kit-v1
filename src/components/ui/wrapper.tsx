import React, { type ReactNode, type ComponentType, type ComponentClass } from 'react'

type Element = keyof JSX.IntrinsicElements

interface WrapperProps {
  element?: string
  component?: ComponentType<any> | ComponentClass<any, any>
  children: ReactNode
  [key: string]: any
}

function renderComponentOrFragment ({ component, props, children }: WrapperProps): JSX.Element {
  if (component !== undefined && window.Boolean(component)) {
    return React.createElement(component, props, children)
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

  if (component !== undefined && window.Boolean(component)) {
    return renderComponentOrFragment({ component, props: restProps, children })
  } else {
    return renderSingleElement({ element, props: restProps, children })
  }
}

export default Wrapper
