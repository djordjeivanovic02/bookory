import { createReducer, on } from "@ngrx/store";
import { BestAuthorsDto } from "../../dtos/best-authors.dto";
import { changeAuthorDataSuccess, loadAllAuthorsSuccess, loadAuthorBooksSuccess, loadAuthorByFirstLetter, loadAuthorByFirstLetterSuccess, loadAuthorByIdSuccess, loadBestAuthorsSuccess, loadMyBooksCountSuccess, loadMyBooksSuccess } from "./author.actions";
import { removeSavedBookSuccess, saveBookSuccess } from "../user/user.actions";
import { AuthorDataDto } from "../../dtos/author-data.dto";
import { BookInfoDto } from "../../dtos/book-info.dto";
import { loadAuthorsByCategoriesSuccess, removeBookSuccess } from "../book/book.actions";

export interface AuthorState {
    bestAuthors: BestAuthorsDto[] | null,
    bestAuthorsLoaded: boolean;

    allAuthors: AuthorDataDto[] | null;
    allAuthorsLoaded: boolean;

    authorBooksSkip: number;

    filteredAuthors: AuthorDataDto[] | null;

    myBooks: BookInfoDto[] | null;
    myBooksLoaded: boolean;
    myBooksSkip: number;
    myBooksCount: number;
    myBooksCountLoaded: boolean;
};

export const initialState: AuthorState = {
    bestAuthors: null,
    bestAuthorsLoaded: false,

    allAuthors: null,
    allAuthorsLoaded: false,

    filteredAuthors: null,

    authorBooksSkip: 0,

    myBooks: null,
    myBooksLoaded: false,
    myBooksSkip: 0,
    myBooksCount: 0,
    myBooksCountLoaded: false,
};

export const authorReducer = createReducer(
    initialState,
    on(loadBestAuthorsSuccess, (state, {bestAuthors}) => ({
        ...state,
        bestAuthors: bestAuthors,
        bestAuthorsLoaded: true
    })),
    on(saveBookSuccess, (state, { savedBook }) => {
        const updatedBestAuthors = state.bestAuthors ? state.bestAuthors.map(element => {
            if (element.id === savedBook.book.author.id) {
                return {
                    ...element,
                    totalSaves: element.totalSaves + 1
                };
            }
            return element;
        }) : null;

        return {
            ...state,
            bestAuthors: updatedBestAuthors
        };
    }),
    on(removeSavedBookSuccess, (state, { book_id, author_id }) => {
        const updatedBestAuthors = state.bestAuthors ? state.bestAuthors.map(element => {
            if (element.id === author_id) {
                return {
                    ...element,
                    totalSaves: element.totalSaves > 0 ? element.totalSaves - 1 : 0
                };
            }
            return element;
        }) : null;

        return {
            ...state,
            bestAuthors: updatedBestAuthors
        };
    }),
    on(loadAllAuthorsSuccess, (state, { authors }) => ({
        ...state,
        allAuthors: [
            ...state.allAuthors || [],
            ...authors.filter(author => !state.allAuthors?.some(existingAuthor => existingAuthor.id === author.id))
        ],
        allAuthorsLoaded: true,
    })),
    on(loadAuthorByFirstLetterSuccess, (state, {filteredAuthors}) => ({
        ...state,
        filteredAuthors: filteredAuthors
    })),
    on(loadAuthorByIdSuccess, (state, {loadedAuthor}) => ({
        ...state,
        allAuthors: [...state.allAuthors?.filter(element => element !== loadedAuthor) || [], loadedAuthor]
    })),
    on(changeAuthorDataSuccess, (state) => ({
        ...state,
        bestAuthorsLoaded: false,
        allAuthorsLoaded: false,
    })),
    on(loadAuthorBooksSuccess, (state, {books, author_id}) => ({
        ...state,
        allAuthors: state.allAuthors
            ?
            state.allAuthors.map(author => 
                author.id === author_id 
                ? { 
                    ...author, 
                    books: [...(author.books || []), ...books] 
                    } 
                : author
            )
            : null,
        authorBooksSkip: state.authorBooksSkip + books.length
    })),
    on(loadMyBooksSuccess, (state, {myBooks}) => ({
        ...state,
        myBooks: [...state.myBooks || [], ...myBooks],
        myBooksLoaded: true,
        myBooksSkip: state.myBooksSkip + myBooks.length
    })),
    on(loadMyBooksCountSuccess, (state, {myBooksCount}) => ({
        ...state,
        myBooksCount: myBooksCount,
        myBooksCountLoaded: true
    })),
    on(removeBookSuccess, (state, {book_id, author_id}) => {
        let newMyBooks = state.myBooks;
        let newMyBooksCount = state.myBooksCount;
        let newAllAuthors = state.allAuthors;

        if(state.myBooks && state.myBooks.length > 0){
            if(state.myBooks.findIndex(element => element.id === book_id) !== -1 && newMyBooks)
                newMyBooks = newMyBooks?.filter(element => element.id !== book_id);
            newMyBooksCount = state.myBooksCount - 1;
        }

        // if (state.allAuthors && state.allAuthors.length > 0) {
        //     if (state.allAuthors.findIndex(author => 
        //         author.books?.some(book => book.id === book_id)) !== -1 && newAllAuthors) {
        //       newAllAuthors = state.allAuthors.map(author => {
        //         const newCount = author.booksCount ? author.booksCount -1 : 0;
        //         return {
        //           ...author,
        //           booksCount: newCount,  
        //           books: author.books?.filter(book => book.id !== book_id)
        //         };
        //       });
        //     }
        //   }
          
        if(state.allAuthors && state.allAuthors.length > 0){
            if(state.allAuthors.findIndex(element => element.id === author_id) !== -1 && newAllAuthors){
                newAllAuthors = state.allAuthors.map(author => {
                    if(author.id === author_id){
                        const newCount = author.booksCount;
                        return {
                            ...author,
                            booksCount: author.booksCount && newCount ? newCount -1 : 0
                        }
                    }else{
                        return author;
                    }
                })
            }
        }

        return {
            ...state,
            myBooks: newMyBooks,
            myBooksCount: newMyBooksCount,
            allAuthors: newAllAuthors
        }
    })
)