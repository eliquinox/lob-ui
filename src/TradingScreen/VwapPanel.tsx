import { Card, Grid, TextField, Tooltip, Typography } from "@material-ui/core"
import React, { useEffect, useRef, useState } from "react"
import { getVwapPricing } from "./requests"
import { Book } from "./types"
import InfoIcon from "@material-ui/icons/Info"

const getNumberFromRef = (ref: React.MutableRefObject<any>): number => {
    const n = ref.current.valueOf().value
    return !n.startsWith("0") ? Number(n) : Number.NaN
}

const setVwapPrices = (
    size: number,
    buyPriceCallBack: (price: number) => void,
    sellPriceCallBack: (price: number) => void
) => {
    getVwapPricing("BID", size).then((r) => {
        const price = r.data.price
        price ? buyPriceCallBack(price) : buyPriceCallBack(Number.NaN)
    })
    getVwapPricing("OFFER", size).then((r) => {
        const price = r.data.price
        price ? sellPriceCallBack(price) : sellPriceCallBack(Number.NaN)
    })
}

export default ({ book }: { book?: Book }) => {
    const bookRef = useRef<any>(book)
    const sizeRef = useRef<any>(0)
    const [buyPrice, setBuyPrice] = useState<number>(Number.NaN)
    const [sellPrice, setSellPrice] = useState<number>(Number.NaN)

    useEffect(() => {
        if (book !== bookRef.current) bookRef.current = book
        setVwapPrices(getNumberFromRef(sizeRef), setBuyPrice, setSellPrice)
    }, [bookRef, book])

    return (
        <Card
            style={{
                marginTop: 10,
                marginLeft: 15,
                marginRight: 5,
                width: 410,
            }}
        >
            <Grid container justify="space-between" style={{ marginBottom: 10 }}>
                <Grid item />
                <Grid item>
                    <Typography variant="h6">VWAP Pricing</Typography>
                </Grid>
                <Grid item />
            </Grid>
            <Grid container spacing={3} justify="center" alignItems="center" alignContent="center">
                <Grid item>
                    <Tooltip
                        title="Input a size of an order to execute and find out the corresponding market prices."
                        placement="left"
                    >
                        <InfoIcon />
                    </Tooltip>
                </Grid>
                <Grid item style={{ marginRight: 20 }}>
                    <TextField
                        style={{ fontSize: 18 }}
                        InputProps={{
                            style: {
                                fontSize: 15,
                                height: 40,
                                width: 100,
                            },
                        }}
                        InputLabelProps={{
                            style: {
                                fontSize: 15,
                                height: 40,
                                width: 100,
                            },
                            margin: "dense",
                        }}
                        label="Size"
                        variant="outlined"
                        onChange={() => {
                            const size = getNumberFromRef(sizeRef)
                            if (size) setVwapPrices(size, setBuyPrice, setSellPrice)
                            else {
                                setBuyPrice(Number.NaN)
                                setSellPrice(Number.NaN)
                            }
                        }}
                        inputRef={sizeRef}
                    />
                </Grid>
                <Grid item />
            </Grid>
            <Grid container justify="space-between" alignItems="center" style={{ marginTop: 10 }}>
                <Grid item />
                <Grid item>
                    <Typography variant="h6">To Sell</Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h6">To Buy</Typography>
                </Grid>
                <Grid item />
            </Grid>
            <Grid container justify="space-between" alignItems="center">
                <Grid item />
                <Grid item>
                    <Typography variant="h6" style={{ color: "#df7373" }}>
                        {sellPrice}
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography variant="h6" style={{ color: "#4ea8de" }}>
                        {buyPrice}
                    </Typography>
                </Grid>
                <Grid item />
            </Grid>
        </Card>
    )
}
