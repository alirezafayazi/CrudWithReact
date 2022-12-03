import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/Toast.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from "react";
import Api from "./api/api"

function deleteUser(user) {
    console.log(user)
}

function App() {
    const [Data, setData] = useState([]);
    const [deleteShow, setDeleteShow] = useState(false);
    const [userId, setUserId] = useState()

    useEffect(() => {
        Api.get('users')
            .then(response => setData(response.data))
            .catch(err => console.log(err))
    }, []);
    const userDelete = () => {
        setDeleteShow(false)
        Api.delete(`users/${userId}`)
            .then((res) => {
                console.log(res.status)
            })
            .catch((err) => {
                console.log(err.status)
            })
        setData(Data.filter((u) => u.id !== userId))
        console.log(Data)
    }
    return (
        <>
            {/********modal for ask about delete user*********/}

            <Modal show={deleteShow} onHide={() => setDeleteShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteShow(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => {
                        userDelete()
                    }}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>


            <div className="row d-flex justify-content-center mt-5">

                {Data.map((data, key) =>
                    <>
                        <div
                            className="bg-secondary bg-opacity-25 m-2 p-2 col-3 rounded-3 d-flex flex-column justify-content-center ">
                            <div className='align-self-center'>
                                <img src={data.avatar} className='rounded-5 img-fluid'/>
                            </div>
                            <div className='p-2 align-self-center'>
                                {data.first_name}
                                <br/>
                                {data.last_name}
                            </div>
                            <div className='d-flex justify-content-around'>
                                <button className='rounded-3 border border-3 border-danger  bg-opacity-10 px-2 py-1 '
                                        onClick={() => {
                                            setDeleteShow(true)
                                            setUserId((data.id))
                                        }}>
                                    Delete
                                </button>
                                <button
                                    className='rounded-3 border border-3 border-success bg-opacity-10 rounded-3 px-2 py-1'
                                    onClick={() =>  }
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </>
                )
                }
            </div>
            <div className='d-flex justify-content-center container-fluid'>
                <button className='m-3 border-0 rounded-3 bg-primary text-white w-100 py-2'>
                    Add User
                </button>
            </div>
        </>
    );
}

export default App;
