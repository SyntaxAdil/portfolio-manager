const projects = [];
export const addProject = async (newProject) => {
  newProject.id = projects.length + 1;
  projects.push(newProject);
  console.log(projects);
};
