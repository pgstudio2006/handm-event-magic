import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import marriageImage from "@/assets/service-marriage.jpg";
import concertImage from "@/assets/service-concert.jpg";
import navratriImage from "@/assets/service-navratri.jpg";
import inaugurationImage from "@/assets/service-inauguration.jpg";

const Services = () => {
  const services = [
    {
      id: "marriage",
      title: "Marriage Events",
      subtitle: "Comprehensive Wedding Solutions",
      description: "From intimate ceremonies to grand celebrations, we handle every aspect of your special day with meticulous care and cultural sensitivity.",
      image: marriageImage,
      categories: [
        {
          name: "Full Wedding",
          features: [
            "Complete venue decoration and setup",
            "Catering and menu planning",
            "Photography and videography",
            "Guest accommodation coordination",
            "Entertainment and DJ services",
            "Wedding planning and coordination",
            "Mehendi, Sangeet, and all ceremonies",
          ],
        },
        {
          name: "Only Wedding",
          features: [
            "Main ceremony coordination",
            "Mandap decoration",
            "Traditional ritual setup",
            "Priest coordination",
            "Photography for main ceremony",
            "Guest seating arrangements",
          ],
        },
      ],
    },
    {
      id: "concert",
      title: "Concert Management",
      subtitle: "Professional Music Event Production",
      description: "State-of-the-art concert management services for unforgettable musical experiences, from intimate performances to large-scale festivals.",
      image: concertImage,
      features: [
        "Stage design and construction",
        "Professional sound systems",
        "Advanced lighting setup",
        "Artist coordination and management",
        "Ticketing and crowd control",
        "Security arrangements",
        "Backstage management",
        "Audio-visual production",
      ],
    },
    {
      id: "navratri",
      title: "Navratri Celebrations",
      subtitle: "Traditional Festival Events",
      description: "Authentic Navratri celebrations with traditional Garba and Dandiya arrangements, bringing cultural richness to your festivities.",
      image: navratriImage,
      features: [
        "Traditional venue decoration",
        "Professional Garba instructors",
        "Live music and DJ services",
        "Traditional food stalls",
        "Costume coordination",
        "Stage performances",
        "Lighting and sound systems",
        "Security and crowd management",
      ],
    },
    {
      id: "inauguration",
      title: "Corporate Inaugurations",
      subtitle: "Professional Business Events",
      description: "Elegant corporate event management for grand openings, product launches, and business inaugurations that leave a lasting impression.",
      image: inaugurationImage,
      features: [
        "Professional venue setup",
        "Corporate branding and signage",
        "VIP guest management",
        "Media coordination",
        "Catering services",
        "Audio-visual presentations",
        "Photography and documentation",
        "Post-event reporting",
      ],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-gold bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive event management solutions tailored to your unique needs. Every celebration deserves perfection.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? "bg-background" : "bg-muted"}`}
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
                />
              </div>

              <div className={index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {service.title}
                </h2>
                <p className="text-xl text-primary mb-4">{service.subtitle}</p>
                <p className="text-lg text-muted-foreground mb-8">
                  {service.description}
                </p>

                {service.categories ? (
                  <div className="space-y-6">
                    {service.categories.map((category, catIndex) => (
                      <Card key={catIndex}>
                        <CardContent className="p-6">
                          <h3 className="text-2xl font-bold mb-4">{category.name}</h3>
                          <ul className="space-y-2">
                            {category.features.map((feature, featIndex) => (
                              <li key={featIndex} className="flex items-start gap-2">
                                <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-4">What We Offer</h3>
                      <ul className="space-y-2">
                        {service.features?.map((feature, featIndex) => (
                          <li key={featIndex} className="flex items-start gap-2">
                            <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <div className="mt-8">
                  <Button asChild size="lg" className="gradient-gold text-foreground">
                    <Link to="/contact">Book This Service</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-20 gradient-maroon text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's Plan Your Perfect Event
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to discuss your requirements and get a customized quote
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg">
            <Link to="/contact">Start Planning Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
