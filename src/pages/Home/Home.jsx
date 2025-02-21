import React from 'react';
import { Typography, Container, Button, Grid, Paper, Box } from '@mui/material';

const Home = () => {
    return (
        <Container maxWidth="lg" style={{ marginTop: '50px' }}>
            <Box textAlign="center" mb={5}>
                <Typography variant="h2" gutterBottom>
                    Welcome to Bookly
                </Typography>
                <Typography variant="h5" gutterBottom>
                Streamline Your Library with Our Cutting-Edge Management System
                </Typography>
                <Typography variant="body1" paragraph>
                In today's rapidly evolving digital landscape, libraries must adapt and modernize their services to remain relevant and efficient. That's why we're thrilled to introduce our state-of-the-art Library Management System, a comprehensive solution designed to simplify your operations and enhance the patron experience.
                </Typography>

            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f4c3' }}>
                        <Typography variant="h6" gutterBottom>
                        Effortless Book Cataloging
                        </Typography>
                        <Typography variant="body1">
                        Easily add, update, and manage your entire collection of books, including detailed information about authors, categories, and publishers.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffccbc' }}>
                        <Typography variant="h6" gutterBottom>
                        Author and Publisher Management
                        </Typography>
                        <Typography variant="body1">
                        Maintain a comprehensive database of authors and publishers, ensuring accurate and up-to-date records.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#b3e5fc' }}>
                        <Typography variant="h6" gutterBottom>
                        Intuitive Category Organization
                        </Typography>
                        <Typography variant="body1">
                        Organize your books into categories, making it simple for patrons to find what they're looking for..
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#d1c4e9' }}>
                        <Typography variant="h6" gutterBottom>
                        Seamless Borrowing and Lending
                        </Typography>
                        <Typography variant="body1">
                        Streamline the borrowing and lending process, track who has borrowed which books, and manage due dates with ease.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#c8e6c9' }}>
                        <Typography variant="h6" gutterBottom>
                        Patron Management
                        </Typography>
                        <Typography variant="body1">
                        Keep track of your library patrons, update their information, and view their borrowing history.
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} style={{ padding: '20px', textAlign: 'center', backgroundColor: '#ffecb3' }}>
                        <Typography variant="h6" gutterBottom>
                        User-Friendly Interface
                        </Typography>
                        <Typography variant="body1">
                        Our website is designed to be intuitive and easy to navigate, ensuring a smooth experience for both staff and patrons.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;