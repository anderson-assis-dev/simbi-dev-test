import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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

type LoansListProps = {
    loans: Loan[];
    onEdit: (loan: Loan) => void;
    onDelete: (id: string) => void;
};

export const LoansList = ({ loans, onEdit, onDelete }: LoansListProps) => {
    return (
        <List>
            {loans.map((loan) => (
                <ListItem key={loan.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <ListItemText
                        primary={loan.book.title}
                        secondary={`${loan.author.first_name} ${loan.author.last_name} - ${loan.loaned_at}`}
                    />
                    <div>
                        <IconButton edge="end" aria-label="edit" onClick={() => onEdit(loan)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(loan.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </ListItem>
            ))}
        </List>
    );
};
