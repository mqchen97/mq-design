import React from "react";
import { fireEvent, render } from "@testing-library/react"
import Button, { ButtonProps } from "./Button";

const defaultProps = {
  onClick: jest.fn()
}

const linkProps: ButtonProps = {
  level: 'link',
  disabled: true,
  size: 'sm',
  onClick: jest.fn()
}

const disabledProps: ButtonProps = {
  level: 'primary',
  disabled: true,
  size: 'lg',
  onClick: jest.fn()
}

describe('test button component', () => {
  it('render the correct default button', () => {
    const wrapper = render(<Button {...defaultProps}>Test</Button>)
    const element = wrapper.getByText('Test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('mq-btn mq-btn-default')
    expect(element.disabled).toBeFalsy()
    //测试 按钮
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('render the correct link button', () => {
    const wrapper = render(<Button {...linkProps}>Test</Button>)
    const element = wrapper.getByText('Test')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('mq-btn mq-btn-link mq-btn-sm disabled')
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
  it('render the correct disabled button', () => {
    const wrapper = render(<Button {...disabledProps}>Test</Button>)
    const element = wrapper.getByText('Test') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('mq-btn mq-btn-primary mq-btn-lg')
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(defaultProps.onClick).not.toHaveBeenCalled()
  })
})