export const jsonBody = async (req, res) =>{
    const buffer = []
    
    for await(const chunk of req){
        buffer.push(chunk)
    }

    try {
        if(req.headers['content-type'].includes('multipart/form-data')){
            let file = Buffer.concat(buffer).toString().split('\n')
            const index = file.findIndex(value => value.match('title'))
            file = file.splice(index+1).map(value => value.split(';'))
            file = file.filter(array => array.length == 2)
            const csvBody = []
            file.forEach(value => 
                csvBody.push({
                            title: value[0],
                            description: value[1]
                        }))
            req.body = csvBody
        } else {
            req.body = JSON.parse(Buffer.concat(buffer).toString())
        }
    } catch (error) {
        req.body = null
    }


}