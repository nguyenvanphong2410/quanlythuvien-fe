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
import AddBook from "../pages/Books/AddBook"
import BookDetails from "../pages/Books/BookDetails"
import AddAuthor from "../pages/Author/AddAuthor"
import { getAuthorDetails } from "../services/Api"
import AuthorDetails from "../pages/Author/AuthorDetails"
import Categories from "../pages/Categories"
import AddCategory from "../pages/Categories/AddCategory"
import UpdateCategory from "../pages/Categories/UpdateCategory"


export const routes = [
    {
        path: '/login',
        page: SignInPage,
        isShowHeader: false
    },
    {
        path: '/',
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
        path: '/add-author',
        page: AddAuthor,
        isShowHeader: false
    },
    {
        path: '/details-author/:id',
        page: AuthorDetails,
        isShowHeader: false
    },
    {
        path: '/update-author/:id',
        page: UpdateAuthor,
        isShowHeader: false
    },
    {

        path: '/categories',
        page: Categories,
        isShowHeader: false
    },
    {

        path: '/add-category',
        page: AddCategory,
        isShowHeader: false
    },
    {

        path: '/update-category/:id',
        page: UpdateCategory,
        isShowHeader: false
    },
    {

        path: '/books',
        page: Books,
        isShowHeader: false
    },
    {
        path: '/add-book',
        page: AddBook,
        isShowHeader: false
    },
    {
        path: '/details-book/:id',
        page: BookDetails,
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


