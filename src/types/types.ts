export interface ITask {
    status: TState,
    id: string,
    title: string,
    description: string,
}

export type TState = "Backlog" | "In Progress" | "Ready" | "Finished";