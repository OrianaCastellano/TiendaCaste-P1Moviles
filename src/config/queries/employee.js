const table = 'employee';

module.exports = {
    // Insert
    createemployee: `INSERT INTO ${ table } (employee_nam, employee_las_nam, employee_ema, employee_pas, employee_num) 
    VALUES ($1, $2, $3, $4, $5)`,   

    // Select 
    getemployee: `SELECT * FROM ${ table }`, 
    getemployee_nam: `SELECT * FROM ${ table } WHERE UPPER(employee_nam) LIKE $1`,
    getemployee_las_nam: `SELECT * FROM ${ table } WHERE UPPER(employee_las_nam) LIKE $2`,
    getemployee_ema: `SELECT * FROM ${ table } WHERE UPPER(employee_ema) LIKE $3`,
    getemployee_pas: `SELECT * FROM ${ table } WHERE UPPER(employee_pas) LIKE $4`,
    getemployee_num: `SELECT * FROM ${ table } WHERE UPPER(employee_num) LIKE $5`,
    getById:`SELECT * FROM ${ table } WHERE UPPER(employee_ide) LIKE $1`,
    
    // Update
    updateproduct: `UPDATE ${ table } SET  employee_nam = $1, employee_las_nam = $2, employee_ema = $3, 
    employee_pas = $4, employee_num = $5,
    WHERE employee_ide = $6 RETURNING *`,
    
    // Delete
    deleteproduct: `DELETE FROM ${ table } WHERE employee_ide = $1`
}