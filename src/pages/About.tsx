import { Heart, Award, Users, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import aboutImage from "@/assets/about-collage.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We pour our hearts into every event, treating each celebration as if it were our own.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Uncompromising quality in every detail, from planning to execution.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working closely with clients to bring their vision to life perfectly.",
    },
    {
      icon: Target,
      title: "Precision",
      description: "Meticulous planning and flawless execution for stress-free events.",
    },
  ];

  const stats = [
    { number: "500+", label: "Events Managed" },
    { number: "10+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Team Members" },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="gradient-gold bg-clip-text text-transparent">HandM</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Founded with love and passion to celebrate every emotion
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  HandM was born from a simple belief: every celebration deserves to be extraordinary. What started as a passion project over a decade ago has blossomed into one of India's most trusted event management companies.
                </p>
                <p>
                  Our journey began with a single wedding in Mumbai, where we discovered our calling - to transform dreams into reality and create memories that last forever. Today, we've had the privilege of managing over 500 events across India, from intimate family gatherings to grand corporate celebrations.
                </p>
                <p>
                  What sets us apart is our unwavering commitment to understanding our clients' vision and exceeding their expectations. Every event is unique, and we treat it as such, bringing fresh creativity, meticulous planning, and flawless execution to each celebration.
                </p>
                <p className="font-semibold text-foreground">
                  At HandM, we don't just manage events - we craft experiences that touch hearts and create lasting memories.
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src={aboutImage}
                alt="HandM Team at Work"
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl smooth-transition">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                    <value.icon className="text-foreground" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-maroon text-secondary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8">
              To be India's most trusted event management partner, creating unforgettable experiences that celebrate life's most precious moments. We strive to blend tradition with innovation, bringing professionalism, creativity, and heartfelt service to every celebration.
            </p>
            <p className="text-lg text-muted-foreground">
              Whether it's a wedding that marks the beginning of a new journey, a concert that brings joy to thousands, a Navratri celebration that honors tradition, or a corporate event that showcases excellence - we're here to make it perfect.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
