import { Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal/ConfirmDeleteModal';
import NewUserModal from '../../Components/NewUserModal/NewUserModal';
import UpdateUserModal from '../../Components/UpdateUserModal/UpdateUserModal';
import UserCard from '../../Components/UserCard/UserCard';
import {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../../store/api/usersApi';
import { RootState } from '../../store/store';
import { NewUser, UpdatedUser, User } from '../../types/User';
import './Users.scss';
import { useSelector } from 'react-redux';

const Users: React.FC = () => {
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  const { data: users = [], error: usersError, isLoading: usersLoading } = useFetchUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<User | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

  const handleOpenModal = useCallback(() => {
    setModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleOpenUpdateModal = useCallback((user: User) => {
    setUserToUpdate(user);
    setUpdateModalOpen(true);
  }, []);

  const handleCloseUpdateModal = useCallback(() => {
    setUpdateModalOpen(false);
    setUserToUpdate(null);
  }, []);

  const handleOpenConfirmModal = useCallback((user: User) => {
    setEntityToDelete(user);
    setConfirmModalOpen(true);
  }, []);

  const handleCloseConfirmModal = useCallback(() => {
    setConfirmModalOpen(false);
    setEntityToDelete(null);
  }, []);

  const handleDeleteEntity = useCallback(async () => {
    if (entityToDelete) {
      await deleteUser(entityToDelete.id);
      handleCloseConfirmModal();
    }
  }, [entityToDelete, deleteUser, handleCloseConfirmModal]);

  const handleUpdateUser = useCallback(
    async (updatedUser: UpdatedUser) => {
      await updateUser(updatedUser);
      handleCloseUpdateModal();
    },
    [updateUser, handleCloseUpdateModal],
  );

  const handleCreateUser = async (newUser: NewUser) => {
    await createUser(newUser);
    handleCloseModal();
  };

  if (usersLoading) {
    return <CircularProgress />;
  }

  if (usersError) {
    return <Typography color='error'>{JSON.stringify(usersError)}</Typography>;
  }

  return (
    <Box className='users-container'>
      <Typography variant='h4' className='users-title'>
        Utilisateurs
      </Typography>
      <List className='users-list'>
        {users.map((user) => (
          <ListItem key={user.id} sx={{ px: 0 }}>
            <UserCard
              user={user}
              userRole={userRole}
              onEdit={handleOpenUpdateModal}
              onDelete={handleOpenConfirmModal}
            />
          </ListItem>
        ))}
      </List>
      {userRole === 'admin' && (
        <Button
          variant='contained'
          color='primary'
          className='users-button'
          onClick={handleOpenModal}
        >
          Créer un utilisateur
        </Button>
      )}
      <NewUserModal open={modalOpen} onClose={handleCloseModal} onCreate={handleCreateUser} />
      <UpdateUserModal
        open={updateModalOpen}
        onClose={handleCloseUpdateModal}
        user={userToUpdate}
        onUpdate={handleUpdateUser}
      />
      <ConfirmDeleteModal
        open={confirmModalOpen}
        entityToDelete={entityToDelete}
        onClose={handleCloseConfirmModal}
        onDelete={handleDeleteEntity}
      />
    </Box>
  );
};

export default memo(Users);
