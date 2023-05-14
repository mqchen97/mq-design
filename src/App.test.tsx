import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('test-number', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
  expect(4).toBeGreaterThan(3)
  expect(4).toBeLessThan(5)
})

test('test-boolean', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test-object', () => {
  //值相同, 如果toBe则是判断不是一个对象报错
  expect({ name: 'cmq' }).toEqual({ name: 'cmq' })
})
