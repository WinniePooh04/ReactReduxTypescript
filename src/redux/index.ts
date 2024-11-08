import { configureStore } from "@reduxjs/toolkit";
import IssueReducer from './IssueReducer'
import GithubIssueReducer from "./GithubIssueReducer"
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    issue: IssueReducer,
    githubIssue: GithubIssueReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()