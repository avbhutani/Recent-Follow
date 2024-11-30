const usernameSearchesModel = require('../../models/usernameSearches')

async function usernameSearches(username) {
    try {
        // const username = req.params.username; // Expecting username to be passed in the request body
        console.log(username)
        if (!username) {
            return res.status(400).send({
                success: 'false',
                message: 'Username is required!',
            });
        }

        // Find the username entry in the database
        const userSearch = await usernameSearchesModel.findOne({ username });
        if(userSearch && userSearch.searchCount >= 3) {
            return false;
            // return res.status(400).send(
            //     {
            //         success:'false',
            //         message:'Limit for this particular username exceeded.'
            //     }
            // )
        }
        if (userSearch) {
            // Update the count if the entry exists
            userSearch.searchCount += 1;
            await userSearch.save();
            return true;
            // res.status(200).send({
            //     success: 'true',
            //     message: 'Username search count updated successfully!',
            //     data: userSearch,
            // });
        } else {
            // Create a new entry if the username doesn't exist
            const newEntry = new usernameSearchesModel({
                username,
                count: 1,
            });
            await newEntry.save();
            return true;
            // res.status(201).send({
            //     success: 'true',
            //     message: 'New username entry created successfully!',
            //     data: newEntry,
            // });
        }
    } catch (error) {
        return false;
        // res.status(500).send({
        //     success: 'false',
        //     message: 'An error occurred while updating searches!',
        //     error: error.message,
        // });
    }
}

module.exports = usernameSearches;