import { useState } from 'react'
import ApologyCard from './components/ApologyCard'
import './App.css'

function App() {
  const [currentCard, setCurrentCard] = useState(0)
  const [userChoice, setUserChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)

  const cards = [
    {
      id: 1,
      title: "Жаным, мне очень жаль 💔",
      message: "Я сделал что-то, что тебя обидело.",
      image: "🌹",
      photo: null,
      color: "from-red-400 to-pink-300"
    },
    {
      id: 2,
      title: "Ты для меня много значишь",
      message: "Поэтому твое плохое настроение во мне — это самое сложное, что я переживаю.",
      image: "💝",
      photo: null,
      color: "from-yellow-400 to-orange-300"
    },
    {
      id: 3,
      title: "Я буду лучше",
      message: "Обещаю слушать тебя, понимать и ценить тебя так, как ты того заслуживаешь.",
      image: "💪",
      photo: null,
      color: "from-indigo-400 to-blue-300"
    },
    {
      id: 4,
      title: "такая принцесса не может ходить с таким настроением",
      message: "Дай мне шанс все исправить...",
      image: null,
      photo: "/image1.jpg",
      color: "from-pink-400 to-rose-300"
    },
    {
      id: 5,
      title: "Этот взгляд меня ранил прямо в сердце",
      message: "и я хочу видеть его каждый день!",
      image: null,
      photo: "/image2.jpg",
      color: "from-purple-400 to-pink-300"
    },
    {
      id: 6,
      title: "А эта улыбка греет мою душу по ночам! ☀️",
      message: "Ты моя самая красивая улыбка...",
      image: null,
      photo: "/image3.jpg",
      color: "from-blue-400 to-cyan-300"
    },
    {
      id: 7,
      title: "Я люблю тебя! ❤️",
      message: "Всем сердцем, всей душой, всей сутью...",
      image: null,
      photo: "/image4.jpg",
      color: "from-red-500 to-pink-400"
    },
    {
      id: 8,
      title: "Я хочу все исправить",
      message: "Поэтому пожалуйста, сделай свой выбор... 🥺",
      image: null,
      photos: ["/image5.jpg", "/image6.jpg"],
      isChoice: true,
      choice1: {
        text: "Вариант 1",
        photo: "/image5.jpg"
      },
      choice2: {
        text: "Вариант 2",
        photo: "/image6.jpg"
      },
      color: "from-rose-400 to-orange-300"
    }
  ]

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${cards[currentCard].color} transition-all duration-700 flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Cards Stack */}
        <div className="relative h-96 mb-8">
          {cards.map((card, index) => (
            <ApologyCard
              key={card.id}
              card={card}
              isActive={index === currentCard}
              position={index - currentCard}
              onCardClick={() => {
                if (index > currentCard) nextCard()
                else if (index < currentCard) prevCard()
              }}
              onChoice={(choice) => {
                setUserChoice(choice)
                setShowResult(true)
              }}
              showResult={showResult && index === currentCard}
              userChoice={userChoice}
            />
          ))}
        </div>

        {/* Navigation and Controls */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevCard}
            className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:scale-110"
          >
            ❮
          </button>

          <div className="flex gap-2">
            {cards.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentCard ? 'bg-white w-8' : 'bg-white bg-opacity-40 w-2'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all transform hover:scale-110"
          >
            ❯
          </button>
        </div>

        {/* Counter */}
        <div className="text-center mb-6">
          <p className="text-white text-sm font-semibold opacity-90">
            {currentCard + 1} из {cards.length}
          </p>
        </div>

        {/* Result Message */}
        {showResult && userChoice && (
          <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg border-2 border-white animate-fadeIn">
            <p className="text-white text-center font-bold text-lg">
              Будет сделано Жаным🤍
            </p>
          </div>
        )}
      </div>

      {/* Floating Hearts */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-floatHeart"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 2 + 's',
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
