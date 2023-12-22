import {
  BellAlertIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Create and Manage Projects",
    description:
      "Start a new project, set milestones, and track progress effortlessly.",
    icon: SquaresPlusIcon,
  },
  {
    name: "Efficient Task Management",
    description:
      "Organize tasks, assign them to team members, and monitor their status in real-time.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Team Collaboration",
    description:
      "Foster seamless collaboration by keeping your entire team on the same page.",
    icon: UserGroupIcon,
  },
  {
    name: "Stay Informed",
    description:
      "Get real-time updates and notifications, so you never miss an important development.",
    icon: BellAlertIcon,
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-white py-24 pt-14 sm:py-24 sm:pt-16 h-screen relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[100deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Key Features
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Task Management Made Simple
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Effortlessly manage tasks, assign responsibilities, and track
            progress in real-time. Say goodbye to missed deadlines and
            confusion, and ensure project success with our user-friendly task
            management system.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
