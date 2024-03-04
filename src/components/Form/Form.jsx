import React, { useEffect, useRef, useState } from "react";
import "../../Style/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import List from "../List/List";
import Filter from "../Filter/Filter";
import FilterYear from "../Filter/FilterYear";
import ExpenseChart from "../Chart/ExpenseChart";

const Form = () => {
  //AddExpense Button
  const [DisplayButton, SetDisplayButton] = useState(false);
  const AddExpenseHandler = () => {
    SetDisplayButton(true);
    SetIsEditing(false);
  };
  const CancelExpenseHandler = () => {
    SetDisplayButton(false);
  };

  //After Refresh Show The Data From LocalStorage
  const [LocalStorageData, SetLocalStorageData] = useState([]);
  useEffect(() => {
    const StoredData = Object.keys(localStorage).map((key) =>
      JSON.parse(localStorage.getItem(key))
    );
    SetLocalStorageData(StoredData);
  }, []);

  const HandleDelete = (expenseId) => {
    const updatedData = LocalStorageData.filter(
      (item) => item.eid !== expenseId
    );
    localStorage.removeItem(expenseId);
    SetLocalStorageData(updatedData);
  };

  //Save The Data In OBJ & LocalStorage
  let name = useRef();
  let about = useRef();
  let price = useRef();
  let date = useRef();

  //Edit Logic
  const [ExpenseObj, SetExpenseObj] = useState({
    eid: "",
    ename: "",
    eabout: "",
    eprice: "",
    edate: "",
  });
  const [IsEditing, SetIsEditing] = useState(false);
  const SendExpense = (event) => {
    const { name, value } = event.target;
    SetExpenseObj((prev) => ({ ...prev, [name]: value }));
  };
  const SubmitExpenseHandler = (event) => {
    event.preventDefault();
    //Check If The Form Is Completely Filled Or Not
    if (
      !ExpenseObj.ename ||
      !ExpenseObj.eabout ||
      !ExpenseObj.eprice ||
      !ExpenseObj.edate
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (IsEditing) {
      const updatedList = LocalStorageData.map((item) => {
        if (item.eid === ExpenseObj.eid) {
          return ExpenseObj;
        } else {
          return item;
        }
      });
      localStorage.setItem(`${ExpenseObj.eid}`, JSON.stringify(ExpenseObj));
      SetLocalStorageData(updatedList);
    } else {
      const newExpense = {
        eid: Math.random(),
        ename: ExpenseObj.ename,
        eabout: ExpenseObj.eabout,
        eprice: ExpenseObj.eprice,
        edate: ExpenseObj.edate,
      };
      localStorage.setItem(`${newExpense.eid}`, JSON.stringify(newExpense));
      SetLocalStorageData([...LocalStorageData, newExpense]);
    }

    SetExpenseObj({ eid: "", ename: "", eabout: "", eprice: "", edate: "" });
    SetDisplayButton(false);
    SetIsEditing(false);
  };

  const CurrentYear = new Date().getFullYear();

  const HandleEdit = (item) => {
    SetIsEditing(true);
    SetDisplayButton(true);
    SetExpenseObj({
      eid: item.eid,
      ename: item.ename,
      eabout: item.eabout,
      eprice: item.eprice,
      edate: item.edate,
    });
  };

  //FilterYear Logic
  const [FilteredYear, SetFilteredYear] = useState("All");
  const HandleFilterChange = (year) => {
    SetFilteredYear(year);
  };
  const [ExpenseData, SetExpenseData] = useState([]);
  useEffect(() => {
    SetExpenseData(LocalStorageData);
  }, [LocalStorageData]);

  //FilterYear & Its Corresponded Data
  const DATE = (DateString) => {
    const date = new Date(DateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return { day, month, year };
  };
  const FilteredExpense =
    Array.isArray(LocalStorageData) && LocalStorageData.length > 0
      ? FilteredYear === "All"
        ? LocalStorageData
        : LocalStorageData.filter(
            (expense) =>
              new Date(expense.edate).getFullYear() === parseInt(FilteredYear)
          )
      : [];
  // Calculate Total Amount for the selected year and all years For Chart
  const totalAmountSelectedYear =
    FilteredYear === "All"
      ? LocalStorageData.reduce(
          (total, expense) => total + parseInt(expense.eprice),
          0
        )
      : FilteredExpense.reduce(
          (total, expense) => total + parseInt(expense.eprice),
          0
        );

  const totalAmountAllYears = FilteredExpense.reduce(
    (total, expense) => total + parseInt(expense.eprice),
    0
  );

  return (
    <>
      <div className="FORM-BOX">
        {!DisplayButton ? (
          <div className="AEBOX">
            <button onClick={AddExpenseHandler} className="AEBTN">
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ color: "#ffffff" }}
              />
              <p>Expense</p>
            </button>
          </div>
        ) : (
          <>
            <div className="EXP-FORM-BOX">
              <div className="Box1">
                <div className="B1">
                  <div className="Inside-Box">
                    <label className="LBL">Expense Name:</label>
                    <input
                      type="text"
                      ref={name}
                      className="IP"
                      name="ename"
                      onChange={SendExpense}
                      value={ExpenseObj.ename}
                      placeholder="Expense Name"
                      required
                    />
                  </div>
                  <div className="Inside-Box">
                    <label className="LBL">Expense About:</label>
                    <input
                      type="text"
                      ref={about}
                      className="IP"
                      name="eabout"
                      onChange={SendExpense}
                      value={ExpenseObj.eabout}
                      placeholder="Expense About"
                      required
                    />
                  </div>
                </div>
                <div className="B1">
                  <div className="Inside-Box">
                    <label className="LBL">Expense Price:</label>
                    <input
                      type="number"
                      ref={price}
                      className="IP"
                      name="eprice"
                      onChange={SendExpense}
                      value={ExpenseObj.eprice}
                      placeholder="Expense Price"
                      required
                    />
                  </div>
                  <div className="Inside-Box">
                    <label className="LBL">Expense Date:</label>
                    <input
                      type="date"
                      ref={date}
                      className="IP"
                      name="edate"
                      onChange={SendExpense}
                      value={ExpenseObj.edate}
                      placeholder="Expense Date"
                      max={`${CurrentYear}-12-31`}
                      min={`${CurrentYear - 3}-01-01`}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="Box2">
                <button className="AEBTN CNCL" onClick={CancelExpenseHandler}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                  <p>Cancel</p>
                </button>
                <button className="AEBTN SBMT" onClick={SubmitExpenseHandler}>
                  <FontAwesomeIcon
                    icon={faCheck}
                    size="lg"
                    style={{ color: "#ffffff" }}
                  />
                  <p>{IsEditing ? "Update" : "Submit"}</p>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <>
        <ExpenseChart
          expense={FilteredExpense}
          totalAmountAllYears={totalAmountAllYears}
          totalAmount={totalAmountSelectedYear}
        />
      </>
      <>
        <Filter
          years={[
            `${CurrentYear - 3}`,
            `${CurrentYear - 2}`,
            `${CurrentYear - 1}`,
            `${CurrentYear}`,
          ]}
          OnFilterChange={HandleFilterChange}
          ExpenseData={ExpenseData}
        />
        {FilteredYear === "All" ? (
          <List
            value={LocalStorageData}
            onDelete={HandleDelete}
            onEdit={HandleEdit}
            year={CurrentYear}
          />
        ) : (
          <FilterYear
            year={FilteredYear}
            hasValues={FilteredExpense.length > 0}
            filteredData={FilteredExpense.map((item) => ({
              ...item,
              ...DATE(item.edate),
            }))}
            onDelete={HandleDelete}
            onEdit={HandleEdit}
          />
        )}
      </>
    </>
  );
};
export default Form;
