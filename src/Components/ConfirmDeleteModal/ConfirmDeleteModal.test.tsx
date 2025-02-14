import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmDeleteModal from './ConfirmDeleteModal';

describe('ConfirmDeleteModal', () => {
  const mockOnClose = jest.fn();
  const mockOnDelete = jest.fn();

  const defaultProps = {
    open: true,
    entityToDelete: {
      id: 1,
      name: 'Test Entity',
      activity: '',
      address: '',
      latitude: '0',
      longitude: '0',
      logo: '',
      link: '',
      jobs: [],
      expertises: [],
    },
    onClose: mockOnClose,
    onDelete: mockOnDelete,
    errorMessage: null,
  };

  it('should render the modal with the correct text', () => {
    render(<ConfirmDeleteModal {...defaultProps} />);
    expect(screen.getByText('Confirmer la suppression')).toBeInTheDocument();
    expect(
      screen.getByText('Êtes-vous sûr de vouloir supprimer Test Entity ?'),
    ).toBeInTheDocument();
  });

  it('should call onClose when the Annuler button is clicked', () => {
    render(<ConfirmDeleteModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Annuler'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('should call onDelete when the Supprimer button is clicked', () => {
    render(<ConfirmDeleteModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Supprimer'));
    expect(mockOnDelete).toHaveBeenCalled();
  });

  it('should display an error message if errorMessage is provided', () => {
    const propsWithError = { ...defaultProps, errorMessage: 'Error occurred' };
    render(<ConfirmDeleteModal {...propsWithError} />);
    expect(screen.getByText('Error occurred')).toBeInTheDocument();
  });

  it('should not render the modal when open is false', () => {
    const propsClosed = { ...defaultProps, open: false };
    render(<ConfirmDeleteModal {...propsClosed} />);
    expect(screen.queryByText('Confirmer la suppression')).not.toBeInTheDocument();
  });
});
