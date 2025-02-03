import { render, screen } from '@testing-library/react'
import AboutPage from '../../about/page'

// Mock the navbar component since we're only testing the About page
jest.mock('@/components/navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock" />
  }
})

describe('AboutPage', () => {
  it('renders the main heading and subheading', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('About Edukado')).toBeInTheDocument()
    expect(screen.getByText('Empowering the next generation of tech innovators through cutting-edge education')).toBeInTheDocument()
  })

  it('renders all four feature cards with correct content', () => {
    render(<AboutPage />)
    
    // Check card headings
    expect(screen.getByText('Expert Instructors')).toBeInTheDocument()
    expect(screen.getByText('Cutting-edge Curriculum')).toBeInTheDocument()
    expect(screen.getByText('Hands-on Experience')).toBeInTheDocument()
    expect(screen.getByText('Flexible Learning')).toBeInTheDocument()

    // Check card descriptions
    expect(screen.getByText(/Learn from industry professionals/)).toBeInTheDocument()
    expect(screen.getByText(/Our courses are constantly updated/)).toBeInTheDocument()
    expect(screen.getByText(/Practice with real projects/)).toBeInTheDocument()
    expect(screen.getByText(/Learn at your own pace/)).toBeInTheDocument()
  })

  it('renders the CTA section with buttons', () => {
    render(<AboutPage />)
    
    expect(screen.getByText('Ready to Start Your Journey?')).toBeInTheDocument()
    
    const viewCoursesButton = screen.getByText('View Courses')
    const contactUsButton = screen.getByText('Contact Us')
    
    expect(viewCoursesButton).toBeInTheDocument()
    expect(contactUsButton).toBeInTheDocument()
  })

  it('renders the animated stars background', () => {
    render(<AboutPage />)
    
    // Check if we have 50 star elements
    const stars = document.querySelectorAll('.animate-pulse')
    expect(stars).toHaveLength(50)
  })
})
