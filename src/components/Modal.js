import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Api from "../api/api";


function Modals(props) {

    const UserDelete = () => {
        props.setDeleteShow(false)
        //  delete from database with api
        Api.delete(`users/${props.user.id}`)
            .then((res) => console.log(res.status))
            .catch((err) => console.log(err.status))

        props.setData(props.data.filter((u) => u.id !== props.user.id))
    };

    const UserUpdate = () => {
        props.setUpdateShow(false);
        //  update user on database with api
        Api.patch(`users/${props.user.id}`, props.updateData)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })

        const index = props.data.indexOf(props.user);
        props.data[index] = {...props.user, ...props.updateData};
    }
    const UserAdd=()=>{
        props.setAddShow(false);
        //    add user on database with API
        Api.post('users/',props.updateData)
            .then((res)=>{console.log(res)})
            .catch((err)=>{console.log(err)});
        console.log(props.updateData)
        props.setData([...props.data , props.updateData]);
    }
    return (
        <>
            {/*modal for delete users*/}
            <Modal show={props.deleteShow} onHide={() => props.setDeleteShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setDeleteShow(false)}>
                        No , Keep it
                    </Button>
                    <Button variant="danger" onClick={() => {
                        UserDelete()
                    }}>
                        Yes , I sure
                    </Button>
                </Modal.Footer>
            </Modal>

            {/***modal for update user***/}
            <Modal show={props.updateShow} onHide={() => props.setUpdateShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    ...props.updateData,
                                    "first_name": e.target.value
                                })}
                                type="text"
                                placeholder="your First name"
                                autoFocus
                            />
                            <Form.Label className='mt-2'>Last name</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    ...props.updateData,
                                    "last_name": e.target.value
                                })}
                                type="text"
                                placeholder="your last name"
                                autoFocus
                            />
                            <Form.Label className='mt-2'>image link</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    ...props.updateData,
                                    "avatar": e.target.value
                                })}
                                type="text"
                                placeholder="your image link"
                                autoFocus
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setUpdateShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        UserUpdate();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/***modal for add user***/}
            <Modal show={props.addShow} onHide={() => props.setAddShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>image link</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    "avatar": e.target.value
                                })}
                                type="text"
                                placeholder="your image link"
                                autoFocus
                            />
                            <Form.Label className='mt-2'>First name</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    ...props.updateData,
                                    "first_name": e.target.value
                                })}
                                type="text"
                                placeholder="your First name"
                                autoFocus
                            />
                            <Form.Label className='mt-2'>Last name</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    ...props.updateData,
                                    "last_name": e.target.value
                                })}
                                type="text"
                                placeholder="your last name"
                                autoFocus
                            />
                            <Form.Label className='mt-2'>Email</Form.Label>
                            <Form.Control
                                onChange={e => props.setUpdateData({
                                    ...props.updateData,
                                    "email": e.target.value
                                })}
                                type="email"
                                placeholder="your email address"
                                autoFocus
                            />


                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => props.setAddShow(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        UserAdd();
                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        ;
}

export default Modals;