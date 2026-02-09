export interface UserData{
    id:string,
    name: string,
    password:string,
    projects: string[],
    attendance: number,
    leavesLeft: number,
    wfhLeft: number,
    roles: string[]
}