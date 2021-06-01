const dataToUser = (rows) => {
    const cliente = [];
        
    rows.forEach(element => {
        let cliente = {  
            name: element.user_nam,
            lastname: element.user_las_nam,
            Direction: element.user_dirc,
        }
    }
}

// Variables
const pool = new Pool(dbConfig);  


// Utilidades 
const newReponse = (message, typeResponse, body) => {
    return {  message, typeResponse, body }
}

//logica 
const getUserByName = async (req, res) => {
    const token = req.headers["x-access-token"];
    const {name} = req.params;

    if(!token){
        res.json(newReponse("User dont have a token", "Error",{}));
    } else {
        const arrAux = ["%${name.toUpperCase()}%"];
        const data = await pool.query(dbQueriesUser.getUserByName, arrAux);
        
        if(data){
            (data.rowCount > 0)
            ? res.json(newReponse("Users found", "Seccess", dataToUser(data.rows)));
            : res.json(newReponse("Users not found", "Success",[]));
    
        }else 
        res.json(newReponse("Error searhing companies", "Error", { }));
    }
}