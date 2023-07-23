import Home from '@mui/icons-material/Home';
import Work from '@mui/icons-material/Work';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { useNavigate, useParams } from 'react-router-dom';
import { atualizarPessoa, cadastrarPessoa, excluirEnderecoPorId, fetchPessoaPorId } from '../services/api';

const UserDetails = () => {
    const navigate = useNavigate();
    const [tipoPessoa, setTipoPessoa] = useState('pessoaFisica');
    const [inputNome, setInputNome] = useState('');
    const [inputCpfCnpj, setInputCpfCnpj] = useState('');
    const [inputTelefone, setInputTelefone] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [enderecos, setEnderecos] = useState([]);
    const [enderecoCurrent, setEnderecoCurrent] = useState();
    const [open, setOpen] = React.useState(false);

    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            const fetchUserDetails = async () => {
                try {
                    const user = await fetchPessoaPorId(userId);
                    buildForm(user);

                } catch (error) {
                    console.error(`Erro ao buscar detalhes do usuário com ID ${userId}:`, error);
                }
            };

            fetchUserDetails();
        }
    }, [userId]);

    const buildForm = (user) => {
        setTipoPessoa(user.cpf ? 'pessoaFisica' : 'pessoaJuridica');
        setInputNome(user.nome ? user.nome : user.razaoSocial);
        setInputEmail(user.email);
        setInputTelefone(user.telefone);
        setEnderecos(user.enderecos);
    }

    const handlerSalvar = async () => {
        try {
            const dadosPessoa = {
                telefone: inputTelefone,
                email: inputEmail,
                enderecos: enderecos,
            };

            if (tipoPessoa === 'pessoaFisica') {
                dadosPessoa.nome = inputNome;
                dadosPessoa.cpf = inputCpfCnpj;
            } else {
                dadosPessoa.razaoSocial = inputNome;
                dadosPessoa.cnpj = inputCpfCnpj;
            }

            if (userId) {
                await atualizarPessoa(userId, dadosPessoa);
            } else {
                await cadastrarPessoa(dadosPessoa);
            }

            navigate('/userList');

        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
        }
    };

    const handleChangeTipoPessoa = (event) => {
        setTipoPessoa(event.target.value);
    };

    const handleAddEndereco = () => {
        console.log("handleAddEndereco")
    };

    const handleRemoveEndereco = async () => {
        try {
            const enderecoId = enderecoCurrent.id;
            const excluidoComSucesso = await excluirEnderecoPorId(enderecoId);

            if (excluidoComSucesso) {
                
            } else {
                console.log(`Falha ao excluir endereço de ID ${enderecoId}.`);
            }
        } catch (error) {
            console.error('Erro ao excluir endereço:', error);
        }
    };

    const handleOpen = (endereco) => {
        setEnderecoCurrent(endereco);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="user-details">
            <h1>Inserir novo usuário</h1>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <FormControl fullWidth>
                        <InputLabel required={true} id="tipo-pessoa-label">Tipo de pessoa</InputLabel>
                        <Select
                            labelId="tipo-pessoa-label"
                            id="tipo-pessoa"
                            value={tipoPessoa}
                            onChange={handleChangeTipoPessoa}
                        >
                            <MenuItem value="pessoaFisica">Pessoa Física</MenuItem>
                            <MenuItem value="pessoaJuridica">Pessoa Jurídica</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label={tipoPessoa === "pessoaFisica" ? "Nome" : "Razão Social"}
                        required={true}
                        fullWidth
                        value={inputNome}
                        onChange={(e) => setInputNome(e.target.value)}
                    />
                </Grid>
                <Grid item xs={4}>
                    {tipoPessoa === "pessoaFisica" ?
                        <InputMask
                            mask="999.999.999-99"
                            value={inputCpfCnpj}
                            onChange={(e) => setInputCpfCnpj(e.target.value)}
                        >
                            {() => <TextField
                                label="CPF"
                                required={true}
                                fullWidth
                            />}
                        </InputMask>
                        :
                        <InputMask
                            mask="99.999.999/9999-99"
                            value={inputCpfCnpj}
                            onChange={(e) => setInputCpfCnpj(e.target.value)}
                        >
                            {() => <TextField
                                label="CNPJ"
                                required={true}
                                fullWidth
                            />}
                        </InputMask>
                    }
                </Grid>

                <Grid item xs={4}>
                    <InputMask
                        mask="(99)9.9999-9999"
                        value={inputTelefone}
                        onChange={(e) => setInputTelefone(e.target.value)}
                    >
                        {() => <TextField
                            label="Telefone"
                            required={true}
                            fullWidth
                        />}
                    </InputMask>
                </Grid>
                <Grid item xs={4}>
                    <TextField label="E-mail" value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} fullWidth />
                </Grid>
            </Grid>

            <div className='enderecos-title'>
                <h3>Endereços</h3>
                <div className='btn-novo-enderco'>
                    <Button variant="contained" onClick={handleAddEndereco} color="primary">Adicionar endereço</Button>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {enderecos.map((endereco) => (
                            <TableRow key={endereco.id}>
                                <TableCell>
                                    {endereco.residencial ? <Home /> : <Work />}
                                    {endereco.endereco}
                                </TableCell>
                                <TableCell className='buttons-endereco'>
                                    <Button variant="contained" color="primary">Editar</Button>
                                    <Button className='btn-remove' variant="contained" onClick={() => handleOpen(endereco)} color="error">Excluir</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" className='btn-salvar-usuario' onClick={handlerSalvar} color="primary">Salvar</Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Deseja realmente excluir este endereço?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Esta ação é irreversível
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Não</Button>
                    <Button onClick={handleRemoveEndereco} autoFocus> Sim </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserDetails;
