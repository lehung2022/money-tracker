import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faTrashCan,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "../../Style/List.css";
const List = (props) => {
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
      "Sepr",
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
  //Edit Logic
  const HandleEdit = (id) => {
    const SelectedItem = props.value.find((item) => item.eid === id);
    props.onEdit(SelectedItem);
  };
  return (
    <>
      {props.value.length === 0 ? (
        <h3 className="H3N">
          No Expense From {props.year} To {parseInt(props.year - 3)}
        </h3>
      ) : (
        <div className="List-Box">
          {props.value.map((item, index) => {
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
                      icon={faPen}
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                  <button
                    className="BTN DEL"
                    onClick={() => props.onDelete(item.eid)}
                  >
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      size="lg"
                      style={{ color: "#ffffff" }}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default List;
