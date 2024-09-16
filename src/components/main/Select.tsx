import {JSX} from "react";
import {ITask} from "../../types/types";

export default function Select({
                                   tasksData,
                                   index,
                                   taskStates,
                                   className,
                                   getSelectedValue,
                                   selectedValue
                               }: any): JSX.Element {
    return (
        <select
            onChange={(event) => getSelectedValue(event)}
            className={className}
            name={`${taskStates[index]}Select`}
            value={selectedValue}
        >
            <option value={""}></option>
            {tasksData.filter((task: ITask) => {
                return task["status"] === taskStates[index - 1];
            }).map((task: ITask, index: number) => {
                return (<option key={index} value={task.id}>{task.title}</option>)
            })}
        </select>
    )
}