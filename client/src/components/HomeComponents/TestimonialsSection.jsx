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
      className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <h2 className="text-base font-semibold leading-7 text-indigo-600 ">
          Testimonials
        </h2>
        <div className="grid grid-cols-1 divide-y-2 divide-indigo-200">
          {people.map((person, i) => {
            return (
              <figure className="mb-4" key={i}>
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
