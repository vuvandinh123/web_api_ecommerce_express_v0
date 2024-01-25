function mapRowToProduct(row) {
    return {
        id: row.id,
        name: row.name,
        desc: row.desc,
        details: row.details,
        slug: row.slug,
        price: row.price,
        created_at: row.created_at,
        quantity: row.quantity,
        description: row.description,
        brand: {
            id: row.brand_id,
            name: row.brand_name,
            slug: row.brand_slug
        },
        category: {
            id: row.category_id,
            name: row.category_name,
            slug: row.category_slug
        },
        images: row.imageUrls ? row.imageUrls.split(',') : [],
        attributes: row.attributes || "",

    };
}
function RowToProductCart(row) {
    return {
        id: row.id,
        name: row.name,
        product_id: row.product_id,
        price: row.price,
        images: row.imageUrls ? row.imageUrls.split(',') : [],
        quantity: row.quantity
    }
}
function createSlug(inputString) {
    const slug = inputString
        .toLowerCase()
        .normalize("NFD") // Chuẩn hóa chuỗi Unicode, chuyển đổi các dấu thanh và dấu sắc thành các ký tự riêng lẻ
        .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
        .replace(/[đĐ]/g, "d") // Thay thế đ và Đ thành d
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/[^\w\-]+/g, "") // Loại bỏ các ký tự không phải chữ cái, số, dấu gạch ngang
        .replace(/\-\-+/g, "-") // Loại bỏ các dấu gạch ngang liên tiếp
        .replace(/^-+/, "") // Loại bỏ dấu gạch ngang ở đầu chuỗi
        .replace(/-+$/, ""); // Loại bỏ dấu gạch ngang ở cuối chuỗi

    return slug;
}

module.exports = {
    mapRowToProduct,
    createSlug,
    RowToProductCart
}