// import { useState, useEffect } from "react";
// import useProfile from "./useProfile";

// export default function useImage() {
// 	const [userImage, setUserImage] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	const { user, loading: profileLoading } = useProfile();

// 	useEffect(() => {
// 		if (user?.image) {
// 			setLoading(true);
// 			setUserImage(user.image);
// 			setLoading(false);
// 		}
// 	}, [profileLoading]);

// 	return { userImage, setUserImage, loading };
// }

import { createContext, useContext, useEffect, useState } from "react";
import useProfile from "./useProfile";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
	const [userImage, setUserImage] = useState(null);
	const [loading, setLoading] = useState(null);

	const { user, loading: profileLoading } = useProfile();

	useEffect(() => {
		if (user?.image) {
			setLoading(true);
			setUserImage(user.image);
			setLoading(false);
		}
	}, [profileLoading]);

	return (
		<ImageContext.Provider value={{ userImage, setUserImage, loading }}>
			{children}
		</ImageContext.Provider>
	);
};

export const useImage = () => useContext(ImageContext);
