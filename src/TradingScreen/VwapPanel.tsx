import { Box, Card, Grid, TextField, Typography } from "@material-ui/core"
import React, { useRef, useState } from "react"
import { getVwapPricing } from "./requests"

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

export default () => {
    // TODO: update when book changes
    const sizeRef = useRef<any>(0)
    const [buyPrice, setBuyPrice] = useState<number>(Number.NaN)
    const [sellPrice, setSellPrice] = useState<number>(Number.NaN)

    return (
        <Card
            style={{
                marginTop: 10,
                marginLeft: 5,
                marginRight: 5,
                width: 410,
                textAlign: "center",
            }}
        >
            <Box m={1} pt={1}>
                <Typography variant="h5">VWAP Pricing</Typography>
            </Box>
            <Grid container direction="column">
                <div>
                    <Box m={1} pt={1}>
                        <TextField
                            style={{ maxWidth: 120 }}
                            id="outlined-basic"
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
                    </Box>
                </div>
                <Grid container justify="space-around">
                    <Box m={1} pt={1}>
                        <Typography variant="h5">To Sell</Typography>
                        <Typography variant="h5" style={{ color: "#df7373" }}>
                            {sellPrice}
                        </Typography>
                    </Box>
                    <Box m={1} pt={1}>
                        <Typography variant="h5">To Buy</Typography>
                        <Typography variant="h5" style={{ color: "#4ea8de" }}>
                            {buyPrice}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}
