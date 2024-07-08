import firebase_app from "@/firebase/config";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const db = getFirestore(firebase_app);

export async function addData(data: any) {
  console.log(db);
  let result = null;
  let error = null;
  try {
    result = await addDoc(collection(db, "employees"), data);
    console.log("Document written with ID: ", result);
  } catch (err) {
    console.error("Error adding document: ", err);
    error = err;
  }
  return { result, error };
}

export async function getAllEmployees() {
  const employeesCollection = collection(db, "employees");
  let employees: any[] = [];
  let error = null;

  try {
    const querySnapshot = await getDocs(employeesCollection);
    querySnapshot.forEach((doc) => {
      employees.push({ id: JSON.stringify(doc.id), ...doc.data() });
    });
  } catch (err) {
    console.error("Error getting documents: ", err);
    error = err;
  }
  return { employees, error };
}

export async function getEmployeeById(employeeId: string) {
  let employee = null;
  let error = null;

  try {
    const docRef = doc(db, "employees", employeeId);
    const docSnap = await getDoc(docRef);
    employee = { id: docSnap.id, ...docSnap.data() };
  } catch (err) {
    error = err;
  }

  return { employee, error };
}

export async function updateEmployee(employeeId: string, newData: any) {
  let result = null;
  let error = null;
  try {
    const docRef = doc(db, "employees", employeeId);
    await updateDoc(docRef, newData);
    result = `Document with ID ${employeeId} successfully updated.`;
  } catch (err) {
    console.error("Error updating document: ", err);
    error = err;
  }

  return { result, error };
}


