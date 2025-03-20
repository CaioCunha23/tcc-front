import { useState, FormEvent, useRef } from 'react';
import { CiLock } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const inputLgnRef = useRef<HTMLInputElement | null>(null);
    const inputPswdRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (evento: FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        if (!email) {
            setEmailError('*Email deve ser preenchido!');
            inputLgnRef.current?.focus();
            return
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('*Senha deve ser preenchida!');
            inputPswdRef.current?.focus();
            return
        } else {
            setPasswordError('');
        }

        navigate('/home');
    };

    return (
        <div className='flex flex-col items-start gap-[1rem] bg-white text-black w-[24em] p-[1em_2em_1em_2em]' >
            <label className='text-[2em]'>Login</label>
            <form className='flex flex-col gap-2 w-[100%]' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-[1.5em] w-[100%]'>
                    <div className='flex gap-2 items-center'>
                        <FaRegCircleUser />
                        <input
                            ref={inputLgnRef}
                            type='text'
                            placeholder='E-mail'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='bg-transparent border-transparent text-black'
                        />
                    </div>
                    {emailError && <p className='text-red-500 text-xs'>{emailError}</p>}

                    <div className='flex gap-2 items-center'>
                        <CiLock />
                        <input
                            ref={inputPswdRef}
                            type='password'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='bg-transparent border-transparent text-black'
                        />
                    </div>
                    {passwordError && <p className='text-red-500 text-xs'>{passwordError}</p>}

                    <button className='w-[5em] h-[3em] rounded-md text-white bg-[#00031f] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#1a1d50] hover:shadow-lg hover:scale-105'
                        type='submit'>Log in</button>
                </div>
            </form>
            <label className='text-[1em]'>Need Help with your username or password?</label>
        </div>
    );
}