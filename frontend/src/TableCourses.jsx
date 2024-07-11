import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react"
import axios from "axios"



const TableCourses = () => {
  let initalForm ={
    course: "",
    mentor: "",
    title: ""
}


  const url = "http://localhost:5000"
  const [courses, setCourses] = useState([])
  const [input, setInput] = useState(initalForm)
  const [showForm, setShowForm] = useState(false)
  const [statusForm, setStatusForm] = useState("create")
  const [currentId, setCurrentId] = useState(null)

  useEffect(()=>{
    axios.get(`${url}/courses`).then((res)=>{
        let data = res.data
        console.log(data)
        setCourses(data.map((x) =>{
            delete x.created_at
            delete x.updated_at
            return x
        })) 
    }).catch((err)=>{
        console.log(err)
    })

}, [])

const handleDelete = (event)=>{
  let idCourse = parseInt(event.target.value)
  axios.delete(`${url}/courses/${idCourse}`).then((res)=>{
      setCourses(courses.filter((x) => x.id !== idCourse)) 
  }).catch((err)=>{
      console.log(err)
  })
}

const handleChange = (event)=>{
  let {name, value} = event.target
  setInput({...input, [name]: value})
}

const addNewCourse = ()=>{
  setShowForm(true)
  setStatusForm("create")
}


const handleSubmit = (event)=>{
  event.preventDefault()

  if (currentId === null){
      // create section
      axios.post(`${url}/courses`, {...input}).then((res)=>{
          let data = res.data
          console.log(data)
          setCourses([...courses, data])
      })
  }
  else{
      axios.patch(`${url}/courses/${currentId}`, {...input}).then(()=>{
          console.log('kesini')
          let course2 = courses.find((item)=> item.id === currentId)
          course2.course = input.course
          course2.mentor = input.mentor
          course2.title = input.title
          setCourses([...courses])
      })
  }

  setCurrentId(null)
  setInput(initalForm)
  setShowForm(false)
}

const handleEdit = async (event)=>{
  let idCourse = Number(event.target.value)

  console.log(idCourse)


  let result = await axios.get(`${url}/courses/${idCourse}`)
  let {course, mentor, title} = result.data
  

  setStatusForm("edit")
  setCurrentId(idCourse)
  setInput({course, mentor, title})
  setShowForm(true)

}

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Course</th>
          <th>Mentor</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
                    {courses.map((item, index)=>{
                        return(
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{item.course}</td>
                                <td>{item.mentor}</td>
                                <td>{item.title}</td>
                                <td>
                                    <button className="button-edit mr-10"  onClick={handleEdit} value={item.id}>Edit</button>
                                    <button className="button-delete" onClick={handleDelete} value={item.id}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
    </Table>
    {!showForm && <button className="button-add" onClick={addNewCourse}> Tambah Data Course</button>}
            {showForm && 
                (
                    <>
                        <h1>{statusForm === "create" ? "Form Tambah Data Course" : `Edit Data Course`}</h1>
                        <div className="custom-form">
                            <form onSubmit={handleSubmit}>
                                <div className="custom-input">
                                    <label htmlFor="name">Course</label>
                                    <input required autoComplete="off" type="text" name="course" value={input.course} onChange={handleChange} placeholder="Masukkan Nama Course"/>
                                </div>
                                <div className="custom-input">
                                    <label htmlFor="name">Mentor</label>
                                    <input required autoComplete="off" type="text" name="mentor" value={input.mentor} onChange={handleChange} placeholder="Masukkan Nama Mentor"/>
                                </div>
                                <div className="custom-input">
                                    <label htmlFor="name">Title</label>
                                    <input required autoComplete="off" type="text" name="title" value={input.title} onChange={handleChange} placeholder="Masukkan Title"/>                                    
                                </div>
                                <input type="submit" value="Submit"/>
                            </form>
                        </div>
                    </>

                )
            }
    </>
  )
}

export default TableCourses;