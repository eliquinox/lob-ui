import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import { Book } from "./types"
import OrderPlacement from "./OrderPlacement"
import VwapPanel from "./VwapPanel"

const drawerWidth = 440

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        background: "#303030",
    },
}))

export default ({
    book,
    setBook,
    oneClickTrading,
    setOneClickTrading,
    oneClickTradingSize,
    setOneClickTradingSize,
}: {
    book?: Book
    setBook: (book: Book) => void
    oneClickTrading: boolean
    setOneClickTrading: (b: boolean) => void
    oneClickTradingSize: number
    setOneClickTradingSize: (n: number) => void
}) => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="right"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    <OrderPlacement
                        book={book}
                        setBook={setBook}
                        oneClickTrading={oneClickTrading}
                        setOneClickTrading={setOneClickTrading}
                        oneClickTradingSize={oneClickTradingSize}
                        setOneClickTradingSize={setOneClickTradingSize}
                    />
                    <VwapPanel book={book} />
                </List>
            </Drawer>
        </div>
    )
}
