import {Book, Order, Side} from "./types";
import axios from "axios";

export const getBook = (callback?: ((book: Book) => void)) =>
    axios('http://localhost:4567/book')
        .then(response => response.data)
        .then(data => callback && callback(data))


export const placeOrder = (order: Order) =>
    axios.post('http://localhost:4567/book', order)


export const cancelOrder = (uuid: string, size: number) =>
    axios.put('http://localhost:4567/book', {
        uuid,
        size
    })


export const getVwapPricing = (action: Side, size: number) =>
    axios.post('http://localhost:4567/vwap', {
        action,
        size
    })
