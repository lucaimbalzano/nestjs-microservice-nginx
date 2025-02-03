
export const SERVICES_NAME = {
    BOOK: 'book-service',
    CUSTOMER: 'customer-service',
    ORDER: 'order-service'
}

export const SERVICES_PORTS = {
    BOOK: 3000,
    CUSTOMER: 3000,
    ORDER: 3000
}

// Pattern Message or Events 
export const ACTION_IDENTIFIERS = {
    GET_CUSTOMER : 'getCustomer',
    GET_BOOK : 'getBook',
    IS_BOOK_IN_STOCK : 'isBookInStock',
    DECREASE_STOCK : 'DecreaseStock',
    INCREASE_STOCK : 'IncreaseStock'
}