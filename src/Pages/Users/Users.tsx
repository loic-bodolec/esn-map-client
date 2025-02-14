import { Box, Button, CircularProgress, List, ListItem, Typography } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal/ConfirmDeleteModal';
import NewUserModal from '../../Components/NewUserModal/NewUserModal';
import UpdateUserModal from '../../Components/UpdateUserModal/UpdateUserModal';
import UserCard from '../../Components/UserCard/UserCard';
import { AppDispatch, RootState } from '../../store/store';
import { addUser, getUsers, modifyUser, removeUser } from '../../store/usersSlice';
import { NewUser, UpdatedUser, User } from '../../types/User';
import './Users.scss';

const Users: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.auth.user?.role);
  const {
    users,
    status: usersStatus,
    error: usersError,
  } = useSelector((state: RootState) => state.users);

  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<User | null>(null);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
      dispatch(removeUser(entityToDelete.id));
      handleCloseConfirmModal();
    }
  }, [entityToDelete, dispatch, handleCloseConfirmModal]);

  const handleUpdateUser = useCallback(
    async (updatedUser: UpdatedUser) => {
      dispatch(modifyUser(updatedUser));
      handleCloseUpdateModal();
    },
    [dispatch, handleCloseUpdateModal],
  );

  const handleCreateUser = async (newUser: NewUser) => {
    dispatch(addUser(newUser));
    handleCloseModal();
  };

  if (usersStatus === 'loading') {
    return <CircularProgress />;
  }

  if (usersStatus === 'failed') {
    return <Typography color='error'>{usersError}</Typography>;
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
