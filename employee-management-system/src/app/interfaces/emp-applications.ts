export interface EmpApplications{
    id:string,
    appliedBy:string,
    type:string,   // Can be 'LEAVE' or 'WFH'
    reason:string,
    from:Date,
    to:Date,
    status:string
}