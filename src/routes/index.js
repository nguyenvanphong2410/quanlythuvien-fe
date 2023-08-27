import HomePage from "../pages/HomePage"
import SignInPage from "../pages/SignInPage"
import Register from "../pages/Register"
import TableAuthors from "../components/layouts/TableAuthors"
import NotFoundPage from "../pages/NotFoundPage"
import Author from "../pages/Author"
import Books from '../pages/Books';
import Employees from '../pages/Employee';
import UpdateEmployee from "../pages/Employee/UpdateEmployee"
import UpdateBook from "../pages/Books/UpdateBook"
import UpdateAuthor from "../pages/Author/UpdateAuthor"
import DefaultComponent from "../components/DefaultComponent"


export const routes = [
    {
        path: '/',
        page: SignInPage,
        isShowHeader: false
    },
    {

        path: '/admin',
        page: DefaultComponent,
        isShowHeader: true
    },
    {

        path: '/register',
        page: Register,
        isShowHeader: false
    },
    {
        path: '/employees',
        page: Employees,
        isShowHeader: false
    },
    {
        path: '/update-employee/:id',
        page: UpdateEmployee,
        isShowHeader: false
    },
    {

        path: '/authors',
        page: Author,
        isShowHeader: false
    },
    {
        path: '/update-author/:id',
        page: UpdateAuthor,
        isShowHeader: false
    },
    {

        path: '/books',
        page: Books,
        isShowHeader: false
    },
    {
        path: '/update-book/:id',
        page: UpdateBook,
        isShowHeader: false
    },
    {

        path: '*',
        page: NotFoundPage,
        isShowHeader: false
    }
]


