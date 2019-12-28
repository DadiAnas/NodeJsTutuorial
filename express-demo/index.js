const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [{id:1,title:'course1',content:'the content of the first course'},{id:2,title:'course2',content:'the content of the second course'}];
app.get('/courses/:id',(req,resp) => {
    const course = courses.find(critere => critere.id === parseInt(req.params.id));
    
    if (!course) return resp.status(404).send('The course with the given id is not found :( ... ');
    
    resp.send(`<article><h1>${course.title}</h1><p>${course.content}</p></article>`);
});

app.post('/courses',(req,resp) => {
    
    const { error } = validateCourse(req.body);
    if (error) resp.send(error.details[0].message);

    const course = {
        id: courses[courses.length-1].id+1,
        title: req.body.title,
        content: req.body.content
    };
    courses.push(course);
    resp.send(course);
});

app.put('/courses/:id',(req,resp) => {
    const course = courses.find(critere => critere.id === parseInt(req.params.id));
    if (!course) return resp.status(404).send('The course with the given id is not found :( ... ');
    
    const { error } = validateCourse(req.body);
    if (error) resp.send(error.details[0].message);

    
    course.title = req.body.title;
    course.content = req.body.content;
    
    resp.send(course);
});
function validateCourse(course){
    const schema = {
        title: Joi.string().min(3).max(30).required(),
        content: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(course,schema);
}

app.put('')
const port = process.env.PORT || 3000;
app.listen( port , () => console.log(`port ${port}`));