import '@testing-library/jest-dom'

// Set up window mock before tests
if (typeof window !== 'undefined') {
  window.matchMedia = window.matchMedia || function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    }
  }
}

// Mock window dimensions
Object.defineProperty(window, 'innerWidth', { value: 1024 })
Object.defineProperty(window, 'innerHeight', { value: 768 })