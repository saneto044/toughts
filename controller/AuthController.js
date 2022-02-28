const User = require('../models/User')
const bcrypt = require('bcryptjs')


module.exports = class AuthController{

    static async login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        const { email , password } = req.body

        // check if email
        const user = await User.findOne({where:{email}})
        
        if(!user){
            req.flash('message','Usuario não encontrado')
            res.render('auth/login')
            return
        }

        //check if password

        const passwordMatch = bcrypt.compareSync(password , user.password) 
        
        if(!passwordMatch){
            req.flash('message','Senha Inválida')
            res.render('auth/login')
            return
        }
        req.session.userid = user.id ;

        req.flash('message', 'Autenticação realizada com sucesso!!!!!')

        req.session.save(() => {
            console.log('user.id aqui :' + user.id)
            res.redirect('/')
        })
    }
    static async register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req,res){
        const {name , email, password , confirmpassword} = req.body

        //password match validation
        if(password != confirmpassword){
            req.flash('message','As senhas não conferem,tente novamente')
            res.render('auth/register')
        }
        //check if user exists
        const checkIfUserExist = await User.findOne({where:{email:email}})
        if(checkIfUserExist){
            req.flash('message','O e-mail já esta em uso')
            res.render('auth/login');

            return
        }
        //create a password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password,salt);

        const user = {
            name,
            email,
            password:hashedPassword,
        }

        try {
            const createdUser = await User.create(user)

            //Initialized session
            req.session.userid = createdUser.id 
            
            req.flash('message' , 'Usuario criado com sucesso');
            
            req.session.save(() => {
                res.redirect('/')
            })
            
        } catch (error) {
            console.log('deu um erro' + error)           
        }
    }

    static logout(req,res){
        req.session.destroy()
        console.log('sua sessao expirou ' + req.session )
        res.redirect('/login')
    }
}