import { render, screen, fireEvent } from '@testing-library/react';
import ConsultantCard from './ConsultantCard';
import { Consultant } from '../../types/Consultant';

const mockConsultant: Consultant = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  work: { id: 1, workName: 'Developer' },
  client: {
    id: 1,
    name: 'Test Client',
    activity: 'Consulting',
    address: '123 Main St',
    latitude: '40.7128',
    longitude: '-74.0060',
    logo: null,
    link: null,
    jobs: [{ id: 1, jobName: 'Développement' }],
    expertises: [{ id: 1, expertiseName: 'Digital' }],
  },
  technos: [
    { id: 1, technoName: 'React' },
    { id: 2, technoName: 'Node.js' },
  ],
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe('ConsultantCard', () => {
  test('renders consultant information', () => {
    render(
      <ConsultantCard
        consultant={mockConsultant}
        userRole='user'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  test('renders edit and delete buttons for admin', () => {
    render(
      <ConsultantCard
        consultant={mockConsultant}
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
      <ConsultantCard
        consultant={mockConsultant}
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
      <ConsultantCard
        consultant={mockConsultant}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('edit'));
    expect(mockOnEdit).toHaveBeenCalledWith(mockConsultant);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(
      <ConsultantCard
        consultant={mockConsultant}
        userRole='admin'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />,
    );

    fireEvent.click(screen.getByLabelText('delete'));
    expect(mockOnDelete).toHaveBeenCalledWith(mockConsultant);
  });

  test('does not render client and technos when showDetails is false', () => {
    render(
      <ConsultantCard
        consultant={mockConsultant}
        userRole='user'
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        showDetails={false}
      />,
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.queryByText('Test Client')).not.toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
    expect(screen.queryByText('Node.js')).not.toBeInTheDocument();
  });
});
