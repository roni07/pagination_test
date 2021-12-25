import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Column {
    id: "title" | "url" | "created_at" | "author",
    label: string,
    minWidth?: number,
    align?: "right"
}

const columns: readonly Column[] = [
    { id: "title", label: "Title", minWidth: 170 },
    { id: "url", label: "URL", minWidth: 150 },
    { id: "created_at", label: "Created At", minWidth: 100 },
    { id: "author", label: "Author", minWidth: 100 },
];

export interface InitPost {
    title: string,
    url: string,
    created_at: Date,
    author: string
}

const Home: React.FC = () => {

    const history = useHistory();

    // pagination
    const [page, setPage] = useState<number>(0);
    const [totalElements, setTotalElements] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false);

    const [posts, setPosts] = useState<InitPost[]>([]);

    const [myInterval, setMyInterval] = useState<any>(null);

    useEffect(() => {
        getPosts(0);

        const interval = setInterval(() => {
            getPosts(0);
        }, 10000);

        setMyInterval(interval);

        return () => clearInterval(myInterval);
    }, []);

    const getPosts = async (pageNumber: number) => {
        try {
            setLoading(true);

            const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`);
            const data = await res.json();
            setPosts(data.hits);
            setTotalElements(data.nbHits);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const handleChangePage = async (event: unknown, newPage: number) => {

        if (newPage === 0) {
            const interval = setInterval(() => {
                getPosts(0);
            }, 10000);
            setMyInterval(interval);
        } else {
            clearInterval(myInterval);
        }

        setPage(newPage);
        await getPosts(newPage);
    }

    const getDetails = (post: InitPost) => {
        history.push({
            pathname: '/details',
            state: post
        })
    }

    return (
        <>
            <h2>Post List</h2>
            <Container style={{ maxWidth: "100%" }}>
                <Paper>
                    <TableContainer sx={{ maxHeight: 450 }}>
                        {
                            loading ? <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
                                <CircularProgress />
                            </Box> : <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map(column =>
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            )
                                        }
                                        <TableCell />
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        posts.map((row, index) => {
                                            return (
                                                <TableRow
                                                    key={index}
                                                >
                                                    {
                                                        columns.map(column => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                >
                                                                    {value}
                                                                </TableCell>
                                                            )
                                                        })
                                                    }
                                                    <TableCell>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                            onClick={() => getDetails(row)}
                                                        >
                                                            Details
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                            </Table>
                        }
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={20}
                        page={page}
                        onPageChange={handleChangePage}
                    />
                </Paper>
            </Container>
        </>
    )
}

export default Home;