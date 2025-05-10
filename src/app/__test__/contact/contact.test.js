import { render, screen } from '@testing-library/react'
import ContactPage from '../../contact/page'

// Mock the navbar component
jest.mock('@/components/navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock" />
  }
})

describe('ContactPage', () => {
  it('renders the main heading and subheading', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Get in Touch')).toBeInTheDocument()
    expect(screen.getByText('Have questions? Wed love to hear from you.')).toBeInTheDocument()
  })

  it('renders the contact form with all fields', () => {
    render(<ContactPage />)
    
    // Check form fields
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByText('Send Message')).toBeInTheDocument()
  })

  it('renders contact information section', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('Contact Information')).toBeInTheDocument()
    expect(screen.getByText('contact@edukado.com')).toBeInTheDocument()
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument()
    expect(screen.getByText('123 Tech Street, San Francisco, CA 94105')).toBeInTheDocument()
    expect(screen.getByText('Mon - Fri: 9:00 AM - 6:00 PM')).toBeInTheDocument()
  })

  it('renders FAQ section', () => {
    render(<ContactPage />)
    
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('View FAQ')).toBeInTheDocument()
    expect(screen.getByText(/Find quick answers to common questions/)).toBeInTheDocument()
  })

  it('renders the animated stars background', () => {
    render(<ContactPage />)
    
    const stars = document.querySelectorAll('.animate-pulse')
    expect(stars).toHaveLength(50)
  })
})