"use client";
import Toaster from "@/comonents/Toaster";
import UpdateEmployee from "@/comonents/UpdateEmployee";
import { getAllEmployees } from "@/firebase/firestoreService";
import React, { useEffect, useState } from "react";
import { toaster, Table, Modal, Button, Pagination } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const getEmployees = async () => {
      const { employees, error } = await getAllEmployees();
      if (error) {
        const errorMessage =
          (error as { message?: string }).message || "Unknown error occurred";
        toaster.push(<Toaster type="error" message={errorMessage} />, {
          placement: "topEnd",
        });
        return;
      }
      let data = employees
        .filter((obj) => Object.keys(obj).length > 1)
        .map((employee) => ({
          ...employee,
          id: employee.id.slice(1, -1),
          dob: employee.dob.slice(1, -1),
        }));
      console.log(data);
      setEmployeeData(data);
    };
    getEmployees();
  }, [open]);
  const handleRowClick = (rowData, rowIndex) => {
    console.log("Clicked row data:", rowData);
    setSelectedEmployee(rowData.id);
    setOpen(true);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (value: number) => {
    if (!isNaN(value) && value > 0) {
      setPageSize(value);
      setPage(1);
    }
  };
  return (
    <>
      <div className="text-center font-semibold text-xl mt-24 text-terColor">
        Employees List
      </div>
      <div>
        <Table
          data={employeeData.slice((page - 1) * pageSize, page * pageSize)}
          height={420}
          className="m-6"
          onRowClick={handleRowClick}
        >
          <Column width={200} align="center" fixed fullText>
            <HeaderCell className="text-lg font-bold text-black">ID</HeaderCell>
            <Cell dataKey="id" />
          </Column>

          <Column width={200} fullText>
            <HeaderCell className="text-lg font-bold text-black">
              Name
            </HeaderCell>
            <Cell dataKey="name" />
          </Column>

          <Column width={250} fullText>
            <HeaderCell className="text-lg font-bold text-black">
              Email
            </HeaderCell>
            <Cell dataKey="email" />
          </Column>

          <Column width={200} fullText>
            <HeaderCell className="text-lg font-bold text-black">
              Date of Birth
            </HeaderCell>
            <Cell dataKey="dob" />
          </Column>

          <Column width={200} fullText  >
            <HeaderCell className="text-lg font-bold text-black">
              Work Status
            </HeaderCell>
            <Cell dataKey="workStatus">
              {(rowData) => (
                <span>{rowData.workStatus ? "At Work" : "OFF"}</span>
              )}
            </Cell>
          </Column>

          <Column width={200} fullText >
            <HeaderCell className="text-lg font-bold text-black">
              Salary
            </HeaderCell>
            <Cell dataKey="salary" />
          </Column>
        </Table>
        <div
          className="mt-2"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            maxButtons={5}
            size="lg"
            layout={["limit", "|", "pager"]}
            total={employeeData.length}
            limitOptions={[10, 30, 50]}
            limit={pageSize}
            activePage={page}
            onChangePage={handleChangePage}
            onChangeLimit={handlePageSizeChange}
          />
        </div>
      </div>
      <Modal size="lg" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Update Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <UpdateEmployee id={selectedEmployee} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmployeeList;
