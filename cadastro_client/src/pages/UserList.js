import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { buscarPorNomeOrRazaoSocial, excluirPessoaPorId, fetchPessoas } from '../services/api';

const UserList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [userSelected, setUserSelected] = useState();

    const fetchUsers = async () => {
        try {
            const usersData = await fetchPessoas();
            setUsers(usersData);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            setUsers([]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = () => {
        navigate('/userDetails');
    }

    const handleUser = (userId) => {
        console.log('Adicionar novo usuário');
        navigate(`/userDetails/${userId}`);
    };

    const handleSearch = async () => {
        console.log('Pesquisar usuários com o valor:', searchValue);
        const pessoas = await buscarPorNomeOrRazaoSocial(searchValue);
        setUsers(pessoas);
    };

    const handleClickOpen = (user) => {
        setUserSelected(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        try {
            const pessoaExcluida = await excluirPessoaPorId(userSelected.id);
            if (pessoaExcluida) {
                console.log('Pessoa excluída com sucesso.');
                atualizarListaUsuarios();

            } else {
                console.log('Erro ao excluir pessoa.');
            }
        } catch (error) {
            console.error('Erro ao excluir pessoa:', error);
        }
        setOpen(false);
    };

    const atualizarListaUsuarios = async () => {
        try {
            const usuariosAtualizados = await fetchPessoas();
            setUsers(usuariosAtualizados); // Atualizar o estado dos usuários com a nova lista

        } catch (error) {
            console.error('Erro ao atualizar lista de usuários:', error);
        }
    };

    return (
        <div className="App">
            <div className="search-and-create">
                <div className="search">
                    <TextField
                        fullWidth={true}
                        size='small'
                        label="Pesquisar por Nome"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className='btn-search'>
                    <Button variant="contained" onClick={handleSearch}>Pesquisar</Button>
                </div>
                <div className='btn-new-user'>
                    <Button variant="contained" onClick={handleAddUser}>Novo Usuário</Button>
                </div>
            </div>
            <h2 className='title-page'> Usuários </h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell>CPF/CNPJ</TableCell>
                            <TableCell>Telefone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Endereços</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.nome != null ? user.nome : user.razaoSocial}</TableCell>
                                <TableCell>{user.cpf != null ? user.cpf : user.cnpj}</TableCell>
                                <TableCell>{user.telefone}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className='address'>{user.endereco.logradouro}</TableCell>
                                <TableCell className='buttons'>
                                    <Button variant="contained" color="primary" onClick={() => handleUser(user.id)}>Editar</Button>
                                    <Button className='btn-remove' variant="contained" onClick={() => handleClickOpen(user)} color="error">Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente excluir este usuário?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta ação é irreversível
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Não</Button>
                    <Button onClick={handleConfirm} autoFocus> Sim </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserList;
