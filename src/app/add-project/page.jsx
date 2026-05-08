import React from 'react'
import AddProject from '../../components/project/AddProject'



const Projects = async() => {
    
  return (
    <div>
      <h3 className="text-center text-primary font-bold  text-4xl capitalize mt-4">
        Add  your Project
      </h3>
      <AddProject  ></AddProject>
    </div>
  )
}

export default Projects