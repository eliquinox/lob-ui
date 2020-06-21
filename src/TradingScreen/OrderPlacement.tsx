import {
    Button,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core"
import InfoIcon from "@material-ui/icons/Info"
import ToggleButton from "@material-ui/lab/ToggleButton"
import React, { useRef, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Book, Order } from "./types"
import { getBook, placeOrder } from "./requests"
import { ToggleButtonGroup } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"
import { keys, map, get } from "lodash"

const useStyles = makeStyles({
    rGroupLabel: {
        fontSize: 12,
        padding: 0,
    },
})

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
    const [side, setSide] = useState("bid")
    const [orderType, setOrderType] = useState("lmt")
    const priceRef = useRef<any>("")
    const sizeRef = useRef<any>("")
    const classes = useStyles()
    const handleOneClickTradingSizeChange = (_: any, newSize: number) => {
        setOneClickTradingSize(newSize)
    }

    return (
        <>
            <Card
                style={{
                    marginLeft: 15,
                    marginRight: 5,
                    width: 410,
                }}
            >
                <CardContent>
                    <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                        <Grid container justify="space-between">
                            <Grid item />
                            <Grid item>
                                <Typography variant="h6">Order Placement</Typography>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <Divider style={{ marginTop: 5 }} />
                        <Grid container justify="space-between">
                            <Grid item style={{ marginTop: 5 }}>
                                <Typography>One-click trading:</Typography>
                            </Grid>
                            <Grid item />
                            <Grid item>
                                <Switch
                                    checked={oneClickTrading}
                                    onChange={() => setOneClickTrading(!oneClickTrading)}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ "aria-label": "primary checkbox" }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="space-between">
                            <Grid item />
                            <Grid item>
                                <ToggleButtonGroup
                                    size="small"
                                    style={{ height: 20 }}
                                    value={oneClickTrading && oneClickTradingSize}
                                    exclusive
                                    onChange={handleOneClickTradingSizeChange}
                                >
                                    <ToggleButton value={1} disabled={!oneClickTrading}>
                                        1
                                    </ToggleButton>
                                    <ToggleButton value={5} disabled={!oneClickTrading}>
                                        5
                                    </ToggleButton>
                                    <ToggleButton value={10} disabled={!oneClickTrading}>
                                        10
                                    </ToggleButton>
                                    <ToggleButton value={25} disabled={!oneClickTrading}>
                                        25
                                    </ToggleButton>
                                    <ToggleButton value={50} disabled={!oneClickTrading}>
                                        50
                                    </ToggleButton>
                                    <ToggleButton value={100} disabled={!oneClickTrading}>
                                        100
                                    </ToggleButton>
                                    <ToggleButton value={125} disabled={!oneClickTrading}>
                                        125
                                    </ToggleButton>
                                    <ToggleButton value={250} disabled={!oneClickTrading}>
                                        250
                                    </ToggleButton>
                                    <ToggleButton value={500} disabled={!oneClickTrading}>
                                        500
                                    </ToggleButton>
                                    <ToggleButton value={1000} disabled={!oneClickTrading}>
                                        1000
                                    </ToggleButton>
                                    <ToggleButton value={2500} disabled={!oneClickTrading}>
                                        2500
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item />
                        </Grid>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography style={{ marginLeft: 2, marginTop: 10 }}>Side:</Typography>
                            </Grid>
                            <Grid item style={{ marginRight: 50 }}>
                                <FormControl component="fieldset">
                                    <RadioGroup row defaultValue="bid" onChange={(_, side) => setSide(side)}>
                                        <FormControlLabel
                                            value="bid"
                                            control={<Radio color="primary" />}
                                            label="Bid"
                                            labelPlacement="start"
                                        />
                                        <FormControlLabel
                                            value="offer"
                                            control={<Radio color="primary" />}
                                            label="Offer"
                                            labelPlacement="start"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item style={{ marginTop: 8 }}>
                                <Tooltip
                                    title="Use this panel to place orders manually or trigger one-click trading,
                                           select desired size above and use Limit Order Book directly."
                                >
                                    <InfoIcon />
                                </Tooltip>
                            </Grid>
                        </Grid>
                        <Grid container justify="space-between" alignItems="flex-start" style={{ marginTop: 5 }}>
                            <Grid item style={{ marginLeft: 12 }}>
                                <Grid container direction="column" justify="flex-start" alignItems="flex-end">
                                    <FormControl component="fieldset">
                                        <RadioGroup defaultValue="lmt" onChange={(_, type) => setOrderType(type)}>
                                            <Grid item>
                                                <FormControlLabel
                                                    value="lmt"
                                                    control={
                                                        <Radio
                                                            style={{ display: "inline-block", padding: 0 }}
                                                            color="primary"
                                                            size="small"
                                                        />
                                                    }
                                                    label="LMT"
                                                    labelPlacement="end"
                                                    classes={{ label: classes.rGroupLabel }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <FormControlLabel
                                                    value="mkt"
                                                    control={
                                                        <Radio
                                                            style={{
                                                                display: "inline-block",
                                                                padding: 0,
                                                            }}
                                                            color="primary"
                                                            size="small"
                                                        />
                                                    }
                                                    label="MKT"
                                                    labelPlacement="end"
                                                    classes={{ label: classes.rGroupLabel }}
                                                />
                                            </Grid>
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Grid item style={{ marginRight: 5 }}>
                                <TextField
                                    disabled={orderType === "mkt"}
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
                                    label="Price"
                                    variant="outlined"
                                    inputRef={priceRef}
                                />
                            </Grid>
                            <Grid item style={{ marginRight: 3 }}>
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
                                    inputRef={sizeRef}
                                />
                            </Grid>
                            <Grid item style={{ marginLeft: 2 }}>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    style={{ height: 40, width: 100, fontSize: 15 }}
                                    onClick={() => {
                                        toast.dismiss()
                                        handleOrder(
                                            {
                                                side: side,
                                                price:
                                                    orderType === "lmt"
                                                        ? Number(priceRef.current.valueOf().value)
                                                        : getMarketPrice(side, book),
                                                size: Number(sizeRef.current.valueOf().value),
                                            },
                                            setBook
                                        )
                                    }}
                                >
                                    Place
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

const getMarketPrice = (side: string, book?: Book) => {
    const compFunc = side === "bid" ? Math.max : Math.min
    const bookSide = get(book, side === "bid" ? "offers" : "bids", {})
    const prices = map(keys(bookSide), Number)
    return compFunc(...prices)
}

const handleOrder = (order: Order, setBook: (book: Book) => void) => {
    placeOrder(order)
        .then((response) => {
            toast.success(
                <div style={{ fontWeight: "bold" }}>
                    Order placed:
                    <pre style={{ fontWeight: "bold" }}>{JSON.stringify(response.data, undefined, 2)}</pre>
                </div>,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        })
        .catch((error) => {
            toast.error(
                <div style={{ fontWeight: "bold" }}>
                    Error placing order:
                    <pre style={{ fontWeight: "bold" }}>{error.response.data.error}</pre>
                </div>,
                {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            )
        })
        .then(() => getBook(setBook))
}
