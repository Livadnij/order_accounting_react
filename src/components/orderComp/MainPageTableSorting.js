const MainPageTableSorting = (searchInput, orders, clients) => {

    if (!orders.length){
            return ('noOrders')
        } 
        else if (searchInput === "") {
            // empty search case
                return orders
        } 
        else if (isNaN(searchInput)) {
            // name case
            const nameSearch = clients.filter((obj) => obj.Name.includes(searchInput));
            let ordersFoundByClientsName = []

            for (let i = 1; i <= nameSearch.length; i++){
                const temp = orders.filter((obj) => obj.clID.includes(nameSearch[i-1].id));
                ordersFoundByClientsName = ordersFoundByClientsName.concat(temp)
            }

            console.log("name search")

            return ordersFoundByClientsName
        } 
        else if (!isNaN(searchInput) && orders.length > 999) {
            // phone number and order index case if orders length over 1000
                let ordersFoundByClientsID = []
            
                const phoneNumSearch = clients.filter((obj) => obj.phoneNum.includes(searchInput));

                for (let i = 1; i <= phoneNumSearch.length; i++){
                    const temp = orders.filter((obj) => obj.clID.includes(phoneNumSearch[i-1].id));
                    ordersFoundByClientsID = ordersFoundByClientsID.concat(temp)
                }

                const orderIndexSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
                ordersFoundByClientsID = ordersFoundByClientsID.concat(orderIndexSearch)

                console.log("phoneNum & clIDSearch")

                return ordersFoundByClientsID
        } 
        else if (!isNaN(searchInput) && searchInput.length >= 4 ) {
            // phone number case
            const phoneNumSearch = clients.filter((obj) => obj.phoneNum.includes(searchInput));
            let ordersFoundByClientsPhone = []

            for (let i = 1; i <= phoneNumSearch.length; i++){
                const temp = orders.filter((obj) => obj.clID.includes(phoneNumSearch[i-1].id));
                ordersFoundByClientsPhone = ordersFoundByClientsPhone.concat(temp)
            }

            console.log("phoneNum search")
            return ordersFoundByClientsPhone
        } 
        else if (!isNaN(searchInput) && searchInput.length < 4 ) {
            // index case
            const orderSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
            console.log("order index search")
            return orderSearch
        } 
        else if (orders&&!orders.filter((obj) => obj.ordID.includes(searchInput)).length) {
                return('notFound')
        }
        return orders
}

export default MainPageTableSorting
