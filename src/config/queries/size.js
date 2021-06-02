const table = 'size';

module.exports = {
    // Insert
    createsize: `INSERT INTO ${ table } (size_des ) 
    VALUES ($1 )`,   

    // Select 
    getsize: `SELECT * FROM ${ table }`, 
    getsizeDes: `SELECT * FROM ${ table } WHERE UPPER(size_des) LIKE $1`,
    getById:`SELECT * FROM ${ table } WHERE UPPER(size_ide) LIKE $1`,
    
    // Update
    updatesize: `UPDATE ${ table } SET  size_des = $1
    WHERE size_ide = $2 RETURNING *`,
    
    // Delete
    deleteproduct: `DELETE FROM ${ table } WHERE size_ide = $1`
}
