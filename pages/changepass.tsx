export default function SignIn() {
    return (
      <>
        {/* Root Container */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
  
          {/* Form Section */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <div className="font-[sans-serif]">
          {/* <div className="text-center min-h-[160px] sm:p-6 p-4">
            <h4 className="sm:text-3xl text-2xl font-bold text-black">Sign In</h4>
          </div> */}
            {/* <img
              alt="Your Company"
              src="/images/logo.png"
              className="mx-auto h-20 w-auto"
            /> */}
            <h4 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Change Password
            </h4>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              {/* <div>
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
              </div> */}
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <input name="password" type="password" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Enter password" />
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Re-Password</label>
                <input name="password" type="password" className="bg-gray-100 focus:bg-transparent w-full text-sm text-gray-800 px-4 py-3 rounded-md outline-blue-500 transition-all" placeholder="Re-Enter password" />
              </div>


              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
        
      </>

    );
  }
