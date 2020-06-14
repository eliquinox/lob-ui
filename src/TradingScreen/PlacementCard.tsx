import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    TextField,
    Tooltip,
    Typography,
} from "@material-ui/core"
import FilterNoneIcon from "@material-ui/icons/FilterNone"
import { Book, Placement } from "./types"
import React, { useRef } from "react"
import { cancelOrder, getBook, placeOrder } from "./requests"
import { toast } from "react-toastify"

const useStyles = makeStyles({
    id: {
        fontSize: 14,
    },
})

export default ({ placement, setBook }: { placement: Placement; setBook: (book: Book) => void }) => {
    const classes = useStyles()
    const priceRef = useRef<any>(placement.price)
    const sizeRef = useRef<any>(placement.size)

    return (
        <Card
            style={{
                marginLeft: 5,
                marginRight: 5,
                width: 415,
            }}
        >
            <CardContent>
                <Grid container justify="space-between">
                    <Grid item style={{ minWidth: 300 }}>
                        <Divider style={{ marginBottom: 5 }} />
                        <Grid container justify="space-between">
                            <Typography className={classes.id} color="textSecondary">
                                ID:
                            </Typography>
                            <Typography className={classes.id} color="textSecondary" style={{ marginLeft: 4 }}>
                                {placement.uuid}
                            </Typography>
                        </Grid>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                        <Grid container justify="space-between" alignItems="flex-start" style={{ marginBottom: 5 }}>
                            <Typography
                                component="h2"
                                style={{
                                    color: placement.side === "BID" ? "#4ea8de" : "#df7373",
                                }}
                            >
                                {placement.side.charAt(0).toUpperCase() + placement.side.toLowerCase().slice(1)}
                            </Typography>
                            <Grid item>
                                <Grid container>
                                    <Typography component="h3" style={{ marginLeft: 10 }}>
                                        Price:
                                    </Typography>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 14,
                                            }}
                                            InputProps={{
                                                style: {
                                                    fontSize: 15,
                                                    height: 25,
                                                    width: 70,
                                                },
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: {
                                                    fontSize: 10,
                                                },
                                            }}
                                            inputRef={priceRef}
                                            defaultValue={placement.price.toString()}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container>
                                    <Typography component="h3" style={{ marginLeft: 10 }}>
                                        Size:
                                    </Typography>
                                    <Box>
                                        <TextField
                                            variant="outlined"
                                            style={{
                                                marginLeft: 10,
                                                fontSize: 14,
                                            }}
                                            InputProps={{
                                                style: {
                                                    fontSize: 15,
                                                    height: 25,
                                                    width: 70,
                                                },
                                            }}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: {
                                                    fontSize: 10,
                                                },
                                            }}
                                            inputRef={sizeRef}
                                            defaultValue={placement.size.toString()}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                        <Grid container justify="space-between">
                            <Typography component="h3" style={{ fontSize: 14 }}>
                                Placed:
                            </Typography>
                            <Typography component="h3" style={{ fontSize: 14 }}>
                                {placement.timestamp}
                            </Typography>
                        </Grid>
                        <Divider style={{ marginTop: 5 }} />
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justify="space-between"
                            style={{ marginLeft: 5 }}
                        >
                            <Grid item style={{ marginTop: 3 }}>
                                <Tooltip title="Copy ID " placement="top">
                                    <IconButton
                                        size="small"
                                        onClick={() => navigator.clipboard.writeText(placement.uuid)}
                                    >
                                        <FilterNoneIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item style={{ marginTop: 10 }}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        width: 50,
                                        height: 25,
                                    }}
                                    onClick={() => {
                                        const inputPrice = Number(priceRef.current.valueOf().value)
                                        const inputSize = Number(sizeRef.current.valueOf().value)
                                        const saneOrder =
                                            inputSize > 0 &&
                                            inputPrice > 0 &&
                                            (inputPrice !== placement.price || inputSize !== placement.size)
                                        saneOrder
                                            ? addToast(
                                                  handleOrderUpdate(
                                                      placement,
                                                      Number(priceRef.current.valueOf().value),
                                                      Number(sizeRef.current.valueOf().value),
                                                      sizeRef
                                                  )
                                              ).then(() => getBook(setBook))
                                            : toast.error(
                                                  <div style={{ fontWeight: "bold" }}>
                                                      Error updating order. Ensure new price and size are valid.
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
                                    }}
                                >
                                    Update
                                </Button>
                            </Grid>
                            <Grid item style={{ marginTop: 10 }}>
                                <Button
                                    variant="outlined"
                                    style={{
                                        width: 50,
                                        height: 25,
                                    }}
                                    onClick={() =>
                                        cancelOrder(placement.uuid, placement.size).then(() => getBook(setBook))
                                    }
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

const handleOrderUpdate = async (placement: Placement, inputPrice: number, inputSize: number, sizeRef: any) => {
    const unchanged = inputPrice === placement.price && inputSize === placement.size
    const priceChanged = inputPrice !== placement.price
    const sizeIncreased = inputSize > placement.size
    const sizeDecreased = inputSize < placement.size

    if (unchanged) return

    if (priceChanged) {
        return cancelOrder(placement.uuid, placement.size).then(() =>
            placeOrder({
                price: inputPrice,
                size: inputSize,
                side: placement.side,
            })
        )
    }

    if (sizeIncreased) {
        sizeRef.current.value = placement.size
        return placeOrder({
            price: placement.price,
            size: inputSize - placement.size,
            side: placement.side,
        })
    }

    if (sizeDecreased) {
        return cancelOrder(placement.uuid, placement.size - inputSize)
    }
}

const addToast = (promise: Promise<any>) =>
    promise
        .then((response) => {
            toast.success(
                <div style={{ fontWeight: "bold" }}>
                    Order updated:
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
