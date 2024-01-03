import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FAQView() {
  return (
    <div className="overflow-y-auto w-full ">
      <div className="flex flex-col gap-5 p-5">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-xl font-bold">
            Explore our FAQ to find answers to common questions about
            ProjectFlow.
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          {faqArray.map((faq, index) => {
            return (
              <Accordion key={index} className="w-full max-w-3xl">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  sx={{
                    backgroundColor: "#e2e8f0",
                  }}
                  className="hover:bg-white transition duration-200 ease-in-out"
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    color: "#000000",
                  }}
                >
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const faqArray = [
  {
    question: "What is ProjectFlow?",
    answer:
      "ProjectFlow is a comprehensive project management platform designed to streamline project planning, collaboration, and task management for teams and businesses of all sizes.",
  },
  {
    question: "How can I get started with ProjectFlow?",
    answer:
      "To get started with ProjectFlow, simply sign up for an account on our website. Once logged in, you can create a new project, add tasks, and start collaborating with your team.",
  },
  {
    question: "What features does ProjectFlow offer?",
    answer:
      "ProjectFlow offers a range of features including project creation, task management, team collaboration, real-time updates. Explore our platform to discover all the tools that can enhance your project management experience.",
  },
  {
    question: "Is ProjectFlow suitable for small businesses?",
    answer:
      "Yes, ProjectFlow is designed to be scalable and is suitable for businesses of all sizes, including small businesses. The platform provides the flexibility needed to adapt to different project management needs.",
  },
  {
    question: "How does task assignment work in ProjectFlow?",
    answer:
      "Task assignment in ProjectFlow is simple. When creating a task, you can easily assign it to a team member. The assigned team member will receive notifications and updates related to that task.",
  },
  {
    question: "What is the role of a Project Manager in ProjectFlow?",
    answer:
      "In ProjectFlow, a Project Manager plays a crucial role in overseeing and coordinating project activities. They can create and assign tasks, manage team members, and ensure that projects are progressing smoothly.",
  },
  {
    question: "How secure is ProjectFlow?",
    answer:
      "Security is a top priority for us. ProjectFlow implements robust security measures to protect your data and privacy. We use encryption and follow industry best practices to ensure a secure project management environment.",
  },
  {
    question: "Is there a mobile app for ProjectFlow?",
    answer:
      "Currently, ProjectFlow is only available as a web application. However, we are working on a mobile app that will be available soon. Stay tuned for more information on the ProjectFlow mobile app!",
  },
  {
    question: "How does billing and subscription work in ProjectFlow?",
    answer:
      "ProjectFlow is currently free to use so you can enjoy all the features without any cost. We may introduce paid plans in the future, and we'll be sure to notify you when that happens.",
  },
  {
    question: "Is there customer support available for ProjectFlow?",
    answer:
      "Yes, we have a dedicated customer support team ready to assist you. Feel free to create a new ticket to our support team, and we'll be happy to help with any questions or concerns you may have.",
  },
  {
    question: "What integrations does ProjectFlow support?",
    answer:
      "ProjectFlow supports a variety of integrations with other tools and platforms. Check our integrations page for the latest information on the services you can seamlessly connect with ProjectFlow.",
  },
  {
    question: "How often is ProjectFlow updated?",
    answer:
      "We strive to continuously improve ProjectFlow by releasing regular updates. These updates may include new features, enhancements, and bug fixes to provide you with the best possible project management experience.",
  },
  {
    question: "What browsers are supported by ProjectFlow?",
    answer:
      "ProjectFlow is designed to be compatible with popular web browsers such as Chrome, Firefox, Safari, and Edge. Ensure you are using the latest version of your preferred browser for the best experience.",
  },
];
