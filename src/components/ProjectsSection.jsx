import { useEffect, useMemo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    imagePool: "/pool1.jpg",
    title: "Lakeview Retreat",
    location: "Austin, TX",
  },
  {
    id: 2,
    imagePool: "/pool2.jpg",
    title: "Infinity Escape",
    location: "Dallas, TX",
  },
  {
    id: 3,
    imagePool: "/pool3.jpg",
    title: "Garden Oasis",
    location: "San Antonio, TX",
  },
  {
    id: 4,
    imagePool: "/pool1.jpg",
    title: "Resort Style Pool",
    location: "Lakeway, TX",
  },
]

export const ProjectsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    updateSlidesPerView()
    window.addEventListener("resize", updateSlidesPerView)

    return () => window.removeEventListener("resize", updateSlidesPerView)
  }, [])

  const translateValue = useMemo(
    () => `translateX(-${(currentIndex * 100) / slidesPerView}%)`,
    [currentIndex, slidesPerView]
  )

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(projects.length - slidesPerView, 0) : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= projects.length - slidesPerView ? 0 : prev + 1
    )
  }

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#F5F8FF] px-4 py-16 sm:px-8 md:py-20"
    >
      {/* Imagen de fondo eliminada */}

      <div className="relative mx-auto max-w-6xl text-center">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#3D9034]">
            Our Projects
          </p>
          {/* TÍTULO MÁS GRANDE */}
          <h1 className="text-5xl font-bold text-[#101828] sm:text-5xl">Check our Work</h1>
          <p className="text-base text-[#475467] sm:text-lg">
            Take a look at some of our favorite builds crafted for Texas
            backyards.
          </p>
        </div>

        <div className="relative">
          {/* FLECHAS CENTRADAS Y CON NUEVOS COLORES */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-11 w-11 items-center justify-center rounded-full  text-white shadow-md transition hover:-translate-y-px hover:bg-[#2F6F28]"
              aria-label="Previous project"
            >
              {'<'}
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md transition hover:-translate-y-px hover:bg-[#2F6F28]"
              aria-label="Next project"
            >
              {'>'}
            </button>
          </div>

          <div className="mt-8 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: translateValue }}
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="shrink-0 basis-full px-3 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group h-full overflow-hidden rounded-3xl border border-[#E4E7EC] bg-white shadow-[0_20px_60px_-40px_rgba(16,24,40,0.45)] transition hover:-translate-y-1">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.imagePool}
                        alt={project.title}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-start justify-between px-5 py-4">
                      <div className="text-left">
                        <p className="text-sm uppercase tracking-[0.18em] text-[#3D9034]">
                          Residential pool
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-[#101828]">
                          {project.title}
                        </h3>
                        <p className="text-sm text-[#475467]">
                          {project.location}
                        </p>
                      </div>
                      <div className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF4EA] text-[#3D9034]">
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
