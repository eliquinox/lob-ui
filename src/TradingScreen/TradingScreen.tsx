import React, {useEffect, useState} from 'react';
import BookTable from "./BookTable";
import {Grid, Typography} from "@material-ui/core";
import OrderPlacement from "./OrderPlacement";
import {Book, bookToPlacements} from "./types";
import {getBook} from "./requests";
import VwapPanel from "./VwapPanel";
import OrdersPanel from "./OrdersPanel";
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';


export default () => {
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        (async () => await getBook(setBook))()
    }, [])

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Grid item style={{ marginBottom: 50 }}>
                    <OrdersPanel placements={bookToPlacements(book)} setBook={setBook}/>
                </Grid>
                <Grid item style={{ textAlign: "center", marginTop: 30, marginBottom: 10 }}>
                    <Typography variant="h4">EXCHANGE</Typography>
                    <CompareArrowsIcon fontSize="large"/>
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                    style={{marginTop: 150, marginBottom: 10}}
                >
                    <Grid item />
                    <Grid item style={{marginLeft: 440}}>
                        <BookTable book={book}/>
                    </Grid>
                    <Grid item style={{marginRight: 50}}>
                        <Grid container direction="column">
                            <Grid item>
                                <OrderPlacement setBook={setBook}/>
                            </Grid>
                            <Grid item>
                                <VwapPanel/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
