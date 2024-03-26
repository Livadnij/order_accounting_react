const MainPageTableSorting = (searchInput, orders, clients) => {

    if(orders.length&&searchInput !== ""){
    const ordersFoundByClientsID = []

    const phoneNumSearch = clients.filter((obj) => obj.phoneNum.includes(searchInput));
    for (let i = 1; i <= phoneNumSearch.length; i++){
        console.log(phoneNumSearch[i-1])
        const temp = orders.filter((obj) => obj.clID.includes(phoneNumSearch[i-1].id));
        ordersFoundByClientsID.concat(temp)
    }
    const orderIndexSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
    console.log("phoneNumSearch" ,phoneNumSearch.length, phoneNumSearch)
    console.log("ordersFoundByClientsID" ,ordersFoundByClientsID.length, ordersFoundByClientsID)
    console.log(orderIndexSearch)
}

    if (!orders.length){
            return ('noOrders')
        } 
        else if (searchInput === "") {
            // empty search case
                console.log("normal search")
                return orders
        } 
        else if (isNaN(searchInput)) {
            // name case
            const nameSearch = clients.filter((obj) => obj.Name.includes(searchInput));
            console.log("names : ",nameSearch)
            return orders
        } 
        else if (!isNaN(searchInput) && orders.length > 999) {
            // phone number and order index case if orders length over 1000
            const ordersFoundByClientsID = []

            const phoneNumSearch = clients.filter((obj) => obj.phoneNum.includes(searchInput));
            for (let i = 1; i <= phoneNumSearch.length; i++){
                const temp = orders.filter((obj) => obj.clID.includes(searchInput));
                ordersFoundByClientsID.push(temp)
            }
            const orderIndexSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
            console.log("phoneNumSearch" ,phoneNumSearch.length, phoneNumSearch)
            console.log("ordersFoundByClientsID" ,ordersFoundByClientsID.length, ordersFoundByClientsID)
            console.log(orderIndexSearch)
        } 
        else if (!isNaN(searchInput) && searchInput.length >= 4 ) {
            // phone number case
            const phoneNumSearch = clients.filter((obj) => obj.phoneNum.includes(searchInput));
            console.log("phoneNum : ",phoneNumSearch)
            return orders
        } 
        else if (!isNaN(searchInput) && searchInput.length < 4 ) {
            // index case
            const orderSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
            console.log("orders : ",orderSearch)
            return orders
        } 
        else if (orders&&!orders.filter((obj) => obj.ordID.includes(searchInput)).length) {
                return('notFound')
        }
        return orders
}

export default MainPageTableSorting
