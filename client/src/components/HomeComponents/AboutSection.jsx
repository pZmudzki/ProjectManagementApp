export default function AboutSection() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-white py-24 sm:py-32 h-screen"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                About Us
              </h2>
              <div className="mt-2 flex items-start justify-beetwen flex-col">
                <div>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Who We Are
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    ProjectFlow is a project management tool that helps you stay
                    on top of your projects and tasks. It&apos;s designed to
                    simplify the project planning process and foster seamless
                    collaboration.
                  </p>
                </div>
                <div>
                  <p className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Our Mission
                  </p>
                  <p className="mt-6 text-lg leading-8 text-gray-600">
                    Our mission is to help you manage your projects efficiently
                    and effectively. We want to make project management as
                    simple as possible, so you can focus on what matters most.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <img
            src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            alt="Product screenshot"
            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          />
        </div>
      </div>
    </section>
  );
}
