"use client";
import React, { useRef, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  ButtonToolbar,
  Col,
  Container,
  Content,
  FlexboxGrid,
  Form,
  FormInstance,
  InputGroup,
  Schema,
  toaster,
} from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import Toaster from "@/comonents/Toaster";

import { googleSignIn, signedFunction } from "@/firebase/authentication";
import Loader from "@/comonents/Loader";

type FormValue = {
  email: string;
  password: string;
};

const SignUp = () => {
  const router = useRouter();
  const [formValue, setFormValue] = useState<FormValue>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({});
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const model = Schema.Model({
    email: Schema.Types.StringType()
      .isEmail("Please enter a valid email address.")
      .isRequired("This field is required."),
    password: Schema.Types.StringType().isRequired("This field is required."),
  });
  const handleChange = () => {
    setVisible(!visible);
  };
  const setterFormValue = (key: keyof FormValue, value: any) => {
    setFormValue((cur: any) => ({ ...cur, [key]: value }));
  };
  const signUpWithGoogle = async () => {
   
    const { result, error } = await googleSignIn();
   
    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Unknown error occurred";
      toaster.push(<Toaster type="error" message={errorMessage} />, {
        placement: "topEnd",
      });
      return;
    }

    toaster.push(<Toaster type="success" message={"Sign-in successfully!"} />, {
      placement: "topEnd",
    });
    router.push("/");
  };
  const submit = async () => {
    if (Object.keys(formError).length !== 0) {
      // console.log("Error found ", formError);
      return;
    }
    setLoading(true);
    const { result, error } = await signedFunction(
      "sign-up",
      formValue.email,
      formValue.password
    );
    setLoading(false);
    if (error) {
      const errorMessage =
        (error as { message?: string }).message || "Unknown error occurred";
      toaster.push(<Toaster type="error" message={errorMessage} />, {
        placement: "topEnd",
      });
      return;
    }
    toaster.push(<Toaster type="success" message={"Sign-up successfully!"} />, {
      placement: "topEnd",
    });
    router.push("/");
  };
  return (
    <>
      {loading && <Loader />}
      <div className="show-fake-browser login-page flex min-h-screen items-center justify-center bg-prmColor">
        <Container>
          <Content>
            <FlexboxGrid justify="center" className="mx-2">
              <FlexboxGrid.Item
                as={Col}
                md={9}
                className={`rounded-md bg-secColor`}
              >
                <div className="my-2">
                  <div className="flex justify-center">
                    <span className={`font-semibold text-center`}>
                      Sign-up <br />
                      <span className="font-bold text-terColor   text-center">
                        net Solutions
                      </span>
                    </span>
                  </div>
                </div>

                <Form
                  fluid
                  ref={formRef}
                  model={model}
                  formValue={formValue}
                  onSubmit={submit}
                  onCheck={setFormError}
                  className="mx-2 mb-2"
                >
                  <Form.Group>
                    <Form.ControlLabel className="font-semibold">
                      Email Address
                    </Form.ControlLabel>
                    <Form.Control
                      name="email"
                      placeholder="Email Id"
                      errorPlacement="topEnd"
                      onChange={(value) => {
                        setterFormValue("email", value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel className="font-semibold">
                      Password
                    </Form.ControlLabel>
                    <InputGroup inside>
                      <Form.Control
                        name="password"
                        type={visible ? "text" : "password"}
                        placeholder="Password"
                        autoComplete="off"
                        onChange={(value) => {
                          setterFormValue("password", value);
                        }}
                        errorPlacement="topEnd"
                      />
                      <InputGroup.Button onClick={handleChange}>
                        {visible ? <EyeIcon /> : <EyeSlashIcon />}
                      </InputGroup.Button>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button appearance="primary" type="submit" color="red">
                        Sign-Up{" "}
                      </Button>
                      <Button appearance="ghost" type="submit" color="red">
                        <Link href="/sign-in">Have account</Link>
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                  <hr />
                  <br />
                  <Form.Group>
                    <ButtonToolbar className="flex justify-center mb-4">
                      <Button
                        appearance="primary"
                        startIcon={<FaGoogle />}
                        onClick={signUpWithGoogle}
                      >
                        Sign-in With Google
                      </Button>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
      </div>
    </>
  );
};

export default SignUp;
