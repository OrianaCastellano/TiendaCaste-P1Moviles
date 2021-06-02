const table = 'product';

module.exports = {
    // Insert
    createproduct: `INSERT INTO ${ table } (size_ide, product_img, product_tit, product_des, product_pri, product_sto ) 
    VALUES ($1, $2, $3, $4, $5, $6 )`,   

    // Select 
    getAllproduct: `SELECT * FROM ${ table }`, 
    getproduct_tit: `SELECT * FROM ${ table } WHERE UPPER(product_tit) LIKE $1`,
    getById:`SELECT * FROM ${ table } WHERE UPPER(product_ide) LIKE $1`,
    
    // Update
    updateproduct: `UPDATE ${ table } SET  size_ide = $1, product_img = $2, product_tit = $3, 
    product_des = $4, product_pri = $5, product_sto = $6
    WHERE product_ide = $7 RETURNING *`,
    
    // Delete
    deleteproduct: `DELETE FROM ${ table } WHERE product_ide = $1`
}
