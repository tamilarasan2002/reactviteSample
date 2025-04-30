
import UserBooks from "../Model/Book.Model.js";





export const GetBooks = async (req, res) => {
  console.log(req.user);
  
  const { userId } = req.user;
  console.log(userId);
  
  try { 
    // const { error, value } = Book.validate({ email });
    if (userId){
      
      const userBooks = await UserBooks.findOne({ 'user_id':userId});
          console.log(userBooks);
    
    if (!userBooks){
      return res
        .status(400)
        .json({ success: false, message: "Data not fount", userBooks })
    }
    return res
        .status(200)
        .json({ success: true, message: "You got Books data", userBooks });
      }
  } catch (error) {
    console.log(error);
  }
};

export const PostBooks = async (req, res) => {
  console.log(req.user);
  
  const { userId } = req.user;
  const {user_id,books} = req.body; 

  console.log(user_id,books);

  try {
    const userBooks = await UserBooks.findOne({ user_id: user_id });
    console.log(userBooks);
    
    if (!userBooks.user_id) {
      const insetBookData = await UserBooks.insertOne({user_id: userId,"books.books": books})
      return res.status(200).json({ success: true, message: "Book inserted successfully",insetBookData});
    }
    const addBookData = await UserBooks.findOneAndUpdate(
      { user_id: userId },
      { $push: { "books": books } },
      { new: true, upsert: true }
    );    console.log(addBookData);
    
    return res.status(200).json({ success: true, message: "Book added successfully",addBookData});

    // return res.status(200).json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.error('Error adding book:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


export const UpdateBooks = async (req, res) => {
  const {body,user,params} = req
  console.log(params.id);
 



  try {
    const findUserBooks = await UserBooks.findOne({ user_id: user.userId });
    // console.log(findUserBooks);

    if (!findUserBooks.user_id) {
      // const insetBookData = await UserBooks.insertOne({user_id: userId,"books.books": books})
      return res.status(400).json({ success: false, message: "User don't exist",findUserBooks});
    }
    const insetBookData = await UserBooks.findByIdAndUpdate(
      { _id: params.id },
      { $set: { "books.$": {...body} } },
      { new: true }
    );    
    // console.log(insetBookData);
    
    return res.status(200).json({ success: true, message: "Book added successfully",insetBookData});

    // return res.status(200).json({ success: true, message: "Book added successfully" });
  } catch (error) {
    console.error('Error adding book:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};