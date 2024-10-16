import { Box, Button, Typography } from "@mui/material";

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

type LoansListItemProps = {
    loan: Loan;
    onEdit?: (loan: Loan) => void;
};

const LoansListItem = ({ loan, onEdit }: LoansListItemProps) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <Box>
                <Typography variant="body1">{loan.book.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Autor: {loan.author?.first_name} | Empréstimo em: {loan.loaned_at} | Devolução em: {loan.returned_at ?? 'Sem data prevista'}
                </Typography>
            </Box>
            <Button variant="outlined" onClick={() => onEdit && onEdit(loan)}>
                Editar
            </Button>
        </Box>
    );
};

export default LoansListItem;
