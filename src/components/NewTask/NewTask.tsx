import React, { useState } from 'react';
import { Task } from '../../types/Task';

interface CreateTask {
    onTaskCreated: (task: Task) => void;
}

const NewTask: React.FC<CreateTask> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [textButton, setTextButton] = useState<string>('Criar tarefa');
    const [backgroundColor, setBackgroundColor] = useState<string>('bg-blue-500');
    const [isCreated, setIsCreated] = useState<boolean>(false);



    const handleSubmit = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                isFavorite: isFavorite,
            }),
        });
        const data = await response.json();
        if (data.success) {
            setIsCreated(true);
            setBackgroundColor('bg-green-500');
            setTextButton('Tarefa criada');
            onTaskCreated(data.data);
            setTimeout(() => {
                setIsCreated(false);
                setTitle('');
                setDescription('');
                setIsFavorite(false);
                setBackgroundColor('bg-blue-500');
                setTextButton('Criar tarefa');
            }, 1500);
        } else {
            setIsCreated(true);
            setBackgroundColor('bg-red-500');
            setTextButton('Erro ao criar tarefa');
            setTimeout(() => {
                setIsCreated(false);
                setBackgroundColor('bg-blue-500');
                setTextButton('Criar tarefa');
            }, 5000);
        }
    }

    const handleInputFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (title && (e.key === 'Enter' || e.key === 'Tab')) {
            document.getElementById('input_description')?.focus();
        }
    }

    const handleDescriptionFocus = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((title && description) && e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <div className="w-full max-w-4/5 lg:max-w-3/8 mx-14 rounded-3xl md:rounded-md lg:rounded-md border border-gray-200 rounded drop-shadow-lg bg-white">
            <div className="flex items-center font-bold justify-between py-4 px-6 border-b border-gray-200">
                <input
                    id='input_title'
                    name='title'
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full outline-none placeholder-gray"
                    onKeyDown={handleInputFocus}
                />
                <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="ml-2 text-gray-400 hover:text-yellow-400 transition-transform duration-300 hover:scale-110 cursor-pointer focus:outline-none"
                >
                    {isFavorite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="p-2 px-6">
                <input
                    autoComplete='off'
                    id='input_description'
                    name='description'
                    type="text"
                    value={description}
                    placeholder="Criar nota..."
                    className="w-full outline-none text-gray-600 placeholder-gray-400 text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={handleDescriptionFocus}
                />
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out transform ${title && description ? 'max-h-20 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}
            >
                <div className="flex justify-end p-2">
                    <button
                        onClick={handleSubmit}
                        className={`flex items-center gap-2 p-2 rounded-md text-white ${backgroundColor} ${isCreated ? '' : 'cursor-pointer hover:bg-blue-600 transition transform hover:scale-105 duration-200'}`}
                    >
                        {isCreated && <img
                            src="/img/check.svg"
                            alt="Check"
                            className="w-5 h-5 green filter invert"
                        />}
                        {textButton}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewTask;