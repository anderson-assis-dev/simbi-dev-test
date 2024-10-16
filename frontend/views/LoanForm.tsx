"use client";

import { useState, useEffect } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

type Author = {
    id: string;
    first_name: string;
    last_name: string;
};

type Book = {
    id: string;
    title: string;
};

type Loan = {
    id: string;
    book_id: string;
    author_id: string;
    loaned_at: string;
    returned_at: string | null;
};

type LoanFormProps = {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialData?: Loan | null;
};

export default function LoanForm({ open, onClose, onSuccess, initialData = null }: LoanFormProps) {
    const [selectedBookId, setSelectedBookId] = useState(initialData?.book_id || "");
    const [selectedAuthorId, setSelectedAuthorId] = useState(initialData?.author_id || "");
    const [loanedAt, setLoanedAt] = useState(initialData?.loaned_at || "");
    const [returnedAt, setReturnedAt] = useState(initialData?.returned_at || "");
    const [books, setBooks] = useState<Book[]>([]);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        if (open && !isFetched) {
            const fetchBooks = async () => {
                try {
                    const response = await fetch("http://localhost:9000/api/books");
                    const data = await response.json();
                    setBooks(data);
                } catch (error) {
                    console.error("Erro ao buscar livros:", error);
                }
            };

            const fetchAuthors = async () => {
                try {
                    const response = await fetch("http://localhost:9000/api/authors");
                    const data = await response.json();
                    setAuthors(data);
                } catch (error) {
                    console.error("Erro ao buscar autores:", error);
                }
            };

            fetchBooks();
            fetchAuthors();
            setIsFetched(true);
        }

        if (initialData) {
            setSelectedBookId(initialData.book_id);
            setSelectedAuthorId(initialData.author_id);
            setLoanedAt(initialData.loaned_at);
            setReturnedAt(initialData.returned_at || "");
        }
    }, [open, isFetched, initialData]);

    const handleSubmit = async () => {
        const loanData = {
            book_id: selectedBookId,
            author_id: selectedAuthorId,
            loaned_at: loanedAt,
            returned_at: returnedAt || null,
        };
        const url = initialData
            ? `http://localhost:9000/api/loans/${initialData.id}`
            : "http://localhost:9000/api/loans";
        try {
            await fetch(url, {
                method: initialData ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loanData),
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{initialData ? "Editar Empréstimo" : "Registrar Empréstimo"}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="dense">
                    <InputLabel id="book-select-label">Livro</InputLabel>
                    <Select
                        labelId="book-select-label"
                        value={selectedBookId}
                        onChange={(e) => setSelectedBookId(e.target.value)}
                        label="Livro"
                    >
                        {books.map((book) => (
                            <MenuItem key={book.id} value={book.id}>
                                {book.title}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel id="author-select-label">Autor</InputLabel>
                    <Select
                        labelId="author-select-label"
                        value={selectedAuthorId}
                        onChange={(e) => setSelectedAuthorId(e.target.value)}
                        label="Autor"
                    >
                        {authors.map((author) => (
                            <MenuItem key={author.id} value={author.id}>
                                {`${author.first_name} ${author.last_name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    margin="dense"
                    label="Data de Empréstimo"
                    type="datetime-local"
                    fullWidth
                    value={loanedAt}
                    onChange={(e) => setLoanedAt(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Data de Devolução"
                    type="datetime-local"
                    fullWidth
                    value={returnedAt}
                    onChange={(e) => setReturnedAt(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {initialData ? "Salvar Alterações" : "Registrar Empréstimo"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
