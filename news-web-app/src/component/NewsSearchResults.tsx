import React from 'react';
import { useState } from "react";
import { useSearchNewsResultsQuery } from "../app/newsApi";
import { NewsSearchItem } from "../app/types";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface IProps {
    search: string;
}

export default function NewsSearchResults({ search }: IProps) {
    const [page, setPage] = useState(1);
    const { data, isLoading } = useSearchNewsResultsQuery({ search, page });

    if (isLoading || !data) {
        return (
            <Box sx={{ p: 3, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
                {data.results.map((item) => (
                    <NewsListItem key={item.id} {...item} />
                ))}
            </List>
            <Pagination
                count={10}
                color="primary"
                sx={{ pb: 4 }}
                page={page}
                onChange={(e, value) => {
                    setPage(value);
                    window.scrollTo(0, 0);
                }}
            />
        </Stack>
    );

    function NewsListItem(item: NewsSearchItem) {
        return (
            <ListItem key={item.id} sx={{ py: 1 }}>
                <ListItemButton
                    onClick={() => {
                        window.open(item.source_url, "_blank", "noopener,noreferrer");
                    }}
                >
                    <ListItemAvatar>
                        <Avatar
                            alt={item.title}
                            src={item.image_url.length > 0 ? item.image_url[0] : ""}
                        />
                    </ListItemAvatar>
                    <ListItemText id={item.id} primary={item.title} />
                </ListItemButton>
            </ListItem>
        );
    }
}
