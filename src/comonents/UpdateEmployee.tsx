"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Row,
  Schema,
  toaster,
  Toggle,
} from "rsuite";
import Toaster from "./Toaster";
import { getEmployeeById, updateEmployee } from "@/firebase/firestoreService";
import Loader from "./Loader";
import RequiredFields from "./RequiredFields";

const UpdateEmployee = ({ id ,handleClose}:any) => {
  const [loading, setLoading] = useState(false);
  const [formValue, setFormValue] = useState({});
  const [formError, setFormError] = useState({});
  const formRef = useRef<FormInstance>(null);
  const curDate = new Date();

  useEffect(() => {
    const getEmployee = async () => {
      const { employee, error } = await getEmployeeById(id);
      if (error) {
        const errorMessage =
          (error as { message?: string }).message || "Unknown error occurred";
        toaster.push(<Toaster type="error" message={errorMessage} />, {
          placement: "topEnd",
        });
        return;
      }
      setFormValue({ ...employee, dob: new Date(employee.dob.slice(1, -1)) });
    };
    getEmployee();
  }, []);

  const model = Schema.Model({
    name: Schema.Types.StringType()
      .isRequired("Please enter employee name.")
      .minLength(4, "Enter at least 4 characters"),
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("Please enter email address."),
    dob: Schema.Types.DateType()
      .isRequired("Please select your dob.")
      .max(curDate, "Date of birth should be less than the current date"),
    workStatus: Schema.Types.BooleanType().isRequired(
      "Please select work status"
    ),
    salary: Schema.Types.NumberType()
      .isRequired("Please enter salary")
      .isInteger("Please enter a whole number for salary."),
  });

  const setterFormValue = (key: string, value: any) => {
    setFormValue((cur) => ({ ...cur, [key]: value }));
  };

  const handleSubmit = async () => {
    if (Object.keys(formError).length !== 0) {
      console.log("Error found ", formError);
      return;
    }

    const payLoad:any = {
        name: formValue.name,
        email: formValue.email,
        workStatus: formValue.workStatus,
        salary: formValue.salary,
      };
      if (formValue.dob) {
        payLoad.dob = JSON.stringify(new Date(formValue.dob).toLocaleDateString());
      }
      setLoading(true);
      const { error } = await updateEmployee(id,payLoad);
      setLoading(false);
  
      if (error) {
        const errorMessage =
          (error as { message?: string }).message || "Unknown error occurred";
        toaster.push(<Toaster type="error" message={errorMessage} />, {
          placement: "topEnd",
        });
      } else {
        toaster.push(
          <Toaster type="success" message={"Employee updated successfully!"} />,
          {
            placement: "topEnd",
          }
        );
        handleClose();
      }
  };

  return (
    <>
      {loading && <Loader />}
      <div>
        <Form
          model={model}
          formValue={formValue}
          ref={formRef}
          onCheck={setFormError}
          onSubmit={handleSubmit}
          className="mb-8"
        >
          <Row>
            <Col lg={12} md={12} sm={24} xs={24} className="my-4 text-center">
              <Form.Group>
                <Form.ControlLabel>
                  Name <RequiredFields />
                </Form.ControlLabel>
                <Form.Control
                  name={"name"}
                  placeholder="Enter name"
                  style={{ width: 300 }}
                  onChange={(value) => {
                    setterFormValue("name", value);
                  }}
                  errorPlacement="topEnd"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="my-4 text-center">
              <Form.Group>
                <Form.ControlLabel>
                  Email <RequiredFields />
                </Form.ControlLabel>
                <Form.Control
                  name={"email"}
                  placeholder="Enter email"
                  style={{ width: 300 }}
                  onChange={(value) => {
                    setterFormValue("email", value);
                  }}
                  errorPlacement="topEnd"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="my-4 text-center">
              <Form.Group>
                <Form.ControlLabel>
                  DOB <RequiredFields />
                </Form.ControlLabel>
                <Form.Control
                  accepter={DatePicker}
                  onChange={(value) => {
                    setterFormValue("dob", value); // Ensure value is a Date object
                  }}
                  name={"dob"}
                  style={{ width: 300 }}
                  errorPlacement="topEnd"
                  format="dd/MM/yyyy"
                  className=".date"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="my-4 text-center">
              <Form.Group>
                <Form.ControlLabel>
                  Work status <RequiredFields />
                </Form.ControlLabel>
                <Form.Control
                  accepter={Toggle}
                  name={"workStatus"}
                  onChange={(value) => {
                    setterFormValue("workStatus", value);
                  }}
                  style={{ width: 300 }}
                  errorPlacement="topEnd"
                  unCheckedChildren="Not at work"
                  checkedChildren="At work"
                />
              </Form.Group>
            </Col>
            <Col lg={12} md={12} sm={24} xs={24} className="my-4 text-center">
              <Form.Group>
                <Form.ControlLabel>
                  Salary (in Rs.) <RequiredFields />
                </Form.ControlLabel>
                <Form.Control
                  placeholder="Enter salary"
                  name={"salary"}
                  onChange={(value) => {
                    setterFormValue("salary", value);
                  }}
                  style={{ width: 300 }}
                  errorPlacement="topEnd"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mr-2 flex justify-end gap-3">
            <Button appearance="primary" color="red" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UpdateEmployee;
