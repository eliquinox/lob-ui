import {
    Card,
    CardContent,
    Typography,
    makeStyles,
    Grid,
    Divider,
} from "@material-ui/core"
import { Placement } from "./types"
import React from "react"

const useStyles = makeStyles({
    id: {
        fontSize: 14,
    },
})

export default ({ placement }: { placement: Placement }) => {
    const classes = useStyles()
    return (
        <Card>
            <CardContent>
                <Divider style={{ marginBottom: 5 }} />
                <Grid container justify="space-between">
                    <Typography className={classes.id} color="textSecondary">
                        ID:
                    </Typography>
                    <Typography
                        className={classes.id}
                        color="textSecondary"
                        style={{ marginLeft: 4 }}
                    >
                        {placement.uuid}
                    </Typography>
                </Grid>
                <Divider style={{ marginTop: 5, marginBottom: 5 }} />
                <Grid
                    container
                    justify="space-between"
                    alignItems="flex-start"
                    style={{ marginBottom: 5 }}
                >
                    <Typography
                        component="h2"
                        style={{
                            color:
                                placement.side === "BID"
                                    ? "#4ea8de"
                                    : "#df7373",
                        }}
                    >
                        {placement.side.charAt(0).toUpperCase() +
                            placement.side.toLowerCase().slice(1)}
                    </Typography>
                    <Typography component="h3">
                        {`Price: ${placement.price}`}
                    </Typography>
                    <Typography component="h3">
                        {`Size: ${placement.size}`}
                    </Typography>
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
            </CardContent>
        </Card>
    )
}
