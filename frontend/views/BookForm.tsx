"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { createBook, updateBook } from "@/services/bookService";

type Author = {
    id: string;
    first_name: string;
    last_name: string;
};

type BookFormProps = {
    open: boolean;
    onClose: () => void;
    initialData?: Book | null;
    onSuccess: () => void;
};

export default function BookForm({ open, onClose, initialData, onSuccess }: BookFormProps) {
    const [title, setTitle] = useState("");
    const [publisher, setPublisher] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [authors, setAuthors] = useState<Author[]>([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/authors");
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error("Erro ao buscar autores:", error);
            }
        };

        fetchAuthors();
    }, []);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setPublisher(initialData.publisher);
            setAuthorId(initialData.authorId);
        } else {
            setTitle("");
            setPublisher("");
            setAuthorId("");
        }
    }, [initialData]);

    const handleSubmit = async () => {
        const bookData = { title, publisher, authorId };

        try {
            if (initialData) {
                await updateBook(initialData.id, bookData);
            } else {
                await createBook(bookData);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? "Editar Livro" : "Adicionar Livro"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Editora"
                    fullWidth
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="author-select-label">Autor</InputLabel>
                    <Select
                        labelId="author-select-label"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        label="Autor"
                    >
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id}>
                                {`${author.first_name} ${author.last_name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {initialData ? "Salvar Alterações" : "Adicionar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
