
export const signup = async(req, res)=>{
    try{
       const {fullName, username, password, confirmPassword, gender} = req.body;

    }
    catch(err){
        console.log(err)
    }
}

export const login = async(req, res)=>{
    console.log('login router')
}

export const logout =async (req, res)=>{
    console.log('logout router')
}

