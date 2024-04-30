import { FormEvent, useState } from 'react';
import Button from '../../components/ui/Button';
import InputWithLabel from '../../components/ui/InputWithLabel';
import useAuth from '../../hooks/useAuth';
import useToastNotification from '../../hooks/useToastNotification';

type Props = {
  token?: string | null;
};

const ProfileForm = ({ token }: Props) => {
  const { registerUser, getUser, error, loading } = useAuth();
  const { addNotification } = useToastNotification();

  const [formNumber, setFormNumber] = useState<1 | 2>(1);

  const [firstInput, setFirstInput] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [secondInput, setSecondInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const firstValueChange = (key: keyof typeof firstInput, val: string) => {
    setFirstInput({ ...firstInput, [key]: val });
  };

  const secondValueChange = (key: keyof typeof secondInput, val: string) => {
    setSecondInput({ ...secondInput, [key]: val });
  };

  const validateFirstForm = (val: keyof typeof firstInput) => {
    if (firstInput[val].length === 0) {
      setFormError({ ...formError, [val]: `${val} is required` });
      return false;
    }

    if (
      // val === "firstName" ||
      val === 'lastName' &&
      firstInput[val].length < 3
    ) {
      setFormError({
        ...formError,
        [val]: `${val} must be at least 3 characters`,
      });
      return false;
    }

    setFormError({ ...formError, [val]: '' });
    return true;
  };

  const validateSecondForm = (val: keyof typeof secondInput) => {
    if (val === 'username' && secondInput.username.length < 3) {
      setFormError({
        ...formError,
        username: `username must be at least 3 characters`,
      });
      return false;
    }

    if (val === 'password' && secondInput.password.length < 6) {
      setFormError({
        ...formError,
        password: 'password must be at least 6 characters',
      });
      return false;
    }

    if (
      val === 'confirmPassword' &&
      secondInput.password !== secondInput.confirmPassword
    ) {
      setFormError({
        ...formError,
        confirmPassword: 'confirm password must equal password',
      });
      return false;
    }

    setFormError({ ...formError, [val]: '' });
    return true;
  };

  const changeForm = (val: 1 | 2) => {
    if (val === 2) {
      // validate first form
      const valid = Object.keys(firstInput).every((input) =>
        validateFirstForm(input as keyof typeof firstInput)
      );
      if (valid) setFormNumber(val);

      return;
    }
    setFormNumber(1);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!token) return addNotification('token not found');

    const res = await registerUser({ ...firstInput, ...secondInput, token });
    if (res) {
      await getUser();
    }
    if (error) addNotification(error);
  };

  return (
    <div className="flex h-full w-full justify-center items-center flex-col">
      <div className="w-full max-w-lg flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">Finish creating an Account</h2>
        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          {formNumber === 1 && (
            <>
              <InputWithLabel
                label="First Name"
                id="first_name"
                placeholder="First name"
                value={firstInput.firstName}
                onChange={(val: string) => firstValueChange('firstName', val)}
                error={formError.firstName}
                onBlur={() => validateFirstForm('firstName')}
              />

              <InputWithLabel
                label="Last Name"
                id="last_name"
                placeholder="Last Name"
                value={firstInput.lastName}
                onChange={(val: string) => firstValueChange('lastName', val)}
                error={formError.lastName}
                onBlur={() => validateFirstForm('lastName')}
              />

              <InputWithLabel
                label="Phone Number"
                type="email"
                id="phone"
                placeholder="Phone Number"
                value={firstInput.phone}
                onChange={(val: string) => firstValueChange('phone', val)}
                error={formError.phone}
                onBlur={() => validateFirstForm('phone')}
              />
            </>
          )}

          {formNumber === 2 && (
            <>
              <InputWithLabel
                label="Username"
                id="username"
                placeholder="username"
                value={secondInput.username}
                onChange={(val: string) => secondValueChange('username', val)}
                error={formError.username}
                onBlur={() => validateSecondForm('username')}
              />

              <InputWithLabel
                label="Password"
                id="password"
                type="password"
                value={secondInput.password}
                onChange={(val: string) => secondValueChange('password', val)}
                error={formError.password}
                onBlur={() => validateSecondForm('username')}
              />

              <InputWithLabel
                label="Confirm Password"
                type="password"
                id="confirm_password"
                value={secondInput.confirmPassword}
                onChange={(val: string) =>
                  secondValueChange('confirmPassword', val)
                }
                error={formError.confirmPassword}
                onBlur={() => validateSecondForm('username')}
              />
            </>
          )}

          <div className="mt-5 flex justify-between">
            {formNumber === 2 && (
              <Button
                text="Previous"
                type="button"
                onClick={() => changeForm(1)}
                isLoading={loading}
                disabled={loading}
              />
            )}
            <Button
              text={formNumber === 1 ? 'Next' : 'Register'}
              type={formNumber === 1 ? 'button' : 'submit'}
              onClick={() => formNumber === 1 && changeForm(2)}
              isLoading={loading}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
