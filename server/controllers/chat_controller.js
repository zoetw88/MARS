
const editor = async (req, res) => {
    try {
        let {id} = req.query
    
        res.render('editor2');
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}
module.exports = {
    editor
};