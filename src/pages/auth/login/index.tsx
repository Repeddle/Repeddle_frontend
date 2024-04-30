import LoginComp from '../../../section/auth/LoginComp';

function Login() {
  return (
    <div className="flex relative flex-col lg:flex-row bg-white-color dark:bg-black-color h-screen">
      <div className="flex-1 overflow-x-hidden">
        <img
          src="/images/auth/pexels-kseniachernaya-3965548.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex-[3] lg:flex-1 p-4 lg:p-8">
        <LoginComp />
      </div>
    </div>
  );
}

export default Login;
