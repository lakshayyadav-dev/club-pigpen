"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import localFont from "next/font/local";
import encryptedCodes from "./encryptedCodes";
import key from "/assets/504px-Pigpen.png";

const pigpen = localFont({ src: "../font/PigpenCipher.otf" });

export default function Home() {
	const [inputText, setInputText] = useState("");
	const [index, setIndex] = useState(Math.floor(Math.random() * encryptedCodes.length));
	const [isCorrect, setIsCorrect] = useState(null);
	const [showAnswer, setShowAnswer] = useState(false);
	// const [score, setScore] = useState(0);
	const [start, setStart] = useState(false);
	const [won, setWon] = useState(false);

	const [time, setTime] = useState(0);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		let interval;
		if (running) {
			interval = setInterval(() => {
				setTime((prevTime) => prevTime + 10);
			}, 10);
		} else if (!running) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [running]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (inputText === encryptedCodes[index]) {
			setIsCorrect(true);
			setShowAnswer(false);
			// setScore(score + 10);
			setIndex(Math.floor(Math.random() * encryptedCodes.length));

			if (Math.floor((time / 1000) % 60) <= 5) {
				setWon(true);
			}
            else {
                setWon(false);
            }

			stopGame();
		} else {
			setIsCorrect(false);
		}

		setInputText("");
	};

	const startGame = () => {
		// setScore(0);
		setTime(0);
		setStart(true);
		setRunning(true);
		setTimeout(() => window.scrollBy(0, 500), 1);
		setWon(null);
	};
	const stopGame = () => {
		setIsCorrect(null);
		setStart(false);
		setRunning(false);
	};

	return (
		<main>
			<div className="container">
				<div>
					<div className="heading">
						<h1>PIGPEN CIPHER</h1> <p>by ciphering club GDGPS</p>
					</div>

					<Image src={key} width={350} height={325} />
				</div>

				{start && (
					<form onSubmit={(e) => handleSubmit(e)}>
						<div>
							<p className="decryptText">Decrypt this text:</p>
							<div className={`cipher ${pigpen.className}`}>
								<p>{encryptedCodes[index]}</p>
							</div>
						</div>

						<div className="decryptInputContainer">
							<label>Enter the decrypted text:</label>
							<input
								type="text"
								value={inputText}
								onChange={(e) => setInputText(e.target.value)}
							/>
						</div>

						<div className="correctAnswerDiv">
							{isCorrect === null ? null : isCorrect ? (
								<p className="correct">Correct! Onto the next one!</p>
							) : (
								<>
									<p className="incorrect">Incorrect! Try again!</p>
									{showAnswer && (
										<p className="correctAnswer">
											<strong>Correct Answer: </strong>
											{encryptedCodes[index]}
										</p>
									)}
									<button
										className="submitButton"
										onClick={() => setShowAnswer(true)}
									>
										Show Correct Answer
									</button>
								</>
							)}
						</div>

						<button type="submit" className="submitButton">
							CHECK
						</button>
					</form>
				)}

				{/* {won ? !won ? (
					<div className="won">
						<h1>You decipherd the message in {Math.floor((time / 1000) % 60)} seconds.</h1>
                        <h1>Advance to level 2!</h1>
					</div>
				) : (
                    <div className="won">
                        <h1>You decipherd the message in {Math.floor((time / 1000) % 60)} seconds.</h1>
                        <h1>Advance to level 2!</h1>
                    </div>
                )} */}

				{won && (
					<div className="won">
						<h1>
							You decipherd the message in {Math.floor((time / 1000) % 60)} seconds.
						</h1>
						<h1>Advance to level 2!</h1>
					</div>
				)}
				{won === false && (
					<div className="won">
						<h1>
							You decipherd the message in {Math.floor((time / 1000) % 60)} seconds.
						</h1>
						<h1>Try again next time!</h1>
					</div>
				)}
			</div>

			<div>
				<div className="numbers">
					<span>Time: </span>
					<span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
					<span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
				</div>
			</div>

			{start ? (
				<button className="stopBtn" onClick={() => stopGame()}>
					STOP
				</button>
			) : (
				<button className="startBtn" onClick={() => startGame()}>
					START
				</button>
			)}
		</main>
	);
}
