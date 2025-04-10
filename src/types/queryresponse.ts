import MovieResponse from "./movieresponse";
import NotFoundObject from "./notfound";

export default interface QueryResponse {
    response: MovieResponse,
    query: string,
    error: NotFoundObject
}