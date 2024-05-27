import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

export const startNewNote = () => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        dispatch( savingNewNote() )

        const newNote = {
            title: 'Nota de prueba 1',
            body: '',
            date: new Date().getTime()
        }
        
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        setActiveNote(newNote);
        
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!uid) throw new Error('No se ha encontrado el usuario');
        
        dispatch(setNotes(await loadNotes(uid)));
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToSave = { ...note };
        delete noteToSave.id;

        const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(noteRef, noteToSave, { merge: true });

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));            
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc( noteRef );

        dispatch(deleteNoteById(note.id));
    }
}