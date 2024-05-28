// Here i will write al validation functions
// this function returns an object with data or error depending on 'success' flag
exports.userValidation = async (model, data)=>{
    try {
        const {username, email, password} = data;
        // check if there are empty  fields
        if(!username || !email || !password){
            throw new Error("Please, all fields are required");
        }

        // check if a username is already exists
        const userByUsername = await model.findOne({username});
        if(userByUsername){
            throw new Error("This username is already existing");
        }

        // check if an email is already exists
        const userByEmail = await model.findOne({email});
        if(userByEmail){
            throw new Error("This email is already existing");
        }

        return {success: 1, data}

    } catch (error) {
        const errorMsg = error.message
        return {success: 0, errorMsg};
    }
}