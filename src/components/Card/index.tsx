import React, { useState } from 'react';
import { Star, X, Edit, PaintBucket, Check } from 'lucide-react';
import { Task } from '../../types/Task';

interface CardProps {
  task: Task;
  onFavoriteToggle: (updatedTask: Task) => void;
  onDelete: (taskId: string) => void;
}

const Card: React.FC<CardProps> = ({ task, onFavoriteToggle, onDelete }) => {
  const [isStarred, setIsStarred] = useState(task.is_favorite);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [cardColor, setCardColor] = useState(task.background_color);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');

  const colorOptions = [
    { color: 'bg-[#BAE2FF]' },
    { color: 'bg-[#B9FFDD]' },
    { color: 'bg-[#FFE8AC]' },
    { color: 'bg-[#FFCAB9]' },
    { color: 'bg-[#F99494]' },
    { color: 'bg-[#9DD6FF]' },
    { color: 'bg-[#ECA1FF]' },
    { color: 'bg-[#DAFF8B]' },
    { color: 'bg-[#FFA285]' },
    { color: 'bg-[#CDCDCD]' },
    { color: 'bg-[#979797]' },
    { color: 'bg-[#A99A7C]' }
  ];

  const handleDelete = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: { success: boolean } = await response.json();
    if (data.success) {
      onDelete(task.id);
    }
  }

  const handleFavorite = async () => {
    const updatedTask = { ...task, is_favorite: !isStarred };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        is_favorite: !isStarred,
      }),
    });
    const result = await response.json();
    if (result.success) {
      setIsStarred(!isStarred);
      onFavoriteToggle(updatedTask);
    }
  };

  const toggleColorPalette = () => {
    setShowColorPalette(!showColorPalette);
  };

  const changeCardColor = async (bgClass: string): Promise<void> => {
    setCardColor(bgClass);
    setShowColorPalette(false);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        background_color: bgClass,
      }),
    });
    const data: { success: boolean, data: Task } = await response.json();
    if (data.success) {
      onFavoriteToggle(data.data);
    } else {
      setCardColor(task.background_color);
    }
  };

  const toggleEditMode = () => {
    if (isEditing) {
      setEditedTitle(task.title);
      setEditedDescription(task.description || '');
    }
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    if (editedTitle.trim() === '') return;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription
      }),
    });

    const data: { success: boolean } = await response.json();
    if (data.success) {
      setIsEditing(false);
    } else {
      setEditedTitle(task.title);
      setEditedDescription(task.description || '');
    }
  };


  return (
    <div className="flex w-full items-center relative justify-center">
      <div className={`relative max-w-4/5 lg:max-w-16/18 w-full min-h-[420px] max-h-[520px] flex flex-col ${cardColor} rounded-4xl shadow-md transition-all duration-300 transform hover:drop-shadow-2xl`}>
        <div className="flex justify-between items-center py-4 px-6 border-b-2 border-[#D9D9D9]">
          {isEditing ? (
            <div className="flex items-center w-full">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="bg-white bg-opacity-70 px-2 py-1 rounded text-lg font-medium text-[#4F4F4D] w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                autoFocus
                placeholder="Título da anotação"
              />
              <button
                onClick={saveChanges}
                className="focus:outline-none p-1 rounded-full hover:bg-green-100 transition-all duration-200"
              >
                <Check size={20} className="text-green-500" />
              </button>
            </div>
          ) : (
            <h2 className="text-lg font-medium text-[#4F4F4D]">{editedTitle}</h2>
          )}
          {!isEditing && (
            <button
              onClick={handleFavorite}
              className="focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <Star
                size={20}
                className={`transition-colors hover:text-yellow-400 duration-300 ${isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
              />
            </button>
          )}
        </div>

        <div className="flex-grow overflow-auto p-6">
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full h-full bg-white bg-opacity-70 p-3 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              placeholder="Adicione uma descrição para sua anotação..."
            />
          ) : (
            <div className="h-full">
              {editedDescription ? (
                <p className="text-gray-700 whitespace-pre-wrap">{editedDescription}</p>
              ) : (
                <p className="text-gray-400 italic">Sem descrição</p>
              )}
            </div>
          )}
        </div>

        <div className="p-2 border-t border-[#D9D9D9]">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                className={`p-1 cursor-pointer rounded-full transition-all duration-200 ${isEditing ? 'bg-blue-200 text-blue-600' : 'hover:bg-gray-200 text-gray-500'}`}
                onClick={toggleEditMode}
              >
                <Edit size={18} />
              </button>
              <div className="relative">
                <button
                  className={`p-1 cursor-pointer rounded-full hover:bg-gray-200 ${showColorPalette ? 'bg-orange-200' : ''} transition-all duration-200`}
                  onClick={toggleColorPalette}
                >
                  <PaintBucket size={18} className={`${showColorPalette ? 'text-orange-500' : 'text-gray-500'}`} />
                </button>

                {showColorPalette && (
                  <div className="grid grid-cols-6 z-100 gap-2 lg:flex lg:flex-row bottom-12 items-center justify-center fixed mt-2 lg:left-4 bg-white rounded-sm p-2 shadow-lg z-50 transition-all duration-300 ease-in-out animate-fadeIn">
                    {colorOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => changeCardColor(option.color)}
                        className={`w-8 h-8 rounded-full ${option.color} transition-transform duration-200 hover:scale-110 focus:outline-none`}
                        aria-label={`Select color ${index}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-gray-200 transition-all duration-200"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;