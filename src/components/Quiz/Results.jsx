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
        return 'The Creative Marketer';

      case 'fearless-leader':
        return 'The Fearless Leader';

      case 'people-person':
        return 'The People Person';

      case 'money-maestro':
        return 'The Money Maestro';

      case 'computer-whiz':
        return 'The Computer Whiz';

      case 'self-starter':
        return 'The Self Starter';

      // Healthcare
      case 'executive':
        return 'The Executive';
      case 'practitioner':
        return 'The Practitioner';
      case 'educator':
        return 'The Educator';
      case 'analyst':
        return 'The Analyst';
      case 'scientist':
        return 'The Scientist';

      // ADC Plan
      case 'stem':
        return 'Technology';
      case 'business':
        return 'Business';
      case 'healthcare':
        return 'Healthcare';
      case 'education':
        return 'Education';
      case 'art-and-design':
        return 'Art & Design';
      case 'criminal-justice':
        return 'Criminal Justice';
      case 'other':
        return 'Open for anything';

      default:
        return 'Unknown Personality';
    }
  }

  return (
    <>
      <div className="preResultsContainer">
        <section className="resultsHero">
          <div className="group">
            <div className="heroContent column">
              <div className="intro-title"><span>Your ideal role could be ... </span></div>
              <h1>{roleResult()}</h1>
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
