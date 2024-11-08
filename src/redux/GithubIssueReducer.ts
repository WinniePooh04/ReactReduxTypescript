import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch, AppDispatch } from "./index"

interface IssuesState {
  issues: string[];
  loading: boolean;
  error: string | null;
}

const initialState: IssuesState = {
  issues: [],
  loading: false,
  error: null,
}

const issuesSliceGithub = createSlice({
 name: 'githubIssue',
 initialState,
 reducers: {
  fetchIssuesStart(state) {
    state.loading = true
    state.error = null;
  },
  fetchIssuesSuccess(state, action: PayloadAction<string[]>) {
    state.loading = false;
    state.issues = action.payload
  },
  fetchIssuesFailure(state, action: PayloadAction<string>) {
    state.loading = false;
    state.error = action.payload
  }
 }
})

export const fetchGithubIssues = () => async (dispatch : AppDispatch = useAppDispatch()) => {
 try {
      dispatch(fetchIssuesStart())
      const response = await fetch('https://api.github.com/repos/github/hub/issues');
      const data = await response.json();
      const issues = data.map((issue: { title: string }) => issue.title);
      dispatch(fetchIssuesSuccess(issues))
    } catch (err) {
      dispatch(fetchIssuesFailure('Failed to fetch users'))
    }
}

export const { fetchIssuesStart, fetchIssuesSuccess, fetchIssuesFailure } = issuesSliceGithub.actions;
export default issuesSliceGithub.reducer;