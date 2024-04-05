import Document, { Html, Head, Main, NextScript } from 'next/document';
import { GeistSans } from 'geist/font/sans';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en" className={GeistSans.className}>
				<Head>
					<link rel="icon" href="/favicon.ico" sizes="any" />
				</Head>
				<body className="bg-base-300 text-base-content">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
