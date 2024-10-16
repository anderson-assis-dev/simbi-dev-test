"use client";

import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { LoansList } from "@/features/components/LoansList";
import { Box } from "@mui/material";
import LoanForm from "@/views/LoanForm";

type Loan = {
    id: string;
    book: {
        title: string;
    };
    author: {
        first_name: string;
        last_name: string;
    };
    loaned_at: string;
    returned_at: string | null;
};

export default function LoansPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [loans, setLoans] = useState<Loan[]>([]);
    const fetchLoans = async () => {
        try {
            const response = await fetch("http://localhost:9000/api/loans");
            const data = await response.json();
            setLoans(data);
        } catch (error) {
            console.error("Erro ao buscar empréstimos:", error);
        }
    };

    // Chama fetchLoans ao montar o componente
    useEffect(() => {
        fetchLoans();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredLoans = loans.filter((loan) => {
        const authorName = `${loan.author.first_name} ${loan.author.last_name}`.toLowerCase();
        return (
            loan.book.title.toLowerCase().includes(searchTerm) ||
            authorName.includes(searchTerm) ||
            loan.id.includes(searchTerm)
        );
    });

    const handleAddLoan = () => {
        setSelectedLoan(null);
        setIsFormOpen(true);
    };

    const handleEditLoan = (loan: Loan) => {
        setSelectedLoan(loan);
        setIsFormOpen(true);
    };

    const handleSuccess = () => {
        fetchLoans();
    };

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
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </Grid>
                        <Grid item>
                            <Button variant="contained" sx={{ mr: 1 }} onClick={handleAddLoan}>
                                Adicionar um empréstimo
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Box sx={{ my: 5, mx: 2 }}>
                <LoansList loans={filteredLoans} onEdit={handleEditLoan} />
            </Box>
            { <LoanForm
                open={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                initialData={selectedLoan}
                onSuccess={handleSuccess}
            /> }
        </Paper>
    );
}
