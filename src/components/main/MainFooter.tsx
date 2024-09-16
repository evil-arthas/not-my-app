import {useState, JSX} from "react";
import {ITask, TState} from "../../types/types";
import Column from "./Column";
import {v6 as uuid} from "uuid";
import {Route, Routes} from "react-router-dom";
import Task from "./Task";
import StyleFooter from "../../Styles/Footer.module.css"

export default function MainFooter(): JSX.Element {
    const taskStates: TState[] = ["Backlog", "In Progress", "Ready", "Finished"]
    // const dataMock: ITask[] = [
    //     {status: "Backlog", id: uuid(), title: "task 1", description: "Some task"},
    //     {status: "In Progress", id: uuid(), title: "task 2", description: "Task 2"},
    //     {status: "Ready", id: uuid(), title: "task 3", description: "Task 3"},
    //     {status: "Backlog", id: uuid(), title: "task 4", description: "Task 4"},
    //     {status: "Finished", id: uuid(), title: "task 5", description: "Task 5"},
    //     {status: "Ready", id: uuid(), title: "task 6", description: "Task 6"},
    // ]


    //get from localStorage

    let gotData: string | null = localStorage.getItem("data");
    let data: ITask[]|[] = typeof gotData === "string" ? JSON.parse(gotData) : [];

    const [tasksData, setTasksData] = useState(data);
    const [inputValue, setInputValue] = useState("");
    const [selectedValue, setSelectedValue] = useState("");
    const [descriptionInputValue, setDescriptionInputValue] = useState("");


    function getSelectedValue(event: any): void {
        setSelectedValue(event.target.value);
    }

    function getInputValue(event: any): void {
        setInputValue(event.target.value);
    }

    function getDescriptionInputValue(event: any): void {
        setDescriptionInputValue(event.target.value);
    }

    function pushTask(isActive: boolean, setIsActive: any) {
        if (isActive) {
            setIsActive(!isActive);
            if (inputValue.length > 0) {
                let pushingTask:ITask = {
                    status: "Backlog",
                    id: uuid(),
                    title: inputValue,
                    description: "Input your description here",
                }

                let nextTasksData = [...tasksData, pushingTask];
                setTasksData(nextTasksData);
                localStorage.setItem("data", JSON.stringify(nextTasksData));
            }
        }
        if (!isActive) {
            setIsActive(!isActive)
            setInputValue("")
        }
    }

    function manageTask(isActive: boolean, setIsActive: any): void {
        if (isActive) {
            setIsActive(!isActive);
            if (selectedValue !== "") {
                //change data
                let managingTaskIndex = tasksData.findIndex((task: any) => task.id === selectedValue);
                let taskCurStatus = tasksData[managingTaskIndex].status;
                let indexOfTaskStatus = taskStates.indexOf(taskCurStatus);
                let indexOfNextTaskStatus = indexOfTaskStatus + 1
                let nextTaskStatus = taskStates[indexOfNextTaskStatus]
                let nextTasksData = [...tasksData];
                nextTasksData[managingTaskIndex].status = nextTaskStatus;
                //

                setTasksData(nextTasksData);
                localStorage.setItem("data", JSON.stringify(nextTasksData));
                setSelectedValue("")
            }
        }
        if (!isActive) {
            setIsActive(!isActive);
        }
    }

    function setTaskDescription(task: ITask) {
        let managingTaskIndex = tasksData.findIndex((managingTask: ITask) => managingTask.id === task.id);
        let nextTasksData = [...tasksData]
        nextTasksData[managingTaskIndex].description = descriptionInputValue;
        setTasksData(nextTasksData);
        localStorage.setItem("data", JSON.stringify(nextTasksData))
    }


    return (
        <div>
            <main>
                <Routes>
                    <Route path="/"
                           element={taskStates.map((state: TState, index: number): JSX.Element => {
                               return (
                                   <Column
                                       taskStates={taskStates}
                                       key={index}
                                       index={index}
                                       tasksData={tasksData}
                                       state={state}
                                       pushTask={pushTask}
                                       manageTask={manageTask}
                                       inputValue={inputValue}
                                       getInputValue={getInputValue}
                                       getSelectedValue={getSelectedValue}
                                       selectedValue={selectedValue}
                                       setDescriptionInputValue={setDescriptionInputValue}
                                   />
                               )
                           })}
                    />
                    {tasksData.map((task: ITask, index: number):JSX.Element => {
                        return (
                            <Route path={`/${task.id}`}
                                   element={
                                       <Task
                                           descriptionInputValue={descriptionInputValue}
                                           setDescriptionInputValue={setDescriptionInputValue}
                                           getDescriptionInputValue={getDescriptionInputValue}
                                           setTaskDescription={setTaskDescription}
                                           task={task}/>}
                                   key={index}
                            />)
                    })}
                </Routes>
            </main>

            <footer
                className={StyleFooter.footer}
            >
                <span className={StyleFooter.span}>
                    Active tasks: {
                    tasksData.filter((task: ITask) => {
                        return task["status"] === "Backlog";
                    }).length
                }
                </span>
                <span className={StyleFooter.span}>
                    Finished tasks: {
                    tasksData.filter((task: ITask) => {
                        return task["status"] === "Finished";
                    }).length}
                </span>
                <span className={`${StyleFooter.span} ${StyleFooter.spanLeftMargined}`}>
                    Kanban board by &lt;NAME&gt; &lt;YEAR&gt;
                </span>
            </footer>
        </div>
    )
}