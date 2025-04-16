import { render, screen } from '@/utils/testing/reactTestingLibraryUtils'
import { Input } from '../Input'

describe('Input', () => {
  it('Displays error message if provided', () => {
    render(<Input errorMessage="This is an error" />)
    expect(screen.getByText('This is an error')).toBeInTheDocument()
  })
})
