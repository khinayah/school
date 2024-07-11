import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react"
import axios from "axios"

const CountStudents = () => {
  
    const url = "http://localhost:5000"
    const [count, setCount] = useState([])

    useEffect(()=>{
        axios.get(`${url}/count-student`).then((res)=>{
            let data = res.data
            console.log(data)
            setCount(data.map((x) =>{
                delete x.created_at
                delete x.updated_at
                return x
            })) 
        }).catch((err)=>{
            console.log(err)
        })
    
    }, [])

    return (
        <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Mentor</th>
              <th>Title</th>
              <th>Total Student</th>
            </tr>
          </thead>
          <tbody>
                        {count.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.course}</td>
                                    <td>{item.mentor}</td>
                                    <td>{item.title}</td>
                                    <td>{item.number_of_students}</td>
                                </tr>
                            )
                        })}
                    </tbody>
        </Table>
        </>
      )
}

export default CountStudents