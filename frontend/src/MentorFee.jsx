import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react"
import axios from "axios"

const MentorFee = () => {
  
    const url = "http://localhost:5000"
    const [mentorfee, setMentorFee] = useState([])

    useEffect(()=>{
        axios.get(`${url}/mentor-fee`).then((res)=>{
            let data = res.data
            console.log(data)
            setMentorFee(data.map((x) =>{
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
              <th>Mentor</th>
              <th>Students</th>
              <th>Total Fee</th>
            </tr>
          </thead>
          <tbody>
                        {mentorfee.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.mentor}</td>
                                    <td>{item.number_of_students}</td>
                                    <td>{item.total_fee}</td>
                                </tr>
                            )
                        })}
                    </tbody>
        </Table>
        </>
      )
}

export default MentorFee