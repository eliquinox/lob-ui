import React, { useEffect, useState } from "react"
import BookTable from "./BookTable"
import { Grid, Link, Typography } from "@material-ui/core"
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
        const interval = setInterval(() => {
            ;(async () => await getBook(setBook))()
        }, 1000)
        return () => clearInterval(interval)
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
                    <Typography>
                        <Link href="https://github.com/eliquinox/jLOB">BE Source Code</Link> |{" "}
                        <Link href="https://github.com/eliquinox/lob-ui">UI Source Code</Link>
                    </Typography>
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
                    <Grid item style={{ marginRight: 30 }}>
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
                position="bottom-right"
                style={{
                    minWidth: 475,
                }}
                autoClose={2000}
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
