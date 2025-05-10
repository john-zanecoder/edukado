import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the components used in Home
jest.mock('@/components/hero', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-hero">Hero Component</div>
}))

jest.mock('@/components/navbar', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-navbar">Navbar Component</div>
}))

jest.mock('@/components/sparkles', () => ({
  SparklesCore: () => <div data-testid="mock-sparkles">Sparkles Component</div>
}))

describe('Home', () => {
  it('renders the main layout with all components', () => {
    render(<Home />)
    
    // Check if main container exists
    expect(screen.getByRole('main')).toBeInTheDocument()
    
    // Check if all components are rendered
    expect(screen.getByTestId('mock-sparkles')).toBeInTheDocument()
    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument()
    expect(screen.getByTestId('mock-hero')).toBeInTheDocument()
  })

  it('maintains correct component hierarchy', () => {
    render(<Home />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('min-h-screen', 'bg-black/[0.96]', 'antialiased')
    
    // Check z-index layering
    const sparklesContainer = main.children[0]
    const contentContainer = main.children[1]
    
    expect(sparklesContainer).toHaveClass('z-0')
    expect(contentContainer).toHaveClass('z-10')
  })
})
