const asyncHandler = require("express-async-handler")
/** @type {import("mongoose").Model} */
const Contact = require("../models/contactModel")

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async(req,res) =>{
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
});

// @desc Get individual contacts
//@route GET /api/contacts/:id
//@access private

const getContact =  asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found")

    }
    res.status(200).json(contact);
});

//@desc create new contacts
//@route Post /api/contacts
//@access private

const createContact = asyncHandler(async(req,res) =>{
    console.log("The requested body is",req.body)
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })
    res.status(201).json(contact);
});

//@desc update contacts
//@route Put /api/contacts 
//@access private

const updateContact = asyncHandler(async(req,res) =>{

    const contact = await Contact.findById(req.params.id)
        if(!contact){
        res.status(404);
        throw new Error("Contact not Found")

    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User does not have permission to update")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatedContact);
})

//@desc delete contacts
//@route delete /api/contacts
//@access private

const deleteContact = asyncHandler(async(req,res) =>{
        const contact = await Contact.findById(req.params.id)
        if(!contact){
        res.status(404);
        throw new Error("Contact not Found")

    }
        if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User does not have permission to update")
    }

        await Contact.findByIdAndDelete(req.params.id)

    
    res.status(200).json(contact);


})

module.exports={getContact,createContact,updateContact,deleteContact,getContacts}