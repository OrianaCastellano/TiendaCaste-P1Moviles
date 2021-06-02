const table = 'productBill';

module.exports = {
    // Insert
    createproductBill: `INSERT INTO ${ table } (product_ide, bill_ide, product_bill_num ) 
    VALUES ($1, $2, $3 )`,   

    // Select 
    getproductBill: `SELECT * FROM ${ table }`, 
    getById:`SELECT * FROM ${ table } WHERE UPPER(product_ide) LIKE $1 and UPPER(bill_ide) LIKE $2 `,
    
    // Update
    updateproductBill: `UPDATE ${ table } SET product_bill_num =$1
    WHERE product_ide = $2 and bill_ide =$3 RETURNING *`,
    
    // Delete
    deleteproduct: `DELETE FROM ${ table } WHERE product_ide = $1, bill_ide = $2`
}