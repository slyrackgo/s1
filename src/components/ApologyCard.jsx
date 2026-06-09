import { useState } from 'react'

const ApologyCard = ({ card, isActive, position, onCardClick, onChoice, showResult, userChoice }) => {
  const [isHovered, setIsHovered] = useState(false)

  const getTransform = () => {
    if (position > 0) {
      return `translateX(${position * 20}px) scale(${1 - position * 0.05}) rotateY(${position * 5}deg)`
    }
    return 'translateX(0) scale(1) rotateY(0)'
  }

  const getOpacity = () => {
    if (Math.abs(position) > 2) return 0
    if (position !== 0) return 0.5
    return 1
  }

  // Карточка с выбором (последняя)
  if (card.isChoice) {
    return (
      <div
        className={`absolute w-full transition-all duration-500 cursor-default`}
        style={{
          transform: getTransform(),
          opacity: getOpacity(),
          zIndex: 100 - Math.abs(position),
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        <div className="relative h-80 rounded-2xl shadow-2xl overflow-hidden">
          {/* Two Photos Side by Side */}
          <div className="absolute inset-0 flex gap-2 p-2">
            {/* Left Photo */}
            <div
              className="flex-1 rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url('${card.choice1.photo}')`,
              }}
            />
            {/* Right Photo */}
            <div
              className="flex-1 rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url('${card.choice2.photo}')`,
              }}
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

          {/* Content at Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-2xl font-bold text-center mb-2 animate-fadeIn">
              {card.title}
            </h2>
            <p className="text-center text-sm mb-4 opacity-90 animate-slideInRight">
              {card.message}
            </p>

            {/* Choice Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onChoice(1)
                }}
                className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  userChoice === 1
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-white bg-opacity-30 text-white border-2 border-white hover:bg-opacity-50'
                }`}
              >
                ← Вариант 1
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onChoice(2)
                }}
                className={`flex-1 py-3 rounded-lg font-bold transition-all transform hover:scale-105 ${
                  userChoice === 2
                    ? 'bg-green-500 text-white scale-105'
                    : 'bg-white bg-opacity-30 text-white border-2 border-white hover:bg-opacity-50'
                }`}
              >
                Вариант 2 →
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Обычные карточки с одной фотографией
  return (
    <div
      className={`absolute w-full transition-all duration-500 cursor-pointer`}
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        zIndex: 100 - Math.abs(position),
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      onClick={onCardClick}
      onMouseEnter={() => isActive && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative h-80 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isHovered ? 'shadow-3xl scale-105' : ''
        }`}
      >
        {/* Background */}
        {!card.photo && (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.color}`}
          />
        )}

        {/* Photo Full Size */}
        {card.photo && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${card.photo}')`,
            }}
          />
        )}

        {/* Dark Overlay for text visibility */}
        {card.photo && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50" />
        )}

        {/* Content at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          {/* Emoji (only if no photo) */}
          {!card.photo && (
            <div
              className={`text-6xl mb-4 transition-all duration-300 ${
                isHovered ? 'animate-heartBeat' : ''
              }`}
            >
              {card.image}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-center mb-2 animate-fadeIn">
            {card.title}
          </h2>

          {/* Message */}
          <p className="text-center text-sm leading-relaxed opacity-95 animate-slideInRight">
            {card.message}
          </p>
        </div>

        {/* Decorative Elements (only if no photo) */}
        {!card.photo && (
          <>
            <div className="absolute top-4 right-4 text-2xl opacity-30">💕</div>
            <div className="absolute bottom-4 left-4 text-2xl opacity-30">💕</div>
          </>
        )}

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300" />
      </div>

      {/* Card Number Indicator */}
      {isActive && !card.isChoice && (
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold opacity-70">
          Нажми для следующей →
        </div>
      )}
    </div>
  )
}

export default ApologyCard
