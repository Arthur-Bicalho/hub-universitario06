import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ActivityCard } from './ActivityCard'
import { activity } from '../test/fixtures'

describe('ActivityCard', () => {
  it('renders the activity summary', () => {
    render(<ActivityCard activity={activity()} />, { wrapper: MemoryRouter })

    expect(screen.getByRole('heading', { name: 'Workshop de Spring Boot' })).toBeInTheDocument()
    expect(screen.getByText('25 / 30 inscritos')).toBeInTheDocument()
    expect(screen.getByText('5 vagas')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver detalhes/i })).toHaveAttribute('href', '/activities/1')
  })
})
