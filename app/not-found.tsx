'use client';

import image from '@/public/fallback.png';

export default function NotFound() {
	return (
		<html lang="en">
			<head>
				<style>
					{`
          html, body {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #15191E;
            font-family: 'Geist', sans-serif;
          }

          .flex-container {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: left;
            max-width: 100%;
            margin: auto;
            color: white;
          }

          .image-container {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            flex: 1;
            flex-basis: 50%;
          }

          img {
            max-width: 70%;
            height: auto;
            border-radius: 15px;
          }

          .text-container {
            padding-left: 10px;
            flex: 1;
            flex-basis: 50%;
          }

          h1 {
            font-size: 13em;
            color: #747FFF;
            margin: 0;
          }

          .subtitle {
            font-size: 3em;
            font-weight: bold;
            margin: 0 0 20px; // Adds margin below the subtitle
          }

          p {
            font-size: 1.2em;
          }

          .button {
            padding: 15px 30px;
            font-size: 1em;
            color: #fff;
            background-color: #747FFF;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            margin-top: 30px; // Increases space above the button
          }

          .button:hover {
            background-color: #4E55AC;
          }

          @media (max-width: 768px) {
            .flex-container {
              flex-direction: column;
            }

            .text-container, .image-container {
              padding: 0;
            }
          }
        `}
				</style>
			</head>
			<body>
				<div className="flex-container">
					<div className="image-container">
						<img src={image.src} alt="404 Image" />
					</div>
					<div className="text-container">
						<h1>404</h1>
						<p className="subtitle">Page non trouvée!</p>
						<p>Nous sommes désolés, la page demandée n'a pas pu être trouvée.</p>
						<br></br>
						<a href="/fr/dashboard/news" className="button">
							Page d'accueil
						</a>
					</div>
				</div>
			</body>
		</html>
	);
}
