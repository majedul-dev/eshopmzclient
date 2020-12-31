import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUser } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_GET_FOR_UPDATE_RESET } from "../constants/userConstants";

const UsersScreen = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.deleteUser);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAllUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, success, userInfo]);
  return (
    <div>
      <h1>All Registered Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>ISADMIN</td>
              <td>ACTIONS</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button
                      variant='flush'
                      className='btn-sm'
                      onClick={() =>
                        dispatch({ type: USER_GET_FOR_UPDATE_RESET })
                      }>
                      <i className='fas fa-edit' style={{ color: "blue" }}></i>
                    </Button>
                  </Link>
                  <Button
                    variant='flush'
                    className='btn-sm'
                    onClick={() => dispatch(deleteUser(user._id))}>
                    <i className='fas fa-trash' style={{ color: "red" }}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UsersScreen;
