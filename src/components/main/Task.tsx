import {Link} from "react-router-dom";
import Style from "../../Styles/Task.module.css"

export default function Task({
                                 task,
                                 descriptionInputValue,
                                 setTaskDescription,
                                 getDescriptionInputValue
                             }: any) {
    return (
        <div className={Style.task}>
            <h1
                className={Style.h1}
            >
                {task.title}
            </h1>
            <Link
                className={Style.exitLink}
                to="/"
                onClick={() => {
                    setTaskDescription(task)
                }}
            >
                <span className={Style.firstButtonElement}/>
                <span className={Style.secondButtonElement}/>
            </Link>

            <textarea
                className={Style.input}
                onChange={(event) => {
                    getDescriptionInputValue(event)
                }}
                value={descriptionInputValue}
            />
        </div>
    )
}