import { Book } from "./types"
import { get, keys } from "lodash"
import React from "react"
import FlashOnIcon from "@material-ui/icons/FlashOn"
import {
    Divider,
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    withStyles,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import InfoIcon from "@material-ui/icons/Info"
import { handleOrder } from "./OrderPlacement"

const useStyles = makeStyles({
    table: {
        minWidth: 450,
    },
})

const PriceCell = withStyles({
    body: {
        fontSize: 20,
        borderRightWidth: 1,
        borderRightStyle: "solid",
        borderRightColor: "#515151",
        borderLeftWidth: 1,
        borderLeftStyle: "solid",
        borderLeftColor: "#515151",
    },
})(TableCell)

const BidCell = withStyles({
    body: {
        fontSize: 20,
        color: "#4ea8de",
        "&:hover": {
            backgroundColor: "blue !important",
            cursor: "pointer",
        },
    },
})(TableCell)

const OfferCell = withStyles({
    body: {
        fontSize: 20,
        color: "#df7373",
        "&:hover": {
            backgroundColor: "red !important",
            cursor: "pointer",
        },
    },
})(TableCell)

export default ({
    book,
    setBook,
    oneClickTrading,
    oneClickTradingSize,
}: {
    book?: Book
    setBook: (book: Book) => void
    oneClickTrading: boolean
    oneClickTradingSize: number
}) => {
    const rows = bookToTableData(book)
    const classes = useStyles()
    return (
        <TableContainer component={Paper}>
            <Grid container justify="space-between" alignItems="center">
                <Grid item style={{ marginLeft: 10, marginTop: 5 }}>
                    <Tooltip
                        title="Use this widget to observe the current state of the limit order book.
                               Enable one-click trading to place orders using ladder interface."
                        placement="left"
                    >
                        <InfoIcon />
                    </Tooltip>
                </Grid>
                <Grid item style={{ marginLeft: 20 }}>
                    <Typography variant="h5" style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
                        Limit Order Book
                    </Typography>
                </Grid>
                <Grid item>
                    <Tooltip title={`One-click trading ${oneClickTrading ? "enabled" : "disabled"}.`} placement="right">
                        <span>
                            <IconButton disabled={!oneClickTrading}>
                                <FlashOnIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider style={{ borderColor: "#515151" }} />
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Offers</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Bids</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.price}>
                            <OfferCell
                                align="center"
                                onClick={() =>
                                    oneClickTrading &&
                                    handleOrder(
                                        {
                                            side: "offer",
                                            price: Number(row.price),
                                            size: oneClickTradingSize,
                                        },
                                        setBook
                                    )
                                }
                            >
                                {row.offerVolume}
                            </OfferCell>
                            <PriceCell align="center">{row.price}</PriceCell>
                            <BidCell
                                align="center"
                                onClick={() =>
                                    oneClickTrading &&
                                    handleOrder(
                                        {
                                            side: "bid",
                                            price: Number(row.price),
                                            size: oneClickTradingSize,
                                        },
                                        setBook
                                    )
                                }
                            >
                                {row.bidVolume}
                            </BidCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const bookToTableData = (book?: Book) => {
    const bids = get(book, "bids")
    const offers = get(book, "offers")

    const bidPrices = keys(bids)
    const offerPrices = keys(offers)

    return [...bidPrices, ...offerPrices].reverse().map((p) => {
        const bidLevel = get(bids, p)
        const bidVolume = bidLevel ? bidLevel.placements.reduce((a, b) => a + b.size, 0) : ""

        const offerLevel = get(offers, p)
        const offerVolume = offerLevel ? offerLevel.placements.reduce((a, b) => a + b.size, 0) : ""

        return {
            bidVolume: bidVolume,
            price: p,
            offerVolume: offerVolume,
        }
    })
}
