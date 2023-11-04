// import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  let navigate = useNavigate();

  return (
    <div>
      <section className="section-hero">
        <h1>Welcome to ProjectFlow</h1>
        <h2>Simplify Project Collaboration and Management</h2>
        <p>
          Streamline your project planning and execution with our intuitive
          project management platform. Whether you're a solo entrepreneur or
          managing a team, we've got you covered.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Try it now
        </button>
      </section>
      <section className="section-about">
        <h2 className="section-header">About Us</h2>
        <div className="about">
          <div className="about-text">
            <h3>Who We Are</h3>
            <p>
              ProjectFlow is a project management tool that helps you stay on
              top of your projects and tasks. It's designed to simplify the
              project planning process and foster seamless collaboration.
            </p>
          </div>
          <div className="about-text">
            <h3>Our Mission</h3>
            <p>
              Our mission is to help you manage your projects efficiently and
              effectively. We want to make project management as simple as
              possible, so you can focus on what matters most.
            </p>
          </div>
        </div>
      </section>
      <section className="section-features">
        <h2 className="section-header">Key Features</h2>
        <div className="features">
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="feature-text">
              <h3>Create and Manage Projects</h3>
              <p>
                Start a new project, set milestones, and track progress
                effortlessly.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="feature-text">
              <h3>Efficient Task Management</h3>
              <p>
                Organize tasks, assign them to team members, and monitor their
                status in real-time.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="feature-text">
              <h3>Team Collaboration</h3>
              <p>
                Foster seamless collaboration by keeping your entire team on the
                same page.
              </p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="feature-text">
              <h3>Stay Informed</h3>
              <p>
                Get real-time updates and notifications, so you never miss an
                important development.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-testimonials">
        <h2 className="section-header">Testimonials</h2>
        <div className="testimonial">
          <div className="testimonial-text">
            <div className="person">
              <img src="/person4.jpg" alt="client"></img>
              <h3>Jane D. - Small Business Owner</h3>
            </div>
            <p>
              "ProjectFlow has been a game-changer for my small business. With
              its user-friendly interface and efficient task management, I've
              been able to keep all our projects on track and completed on time.
              It's a must-have for any business owner!"
            </p>
          </div>
        </div>
        <div className="testimonial">
          <div className="testimonial-text">
            <div className="person">
              <img src="person1.jpg" alt="client"></img>
              <h3>Mark S. - Project Manager</h3>
            </div>
            <p>
              "I've used various project management tools in the past, but
              ProjectFlow stands out. It simplifies the project planning process
              and offers real-time updates on task progress. It has made my job
              as a project manager so much easier."
            </p>
          </div>
        </div>
        <div className="testimonial">
          <div className="testimonial-text">
            <div className="person">
              <img src="person3.jpg" alt="client"></img>
              <h3>Sarah L. - Freelancer</h3>
            </div>
            <p>
              "As a freelancer, I needed a tool to help me manage multiple
              client projects efficiently. ProjectFlow has been a lifesaver! I
              can easily collaborate with clients and keep track of tasks, all
              in one place. It's a freelancer's dream."
            </p>
          </div>
        </div>
        <div className="testimonial">
          <div className="testimonial-text">
            <div className="person">
              <img src="/person2.jpg" alt="client"></img>
              <h3>David M. - IT Professional</h3>
            </div>
            <p>
              "ProManage has been an excellent addition to our IT team. We can
              assign tasks, monitor progress, and ensure our projects are
              delivered on time. It's a versatile tool that adapts to our
              changing needs."
            </p>
          </div>
        </div>
      </section>
      <section className="section-cta">
        <h2 className="section-header">Get Started Today</h2>
        <p>
          Ready to take control of your projects? Sign up or log in to get
          started, and experience the difference of streamlined project
          management.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
}

export default HomePage;
