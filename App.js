
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [day, setDay] = useState(1); // Track current day
    const [question, setQuestion] = useState(''); // Store student's test answer
    const [result, setResult] = useState(null); // AI analysis output
    const [timetable, setTimetable] = useState(null); // Personalized schedule
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    // Move to the next day
    const handleNextDay = () => {
        if (day < 7) {
            setDay(day + 1);
        } else {
            alert('Test Day!');
        }
    };

    // Submit the test and get analysis
    const handleTestSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/test', { question });
            setResult(response.data.analysis);
            setTimetable(response.data.timetable);
        } catch (error) {
            setError('Error during test submission. Please try again.');
            console.error('Error during test:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>AI Tutor Dashboard</h1>
            {day <= 7 ? (
                <div>
                    <h2>Day {day}: Learning Material</h2>
                    <p>Today's topic: [Subject Content for Day {day}]</p>
                    <button onClick={handleNextDay}>Next Day</button>
                </div>
            ) : (
                <div>
                    <h2>Final Test</h2>
                    <textarea
                        placeholder="Enter your answer"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button onClick={handleTestSubmit} disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Test'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {result && (
                        <div>
                            <h3>Analysis:</h3>
                            <p>{result}</p>

                            <h3>Personalized Timetable:</h3>
                            <pre>{JSON.stringify(timetable, null, 2)}</pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;

// Instructions:
// 1. Ensure Node.js is installed.
// 2. Install dependencies using "npm install axios".
// 3. Start the React app with "npm start".
// 4. Ensure Flask backend is running on port 5000.
