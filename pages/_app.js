import { CartContextProvider } from "@/components/hooks/CartContext";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { ImageProvider } from "@/components/hooks/useImage";

export default function App({ Component, pageProps }) {
	return (
		<SessionProvider>
			<CartContextProvider>
				<ImageProvider>
					<Toaster
						position="top-center"
						reverseOrder={false}
						gutter={8}
						toastOptions={{
							duration: 3000,
							style: {
								fontSize: "20px",
								padding: "8px 16px",
								display: "inline-flex",
								justifyContent: "space-between",
								alignItems: "center",
								whiteSpace: "nowrap",
							},
						}}
					/>
					<Component {...pageProps} />
				</ImageProvider>
			</CartContextProvider>
		</SessionProvider>
	);
}
