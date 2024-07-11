import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react"
import axios from "axios"

const MentorSarjana = () => {
  
    const url = "http://localhost:5000"
    const [count, setCount] = useState([])

    useEffect(()=>{
        axios.get(`${url}/mentor-sarjana`).then((res)=>{
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
              <th>Username</th>
              <th>Course</th>
              <th>Mentor</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
                        {count.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.user_name}</td>
                                    <td>{item.course}</td>
                                    <td>{item.mentor}</td>
                                    <td>{item.title}</td>
                                </tr>
                            )
                        })}
                    </tbody>
        </Table>
        </>
      )
}

export default MentorSarjana