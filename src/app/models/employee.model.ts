/**
 * Employee
 */
export interface Employee {
    id: number;
    fullname: string;
    username: string;
    password: string;
    email: string;
    birthday: Date;
    gender: number;
    address: string;
    phonenumber: string;
    creattime: Date
}
export interface View {
    employee: Employee;
    totalCount: string;
    pageSize: string;
    currentPage: string;
    totalPages: string;
}
/**
 * Employee login
 */
export interface EmployeeLogin {
    phonenumber: string;
    password: string;
    role: string;
}
/**
 * Token
 */
export interface Token {
    token: string;
    error: number;
    username: string;
}
export interface EmployeeUpdate {
    id: number;
    fullname: string;
    username: string;
    password: string;
    email: string;
    birthday: string;
    gender: number;
    address: string;
    phonenumber: string;
    creattime: string
}