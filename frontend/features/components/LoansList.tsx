import { Box } from "@mui/material";
import LoansListItem from "./LoansListItem";

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
    onEdit?: (loan: Loan) => void;
};

export const LoansList = ({ loans, onEdit }: LoansListProps) => {
    return (
        <Box>
            {loans.map((loan) => (
                <LoansListItem key={loan.id} loan={loan} onEdit={onEdit} />
            ))}
        </Box>
    );
};
