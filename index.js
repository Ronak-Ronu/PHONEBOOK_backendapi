const express= require('express');
const cors= require('cors');
const bodyparser=require('body-parser');
const mongoose= require('mongoose');
const server = express();
const PORT = process.env.PORT || 8080

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://admin:1234@minidb.fj06imn.mongodb.net/?retryWrites=true&w=majority");
  console.log('db connected');
}
const PhoneBook = new mongoose.Schema({
    name: String,
    phone:String,
    location:String
}, { collection: 'PHONEBOOK' });

const Phone = mongoose.model('PHONEBOOK', PhoneBook);


server.use(cors());
server.use(bodyparser.json());

server.post('/db',async (req,res)=>{
    let phonebook=new Phone();
    phonebook.name= req.body.Name;
    phonebook.phone= req.body.PhoneNumber;
    phonebook.location= req.body.Location;
    const document= await phonebook.save();
    console.log(document);
    res.json(document);
});


server.get('/db',async (req,res)=>{
    const doc=await Phone.find({});
    res.json(doc);

});

server.get('/db/:id', async (req, res) => {
      const doc = await Phone.findOne({ _id: req.params.id });
      console.log(doc);
      res.json(doc);
  });
server.delete('/delete/:id', async (req, res) => {
    await Phone.deleteOne({ _id: req.params.id});
});
  
server.listen(PORT,()=>{
    console.log(`server is running ronak at port ${PORT} `);
});
