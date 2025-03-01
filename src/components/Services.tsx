
import { useRef, useEffect, useState } from 'react';
import { MessageSquare, Users, TicketCheck, BarChart4, BookOpen, ShieldCheck, FileText } from 'lucide-react';
import { useInView, staggeredAnimation } from '@/lib/animate';
import * as THREE from 'three';

interface ServiceCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  index: number;
  serviceType: string;
}

const ServiceCard = ({ icon, title, description, index, serviceType }: ServiceCardProps) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const animProps = staggeredAnimation(index, 0.1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    let cleanup: (() => void) | undefined;
    
    const setupThreeScene = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Customize the scene based on serviceType
      let color = '#33C3F0'; // Sky blue for most services
      let wireframe = false;
      let geometryType: 'sphere' | 'torus' | 'box' | 'cylinder' | 'cone' = 'sphere';
      
      switch (serviceType) {
        case "chatbots":
          color = '#33C3F0'; // Sky blue
          geometryType = 'sphere';
          break;
        case "crm":
          color = '#F97316'; // Bright orange
          geometryType = 'box';
          break;
        case "ticketing":
          color = '#D3E4FD'; // Light blue
          geometryType = 'torus';
          break;
        case "feedback":
          color = '#FDE1D3'; // Soft peach
          geometryType = 'cylinder';
          break;
        case "onboarding":
          color = '#E5DEFF'; // Soft purple
          geometryType = 'cone';
          break;
        case "fraud":
          color = '#0EA5E9'; // Ocean blue
          geometryType = 'sphere';
          break;
        case "document":
          color = '#F2FCE2'; // Soft green
          geometryType = 'box';
          break;
      }
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      
      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);
      
      // Create geometry based on service type
      let geometry;
      switch (geometryType) {
        case 'sphere':
          geometry = new THREE.SphereGeometry(1.5, 32, 32);
          break;
        case 'torus':
          geometry = new THREE.TorusGeometry(1, 0.4, 16, 32);
          break;
        case 'box':
          geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
          break;
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
          break;
        case 'cone':
          geometry = new THREE.ConeGeometry(1, 2, 32);
          break;
      }
      
      const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: wireframe,
        transparent: true,
        opacity: 0.4
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      
      let mouseX = 0;
      let mouseY = 0;
      const mouseMoveHandler = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
        mouseY = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      };
      
      canvas.addEventListener('mousemove', mouseMoveHandler);
      
      const animate = () => {
        requestAnimationFrame(animate);
        
        if (isHovered) {
          mesh.rotation.y += 0.02;
          mesh.rotation.x += 0.01;
          // Make the mesh follow the mouse
          mesh.position.x = mouseX * 1.5;
          mesh.position.y = mouseY * 1.5;
          
          // Add glow effect when hovered
          material.emissive = new THREE.Color(color);
          material.emissiveIntensity = 0.5;
        } else {
          mesh.rotation.y += 0.003;
          mesh.rotation.x += 0.002;
          mesh.position.x = Math.sin(Date.now() * 0.001) * 0.5;
          mesh.position.y = Math.cos(Date.now() * 0.001) * 0.5;
          material.emissiveIntensity = 0;
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      const handleResize = () => {
        if (!canvas) return;
        
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('mousemove', mouseMoveHandler);
        scene.remove(mesh);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };
    
    if (isInView) {
      cleanup = setupThreeScene();
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [isInView, isHovered, serviceType]);
  
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`card card-hover relative overflow-hidden ${isInView ? animProps.className : 'opacity-0'}`}
      style={isInView ? { ...animProps.style, opacity: 1 } : animProps.style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />
      <div className="relative z-10 p-6">
        <div className="bg-flowai-beigeDark p-4 rounded-full w-16 h-16 flex items-center justify-center mb-5">
          {icon}
        </div>
        <h5 className="mb-3">{title}</h5>
        <p className="text-base text-flowai-black/80">{description}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const services = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "AI Chatbots",
      description: "Enhance customer engagement with smart chatbots for support and lead generation, available 24/7.",
      type: "chatbots"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "AI-Powered CRM",
      description: "Boost sales with automation and predictive insights that transform your customer relationship management.",
      type: "crm"
    },
    {
      icon: <TicketCheck className="w-8 h-8" />,
      title: "Ticketing Systems",
      description: "Speed up issue resolutions with AI-driven prioritization and intelligent automation.",
      type: "ticketing"
    },
    {
      icon: <BarChart4 className="w-8 h-8" />,
      title: "Feedback Analysis",
      description: "Turn customer feedback into actionable insights with real-time AI analysis tools.",
      type: "feedback"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Employee Onboarding",
      description: "Simplify employee onboarding with automated training programs and intelligent learning paths.",
      type: "onboarding"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Fraud Detection",
      description: "Secure transactions with real-time anomaly detection powered by advanced AI algorithms.",
      type: "fraud"
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-flowai-beige to-flowai-beigeDark">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="px-3 py-1 bg-flowai-black text-flowai-white text-sm font-medium rounded-full">
            Our Expertise
          </span>
          <h2 
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={`mt-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            AI Solutions Tailored for Your Business
          </h2>
          <p className="max-w-2xl mx-auto mt-4">
            Discover how our cutting-edge AI services can transform your operations, enhance customer experiences, and drive growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
              serviceType={service.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
