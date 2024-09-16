import {JSX, useState} from "react";
import {ITask} from "../../types/types";
import Style from "../../Styles/Column.module.css";
import Select from "./Select";
import {Link} from "react-router-dom";

export default function Column({
                    tasksData,
                    manageTask,
                    index,
                    taskStates,
                    pushTask,
                    inputValue,
                    getInputValue,
                    getSelectedValue,
                    selectedValue,
                    setDescriptionInputValue
                }: any): JSX.Element {

    const [isActive, setIsActive] = useState(false);


    let isButtonDisabled = index > 0 ?
        !(tasksData.filter((task: ITask) => {
            return task["status"] === taskStates[index - 1];
        }).length > 0) : false

    return (
        <div className={Style.container} onMouseLeave={():void => setIsActive(false)}>
            <div className={Style.column}>
                <h1>{taskStates[index]}</h1>


                <div className={Style.taskContainer}>
                    {tasksData.filter((task: ITask) => {
                        return task["status"] === taskStates[index];
                    }).map((task: ITask, index: number) => {
                        return (
                            <Link to={task.id}
                                  key={index}
                                  className={Style.task}
                                  onClick={() => {
                                      setDescriptionInputValue(task.description)
                                  }}
                            >
                                {task.title}
                            </Link>
                        )
                    })}
                </div>
                {index === 0 ?
                    <input
                        value={inputValue}
                        className={`${Style.input} ${isActive ? Style.active : ""}`}
                        onChange={(event: any) => getInputValue(event)}
                    /> : ""}
                {index > 0 ?
                    <Select
                        tasksData={tasksData}
                        index={index}
                        taskStates={taskStates}
                        className={`${Style.input} ${isActive ? Style.active : ""} ${Style.select}`}
                        getSelectedValue={getSelectedValue}
                        selectedValue={selectedValue}
                    >
                    </Select> : ""}
                <button
                    disabled={isButtonDisabled}
                    style={isButtonDisabled ? {opacity: "0.5", cursor: "default"} : {opacity: 1}}
                    className={`${Style.columnButton} ${isActive ? Style.buttonActive : ""}`}
                    onClick={() => {
                        index === 0 ? pushTask(isActive, setIsActive) : manageTask(isActive, setIsActive)
                    }}
                >
                    {isActive ?
                        "Submit" : <><span className={Style.buttonSpan}>+</span>Add card</>}
                </button>
            </div>
        </div>
    )
}