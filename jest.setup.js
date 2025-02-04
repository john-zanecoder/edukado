import '@testing-library/jest-dom'

// Optional: Mock matchMedia if you need it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Optional: Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks()
})

