
"use client";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { BooksList } from "@/features/components";
import { Box } from "@mui/material";

type ViewProps = {
    books: Book[];
};

export default function HomePageView({ books = [] }: ViewProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Função para filtrar os livros com base no termo de busca
    const filteredBooks = books.filter((book) => {
        const { title, author } = book;
        const authorName = `${author.first_name} ${author.last_name}`.toLowerCase();

        // Verifica se o termo de busca corresponde ao título, autor ou ID do livro
        return (
            title.toLowerCase().includes(searchTerm) ||
            authorName.includes(searchTerm) ||
            book.id.includes(searchTerm)
        );
    });

    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
                <Toolbar>
                    <Grid container spacing={2} sx={{ alignItems: "center" }}>
                        <Grid item>
                            <SearchIcon color="inherit" sx={{ display: "block" }} />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                fullWidth
                                placeholder="Pesquisar pelo título, autor ou ID"
                                InputProps={{
                                    disableUnderline: true,
                                    sx: { fontSize: "default" },
                                }}
                                variant="standard"
                                value={searchTerm} // valor do campo de pesquisa
                                onChange={handleSearchChange} // atualiza o estado quando o usuário digita
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" sx={{ mr: 1 }}>
                                Adicionar um livro
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box sx={{ my: 5, mx: 2 }}>
                {/* Passa a lista filtrada de livros */}
                <BooksList books={filteredBooks} />
            </Box>
        </Paper>
    );
}
