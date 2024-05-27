import { Delete, DeleteOutlined, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
    const fileInputRef = useRef();
    const { body, title, onInputChange, formState, date } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch( setActiveNote( formState ) );
    }, [formState])
    

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    const onFileInputChange = ({ target }) => {
        if (target.files.length === 0) return;
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        dispatch(startDeletingNote());
    }

    return (
        <Grid className='animate__animated animate__fadeIn animate__faster' container direction='row' justifyContent='space-between' alignItems='center'>
            <Grid item >
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item >
                <input
                    type="file"
                    id="file"
                    style={{ display: 'none' }}
                    multiple
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={ onFileInputChange }
                />
                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined sx={{ fontSize: 30 }} />
                </IconButton>
                <Button
                    disabled={isSaving}
                    onClick={ onSaveNote }
                    color="primary" sx={{ paddingY: 2, paddingX: 4 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Un título increíble"
                    fullWidth
                    sx={{ border: 'none', marginBottom: 2 }}
                    label="Título"
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />
                <TextField
                    type="text"
                    variant="outlined"
                    fullWidth
                    multiline
                    placeholder="¿Qué pasó hoy?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}

                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color="error"
                >
                    <DeleteOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Eliminar
                </Button>

            </Grid>

            {/* Galería de imágenes */}
            <ImageGallery images={ note.imageUrls } />

        </Grid>
    )
}
