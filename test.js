let y = 0
function test () {
    return new Promise(resolve => {
        y = y + 1
        resolve(y)
    });
}

 async function test1 (){
    let result = await test()
    return result
}
test1().then(result=>
console.log(result))