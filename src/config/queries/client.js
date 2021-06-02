const table = 'client';

module.exports = {
    // Insert
    createclient: `INSERT INTO ${ table } (client_nam, client_las_nam, client_dir ) 
    VALUES ($1, $2, $3)`,   

    // Select 
    getclient: `SELECT * FROM ${ table }`, 
    getclient_nam: `SELECT * FROM ${ table } WHERE UPPER(client_nam) LIKE $1`,
    getclient_las_nam: `SELECT * FROM ${ table } WHERE UPPER(client_las_nam) LIKE 2`,
    getclient_dir: `SELECT * FROM ${ table } WHERE UPPER(client_dir) LIKE $3`,
    getById:`SELECT * FROM ${ table } WHERE UPPER(client_ide) LIKE $1`,
    
    // Update
    updateclient: `UPDATE ${ table } SET  client_nam = $1, client_las_nam = $2, client_dir = $3, 
    WHERE client_ide = $4 RETURNING *`,
    
    // Delete
    deleteproduct: `DELETE FROM ${ table } WHERE client_ide = $1`
}