import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-2">
      <div className="flex flex-col w-1/2">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-2 border-mainGreen"
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="border-2 border-mainGreen"
        />
      </div>

      <div className="flex gap-4 justify-center">
        <button
          formAction={login}
          className="bg-mainGreen w-1/3 text-white rounded-sm"
        >
          Log in
        </button>
        <button
          formAction={signup}
          className="border-mainGreen border-2 w-1/3 rounded-sm"
        >
          Sign up
        </button>
      </div>
    </form>
  );
}
