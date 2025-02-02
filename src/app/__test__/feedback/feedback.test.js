import { render, screen } from '@testing-library/react'
import FeedbackPage from '../../feedback/page'

// Mock the navbar component
jest.mock('@/components/navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock" />
  }
})

// Mock the Radix UI components
jest.mock('@/components/ui/radio-group', () => ({
  RadioGroup: ({ children }) => <div>{children}</div>,
  RadioGroupItem: () => <div data-testid="radio-item" />
}))

jest.mock('@/components/ui/button', () => ({
  Button: ({ children }) => <button>{children}</button>
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>
}))

jest.mock('@/components/ui/textarea', () => ({
  Textarea: (props) => <textarea {...props} />
}))

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }) => <label htmlFor={htmlFor}>{children}</label>
}))

describe('FeedbackPage', () => {
  it('renders the main heading and subheading', () => {
    render(<FeedbackPage />)
    
    expect(screen.getByText('Your Feedback Matters')).toBeInTheDocument()
    expect(screen.getByText('Help us improve our courses and learning experience')).toBeInTheDocument()
  })

  it('renders the star rating section', () => {
    render(<FeedbackPage />)
    
    expect(screen.getByText('How would you rate your overall experience?')).toBeInTheDocument()
    // Exclude the submit button by using a more specific query
    const starButtons = screen.getAllByRole('button').filter(button => 
      button.textContent !== 'Submit Feedback'
    )
    expect(starButtons).toHaveLength(5)
  })

  it('renders the course selection radio group', () => {
    render(<FeedbackPage />)
    
    expect(screen.getByText('Which course are you reviewing?')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument()
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument()
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument()
    expect(screen.getByText('Cloud Computing')).toBeInTheDocument()
  })

  it('renders the feedback textareas', () => {
    render(<FeedbackPage />)
    
    // Use getByRole instead of getByLabelText
    expect(screen.getByRole('textbox', { name: 'Share your experience' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell us what you liked and what we can improve...')).toBeInTheDocument()
    
    expect(screen.getByRole('textbox', { name: 'Any suggestions for new courses?' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('What would you like to learn next?')).toBeInTheDocument()
  })

  it('renders the submit button', () => {
    render(<FeedbackPage />)
    
    expect(screen.getByText('Submit Feedback')).toBeInTheDocument()
  })

  it('renders the animated stars background', () => {
    render(<FeedbackPage />)
    
    const stars = document.querySelectorAll('.animate-pulse')
    expect(stars).toHaveLength(50)
  })
})
