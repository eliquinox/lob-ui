import React, { useEffect, useState } from "react"
import BookTable from "./BookTable"
import { Grid, Typography } from "@material-ui/core"
import { Book } from "./types"
import { getBook } from "./requests"
import CompareArrowsIcon from "@material-ui/icons/CompareArrows"
import { ToastContainer } from "react-toastify"
import OrderPlacementPanel from "./OrderPlacementPanel"
import OrderManagementPanel from "./OrderManagementPanel"

export default () => {
    const [book, setBook] = useState<Book>()
    const [oneClickTrading, setOneClickTrading] = useState(false)
    const [oneClickTradingSize, setOneClickTradingSize] = useState<number>(1)

    useEffect(() => {
        ;(async () => await getBook(setBook))()
    }, [])

    return (
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Grid
                    item
                    style={{
                        textAlign: "center",
                        marginTop: 30,
                        marginBottom: 10,
                    }}
                >
                    <Typography variant="h4">Quid pro Quo</Typography>
                    <CompareArrowsIcon fontSize="large" />
                </Grid>
                <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                    style={{ marginTop: 150, marginBottom: 10 }}
                >
                    <Grid item>
                        <OrderManagementPanel book={book} setBook={setBook} />
                    </Grid>
                    <Grid item style={{ marginRight: 50 }}>
                        <BookTable
                            book={book}
                            setBook={setBook}
                            oneClickTrading={oneClickTrading}
                            oneClickTradingSize={oneClickTradingSize}
                        />
                    </Grid>
                    <Grid item>
                        <OrderPlacementPanel
                            book={book}
                            setBook={setBook}
                            oneClickTrading={oneClickTrading}
                            setOneClickTrading={setOneClickTrading}
                            oneClickTradingSize={oneClickTradingSize}
                            setOneClickTradingSize={setOneClickTradingSize}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <ToastContainer
                position="top-right"
                style={{
                    minWidth: 475,
                }}
                autoClose={1000}
                hideProgressBar
                limit={1}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
