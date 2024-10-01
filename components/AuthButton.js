import Link from "next/link";

export default function AuthButton() {
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-center whitespace-nowrap mb-3 font-medium">
        You re not authenticated
      </p>
      <div className="flex flex-col items-center gap-3 w-full">
        <button className="btn-primary hover:scale-100 hover:bg-opacity-90 w-full flex justify-center">
          <Link href="/login">Login</Link>
        </button>
        <button className="btn-secondary hover:scale-100 hover:bg-opacity-90 w-full  flex justify-center">
          <Link href="/register">Register</Link>
        </button>
      </div>
    </div>
  );
}
