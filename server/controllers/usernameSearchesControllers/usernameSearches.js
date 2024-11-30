const usernameSearchesModel = require('../../models/usernameSearches')

async function usernameSearches(req, res) {
    try {
        const username = req.body.username; // Expecting username to be passed in the request body
        
        if (!username) {
            return res.status(400).send({
                success: 'false',
                message: 'Username is required!',
            });
        }

        // Find the username entry in the database
        const userSearch = await usernameSearchesModel.findOne({ username });
        if(userSearch.searchCount >= 3) {
            return res.status(400).send(
                {
                    success:'false',
                    message:'Limit for this particular username exceeded.'
                }
            )
        }
        if (userSearch) {
            // Update the count if the entry exists
            userSearch.searchCount += 1;
            await userSearch.save();
            res.status(200).send({
                success: 'true',
                message: 'Username search count updated successfully!',
                data: userSearch,
            });
        } else {
            // Create a new entry if the username doesn't exist
            const newEntry = new usernameSearchesModel({
                username,
                count: 1,
            });
            await newEntry.save();
            res.status(201).send({
                success: 'true',
                message: 'New username entry created successfully!',
                data: newEntry,
            });
        }
    } catch (error) {
        res.status(500).send({
            success: 'false',
            message: 'An error occurred while updating searches!',
            error: error.message,
        });
    }
}

module.exports = usernameSearches;