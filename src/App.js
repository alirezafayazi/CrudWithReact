import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/main.css'
import Modal from './components/Modal'
import Button from 'react-bootstrap/Button'
import {useState, useEffect} from "react";
import Api from "./api/api"
import modal from "./components/Modal";


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


            <div className="row d-flex justify-content-center mt-5">

                {Data.map((data, key) =>
                    <>
                        <div
                            className="bg-secondary bg-opacity-25 m-2 p-2 col-3 rounded-3 d-flex flex-column justify-content-center ">
                            <div className='align-self-center'>
                                <img src={data.avatar} className='rounded-5 img-fluid mw-100 h-auto profile-img  '/>
                            </div>
                            <div className='p-2 align-self-center'>
                                {data.first_name}
                                <br/>
                                {data.last_name}
                            </div>
                            <div className='d-flex justify-content-around flex-lg-row flex flex-sm-column '>
                                <div className='align-self-sm-center'>
                                    <button className='rounded-3 border border-3 border-danger bg-opacity-10 px-2 py-1 '
                                            onClick={() => {
                                                setDeleteShow(true)
                                                setUser(data)
                                            }}>
                                        Delete
                                    </button>
                                </div>

                                <div className='align-self-sm-center '>
                                    <button
                                        className='rounded-3 border border-3 border-success bg-opacity-10 rounded-3 px-2 py-1'
                                        onClick={() => {
                                            setUpdateShow(true)
                                            setUser(data)
                                        }}>
                                        Update
                                    </button>
                                </div>

                            </div>

                        </div>
                    </>
                )
                }
            </div>
            <div className='d-flex justify-content-center container-fluid'>
                <button className='m-3 border-0 rounded-3 bg-primary text-white w-100 py-2'
                        onClick={() => setAddShow(true)}>
                    Add User
                </button>
            </div>
        </>
    );
}

export default App;
