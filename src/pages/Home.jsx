import { Navbar, HeroSection, AboutSection, ContactSection, Footer, FaqSection, ServicesSecion, ProjectsSection, DeviceFeatures } from "../components"

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection/>
        <ServicesSecion/>
        <ProjectsSection/>
        <DeviceFeatures />
        {/* <AboutSection/> */}
        <ContactSection/>
        <FaqSection/>
      </main>

      <Footer />
    </div>
  )
}
