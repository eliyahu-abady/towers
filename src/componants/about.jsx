import { useAuth } from "./context"

function About() {
    const {user} = useAuth()

    return(
        <>
            <h1>hello {user ? user.email : ""}</h1>
            <h2>about</h2>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione, accusantium voluptatem iusto obcaecati autem magnam molestias delectus sit qui ea, laboriosam sequi est! Corrupti optio possimus enim quos incidunt obcaecati.</p>
            </>
    )
    
}

export default About