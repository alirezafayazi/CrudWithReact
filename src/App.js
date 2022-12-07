import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/main.css'
import Modal from './components/Modal'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Nav from 'react-bootstrap/Nav';
import {useState, useEffect} from "react";
import Api from "./api/api"
import modal from "./components/Modal";

const blueBack = '#bcd3f2'
const navs = ''
function App() {
    const [Data, setData] = useState([]);
    const [deleteShow, setDeleteShow] = useState(
        false);
    const [updateShow, setUpdateShow] = useState(false);
    const [user, setUser] = useState({});
    const [updateData, setUpdateData] = useState({});
    const [addShow, setAddShow] = useState(false);

    useEffect(() => {
        Api.get('users')
            .then(response => setData(response.data))
            .catch(err => console.log(err))
    }, []);

    const userUpdate = () => {
        setUpdateShow(false)
    }
    return (
        <body style={{backgroundColor: blueBack, height: '100vh', minHeight: '100vh'}}>
        <>
            <Modal
                user={user}
                setData={setData}
                data={Data}
                deleteShow={deleteShow}
                setDeleteShow={setDeleteShow}
                updateShow={updateShow}
                setUpdateShow={setUpdateShow}
                updateData={updateData}
                setUpdateData={setUpdateData}
                setAddShow={setAddShow}
                addShow={addShow}
            >

            </Modal>

            <div className='container-fluid h-100 py-4' style={{backgroundColor: blueBack}}>
                <Row className='mx-1 h-100'>
                    <Col className='col-2 rounded-3 bg-white pe-0' >
                            <Nav defaultActiveKey="/home" className="flex-column w-100 mt-4 " >
                                <Nav.Link className='rounded-start text-white w-100' href="#" style={{backgroundColor: blueBack}}>Users</Nav.Link>
                            </Nav>
                    </Col>
                    <Col>
                        <div className='d-flex justify-content-center w-75 m-auto '>
                            <button className='m-3 border-0 rounded-3 bg-primary text-white w-100 py-2'
                                    onClick={() => setAddShow(true)}>
                                Add User
                            </button>
                        </div>
                        <div className="row d-flex justify-content-center mt-5 w-75 m-auto ">

                            {Data.map((data, key) =>
                                <>
                                    <div className="bg-light m-2 p-2 col-2 rounded-3 d-flex flex-column justify-content-center">
                                        <div className='align-self-center'>
                                            <img src={data.avatar} className='img-fluid mw-100 h-auto profile-img  '/>
                                        </div>
                                        <div className='p-2 align-self-center'>
                                            {data.first_name}
                                            <br/>
                                            {data.last_name}
                                        </div>
                                        <div
                                            className='d-flex my-2 bg-light p-1 rounded-2 justify-content-between gap-1 '>
                                            <button className='w-100  border-0 rounded-start p-1 bg-danger text-white '
                                                    onClick={() => {
                                                        setDeleteShow(true)
                                                        setUser(data)
                                                    }}>
                                                Delete
                                            </button>
                                            <button
                                                className='w-100 border-0 rounded-end bg-secondary bg-opacity-75 p-1 rounded-end text-white'
                                                onClick={() => {
                                                    setUpdateShow(true)
                                                    setUser(data)
                                                }}>
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </div>
                    </Col>
                </Row>
            </div>


        </>
        </body>
    )
        ;
}

export default App;
