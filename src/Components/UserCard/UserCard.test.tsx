import { render, screen, fireEvent } from '@testing-library/react';
import UserCard from './UserCard';
import { User } from '../../types/User';

const mockUser: User = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  username: 'johndoe',
  job: 'Developer',
  email: 'john.doe@example.com',
  role: 'user',
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('UserCard', () => {
  test('renders user information', () => {
    render(
      <UserCard user={mockUser} userRole='user' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('user')).toBeInTheDocument();
  });

  test('renders edit and delete buttons for admin', () => {
    render(
      <UserCard user={mockUser} userRole='admin' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.getByLabelText('edit')).toBeInTheDocument();
    expect(screen.getByLabelText('delete')).toBeInTheDocument();
  });

  test('does not render edit and delete buttons for non-admin', () => {
    render(
      <UserCard user={mockUser} userRole='user' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    expect(screen.queryByLabelText('edit')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <UserCard user={mockUser} userRole='admin' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <UserCard user={mockUser} userRole='admin' onEdit={mockOnEdit} onDelete={mockOnDelete} />,
    );

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockUser);
  });
});
