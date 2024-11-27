const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=> 
{
    console.log('Database Connected Successfully!')
}
)
.catch((error)=> {
    console.log(`Error Connecting to the Database ${error}`)
}) 
;
