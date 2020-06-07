import { Book, Order, Side } from "./types"
import axios from "axios"
import { bookDsn } from "../constants"

const instance = axios.create({
    baseURL: bookDsn,
})

export const getBook = (callback?: (book: Book) => void) =>
    instance
        .get("/book")
        .then((response) => response.data)
        .then((data) => callback && callback(data))

export const placeOrder = (order: Order) => instance.post("/book", order)

export const cancelOrder = (uuid: string, size: number) =>
    instance.put("/book", {
        uuid,
        size,
    })

export const getVwapPricing = (action: Side, size: number) =>
    instance.post("/vwap", {
        action,
        size,
    })
