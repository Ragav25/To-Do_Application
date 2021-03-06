import React, { useContext, useState, useEffect } from "react";
//Bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./CreateProjects.css";
import { ThemeContext } from "../../context/ThemeContext";
import { ProjectContext } from "../../context/ProjectContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import ProjectList from "../ProjectList/ProjectList";

const CreateProjects = () => {
  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;

  const { addProject, editProject, editItem } = useContext(ProjectContext);
  const [projectName, setProjectName] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    if (editItem) {
      setProjectName(editItem.projectName);
      setDescription(editItem.description);
      console.log(editItem);
    } else {
      setProjectName("");
      setDescription("");
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editItem) {
      addProject(projectName, description);
      setProjectName("");
      setDescription("");
    } else {
      editProject(projectName, description, editItem.id);
    }
  };

  return (
    <div id="project-body" style={{ background: theme.bg, color: theme.textc }}>
      <h2 id="project-heading">WELCOME TO BEE HIVE</h2>

      <ThemeToggle id="themetoggle" />

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Project's Name"
            value={projectName || ""}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          id="add-button"
          type="submit"
          style={{ background: theme.buttonc, color: theme.textc }}
        >
          {editItem ? "EDIT PROJECT" : "ADD PROJECT"}
        </Button>
      </Form>
      <ProjectList />
    </div>
  );
};

export default CreateProjects;
