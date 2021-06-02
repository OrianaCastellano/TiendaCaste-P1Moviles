const table = 'bill';

module.exports = {
    // Insert
    createbill: `INSERT INTO ${ table } (client_ide, employee_ide, bill_dat, bil_pri)
    VALUES ($1, $2, $3, $4)`,   

    // Select 
    getbill: `SELECT * FROM ${ table }`, 
    getclient_ide: `SELECT * FROM ${ table } WHERE UPPER(client_ide) LIKE $1`,
    getemployee_ide: `SELECT * FROM ${ table } WHERE UPPER(employee_ide) LIKE $2`,
    getbill_dat: `SELECT * FROM ${ table } WHERE UPPER(bill_dat) LIKE $3`,
    getbill_pri: `SELECT * FROM ${ table } WHERE UPPER(bill_pri) LIKE $4`,
    getById:`SELECT * FROM ${ table } WHERE UPPER(bill_ide) LIKE $1`,
    
    // Update
    updateproduct: `UPDATE ${ table } SET  client_ide = $1, employee_ide = $2, bill_dat = $3, 
    bill_pri = $4
    WHERE bill_ide = $5 RETURNING *`,
    
    // Delete
    deleteproduct: `DELETE FROM ${ table } WHERE bill_ide = $1`
}
