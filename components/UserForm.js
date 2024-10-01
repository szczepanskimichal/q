import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import EditableImage from "./EditableImage";

export default function UserForm({ user, onSubmit, cartProducts }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

  const router = useRouter();
  const pathname = usePathname();

  async function goToPayment() {
    if (cartProducts.length > 0) {
      const response = await axios.post("/api/checkout", {
        name: userName,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
      });
      if (response.data.url) {
        window.location = response.data.url;
      }
    } else {
      toast.error("No items in cart.");
    }
  }

  return (
    <form
      onSubmit={(e) =>
        onSubmit(e, {
          name: userName,
          image,
          phone,
          streetAddress,
          postalCode,
          city,
          country,
        })
      }
      className={`${
        pathname.includes("account") && "flex flex-col sm:flex-row gap-5 p-3"
      }`}
    >
      <div className="flex justify-center">
        {pathname.includes("account") && (
          <EditableImage image={image} setImage={setImage} />
        )}
      </div>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Phone number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {pathname.includes("account") && (
          <button type="submit" className="mt-3 btn-primary hidden sm:flex">
            Save all changes
          </button>
        )}
      </div>
      <div className="mt-3 sm:mt-0">
        <div className="md:flex gap-5">
          <div className="flex-1">
            <label>City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label>Postal code:</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <label>Street address:</label>
        <input
          type="text"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      {pathname.includes("account") && (
        <button
          type="submit"
          className="mt-3 flex justify-center btn-primary sm:hidden"
        >
          Save all changes
        </button>
      )}
      {/* {pathname.includes("cart") && (
				<button
					type="button"
					onClick={goToPayment}
					className="btn-secondary w-full justify-center mt-3"
				>
					Continue to payment
				</button>
			)} */}
    </form>
  );
}
