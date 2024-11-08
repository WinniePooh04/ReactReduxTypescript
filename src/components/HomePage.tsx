import React, { useEffect } from "react";
import { useState } from "react";
import { Box, Typography, Button, TextField, Stack } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState, AppDispatch } from "../redux/index";
import { addIssue } from "../redux/IssueReducer";
import { fetchGithubIssues } from "../redux/GithubIssueReducer";

const HomePage = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [textInput, setTextInput] = useState("");
  const issueList = useSelector(
    (state: RootState) => state.issue.ProjectIssues
  );
  const githubIssueList = useSelector(
    (state: RootState) => state.githubIssue.issues
  );
  const loading = useSelector((state: RootState) => state.githubIssue.loading);
  const error = useSelector((state: RootState) => state.githubIssue.error);

  useEffect(() => {
    dispatch(fetchGithubIssues());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleTextInputChange = (e: any) => {
    setTextInput(e.target.value);
  };

  const handleClick = () => {
    dispatch(addIssue(textInput));
    setTextInput("");
  };

  return (
    <div className="home_page">
      <Box sx={{ ml: "5rem", mr: "5rem" }}>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Project Isue Tracker
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Stack spacing={2}>
            <Typography variant="h5">Add new issue</Typography>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              onChange={handleTextInputChange}
              value={textInput}
            />
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Stack>
        </Box>
        <Box sx={{ ml: "1rem", mt: "3rem" }}>
          <Typography variant="h5">Opened issue</Typography>
          {issueList?.map((issue: string) => {
            return <ProjectCard issueTitle={issue} />;
          })}
          {githubIssueList?.map((i: string) => {
            return <ProjectCard issueTitle={i} />;
          })}
        </Box>
      </Box>
    </div>
  );
};
export default HomePage;
