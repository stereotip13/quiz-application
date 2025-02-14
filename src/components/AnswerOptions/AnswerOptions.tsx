import React, { useState } from 'react';
import './AnswerOptions.css';

interface AnswerOptionsProps {
  questionId: number;
  rightAnswer: string;
  wrongAnswers: string[];
  onAnswerSelect: (questionId: number, answer: string) => void;
  selectedAnswer?: string;
  showCorrectAnswer?: boolean;
}

export const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  questionId,
  rightAnswer,
  wrongAnswers,
  onAnswerSelect,
  selectedAnswer,
  showCorrectAnswer = false,
}) => {
  const [shuffledAnswers] = useState<string[]>(() => {
    const answers = [rightAnswer, ...wrongAnswers];
    return answers.sort(() => Math.random() - 0.5);
  });

  const getAnswerClassName = (answer: string) => {
    if (!selectedAnswer) return '';

    let className = '';
    if (answer === selectedAnswer) {
      className += ' selected';
      if (answer !== rightAnswer) className += ' incorrect';
    }
    if (showCorrectAnswer && answer === rightAnswer) className += ' correct';

    return className;
  };

  const showIcon = (answer: string) => {
    if (!selectedAnswer) return null;
    if (answer === rightAnswer && selectedAnswer === rightAnswer) {
      return <span className="checkmark">✓</span>;
    }
    if (answer === selectedAnswer && answer !== rightAnswer) {
      return <span className="crossmark">✕</span>;
    }
    return null;
  };

  return (
    <div className="answer-options">
      {shuffledAnswers.map((answer, index) => (
        <label
          key={index}
          className={`answer-option${getAnswerClassName(answer)}`}
        >
          <input
            type="radio"
            name={`question-${questionId}`}
            value={answer}
            checked={selectedAnswer === answer}
            onChange={() =>
              !selectedAnswer && onAnswerSelect(questionId, answer)
            }
            disabled={selectedAnswer !== undefined}
          />
          <span className="answer-text">{answer}</span>
          {showIcon(answer)}
        </label>
      ))}
    </div>
  );
};
