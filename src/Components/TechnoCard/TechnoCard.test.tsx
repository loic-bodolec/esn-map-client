import { render, screen, fireEvent } from '@testing-library/react';
import TechnoCard from './TechnoCard';
import { Techno } from '../../types/Techno';

const mockTechno: Techno = {
  id: 1,
  technoName: 'React',
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('TechnoCard', () => {
  test('renders techno information', () => {
    render(
      <TechnoCard
        techno={mockTechno}
        userRole='user'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText('React')).toBeInTheDocument();
  });

  test('renders edit and delete buttons for admin', () => {
    render(
      <TechnoCard
        techno={mockTechno}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByLabelText('edit')).toBeInTheDocument();
    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });

  test('does not render edit and delete buttons for non-admin', () => {
    render(
      <TechnoCard
        techno={mockTechno}
        userRole='user'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <TechnoCard
        techno={mockTechno}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTechno);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TechnoCard
        techno={mockTechno}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockTechno);
  });
});
