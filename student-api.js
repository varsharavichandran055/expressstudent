const express=require('express')
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express()
const port=3000

let students=[
    {
    "studentId":"1",
    "studentName":"Phoebe",
    "studentGrade":"7th",
    "studentCourse":"cse",
    "studentAddress":"Chennai",
    "studentPh":"6786745678",

},

{
    "studentId":"2",
    "studentName":"Chandler",
    "studentGrade":"8th",
    "studentCourse":"ece",
    "studentAddress":"Chennai",
    "studentPh":"6786745678",

},

{
    "studentId":"3",
    "studentName":"Ross",
    "studentGrade":"7th",
    "studentCourse":"cse",
    "studentAddress":"Chennai",
    "studentPh":"6786745678",

}
];

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/student',(req,res)=>{
    res.json(students);
});
app.post('/student',(req,res)=>{
    const student=req.body;
    console.log(student);
    students.push(student);
    res.send('student is added to the database');
});


app.get('/student/:studentId',(req,res)=>{
    const studentId=req.params.studentId;

    for(let student of students){
        if (student.studentId===studentId){
            res.json(student);
            return ;
        }
    }
    res.status(404).send('student not found');
});

app.put('/student/:studentId',(req,res)=>{
    const studentId=req.params.studentId;
    const newStudent=req.body;

    for(let i=0;i<students.length;i++){
        let student=students[i]
        if(student.studentId===studentId){
            students[i]=newStudent;
        }
    }
    res.send('student is edited');
});

app.delete('/student/:studentId',(req,res)=>{
    const studentId=req.params.studentId;
    students=students.filter(i=>{
        if(i.studentId!==studentId){
            return true;
        }
        return false;
    });
    res.send('student is deleted');
});
  


app.listen(port,()=>
console.log(`Hello world listening on port ${port}!`)
)
