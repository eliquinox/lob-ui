import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import { Book, bookToPlacements } from "./types"
import PlacementCard from "./PlacementCard"
import { ListItem } from "@material-ui/core"

const drawerWidth = 485

const useStyles = makeStyles((theme) => ({
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

export default ({ book, setBook }: { book?: Book; setBook: (book: Book) => void }) => {
    const classes = useStyles()
    const placements = bookToPlacements(book)

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <List>
                    {placements.map((p) => (
                        <ListItem key={p.uuid}>
                            <PlacementCard placement={p} setBook={setBook} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </div>
    )
}
