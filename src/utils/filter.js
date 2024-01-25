const sortProduct = (sortBy) => {
    let nameSort = 'products.created_at';
    let valueSort = 'desc';
    if(sortBy === 'createdAtAsc') {
        nameSort = 'products.created_at';
        valueSort = 'asc';
    } else if(sortBy === 'nameDesc') {
        nameSort = 'products.name';
        valueSort = 'desc';
    } else if(sortBy === 'nameAsc') {
        nameSort = 'products.name';
        valueSort = 'asc';
    } else if (sortBy === 'priceDesc') {
        nameSort = 'products.price';
        valueSort = 'desc';
    } else if (sortBy === 'priceAsc') {
        nameSort = 'products.price';
        valueSort = 'asc';
    } else {
        nameSort = 'products.created_at';
        valueSort = 'desc';
    }
    return {
        nameSort,
        valueSort
    }
}
module.exports = {
    sortProduct
}