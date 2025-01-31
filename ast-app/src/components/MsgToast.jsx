import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';

const MsgToast = ({ type, message, show, setShow }) => {

    const getType = () => {
        switch (type) {
            case "error":
                return "bg-danger";
            case "success":
                return "bg-success";
        }
    };

    return (
        <ToastContainer position="top-center" className="mt-4">
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
                className={`${getType()} text-white `}
            >
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default MsgToast;