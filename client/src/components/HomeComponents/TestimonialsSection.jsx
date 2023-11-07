export default function Testimonials() {
  const people = [
    {
      name: "Jane D.",
      role: "Small Business Owner",
      imageSrc: "person4.jpg",
      bio: "ProjectFlow has been a game-changer for my small business. With its user-friendly interface and efficient task management, I've been able to keep all our projects on track and completed on time. It's a must-have for any business owner!",
    },
    {
      name: "Mark S",
      role: "Project Manager",
      imageSrc: "person1.jpg",
      bio: "I've used various project management tools in the past, but ProjectFlow stands out. It simplifies the project planning process and offers real-time updates on task progress. It has made my job as a project manager so much easier.",
    },
    {
      name: "David M",
      role: "IT Professional",
      imageSrc: "person2.jpg",
      bio: "ProManage has been an excellent addition to our IT team. We can assign tasks, monitor progress, and ensure our projects are delivered on time. It's a versatile tool that adapts to our changing needs.",
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 sm:pt-16 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[100deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600 ">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 divide-y-2 divide-indigo-200">
          {people.map((person) => {
            return (
              <figure className="mt-10">
                <figcaption className="mt-10 flex items-center mb-5">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={person.imageSrc}
                    alt="client image"
                  />
                  <div className="ml-5 flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900">
                      {person.name}
                    </div>
                    <svg
                      viewBox="0 0 2 2"
                      width={3}
                      height={3}
                      aria-hidden="true"
                      className="fill-gray-900"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="text-gray-600">{person.role}</div>
                  </div>
                </figcaption>
                <blockquote className=" text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>{person.bio}</p>
                </blockquote>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
