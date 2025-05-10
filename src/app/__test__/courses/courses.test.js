import { render, screen } from '@testing-library/react'
import CoursesPage from '../../courses/page'

// Mock the navbar component
jest.mock('@/components/navbar', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="navbar-mock" />
  }
})

// Mock the UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children }) => <button>{children}</button>
}))

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }) => <div className={className}>{children}</div>
}))

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children }) => <div>{children}</div>
}))

describe('CoursesPage', () => {
  it('renders the main heading and subheading', () => {
    render(<CoursesPage />)
    
    expect(screen.getByText('Our Courses')).toBeInTheDocument()
    expect(screen.getByText('Explore our comprehensive range of tech courses designed to help you succeed')).toBeInTheDocument()
  })

  it('renders all course cards with correct information', () => {
    render(<CoursesPage />)
    
    // Check course titles
    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument()
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument()
    expect(screen.getByText('Mobile App Development')).toBeInTheDocument()
    expect(screen.getByText('Cloud Computing')).toBeInTheDocument()

    // Check course descriptions
    expect(screen.getByText('Master modern web development with React, Node.js, and MongoDB')).toBeInTheDocument()
    expect(screen.getByText('Learn to build intelligent systems with Python and TensorFlow')).toBeInTheDocument()
    expect(screen.getByText('Create native iOS and Android apps with React Native')).toBeInTheDocument()
    expect(screen.getByText('Master AWS, Azure, and cloud architecture principles')).toBeInTheDocument()
  })

  it('renders course tags correctly', () => {
    render(<CoursesPage />)
    
    // Check tags from different courses
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Python')).toBeInTheDocument()
    expect(screen.getByText('TensorFlow')).toBeInTheDocument()
    expect(screen.getByText('React Native')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })

  it('renders course metadata for each course', () => {
    render(<CoursesPage />)
    
    // Check durations
    expect(screen.getByText('12 weeks')).toBeInTheDocument()
    expect(screen.getAllByText('10 weeks')).toHaveLength(2)
    expect(screen.getByText('8 weeks')).toBeInTheDocument()

    // Check ratings
    expect(screen.getByText('4.8')).toBeInTheDocument()
    expect(screen.getByText('4.9')).toBeInTheDocument()
    expect(screen.getByText('4.7')).toBeInTheDocument()
    expect(screen.getByText('4.6')).toBeInTheDocument()

    // Check student counts
    expect(screen.getByText('1234 students')).toBeInTheDocument()
    expect(screen.getByText('856 students')).toBeInTheDocument()
    expect(screen.getByText('2156 students')).toBeInTheDocument()
    expect(screen.getByText('1589 students')).toBeInTheDocument()
  })

  it('renders action buttons for each course', () => {
    render(<CoursesPage />)
    
    const enrollButtons = screen.getAllByText('Enroll Now')
    const learnMoreButtons = screen.getAllByText('Learn More')
    
    expect(enrollButtons).toHaveLength(4)
    expect(learnMoreButtons).toHaveLength(4)
  })

  it('renders the animated stars background', () => {
    render(<CoursesPage />)
    
    const stars = document.querySelectorAll('.animate-pulse')
    expect(stars).toHaveLength(50)
  })
})
