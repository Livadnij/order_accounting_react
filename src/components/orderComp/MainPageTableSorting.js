const MainPageTableSorting = (searchInput, orders, clients) => {
    let orderSearchByName = []
    let orderSearchByNumber = []
    if(!orders.length){
        return ('noOrders')
    } else if (searchInput) {
        const orderSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
        const nameSearch = clients.filter((obj) => obj.Name.includes(searchInput));
        for (let i = 1; i <= nameSearch.length; i++){orderSearchByName.push(orders.filter((obj) => obj.clID.includes(nameSearch[i-1].id)))}
        console.log(orderSearchByName)
        const numberSearch = clients.filter((obj) => obj.phoneNum.includes(searchInput));
        console.log(orderSearch, nameSearch, numberSearch)
        const fullSearch = orders.filter((obj) => obj.ordID.includes(searchInput));
      return fullSearch
    } else if (orders&&!orders.filter((obj) => obj.ordID.includes(searchInput)).length) {
        return('notFound')
    }
    return orders
}

export default MainPageTableSorting
