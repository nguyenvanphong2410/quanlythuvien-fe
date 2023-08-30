import Http from "./Http";

//API --- Nhân viên
export const loginEmployee = (data) => {
    return Http.post("employee/login", data);
}
export const logoutEmployee = (data) => {
    return Http.post("employee/logout", data);
}
export const getInfo = (data) => {
    return Http.post("employee/get-info", data);
}

export const createEmployee = (data, config) => {
    return Http.post("employee/sign-up", data, config);
}

export const getEmployees = (data,) => {
    return Http.get("employee/getAll", data);
}

export const getEmployeeDetails = (id) => {
    return Http.get(`employee/get-details/${id}`);
}

export const updateEmployee = (id, data) => {
    return Http.put(`employee/update-employee/${id}`, data);
}

export const deleteSoftEmployee = (id) => {
    return Http.delete(`employee/delete-employee/${id}`);
}

//API --- Tác giả
export const createAuthors = (data, config) => {
    return Http.post("author/create-author", data, config);
}

export const getAuthors = (data) => {
    return Http.get("author/get-all-author", data);
}

export const getAuthorDetails = (id) => {
    return Http.get(`author/get-details-author/${id}`);
}

export const updateAuthor = (id, data) => {
    return Http.put(`author/update-author/${id}`, data);
}

export const deleteSoftAuthor = (id) => {
    return Http.delete(`author/delete-author/${id}`);
}

//API --- Sách
export const createBooks = (data, config) => {
    return Http.post("book/create-book", data, config);
}

export const getBooks = (data,) => {
    return Http.get("book/get-all-book", data);
}

export const getBookDetails = (id) => {
    return Http.get(`book/get-details-book/${id}`);
}

export const updateBook = (id, data) => {
    return Http.put(`book/update-book/${id}`, data);
}

export const deleteSoftBook = (id) => {
    return Http.delete(`book/delete-book/${id}`);
}


//API --- Thể loại
export const createCategoryBooks = (data) => {
    return Http.post("category/create-categories-book", data);
}

export const getAllCategoriesBook = (data) => {
    return Http.get("category/get-all-categories-book", data);
}

export const getDetailsCategory = (id) => {
    return Http.get(`category/get-details-categories-book/${id}`);
}

export const updateCategory = (id, data) => {
    return Http.put(`category/update-category-book/${id}`, data);
}

export const deleteSoftCategory = (id) => {
    return Http.delete(`category/delete-categories-book/${id}`);
}







