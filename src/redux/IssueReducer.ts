import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IssueInitialState {
  ProjectIssues: string[]
}

const initialState : IssueInitialState = {
  ProjectIssues: []
}

export const issueSlice = createSlice({

  name : 'issue',
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<string>) => {
      state.ProjectIssues = [...state.ProjectIssues, action.payload]
    }
  }
})

export const { addIssue } = issueSlice.actions
export default issueSlice.reducer