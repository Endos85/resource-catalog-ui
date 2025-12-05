import React, { useState } from "react";

const FeedbackForm = ({ resourceId, onFeedbackSubmitted }) => {
    const [feedbackText, setFeedbackText] = useState("");
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setSuccess(false);

        const newFeedback = {
            id: resourceId ? `${resourceId}-${Date.now()}` : `${Date.now()}`,
            resourceId,
            feedbackText,
            userId: "anonymous",
            rating,
            timestamp: new Date().toISOString()
        };

        try {
            const response = await fetch(`http://localhost:5002/resources/${resourceId}/feedback`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newFeedback),
            });

            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status}`);
            }

            const createdFeedback = await response.json();
            console.log("Feedback erfolgreich gesendet:", createdFeedback);

            setFeedbackText("");
            setRating(0);
            setSuccess(true);

            if (onFeedbackSubmitted) onFeedbackSubmitted(createdFeedback);

        } catch (err) {
            console.error("Fehler beim Senden des Feedbacks:", err);
            setError(err.message || "Fehler beim Senden des Feedbacks");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Feedback geben</h3>

            {error && <p className="text-red-600 mb-2">{error}</p>}
            {success && 
                <div className="bg-green-50 border-l-4 border-green-400 text-green-800 p-4 rounded-r-xl" role="alert">
                    <p className="font-bold">Erfolg!</p>
                    <p>Ihr Feedback wurde erfolgreich gesendet!</p>
                </div>
            }

            <div className="mb-4">
                <label className="block mb-1 font-medium">Bewertung</label>
                <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="border p-2 rounded w-full"
                >
                    <option value={0}>Bitte wählen</option>
                    <option value={1}>1 Stern</option>
                    <option value={2}>2 Sterne</option>
                    <option value={3}>3 Sterne</option>
                    <option value={4}>4 Sterne</option>
                    <option value={5}>5 Sterne</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block mb-1 font-medium">Kommentar</label>
                <textarea
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="border p-2 rounded w-full"
                    rows={4}
                    onClick={() => setSuccess(false)}
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting || feedbackText.trim() === ""}
                className="bg-main-dark text-white py-2 px-6 rounded-lg hover:bg-main-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
                {isSubmitting ? "Wird gesendet..." : "Feedback senden"}
            </button>
        </form>
    );
};

export default FeedbackForm;
