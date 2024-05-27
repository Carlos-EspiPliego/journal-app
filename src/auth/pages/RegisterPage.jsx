import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';

import { startCreatingUserWithEmailPassword } from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
    password: [(value) => value.length >= 6, 'El password debe de tener más de 6 letras.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.'],
}

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);
    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const {
        formState, displayName, email, password, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword(formState));
    }

    return (
        <AuthLayout title='Crear cuenta'>
            <span>Form valid: {isFormValid ? "Valido" : "Invalido"}</span>
            <form onSubmit={onSubmit}>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Nombre'
                            type="text"
                            placeholder="Nombre completo"
                            variant='outlined'
                            name='displayName'
                            value={displayName}
                            onChange={onInputChange}
                            fullWidth
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='Email'
                            type="email"
                            placeholder="correo@google.com"
                            variant='outlined'
                            name='email'
                            value={email}
                            onChange={onInputChange}
                            fullWidth
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label='contraseña'
                            type="password"
                            placeholder="********"
                            variant='outlined'
                            name='password'
                            value={password}
                            onChange={onInputChange}
                            fullWidth
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container sx={{ padding: 2 }} spacing={2} >
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Alert severity='error' sx={{ display: status === 'error' ? 'block' : 'none' }}>{errorMessage}</Alert>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2 }}>
                            <Button disabled={isCheckingAuthentication} type='submit' variant='contained' color='primary' fullWidth>Crear cuenta</Button>
                        </Grid>
                    </Grid>

                    <Grid container direction='row' justifyContent='end'>
                        <Typography sx={{ mr: 2 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={RouterLink} color='inherit' to="/auth/login">
                            Iniciar sesión
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    )
}
