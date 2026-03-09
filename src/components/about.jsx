import { useAuth } from "./authcontext";

function About() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-2xl mx-auto px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">
        hello {user ? user.email : ""}
      </h1>
      <h2 className="text-2xl mb-6">about</h2>
      <p className="text-lg leading-relaxed bg-white/40 p-6 rounded-xl border border-black/5 shadow-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
        accusantium voluptatem iusto obcaecati autem magnam molestias delectus
        sit qui ea, laboriosam sequi est! Corrupti optio possimus enim quos
        incidunt obcaecati.
      </p>
    </div>
  );
}

export default About;
