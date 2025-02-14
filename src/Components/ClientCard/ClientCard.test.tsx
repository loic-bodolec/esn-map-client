import { render, screen, fireEvent } from '@testing-library/react';
import ClientCard from './ClientCard';
import { Client } from '../../types/Client';

const mockClient: Client = {
  id: 1,
  name: 'Test Client',
  activity: 'Software Development',
  address: '123 Main St, Anytown, USA',
  jobs: [{ id: 1, jobName: 'Développement' }],
  expertises: [{ id: 1, expertiseName: 'Digital' }],
  link: 'https://www.testclient.com',
  latitude: '40.7128',
  longitude: '-74.0060',
  logo: 'https://www.testclient.com/logo.png',
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('ClientCard', () => {
  test('renders client information', () => {
    render(
      <ClientCard
        client={mockClient}
        userRole='user'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('Software Development')).toBeInTheDocument();
    expect(screen.getByText('123 Main St, Anytown, USA')).toBeInTheDocument();
    expect(screen.getByText('https://www.testclient.com')).toBeInTheDocument();
    expect(screen.getByText('Développement')).toBeInTheDocument();
    expect(screen.getByText('Digital')).toBeInTheDocument();
  });

  test('renders edit and delete buttons for admin', () => {
    render(
      <ClientCard
        client={mockClient}
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
      <ClientCard
        client={mockClient}
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
      <ClientCard
        client={mockClient}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockClient);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <ClientCard
        client={mockClient}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockClient);
  });
});
