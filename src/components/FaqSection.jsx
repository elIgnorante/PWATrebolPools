import Questions from "./ui/Question"
import { useState } from "react";

export const FaqSection = () => {

  const data = [
    {
      id: 1,
      question: "How long does the plastering process take?",
      answer: "The plastering process depends on the size of the pool and any extra features it has. Also, weather conditions must always be taken into consideration. An average pool can be plastered in one day and washed the following day.",
    },
    {
      id: 2,
      question: "How long does the remodeling process take?",
      answer: "The remodeling process can vary greatly depending on the extent of the work being done. A simple resurfacing job may take a few days, while a complete remodel could take several weeks.",
    },
    {
      id: 3,
      question: "How durable is the plaster?",
      answer: "When properly maintained, pool plaster can last anywhere from 7 to 15 years. Factors such as water chemistry, usage, and environmental conditions can affect its longevity.",
    },
    {
      id: 4,
      question: "What type of finish is mostly recommended?",
      answer: "The most commonly recommended finish for pool plaster is a smooth finish, as it provides a comfortable surface for swimmers and is easy to clean. However, other finishes such as pebble or quartz can also be used for added texture and durability.",
    },
    {
      id: 5,
      question: "Does the color of the plaster affect the water temperature?",
      answer: "Yes, darker colors tend to absorb more heat from the sun, which can increase the water temperature. Lighter colors reflect more sunlight and can help keep the water cooler.",
    }
  ]

  const [showSlectdQ, setShowSelectdQ] = useState(null);
  const showAnswer = (index) => {
    setShowSelectdQ(index === showSlectdQ ? null : index);
  };

  return (
    <div className="mb-6 relative bg-linear-to-br from-[#f6f9ff] via-[#f6f9ff] to-[#eef3ff] py-16 sm:py-20 ">
      {/* blobs de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-10 h-48 w-48 rounded-full bg-blue-200/40 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="h-screen p-40 text-gray-900 ">
      
      <div className="space-y-12 ">
        <h1 className="text-5xl font-bold">Frequently Asked Questions</h1>
        <div>
          {data.map((d, index) => {
            return (
              <Questions
                key={d.id}
                data={d}
                onClick={() => showAnswer(index)}
                isOpen={showSlectdQ === index}
              />
            )
          })}
        </div>
      </div>
    </div>
    </div>
    
  )
}
