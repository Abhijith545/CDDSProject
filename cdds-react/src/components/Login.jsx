import { useContext, useState } from "react"

import { Container, Row, Col, Form, FormGroup, Label,Input,Card,CardBody,CardHeader,Button} from 'reactstrap'

import { toast } from "react-toastify"
// import './loginPage.css';
// import Header from "./Header";
// import Footer from "./Footer";



export const Login = () => {
  
  const [loginDetail,setLoginDetail] = useState({
        userId:'',
        password:''
  })
    const changeHandler = (e,field)=>{
        setLoginDetail({...loginDetail,[field]:e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        
        if (loginDetail.userId.trim() === '' || loginDetail.password.trim()=== '') {
            toast.error('userId or password required !!')
            return
        }
        // logIn(loginDetail).then(data => {
        //     console.log(data)
            //store jwt token in local/sessionstorage
        //     doLogin(data, () => {
        //         console.log("token stored in session storage")
        //         userContextData.setUser({
        //             data: data.user,
        //             login:true
        //         })
        //         navigate("/user/dashboard")
        //     })

        //     toast.success('Login Successfull !!')
            
        // }).catch(error => {
        //     console.log(error)
        //     if (error?.status === 404) {
        //         toast.error(error?.response?.data?.message)
        //     }
        //     else
        //     toast.error("Something went wrong on server!!")
        // })
    }
    const resetHandler = () => {
        setLoginDetail({
            userId: "",
            password:""
        })
    }
    return (
    
            <Container>
                <Row className="mt-4">
                    <Col sm={{
                        size: 6,
                        offset:3
                    }}>
                    <Card color='dark' inverse>
                        <CardHeader>
                            <h3>Login Here !!</h3>
                       </CardHeader>   
                    <CardBody>
                           <Form onSubmit={submitHandler}>
                           
                           <FormGroup>
                                <Label for="id">Enter Employee Id</Label>
                                        <Input id="id" placeholder="Enter ID"
                                            type="text"
                                        value={loginDetail.userId}
                                        onChange={(e)=>changeHandler(e,'userId')}/>
                           </FormGroup>
                           <FormGroup>
                                <Label for="password">Enter Password</Label>
                                        <Input id="password" placeholder="Enter password" type="password"
                                        value={loginDetail.password}
                                        onChange={(e)=>changeHandler(e,'password')}/>
                           </FormGroup>
                          <Container className='text-center'>
                                <Button type="submit" color="light" outline>Submit</Button>

                                <Button className='ms-2' outline-color="secondary" onClick={resetHandler}>Reset</Button>
                           </Container>           
                        </Form>  
                    </CardBody>
                           
                    </Card>
                    </Col>
                </Row>
                
            </Container>
        
    )
}