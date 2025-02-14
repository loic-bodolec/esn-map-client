import { render, screen, fireEvent } from '@testing-library/react';
import WorkCard from './WorkCard';
import { Work } from '../../types/Work';

const mockWork: Work = {
  id: 1,
  workName: 'Developer',
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('WorkCard', () => {
  test('renders work information', () => {
    render(
      <WorkCard work={mockWork} userRole='user' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  test('renders edit and delete buttons for admin', () => {
    render(
      <WorkCard work={mockWork} userRole='admin' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.getByLabelText('edit')).toBeInTheDocument();
    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });

  test('does not render edit and delete buttons for non-admin', () => {
    render(
      <WorkCard work={mockWork} userRole='user' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <WorkCard work={mockWork} userRole='admin' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockWork);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <WorkCard work={mockWork} userRole='admin' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockWork);
  });
});
