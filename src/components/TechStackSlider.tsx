
import { useEffect, useRef } from "react";

const techLogos = [
  { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
  { name: "Angular", logo: "https://angular.io/assets/images/logos/angular/angular.svg" },
  { name: "Vue.js", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" },
  { name: "Node.js", logo: "https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" },
  { name: "Python", logo: "https://www.python.org/static/community_logos/python-logo-generic.svg" },
  { name: "Django", logo: "https://static.djangoproject.com/img/logos/django-logo-negative.svg" },
  { name: "Express", logo: "https://expressjs.com/images/express-facebook-share.png" },
  { name: "MongoDB", logo: "https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" },
  { name: "MySQL", logo: "https://www.mysql.com/common/logos/logo-mysql-170x115.png" },
  { name: "PostgreSQL", logo: "https://www.postgresql.org/media/img/about/press/elephant.png" },
  { name: "Spring Boot", logo: "https://spring.io/img/spring-2.svg" },
  { name: "Laravel", logo: "https://laravel.com/img/logomark.min.svg" },
  { name: "MERN Stack", logo: "https://miro.medium.com/max/678/1*l2tlJsFNg2tH6QizegKkqA.png" },
  { name: "MEAN Stack", logo: "https://ms.spr.io/wp-content/uploads/2017/07/MEAN-Stack-Logo-1200x678.jpg" },
  { name: "Docker", logo: "https://www.docker.com/sites/default/files/d8/2019-07/Moby-logo.png" },
  { name: "Kubernetes", logo: "https://kubernetes.io/images/favicon.png" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png" },
  { name: "Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Microsoft_Azure_Logo.svg/1200px-Microsoft_Azure_Logo.svg.png" },
];

export function TechStackSlider() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!scrollerRef.current) return;
    
    const scrollerContent = Array.from(scrollerRef.current.children);
    
    // Duplicate the logos to ensure continuous scrolling
    scrollerContent.forEach(item => {
      const duplicatedItem = item.cloneNode(true);
      scrollerRef.current?.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-center">Technologies We Work With</h2>
        
        <div className="relative w-full overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-background to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-background to-transparent z-10"></div>
          
          <div className="w-full overflow-hidden">
            <div 
              ref={scrollerRef}
              className="flex animate-slide-left py-4"
              style={{ width: 'fit-content' }}
            >
              {techLogos.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center mx-8"
                >
                  <div className="bg-background rounded-lg p-2 h-16 w-16 flex items-center justify-center shadow-sm">
                    <img 
                      src={tech.logo} 
                      alt={tech.name} 
                      className="max-h-12 max-w-12"
                    />
                  </div>
                  <span className="text-sm mt-2 font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
