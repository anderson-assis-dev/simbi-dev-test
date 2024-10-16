// BookItem.tsx
import type { FunctionComponent } from "react";
import type { BookItemProps } from "./BookItem.interface";
import { Card, CardContent, CardMedia, CardActions, Button, Typography, Tooltip } from "@mui/material";

export const BookItem: FunctionComponent<BookItemProps> = ({ title, coverUrl, author, publisher, onEdit }) => {
    return (
        <Card variant="outlined">
            <CardMedia sx={{ height: 264 }} image={coverUrl ? coverUrl : "/cover.png"} title={title} />
            <CardContent>
                <Tooltip title={title} arrow>
                    <Typography gutterBottom variant="h5" noWrap>
                        {title}
                    </Typography>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non arcu...

                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${author.first_name} ${author.last_name}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" fullWidth>
                    Empréstimo
                </Button>
                {onEdit && (
                    <Button size="small" variant="outlined" onClick={onEdit}>
                        Editar
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};
