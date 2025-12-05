import { HammerIcon, WavesIcon, BrickWallIcon, WavesLadderIcon } from "lucide-react"

const services = [
  {
    title: "Remodels",
    description:
      "We offer complete remodeling services for your pool, including resurfacing, tile replacement, and deck renovation to give your pool a fresh new look.",
    icon: <HammerIcon className="h-6 w-6" />,
    variant: "default",
  },
  {
    title: "Waterfall and Pool Patios",
    description:
      "Enhance the beauty of your pool area with our custom waterfall installations and stylish pool patios, designed to create a relaxing oasis in your backyard.",
    icon: <WavesIcon className="h-6 w-6" />,
    variant: "default",
  },
  {
    title: "Pool Finishing",
    description:
      "Choose from a variety of pool finishing options, including plaster, pebble, and tile finishes, to enhance the durability and aesthetics of your pool.",
    icon: <WavesLadderIcon className="h-6 w-6" />,
    variant: "default",
  },
  {
    title: "Residential and Commercial Swimming Pools",
    description:
      "We specialize in designing and constructing both residential and commercial swimming pools, tailored to meet your specific needs and preferences.",
    icon: (
      <img
        alt="Trebol small"
        src="/trebol_logo.png"
        className="h-7 w-auto"
      />
    ),
    variant: "brand",
  },
  {
    title: "Tile and Coping",
    description:
      "We provide expert tile and coping installation services to give your pool a polished and elegant look, while also ensuring long-lasting durability.",
    icon: <BrickWallIcon className="h-6 w-6" />,
    variant: "default",
  },
]

export const ServicesSecion = () => {
  return (
    <section className="relative bg-liner-to-br from-[#f6f9ff] via-[#f6f9ff] to-[#eef3ff] py-16 sm:py-20">
      {/* blobs de fondo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-12 top-10 h-48 w-48 rounded-full bg-blue-200/40 blur-3xl sm:h-64 sm:w-64" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,1.7fr)] lg:items-start">
          {/* Columna izquierda: título + grid de tarjetas */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
              What We do
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 3 tarjetas superiores */}
              {services.slice(0, 3).map(({ title, description, icon }) => (
                <div
                  key={title}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(46,87,157,0.07)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sky-600">
                    {icon}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </div>
              ))}

              {/* Tarjeta ancha “brand” (2 columnas) */}
              <div className="md:col-span-2 lg:col-span-2 flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(46,87,157,0.07)]">
                <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
                  {/* texto */}
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      {services[3].icon}
                    </div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {services[3].title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {services[3].description}
                    </p>
                  </div>
                  {/* cuadro verde con trébol grande */}
                  <div className="flex justify-center md:justify-end">
                    <div className="aspect-square w-full max-w-[210px] rounded-2xl bg-emerald-600 flex items-center justify-center">
                      <img
                        src="/trebol_logo.png"
                        alt="Trebol logo"
                        className="h-24 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Tarjeta “Tile and Coping” (abajo derecha) */}
              <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_30px_rgba(46,87,157,0.07)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-sky-600">
                  {services[4].icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-900">
                  {services[4].title}
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {services[4].description}
                </p>
              </div>
            </div>
          </div>

          {/* Columna derecha: foto alta */}
          <div className="flex h-full justify-center lg:justify-end">
            <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_18px_45px_rgba(46,87,157,0.18)]">
              <img
                alt="Pool services"
                src="/PoolServicesSection.jpg"
                className="h-full w-full max-w-sm object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
