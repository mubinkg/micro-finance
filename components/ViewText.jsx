import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ViewText = ({ text }) => {
  const [hover, setHover] = useState(false);
  return (
    <>
      <p onMouseOver={() => setHover(true)}>{text?.split(" ")?.slice(0,4).join(" ")}{text&&"..."}</p>
      <Modal isOpen={hover} toggle={() => setHover((old) => !old)}>
        <ModalHeader toggle={() => setHover((old) => !old)}>
          Comments Details
        </ModalHeader>
        <ModalBody>{text}</ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </>
  );
};

export default ViewText;
