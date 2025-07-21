/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Input,
  Spinner,
} from "reactstrap";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { getData, patchDataWtihAuth, putDataWtihAuth } from "../../../../utils/axiosUtils";
import { formatNumber } from "../../../../utils/formatNumber";
import Image from "next/image";

const statusMap = {
  approve: "Approved",
  reject: "Rejected",
  resubmit: "Resubmit",
  pending: "Pending",
  process: "Processing",
  paid: "Paid",
};

export default function LoanDetails({ params }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      driverLicenseImage: null,
      checkFront: null,
      checkBack: null,
      paystubs: null,
    },
  });

  const fileChecker = ["png", "jpg", "jpeg", "pdf"];
  const checkerMessage = "Only jpg, jpeg, png, pdf file allowed.";

  // === File validation ===
  useEffect(() => {
    ["driverLicenseImage", "checkFront", "checkBack", "paystubs"].forEach(
      (field) => {
        if (watch(field)?.length) {
          const ext = watch(field)[0]?.name?.split(".").pop().toLowerCase();
          if (!fileChecker.includes(ext)) {
            alert(`${field}: ${checkerMessage}`);
            setValue(field, []);
          }
        }
      }
    );
  }, [
    watch("driverLicenseImage"),
    watch("checkFront"),
    watch("checkBack"),
    watch("paystubs"),
  ]);

  // === Load loan data ===
  useEffect(() => {
    getData("/loan/" + params.id).then((res) => {
      setData(res);
      setComments(res?.comments);
    });
  }, [params.id]);

  // === Update loan status ===
  function updateLoan(status) {
    Swal.fire({
      title: "Update Loan Status!",
      text: "Are you sure about this action?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        patchDataWtihAuth("loan/" + params.id, { status, comments })
          .then((res) => {
            Swal.fire("Loan", "Loan status updated successfully", "success");
            setData(res.data);
          })
          .catch(() => {
            Swal.fire("Loan", "Error updating loan", "error");
          });
      }
    });
  }

   const isUpdateDisabled = !watch("driverLicenseImage")?.length &&
    !watch("checkFront")?.length &&
    !watch("checkBack")?.length &&
    !watch("paystubs")?.length;

  // === Submit document update ===
 const onSubmit = (values) => {
  const formData = new FormData();
  formData.append("id", data?._id); // must send ID

  ["driverLicenseImage", "checkFront", "checkBack", "paystubs"].forEach(
    (field) => {
      if (values[field]?.[0]) {
        formData.append(field, values[field][0]);
      }
    }
  );

  setLoading(true);

  putDataWtihAuth("loan", formData)
    .then(() => {
      setLoading(false);
       // Reload updated data
      getData("/loan/" + params.id).then((res) => {
        setData(res);
        setComments(res?.comments || "");
      });

      // Reset form fields
      reset({
        driverLicenseImage: null,
        checkFront: null,
        checkBack: null,
        paystubs: null,
      });

      Swal.fire("Success", "Documents updated successfully", "success");

     
    })
    .catch((err) => {
      setLoading(false);
      Swal.fire("Error", err?.message || "Something went wrong", "error");
    });
};


  const renderFilePreview = (watchFile, existingFile) => {
    if (watchFile?.length > 0) {
      const ext = watchFile[0]?.name?.split(".").pop();
      if (ext !== "pdf") {
        return (
          <img
            width={250}
            height="auto"
            src={URL.createObjectURL(watchFile[0])}
          />
        );
      } else {
        return "PDF file successfully attached";
      }
    } else if (existingFile?.split(".").pop() !== "pdf") {
      return (
        <Image
          src={existingFile}
          alt="document"
          width={300}
          height={200}
        />
      );
    } else {
      return (
        <embed
          frameBorder="0"
          type="application/pdf"
          src={`https://docs.google.com/gview?url=${existingFile}&embedded=true`}
          width={650}
          height={800}
        />
      );
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} sm={12}>
            <h5 style={{ fontSize: "25px", color: "blue", fontWeight: "bold" }}>
              Status : {statusMap[data?.status]}
            </h5>
            <h5>Applicant Name : {data?.firstName} {data?.lastName}</h5>
            <h5>Amount : {data?.amountRequested}</h5>
            <h5>Current Address : {data?.currentAddress}</h5>
            <h5>Address Line2 : {data?.currentAddress2 || ""}</h5>
            <h5>State: {data?.state}</h5>
            <h5>City: {data?.city}</h5>
            <h5>Zip Code: {data?.zipCode}</h5>
            <h5>Cell Phone: {data?.cellPhone}</h5>
            <h5>Email : {data?.email}</h5>
            <h5>Driver’s License/Id: {data?.driverLicense}</h5>
            <h5>SSN: {data?.ssn}</h5>
            <h5>Amount Due: {formatNumber(data?.amountDue)}</h5>
            <h5>
              Payment Method:{" "}
              {data?.paymentMethod === "mobile"
                ? "Mobile Banking"
                : "Cash App"}
            </h5>
            <h5>Payment Method Details: {data?.paymentDetails}</h5>
            <h5>Signature: {data?.signature}</h5>
          </Col>
        </Row>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Row className="justify-content-center mt-4">
  <Col lg={6} className="mb-4">
    <h5>Driver License Image</h5>
    {renderFilePreview(watch("driverLicenseImage"), data?.driverLicenseImage)}
    <div className="mt-2">
      <label className="btn btn-outline-success">
        <input type="file" {...register("driverLicenseImage")} hidden />
        Choose File
      </label>
    </div>
  </Col>
  <Col lg={6} className="mb-4">
    <h5>Check Front</h5>
    {renderFilePreview(watch("checkFront"), data?.checkFront)}
    <div className="mt-2">
      <label className="btn btn-outline-success">
        <input type="file" {...register("checkFront")} hidden />
        Upload Front
      </label>
    </div>
  </Col>
  <Col lg={6} className="mb-4">
    <h5>Check Back</h5>
    {renderFilePreview(watch("checkBack"), data?.checkBack)}
    <div className="mt-2">
      <label className="btn btn-outline-success">
        <input type="file" {...register("checkBack")} hidden />
        Upload Back
      </label>
    </div>
  </Col>
  <Col lg={6} className="mb-4">
    <h5>Pay Stubs</h5>
    {renderFilePreview(watch("paystubs"), data?.paystubs)}
    <div className="mt-2">
      <label className="btn btn-outline-success">
        <input type="file" {...register("paystubs")} hidden />
        Upload Stubs
      </label>
    </div>
  </Col>
</Row>

          <Row className="justify-content-center mt-4">
            <Col lg={8}>
              <Input
                className="mt-3"
                placeholder="Add Comments"
                name="comments"
                type="textarea"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            
              <hr />
              <Button
                onClick={() => updateLoan("approve")}
                color="primary"
                style={{ marginRight: "10px" }}
              >
                Approve
              </Button>
              <Button
                onClick={() => updateLoan("reject")}
                color="danger"
                style={{ marginRight: "10px" }}
              >
                Reject
              </Button>
              <Button
                onClick={() => updateLoan("resubmit")}
                color="info"
                style={{ marginRight: "10px" }}
              >
                Request Resubmit
              </Button>
              <Button
                onClick={() => updateLoan("paid")}
                color="success"
                outline
                style={{ marginRight: "10px" }}
              >
                Paid
              </Button>
               <Button type="submit" color="success" disabled={loading || isUpdateDisabled}>
                  {loading ? <Spinner size="sm" /> : "Update Documents"}
                </Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Suspense>
  );
}
