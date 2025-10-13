import { Link } from "react-router-dom";
import { ArrowRight, Heart, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-wedding.jpg";
import marriageImage from "@/assets/service-marriage.jpg";
import concertImage from "@/assets/service-concert.jpg";
import navratriImage from "@/assets/service-navratri.jpg";
import inaugurationImage from "@/assets/service-inauguration.jpg";
import galleryWedding1 from "@/assets/gallery-wedding-1.jpg";
import galleryWedding2 from "@/assets/gallery-wedding-2.jpg";
import galleryWedding3 from "@/assets/gallery-wedding-3.jpg";
import galleryConcert1 from "@/assets/gallery-concert-1.jpg";
import galleryConcert2 from "@/assets/gallery-concert-2.jpg";
import galleryNavratri1 from "@/assets/gallery-navratri-1.jpg";
import galleryNavratri2 from "@/assets/gallery-navratri-2.jpg";
import galleryInauguration1 from "@/assets/gallery-inauguration-1.jpg";
import galleryInauguration2 from "@/assets/gallery-inauguration-2.jpg";

const Home = () => {
  const services = [
    {
      title: "Marriage",
      description: "Complete wedding planning from Full Wedding to Only Wedding ceremonies. We make your special day unforgettable.",
      image: marriageImage,
      link: "/services#marriage",
    },
    {
      title: "Concert",
      description: "Professional concert management with state-of-the-art sound, lighting, and stage production.",
      image: concertImage,
      link: "/services#concert",
    },
    {
      title: "Navratri",
      description: "Traditional Navratri celebrations with authentic cultural programs and festive decorations.",
      image: navratriImage,
      link: "/services#navratri",
    },
    {
      title: "Inauguration",
      description: "Corporate event management for grand inaugurations and business launches.",
      image: inaugurationImage,
      link: "/services#inauguration",
    },
  ];

  const testimonials = [
    {
      name: "Priya & Rahul",
      event: "Wedding",
      rating: 5,
      text: "HandM made our wedding day absolutely magical. Every detail was perfect, and we couldn't have asked for better event management!",
    },
    {
      name: "Amit Sharma",
      event: "Corporate Event",
      rating: 5,
      text: "Professional, punctual, and exceptional service. Our product launch was a huge success thanks to HandM's expertise.",
    },
    {
      name: "Meera Patel",
      event: "Navratri Celebration",
      rating: 5,
      text: "The Navratri event organized by HandM was spectacular. The cultural authenticity and attention to detail were impressive!",
    },
  ];

  const galleryImages = [
    { src: galleryWedding1, alt: "Traditional Indian Wedding Ceremony", category: "Wedding" },
    { src: galleryConcert1, alt: "Live Concert Performance", category: "Concert" },
    { src: galleryNavratri1, alt: "Navratri Garba Celebration", category: "Navratri" },
    { src: galleryInauguration1, alt: "Corporate Inauguration Ceremony", category: "Inauguration" },
    { src: galleryWedding2, alt: "Wedding Sangeet Dance", category: "Wedding" },
    { src: galleryConcert2, alt: "Concert Stage Lighting", category: "Concert" },
    { src: galleryNavratri2, alt: "Navratri Traditional Stage", category: "Navratri" },
    { src: galleryInauguration2, alt: "Grand Inauguration Event", category: "Inauguration" },
    { src: galleryWedding3, alt: "Wedding Mehndi Ceremony", category: "Wedding" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-secondary-foreground">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Turning Your Moments into
            <span className="block text-primary" style={{ textShadow: "3px 3px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)" }}>
              Lifetime Memories
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-secondary-foreground" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            Professional event management for weddings, concerts, Navratri celebrations, and corporate events across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-gold text-foreground hover:opacity-90 smooth-transition text-lg">
              <Link to="/contact">
                Plan Your Event <ArrowRight className="ml-2" size={20} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary smooth-transition text-lg" style={{ backdropFilter: "blur(2px)" }}>
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-gold bg-clip-text text-transparent">HandM</span>?
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Founded with love and passion, HandM specializes in celebrating every emotion. We bring decades of combined experience in creating unforgettable moments across India.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mb-4">
                  <Heart className="text-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Passion-Driven</h3>
                <p className="text-muted-foreground">
                  Every event is crafted with love and attention to detail
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mb-4">
                  <Users className="text-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Team</h3>
                <p className="text-muted-foreground">
                  Experienced professionals dedicated to your success
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mb-4">
                  <Star className="text-foreground" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">500+ Events</h3>
                <p className="text-muted-foreground">
                  Successfully managed celebrations across the nation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From intimate ceremonies to grand celebrations, we manage every aspect with precision and care
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl smooth-transition">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent"></div>
                  <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-secondary-foreground">
                    {service.title}
                  </h3>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button asChild variant="link" className="p-0 h-auto text-primary">
                    <Link to={service.link}>
                      Learn More <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="gradient-gold text-foreground">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-lg text-muted-foreground">
              Real stories from real celebrations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="fill-primary text-primary" size={20} />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.event}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Event Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses of magical moments we've created across India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-video hover:shadow-2xl smooth-transition"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end justify-center p-6">
                  <div className="text-secondary-foreground text-center">
                    <p className="text-lg font-bold">{image.category}</p>
                    <p className="text-sm opacity-90">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-maroon text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Create Memories?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss your event and make it extraordinary together
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg">
            <Link to="/contact">Get In Touch Today</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
