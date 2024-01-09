import Form from "@/components/Form";
import Link from "next/link";

import isDevMode from "@/helpers/isDevMode";
import styles from '@/styles/components/Results.module.scss';

const Results = ({ children, vertical, answers, formId, redirectUrl }) => {
  const formSubmitAnswers = {
    answers: answers.selectedAnswers,
    highestScorePersonality: answers.highestScorePersonality,
  };
  const devModeOnly = isDevMode();

  const roleResult = () => {
    console.log("🚀 ~ file: Results.jsx:16 ~ roleResult ~ answers.highestScorePersonality:", answers.highestScorePersonality)
    switch (answers.highestScorePersonality) {

      // Business
      case 'creative-marketer':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Creative Marketer',
        }
      case 'fearless-leader':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Fearless Leader',
        }
      case 'people-person':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The People Person',
        }
      case 'money-maestro':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Money Maestro',
        }
      case 'computer-whiz':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Computer Whiz',
        }
      case 'self-starter':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Self Starter',
        }

      // Healthcare
      case 'executive':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Executive',
        }
      case 'practitioner':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Practitioner',
        }
      case 'educator':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Educator',
        }
      case 'analyst':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Analyst',
        }
      case 'scientist':
        return {
          title: 'Your ideal role could be ... ',
          role: 'The Scientist',
        }

      default:
        return {
          title: 'Your Degree-Ready Plan',
          role: "You've Got This!",
        }
    }
  }
  const roleAndTitle = roleResult();
  return (
    <>
      <div className="preResultsContainer">
        <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title"><span>{roleAndTitle.title}</span></div>
              <h1>{roleAndTitle.role}</h1>
              <p>
                Learn why we thought this role could be a good fit for you! Then,
                discover <strong>related careers</strong>, average{" "}
                <strong>salaries</strong> and job outlook, and{" "}
                <strong>academic programs</strong> that can help you reach your
                goals faster.
              </p>
              <p>Furthermore, understanding the average salaries and job outlook associated with this position can offer valuable insights into the financial aspects of your career. It's essential to have a clear understanding of the earning potential and growth opportunities that come with this role. This knowledge will empower you to make informed decisions about your career trajectory, ensuring that you're on a path that aligns with both your professional and financial goals. Additionally, it provides a benchmark for negotiating compensation packages, ensuring that you receive fair and competitive remuneration for your contributions.</p>

              <p>Lastly, exploring academic programs tailored to this field can significantly accelerate your progress towards achieving your career objectives. Pursuing specialized courses, workshops, or certifications can enhance your skill set and make you a more competitive candidate in the job market. Additionally, these programs often provide networking opportunities and access to industry experts, further enriching your professional development. By investing in your education, you not only broaden your knowledge base but also demonstrate a strong commitment to continuous learning and growth, qualities highly valued in any industry.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="engageForm">
        <div className="formWrapper">

          <div className="leadForm">
            <h2>Where should we send your results?</h2>
            <Form
              redirectTo={redirectUrl}
              answers={formSubmitAnswers}
              user={null}
              id={formId || "2"}
              className={styles.formContainer}
            />
            {devModeOnly && (
              <>
                <Link
                  href={redirectUrl}
                >
                  Skip form (only shows in dev mode)
                </Link>
                <code>{JSON.stringify(formSubmitAnswers)}</code>
              </>
            )}
          </div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Results;
