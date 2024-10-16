// BooksList.tsx
import type { FunctionComponent } from "react";
import type { BooksListProps } from "./BooksList.interface";
import Grid from "@mui/material/Unstable_Grid2";
import { BookItem } from "../BookItem";

export const BooksList: FunctionComponent<BooksListProps> = ({ books, onEdit }) => {
  return (
      <Grid container spacing={2}>
        {books.map((book) => (
            <Grid xs={12} sm={6} md={4} key={book.id}>
              <BookItem
                  {...book}
                  onEdit={() => onEdit?.(book)}
              />
            </Grid>
        ))}
      </Grid>
  );
};
