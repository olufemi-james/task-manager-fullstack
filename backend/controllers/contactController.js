
const Contact = require ("../models/Contact")


//POST(Create) Contact
const createContact = async (req, res) => {
    if(!req.body.name || !req.body.contact){
        return res.status(400).json({
            message: "Name or Contact missng"
        })
    }

    const newContact = await Contact.create({
        name: req.body.name,
        contact: req.body.contact
    })
    res.status(201).json(newContact);
}


//GET(READ) Contact
const getContact = async (req, res) => {
    
    const contacts = await Contact.find();

    res.json(contacts)
}

//GET Contact by Name
const getContactByName = async (req, res) => {
    const foundContact = await Contact.findOne({
        name: req.params.name
    })

    if(!foundContact){
       return res.status(404).json({
        message: "Contact not found"
       });
    }
    res.json(foundContact);
}

//PUT(Update) Contact

const updateContact = async (req, res) => {
   
    if(!req.body.name && !req.body.contact){
        return res.status(400).json({
            message: "No update data provided"
        })
    }
   
     const updatedContact = await Contact.findOneAndUpdate (
       {name: req.params.name}, req.body,
        {new: true},
    )
    if(!updatedContact){
        return res.status(404).json({
            message: "Contact not found"
        })
    }
    res.json(updatedContact)
     
}
// DELETE Contact
const deleteContact = async (req, res) => {
    const deletedContact = await Contact.findOneAndDelete (
       { name: req.params.name}
    );
    
    if(!deletedContact) {
        return res.status(400).json({
            message: "Contact not Found"
        }) 
    }

       res.json({
         message: "User deleted"
       })
}


module.exports = {
    createContact,
    getContact,
    getContactByName,
    updateContact,
    deleteContact
};

