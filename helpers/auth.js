module.exports.checkAuth = function(req,res,next){
    const userId = req.session.userid

    if(!userId){
        console.log('você está sem session')
        res.redirect('/login');
    }
    next()
}