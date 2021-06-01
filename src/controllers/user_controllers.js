const dataToUser = (rows) => {
    const cliente = [];
        
    rows.forEach(element => {
        let cliente = {  
            name: element.user_nam,
            lastname: element.user_las_nam,
            Direction: element.user_dirc,
    }
    })
} 

// Variables
const pool = new Pool(dbConfig);  


// Utilidades 
const newReponse = (message, typeResponse, body) => {
    return {  message, typeResponse, body }
}

const checkAux = async (fieldData, type, callBack) => { 
    let data;

    switch(type) {
        case 'email':
            data = await pool.query(dbQueriesUser.getUserByEmail, [ fieldData ]);
            break;

        case 'number': 
            data = await pool.query(dbQueriesUser.getUserByNumber, [ fieldData ]);  
            break;

        default:
            return callBack('Error on type-checkAux')
    }
    
    if(data) {
        if(data.rows.length > 0) {
            return callBack(null, dataToUser(data.rows));
        
        } else {
            return callBack(null, null);
        }    

    } else {
        return callBack('Error on query');
    }
}

// parte logica 
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
            ? res.json(newReponse("Users found", "Seccess", dataToUser(data.rows)))
            : res.json(newReponse("Users not found", "Success",[]));
    
        } else {
            res.json(newReponse("Error searhing companies", "Error", { }));
        }
        
    }
}
const checkEmail = (req, res) => {
    const { email } = req.body;

    checkAux(email, 'email', (err, users) => {
        if(err) {
            res.json(newReponse(err, 'Error', { }));
            
        } else if(users) {
            res.json(newReponse(`Email ${ email } already use`, 'Error', { }));
            
        } else {    
            res.json(newReponse('Email checked', 'Success', { }));
        }
    });
}
const login = async (req, res) => { 
    const { email, password } = req.body; 
    const data = await pool.query(dbQueriesUser.getUserByEmail, [ email ]);
    
    if(data) { 
        if(data.rowCount > 0) {  
            let { img, interests, skills, awards, ...user } = dataToUser(data.rows)[0]; 
            const token = jwt.sign(user, process.env.SECRET, { expiresIn: '12h' }); 
            
            user = JSON.stringify({ ...user, interests, skills, awards, img }); 
            (await bcryt.compare(password, data.rows[0].user_pas)) 
            ? res.json(newReponse('Logged successfully', 'Success', { token, user }))
            : res.json(newReponse('Incorrect password', 'Error', { }));
        
        } else {
            res.json(newReponse('Email not found', 'Error', { })); 
        }

    } else {
        res.json(newReponse('Error searching user with email', 'Error', { }));
    }
}
const getUser = async (req, res) => { 
    const data = await pool.query(dbQueriesUser.getAllUsers);
    
    if (data) {
        (data.rowCount > 0)
        ? res.json(newReponse('All users', 'Success', dataToUser(data.rows)))
        : res.json(newReponse('Error searhing the users', 'Error', { }));
    
    } else { 
        res.json(newReponse('Without users', 'Success', { }));
    }
}
const createUsers =  (req, res) => {   
    const { name, password, lastName, email, country, phoneNumber, img } = req.body;
    
    passwordUtil.encryptPass(password, async(err, passHash) => { 
        if(err) {
            res.json(newReponse(err, 'Error', { }));
            
        } else { 
            const arrAux = [ new Date(), name, lastName, email, passHash, phoneNumber, country.id, img ];
            const data = await pool.query(dbQueriesUser.createUser, arrAux);
            
            (data)
            ? res.json(newReponse('User created', 'Success', { }))
            : res.json(newReponse('Error create user', 'Error', { }));
        }
    });
}
const updateUserById = (req, res) => {
    const token = req.headers['x-access-token'];
    const { name, email, lastName, img, description, country, newCountry } = req.body;
    const errors = [];

    if(!token) {
        res.json(newReponse('User dont have a token', 'Error', { }));

    } else {
        if(!field.checkFields([ name, email, lastName, country ])) {
            errors.push({ text: 'Please fill in all the spaces' });
        } 
        
        if(errors.length > 0) {
            res.json(newReponse('Errors detected', 'Fail', { errors }));
        
        } else {
            checkAux(email, 'email', async (err, users) => {
                if(err) {
                    res.json(newReponse(err, 'Error', { }));
                
                } else if(!users) {
                    res.json(newReponse('User not found', 'Error', { }));
                    
                } else {
                    const { iat, exp, ...tokenDecoded } = jwt.verify(token, process.env.SECRET);

                    if(users[0].id != tokenDecoded.id) {
                        res.json(newReponse(`Email ${ email } already use`, 'Error', { }));
                        
                    } else {   
                        let arrAux = [ name, lastName, email, description, img, tokenDecoded.id ];
                        let data; 

                        if(tokenDecoded.country != country) {
                            arrAux.push(newCountry.id);   
                            data = await pool.query(dbQueriesUser.updateUserWithCountryById, arrAux);
                        } else {
                            data = await pool.query(dbQueriesUser.updateUserWithoutCountryById, arrAux);
                        }

                        if(data) {
                            let { img, interests, skills, awards, ...user } = dataToUser(data.rows)[0]; 
                            
                            (tokenDecoded.country != country)
                            ? user = { ...user, country: newCountry.tittle  }
                            : user = { ...user, country: country }
                            
                            const token = jwt.sign(user, process.env.SECRET, { expiresIn: '12h' }); 
                            
                            res.json(newReponse('User updated', 'Success', token));
                       
                        } else {
                            res.json(newReponse('Error on update', 'Error', { }));
                        }
                    }
                }        
            });       
        }
    }
}
const updatePassById = async (req, res) => { 
    const token = req.headers['x-access-token'];
    const { newPassword, oldPassword } = req.body; 
    const errors = [];

    if(!token) {
        res.json(newReponse('User dont have a token', 'Error', { }));

    } else {
        if(!field.checkFields([ newPassword, oldPassword ])) { 
            errors.push({ text: 'Please fill in all the spaces' });
        } 
        
        if(!passwordUtil.checkPass(newPassword)) { 
            errors.push({ text: 'passwords must be uppercase, lowercase, special characters, have more than 8 digits and match each other'});
        } 
        
        if(errors.length > 0) {
            res.json(newReponse('Errors detected', 'Fail', { errors }));
        
        } else {
            const { iat, exp, ...tokenDecoded } = jwt.verify(token, process.env.SECRET); 
            const user = await pool.query(dbQueriesUser.getUserById, [ tokenDecoded.id ]);
    
            if(user) {
                if(user.rowCount <= 0) {
                    res.json(newReponse('User not found', 'Error', { })); 
                
                } else {
                    if(await bcryt.compare(oldPassword, user.rows[0].user_pas)) {
                        passwordUtil.encryptPass(newPassword, async (err, hash) => { 
                            if(err) { 
                                res.json(newReponse(err, 'Error', { }));
                 
                            } else {
                                const data = await pool.query(dbQueriesUser.updatePassById, [ hash, tokenDecoded.id ]);
                                
                                (data) 
                                ? res.json(newReponse('Pass updated', 'Success', { }))
                                : res.json(newReponse('Error on update', 'Error', { }));
                            }
                        });
    
                    } else {
                        res.json(newReponse('Old password no match', 'Error', { }));
                    }
                }
    
            } else {
                res.json(newReponse('Error searshing user', 'Error', { }))
            }        
        } 
    }
}
// Export
module.exports = { 
    login,
    getUser, 
    createUsers, 
    updateUserById,
    updatePassById,
}