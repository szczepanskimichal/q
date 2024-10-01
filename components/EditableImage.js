import { useState } from "react";
import UserIcon from "./icons/UserIcon";
import Backdrop from "./Backdrop";
import toast from "react-hot-toast";

export default function EditableImage({ image, setImage }) {
  const [fullImage, setFullImage] = useState(false);

  async function handleFileChange(e) {
    const files = e.target?.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      if (!files[0].type.startsWith("image/")) {
        toast.error("Please select an image file.");
        return;
      }

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete!",
        error: "Upload error.",
      });
    }
  }

  return (
    <div className="p-2 inline-flex items-center flex-col gap-2">
      <div className="rounded-full flex items-center justify-center bg-gray-200 p-1 size-[120px] shadow-lg">
        {image ? (
          <>
            <img
              className="w-full h-full object-cover rounded-full cursor-pointer"
              src={image}
              onClick={() => setFullImage(true)}
              alt=""
            />
            {fullImage && (
              <Backdrop handleClose={() => setFullImage(false)}>
                <img className="rounded-lg max-h-[85vh]" src={image} alt="" />
              </Backdrop>
            )}
          </>
        ) : (
          <UserIcon className="text-gray-500" />
        )}
      </div>
      <label className="bg-white border-2 shadow-lg text-center py-1 rounded-md hover:scale-105 transition delay-150 duration-300 cursor-pointer w-full">
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          className="hidden"
        />
        <span>Edit</span>
      </label>
    </div>
  );
}
