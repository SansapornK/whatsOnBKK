import { useRouter } from 'next/router';

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="rounded-full p-2 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label="Go back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};
export default function SignIn() {
  return (
    <>
      {/* Root Container */}
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">

        {/* Form Section */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
        <div className="font-[sans-serif]">
        {/* <div className="text-center min-h-[160px] sm:p-6 p-4">
          <h4 className="sm:text-3xl text-2xl font-bold text-black">Sign In</h4>
        </div> */}
          {/* <img
            alt="Your Company"
            src="/images/logo.png"
            className="mx-auto h-20 w-auto"
          /> */}
          <GoBackButton />
          <h4 className="text-2xl font-bold tracking-tight text-gray-900">
            Sign In
          </h4>

        <div className="flex items-center justify-center ">
          <img
            alt="Your Company"
            src="/images/logo.png"
            className="ml-4 h-40 w-42"
          />
        </div>

        </div>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgotpass" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
           Don't have an account?{' '}
            <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register now
            </a>
          </p>
        </div>
   
      </div>
      
    </>
    
  );
  
}
