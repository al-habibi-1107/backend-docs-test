const express = require('express')

const PORT = process.env.PORT || 4000

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())
app.use(fileUpload())

let courses = [
    {
        "id":"11",
        "name": "Learn Reactjs",
        "price": 299

    },
    {
        "id":"22",
        "name": "Learn Angular",
        "price": 399

    },
    {
        "id":"33",
        "name": "Learn Django",
        "price": 499

    }

]

app.get("/",(rer,res)=>{
    res.send("hello")
})

app.get("/api/v1/lco",(req,res)=>{
    res.send("yoo from lco")
})

app.get("/api/v1/lcoobject",(req,res)=>{
    res.json({id:55,name:"learn Backend",price:699})
})

app.get("/api/v1/courses",(req,res)=>{
    res.send(courses)
})

app.get("/api/v1/mycourse/:courseId",(req,res)=>{
    const course = courses.find(course => course.id == req.params.courseId)
    res.send(course)
})

app.get("/api/v1/coursequery",(req,res)=>{
    let location = req.query.location;
    let device = req.query.device;

    res.send({location,device});
})

app.post('/api/v1/fileUpload',(req,res)=>{
    console.log(req.headers);
    const file = req.files.file
    let path = __dirname+"/images/"+Date.now()+".jpg"

    file.mv(path,(err)=>{
        return res.send(true)
    })
})

app.listen(PORT,()=>{
    console.log(`Server Running at port ${PORT}`);
})