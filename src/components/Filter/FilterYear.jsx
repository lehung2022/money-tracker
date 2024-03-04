import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

const FilterYear = (props) => {
  const DATE = (DateString) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date(DateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = months[monthIndex];
    const year = date.getFullYear();
    return { day, month, year };
  };

  const HandleEdit = (id) => {
    const SelectedItem = JSON.parse(localStorage.getItem(id));
    props.onEdit(SelectedItem);
  };

  return (
    <div className="Expense-Filter-Year">
      {props.filteredData.length > 0 ? (
        <div className="List-Box">
          {props.filteredData.map((item, index) => {
            const { day, month, year } = DATE(item.edate);
            return (
              <div key={index} className="List-Item">
                <div className="Exp-Box">
                  <p>{item.ename}</p>
                  <p className="eabout">{item.eabout}</p>
                </div>
                <div className="Date-Price">
                  <div className="Date-Box">
                    <p>{day}</p>
                    <p className="month">{month}</p>
                    <p>{year}</p>
                  </div>
                  <div className="Price-Box">
                    <p className="price">{item.eprice}</p>
                    <p>
                      <FontAwesomeIcon
                        icon={faIndianRupeeSign}
                        size="sm"
                        style={{ color: "white" }}
                      />
                    </p>
                  </div>
                </div>
                <div className="Btn-Box">
                  <button
                    className="BTN EDT"
                    onClick={() => HandleEdit(item.eid)}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                  <button
                    className="BTN DEL"
                    onClick={() => props.onDelete(item.eid)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h3 className="H3N">No expenses for the year {props.year}</h3>
      )}
    </div>
  );
};

export default FilterYear;
