import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/Context';

function AskQuestion() {
  const [userData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData.user) navigate('/login');
  }, [userData.user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_base_url}/api/questions/`, {
        question: form.question,
        question_description: form.questionDescription,
        user_id: userData.user.id,
      });

      navigate('/');
    } catch (error) {
      console.error('Error submitting the question', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-center">Steps to Write a Good Question</h3>
          <ul className="list-disc list-inside ps-20 text-[13px] pb-12">
            <li>Summarize in a one-line title</li>
            <li>Describe in more detail</li>
            <li>Describe what you expect to happen</li>
            <li>Review your question and post</li>
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-medium text-center">Ask a public Question</h3>
          <Link to="/" className="ms-40 md:ms-56 text-xs">
            Go to question page
          </Link>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="question"
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Title"
              onChange={handleChange}
            />
            <textarea
              name="questionDescription"
              placeholder="Question Description"
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mb-4 resize-none h-32"
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">
              Post Your Question
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AskQuestion;






  //     <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
  //       <div className="mb-4">
  //         <label htmlFor="question" className="text-sm font-semibold text-gray-600">Question</label>
  //         <input
  //           type="text"
  //           name="question"
  //           value={form.question}
  //           onChange={handleChange}
  //           className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
  //         />
  //       </div>
  //       <div className="mb-4">
  //         <label htmlFor="questionDescription" className="text-sm font-semibold text-gray-600">Question Description</label>
  //         <textarea
  //           name="questionDescription"
  //           value={form.questionDescription}
  //           onChange={handleChange}
  //           className="w-full border p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
  //         />
  //       </div>

  //       {/* <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button> */}
  //     </form>
  //     <Link to="/Answers" className="bg-blue-500 hover:bg-orange-400 text-white font-medium py-2 px-10 rounded text-sm md:me-[900px]">Submit</Link> 
  //   </div>
  // );