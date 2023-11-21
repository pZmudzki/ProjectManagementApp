import React, {useState} from 'react'

export default function DeleteProjectModal({project, modalActive}) {
    const [typedName, setTypedName] = useState("")

    function handleChange(e) {
        setTypedName(e.target.value)
    }

    async function deleteProject() {}

    return (
    <>
    <div className="modal">
        <h1>To delete this project type <span>{project.projectName}</span></h1>
        <form onSubmit={deleteProject}>
            <input type="text" name="projectName" />
            {typedName === project.projectName ? <button type="submit">Delete</button> : <button type="submit" disabled>Delete</button>}
        </form>
    </div>
    <div className="bg-modal">
    </div>
    </>
  )
}
