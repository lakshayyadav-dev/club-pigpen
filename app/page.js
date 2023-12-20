"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import localFont from "next/font/local";
import encryptedCodes from "./encryptedCodes";
import key from "/assets/504px-Pigpen.png";

const pigpen = localFont({ src: "../font/PigpenCipher.otf" });

export default function Home() {
	const [inputText, setInputText] = useState("");
	const [index, setIndex] = useState(0);
	const [isCorrect, setIsCorrect] = useState(null);
	const [showAnswer, setShowAnswer] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (inputText === encryptedCodes[index]) {
			setIsCorrect(true);
			setShowAnswer(false);
			setIndex(Math.floor(Math.random() * encryptedCodes.length));
		} else {
			setIsCorrect(false);
		}

		setInputText("");
	};

	return (
		<main>
			<div className="heading">
				<h1>PIGPEN CIPHER</h1> <p>by ciphering club GDGPS</p>
			</div>

			<Image src={key} width={350} height={325} />

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
						<p className="correct">Correct!</p>
					) : (
						<>
							<p className="incorrect">Incorrect!</p>
							{showAnswer && (
								<p className="correctAnswer">
									<strong>Correct Answer: </strong>
									{encryptedCodes[index]}
								</p>
							)}
							<button className="submitButton" onClick={() => setShowAnswer(true)}>
								Show Correct Answer
							</button>
						</>
					)}
				</div>

				<button type="submit" className="submitButton">
					CHECK
				</button>
			</form>
		</main>
	);
}
