const knex = require("../database/database");
class QueryProducts {
    constructor() {
        this.query = knex.from('products');
    }
    select(columns) {
        this.query.select(columns);
        return this;
    }
    joinCategory() {
        this.query.join('categories', 'products.category_id', 'categories.id');
        return this;
    }
    joinBrand() {
        this.query.join('brands', 'products.brand_id', 'brands.id');
        return this;
    }
    joinInventory() {
        this.query.leftJoin('product_inventory', 'products.id', 'product_inventory.product_id');
        return this;
    }
    joinImage() {
        this.query.leftJoin('product_image', 'products.id', 'product_image.product_id');
        return this;
    }
    joinVariant(){
        this.query.leftJoin('product_variant', 'products.id', 'product_variant.product_id');
        return this;
    }
    groupBy(columns) {
        this.query.groupBy(columns);
        return this;
    }
    limit(limit) {
        this.query.limit(limit);
        return this;
    }
    offset(offset) {
        this.query.offset(offset);
        return this;
    }
    orderBy(column, order) {
        this.query.orderBy(column, order);
        return this;
    }
    where(column, value) {
        this.query.where(column, value);
        return this;
    }
    find(id) {
        this.query.where('products.id', id).first();
        return new Promise(resolve => {
            resolve(this.query);
        });
    }
    get() {
        return new Promise(resolve => {
            resolve(this.query);
        });

    }

}
module.exports = {
    QueryProducts
}